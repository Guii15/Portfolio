// O ETL do hero: dados sujos de vendas viram uma visão limpa, com SQL de verdade.
import { vendasRaw } from '../data/dados'

export const SQL_ORIGEM = 'SELECT * FROM vendas_raw;'

export const SQL_VISAO = `CREATE VIEW vendas_limpa AS
SELECT UPPER(SUBSTR(TRIM(cliente),1,1)) ||
       LOWER(SUBSTR(TRIM(cliente),2)) AS cliente,
       COUNT(*) AS pedidos, ROUND(SUM(CAST(REPLACE(
         REPLACE(LTRIM(valor,'R$ '),'.',''),',','.')
         AS REAL)),2) AS total
FROM vendas_raw WHERE valor IS NOT NULL
GROUP BY LOWER(TRIM(cliente));`

export const SQL_LIMPA = 'SELECT * FROM vendas_limpa;'

// Uma célula está "suja" se não segue o formato esperado da coluna.
export function celulaSuja(coluna, valor) {
  if (coluna === 'cliente') return typeof valor === 'string' && !/^[A-ZÀ-Ý][a-zà-ÿ]+$/.test(valor)
  if (coluna === 'valor') return valor === null || !/^\d+(\.\d+)?$/.test(String(valor))
  if (coluna === 'data') {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(valor ?? ''))
    return !m || Number(m[2]) > 12 || Number(m[3]) > 31
  }
  return false
}

export function linhaSuja(linha) {
  return ['cliente', 'valor', 'data'].some((c) => celulaSuja(c, linha[c]))
}

export function qualidade(linhas) {
  if (!linhas.length) return 100
  const boas = linhas.filter((l) => !('valor' in l) || !linhaSuja(l)).length
  return Math.round((boas / linhas.length) * 100)
}

// Resultado equivalente em JavaScript puro: usado se o banco não carregar.
export function resultadoOrigemEstatico() {
  return {
    ok: true,
    tipo: 'tabela',
    colunas: ['cliente', 'valor', 'data'],
    linhas: vendasRaw.map(([cliente, valor, data]) => ({ cliente, valor, data })),
    ms: 0,
  }
}

export function resultadoLimpoEstatico() {
  const grupos = new Map()
  for (const [cliente, valor] of vendasRaw) {
    if (valor === null) continue
    const chave = cliente.trim().toLowerCase()
    const numero = Number(valor.replace(/^[R$ ]+/, '').replace(/\./g, '').replace(',', '.'))
    const atual = grupos.get(chave) ?? { pedidos: 0, total: 0 }
    atual.pedidos += 1
    atual.total += numero
    grupos.set(chave, atual)
  }
  const linhas = [...grupos.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([chave, g]) => ({
      cliente: chave.charAt(0).toUpperCase() + chave.slice(1),
      pedidos: g.pedidos,
      total: Math.round(g.total * 100) / 100,
    }))
  return { ok: true, tipo: 'tabela', colunas: ['cliente', 'pedidos', 'total'], linhas, ms: 0 }
}
