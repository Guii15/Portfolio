import { useEffect, useMemo, useState } from 'react'
import { useBanco } from '../hooks/contextoBanco'
import { TABELAS, VISOES } from '../data/esquema'
import * as dados from '../data/dados'

const CORES = {
  perfil: '#ffe14d',
  tecnologias: '#5af0a0',
  projetos: '#8da2ff',
  projeto_tecnologia: '#5b73ff',
  experiencias: '#ff7a59',
  atividades: '#ffb86b',
  formacao: '#ff7eb6',
  mensagens: '#e8ecf4',
  compras_raw: '#c9a800',
  compras_limpa: '#3bb87a',
}

const ESTATICO = {
  perfil: 1,
  tecnologias: dados.tecnologias.length,
  projetos: dados.projetos.length,
  projeto_tecnologia: dados.projetoTecnologia.length,
  experiencias: dados.experiencias.length,
  atividades: dados.atividades.length,
  formacao: dados.formacao.length,
  mensagens: 0,
  compras_raw: dados.comprasRaw.length,
  compras_limpa: 5,
}

// Cada linha do banco vira um bloco. Quando uma consulta usa uma tabela, os blocos dela acendem em onda.
export default function MapaBanco({ consulta }) {
  const { banco } = useBanco()
  const [contagens, setContagens] = useState(ESTATICO)
  const nomes = useMemo(() => [...TABELAS.map((t) => t.nome), ...VISOES.map((v) => v.nome)], [])

  useEffect(() => {
    if (!banco) return
    let vivo = true
    Promise.all(
      nomes.map(async (n) => {
        const r = await banco.executarUsuario(`SELECT COUNT(*) AS n FROM ${n}`)
        return [n, r.ok ? Number(r.linhas[0].n) : ESTATICO[n]]
      }),
    ).then((pares) => {
      if (vivo) setContagens(Object.fromEntries(pares))
    })
    return () => {
      vivo = false
    }
  }, [banco, nomes, consulta?.n])

  const usadas = useMemo(() => {
    if (!consulta?.sql) return new Set()
    const texto = consulta.sql.toLowerCase()
    return new Set(nomes.filter((n) => new RegExp(`\\b${n}\\b`).test(texto)))
  }, [consulta, nomes])

  return (
    <div className="border-2 border-borda bg-superficie p-4 sm:p-5">
      <ul className="grid gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
        {nomes.map((nome) => {
          const n = contagens[nome] ?? 0
          const acesa = usadas.has(nome)
          return (
            <li key={nome}>
              <p className="flex items-baseline justify-between gap-2 font-mono text-xs">
                <span className={acesa ? 'font-bold text-marca' : 'text-tinta/80'}>{nome}</span>
                <span className="numeros-tabulares text-tinta/50">{n}</span>
              </p>
              <div className="mt-1.5 flex min-h-3 flex-wrap gap-[3px]" aria-hidden="true">
                {n === 0 && <span className="font-mono text-[0.65rem] text-tinta/40">vazia</span>}
                {Array.from({ length: n }, (_, i) => (
                  <span
                    key={`${i}-${acesa ? consulta.n : 0}`}
                    className={'block h-3 w-3 ' + (acesa ? 'bloco-aceso' : '')}
                    style={{
                      '--cor-bloco': CORES[nome],
                      backgroundColor: CORES[nome],
                      animationDelay: acesa ? `${i * 25}ms` : undefined,
                    }}
                  />
                ))}
              </div>
            </li>
          )
        })}
      </ul>
      <p className="mt-5 text-base text-tinta/70">
        Um bloco por linha de cada tabela. Rode uma consulta no console e veja as tabelas que ela tocou acenderem.
      </p>
    </div>
  )
}
