// @vitest-environment node
import { describe, it, expect, beforeAll, vi } from 'vitest'
import initSqlJs from 'sql.js'
import { criarBanco, esqueleto } from './banco'
import { SQL_VISAO, resultadoLimpoEstatico } from './demoEtl'
import { projetos, projetoTecnologia, tecnologias } from '../data/dados'

let banco

beforeAll(async () => {
  const SQL = await initSqlJs()
  banco = criarBanco(SQL)
})

const q = (sql, opcoes) => banco.executarUsuario(sql, opcoes)

describe('dados do portfólio', () => {
  it('tem todos os projetos, tecnologias e vínculos', async () => {
    expect((await q('SELECT COUNT(*) AS n FROM projetos')).linhas[0].n).toBe(projetos.length)
    expect((await q('SELECT COUNT(*) AS n FROM tecnologias')).linhas[0].n).toBe(tecnologias.length)
    expect((await q('SELECT COUNT(*) AS n FROM projeto_tecnologia')).linhas[0].n).toBe(projetoTecnologia.length)
  })

  it('junta as tecnologias de cada projeto na ordem em que foram listadas', async () => {
    const r = await q(
      `SELECT p.nome, GROUP_CONCAT(t.nome, ', ') AS stack
       FROM projetos p JOIN projeto_tecnologia pt ON pt.projeto_id = p.id
       JOIN tecnologias t ON t.id = pt.tecnologia_id GROUP BY p.id ORDER BY p.id`,
    )
    expect(r.ok).toBe(true)
    expect(r.linhas).toHaveLength(projetos.length)
    expect(r.linhas[0].stack).toBe(projetos[0].tech.join(', '))
  })

  it('conta em quantos projetos cada tecnologia aparece', async () => {
    const r = await q(
      `SELECT t.nome, COUNT(pt.projeto_id) AS projetos FROM tecnologias t
       LEFT JOIN projeto_tecnologia pt ON pt.tecnologia_id = t.id
       WHERE t.grupo <> 'Ferramentas'
       GROUP BY t.id ORDER BY projetos DESC, t.nome LIMIT 1`,
    )
    expect(r.linhas[0]).toEqual({ nome: 'Python', projetos: 4 })
  })

  it('calcula os anos de experiência atual', async () => {
    const r = await q("SELECT CAST(strftime('%Y','now') AS INTEGER) - inicio AS anos FROM experiencias WHERE fim IS NULL")
    expect(r.linhas[0].anos).toBeGreaterThanOrEqual(2)
  })
})

describe('ETL do hero', () => {
  it('limpa e unifica os nomes, somando os valores', async () => {
    const r = await q('SELECT * FROM compras_limpa')
    const nortec = r.linhas.find((l) => l.fornecedor === 'Nortec')
    expect(nortec).toEqual({ fornecedor: 'Nortec', pedidos: 3, total: 2530.5 })
    expect(r.linhas.map((l) => l.fornecedor)).toEqual(['Cabolar', 'Infoplus', 'Nortec', 'Redefix', 'Tonerix'])
  })

  it('dá o mesmo resultado que a versão em JavaScript usada de reserva', async () => {
    const r = await q('SELECT * FROM compras_limpa')
    expect(r.linhas).toEqual(resultadoLimpoEstatico().linhas)
  })

  it('recria a visão sem erro, quantas vezes precisar', () => {
    expect(banco.recriarVisaoDemo(SQL_VISAO).ok).toBe(true)
    expect(banco.recriarVisaoDemo(SQL_VISAO).ok).toBe(true)
  })
})

describe('guardas', () => {
  it.each([
    'DROP TABLE projetos',
    'DELETE FROM projetos',
    "UPDATE perfil SET nome = 'x'",
    'CREATE TABLE x (a INT)',
    'PRAGMA table_info(projetos)',
    'WITH RECURSIVE r(n) AS (SELECT 1 UNION ALL SELECT n+1 FROM r) SELECT * FROM r',
    'SELECT zeroblob(2000000000)',
  ])('recusa: %s', async (sql) => {
    const r = await q(sql)
    expect(r.ok).toBe(false)
    expect(r.erro).toBeTruthy()
  })

  it('não confunde palavra dentro de texto com comando', async () => {
    const r = await q("SELECT 'DROP TABLE projetos' AS piada")
    expect(r.ok).toBe(true)
    expect(r.linhas[0].piada).toBe('DROP TABLE projetos')
  })

  it('aceita função replace() dentro de um SELECT', async () => {
    expect((await q("SELECT REPLACE('a-b','-','+') AS x")).linhas[0].x).toBe('a+b')
  })

  it('só aceita uma instrução por vez', async () => {
    const r = await q('SELECT 1; SELECT 2;')
    expect(r.ok).toBe(false)
  })

  it('limita o número de linhas devolvidas', async () => {
    const r = await q('SELECT * FROM projetos a, projetos b, projetos c, projetos d')
    expect(r.linhas).toHaveLength(500)
    expect(r.truncado).toBe(true)
  })

  it('explica erros comuns em português', async () => {
    const tabela = await q('SELECT * FROM nao_existe')
    expect(tabela.erro).toContain('nao_existe')
    expect(tabela.dica).toContain('\\dt')
    const coluna = await q('SELECT xyz FROM projetos')
    expect(coluna.erro).toContain('xyz')
  })

  it('renomeia colunas repetidas', async () => {
    const r = await q('SELECT p.id, t.id FROM projetos p, tecnologias t LIMIT 1')
    expect(r.colunas).toEqual(['id', 'id_2'])
  })
})

describe('metacomandos', () => {
  it('\\dt lista as tabelas', async () => {
    const r = await q('\\dt')
    const nomes = r.linhas.map((l) => l.nome)
    expect(nomes).toEqual(expect.arrayContaining(['projetos', 'mensagens', 'compras_limpa']))
  })

  it('\\d mostra as colunas', async () => {
    const r = await q('\\d projetos')
    expect(r.linhas.find((l) => l.coluna === 'id').chave).toBe('PK')
  })

  it('\\help e comando desconhecido', async () => {
    expect((await q('\\help')).linhas.length).toBeGreaterThan(2)
    expect((await q('\\xyz')).ok).toBe(false)
  })
})

describe('INSERT em mensagens', () => {
  it('grava, chama o envio uma vez e confirma', async () => {
    const aoInserirMensagem = vi.fn().mockResolvedValue({ enviado: true })
    const r = await q(
      "INSERT INTO mensagens (nome, email, mensagem) VALUES ('Ana', 'ana@exemplo.com', 'Oi, tenho uma vaga.')",
      { aoInserirMensagem },
    )
    expect(r.ok).toBe(true)
    expect(aoInserirMensagem).toHaveBeenCalledTimes(1)
    expect(aoInserirMensagem.mock.calls[0][0]).toMatchObject({ nome: 'Ana', email: 'ana@exemplo.com' })
    expect((await q('SELECT COUNT(*) AS n FROM mensagens')).linhas[0].n).toBe(1)
  })

  it('recusa e desfaz quando o e-mail é inválido', async () => {
    const aoInserirMensagem = vi.fn()
    const antes = (await q('SELECT COUNT(*) AS n FROM mensagens')).linhas[0].n
    const r = await q("INSERT INTO mensagens (nome, email, mensagem) VALUES ('Bia', 'sem-arroba', 'oi')", { aoInserirMensagem })
    expect(r.ok).toBe(false)
    expect(aoInserirMensagem).not.toHaveBeenCalled()
    expect((await q('SELECT COUNT(*) AS n FROM mensagens')).linhas[0].n).toBe(antes)
  })

  it('recusa várias linhas de uma vez', async () => {
    const r = await q("INSERT INTO mensagens (nome, email, mensagem) VALUES ('A','a@a.com','x'),('B','b@b.com','y')")
    expect(r.ok).toBe(false)
  })

  it('recusa INSERT em outra tabela', async () => {
    const r = await q("INSERT INTO perfil (nome) VALUES ('x')")
    expect(r.ok).toBe(false)
  })

  it('limita quantas mensagens cada visita envia', async () => {
    const aoInserirMensagem = vi.fn().mockResolvedValue({ enviado: true })
    const tentar = () =>
      q("INSERT INTO mensagens (nome, email, mensagem) VALUES ('C', 'c@c.com', 'teste')", { aoInserirMensagem })
    await tentar() // 2ª mensagem (a 1ª foi no primeiro teste)
    await tentar() // 3ª
    const quarta = await tentar()
    expect(quarta.ok).toBe(false)
    expect(quarta.erro).toContain('demais')
  })
})

describe('esqueleto', () => {
  it('remove comentários e textos', () => {
    expect(esqueleto("SELECT 'a;b' -- x;\n FROM t /* y; */")).not.toMatch(/[xy];|a;b/)
  })
})
