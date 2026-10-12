// Banco SQLite (sql.js) do portfólio: cria as tabelas, popula e executa consultas
// com guardas. Quem visita pode consultar à vontade, mas o banco é somente leitura.
import { TABELAS, VISOES, gerarDdl } from '../data/esquema'
import {
  perfil,
  tecnologias,
  projetos,
  projetoTecnologia,
  experiencias,
  atividades,
  formacao,
  comprasRaw,
} from '../data/dados'
import { SQL_VISAO } from './demoEtl'

const LIMITE_LINHAS = 500
const LIMITE_MENSAGENS = 3

// ---------- utilidades ----------

// Tira comentários e o conteúdo de textos entre aspas, para analisar só o "esqueleto" do SQL.
export function esqueleto(sql) {
  return sql
    .replace(/\/\*[\s\S]*?\*\//g, ' ')
    .replace(/--[^\n]*/g, ' ')
    .replace(/'(?:[^']|'')*'/g, "''")
    .replace(/"(?:[^"]|"")*"/g, '""')
}

const BLOQUEIOS = [
  [/\b(DROP|DELETE|UPDATE|ALTER|TRUNCATE)\b/i, 'Permissão negada: este banco é somente leitura. Boa tentativa.'],
  [/\b(CREATE|ATTACH|DETACH|PRAGMA|VACUUM|REINDEX|ANALYZE|TRIGGER|SAVEPOINT|BEGIN|COMMIT|ROLLBACK)\b/i, 'Permissão negada: aqui só dá para consultar. Use SELECT.'],
  [/\bREPLACE\s+INTO\b/i, 'Permissão negada: este banco é somente leitura.'],
  [/\bRECURSIVE\b/i, 'Consultas recursivas ficam de fora para ninguém travar a página. Use SELECT, JOIN e GROUP BY.'],
  [/\b(ZEROBLOB|RANDOMBLOB|LOAD_EXTENSION)\b/i, 'Essa função não está liberada neste banco.'],
]

function traduzirErro(mensagem) {
  const tabela = /no such table: (\S+)/i.exec(mensagem)
  if (tabela) return { erro: `A tabela ${tabela[1]} não existe.`, dica: 'Digite \\dt para listar as tabelas.' }
  const coluna = /no such column: (\S+)/i.exec(mensagem)
  if (coluna) return { erro: `A coluna ${coluna[1]} não existe.`, dica: 'Digite \\d nome_da_tabela para ver as colunas.' }
  if (/ambiguous column name/i.test(mensagem)) {
    return { erro: 'Essa coluna existe em mais de uma tabela.', dica: 'Escreva tabela.coluna, por exemplo p.id.' }
  }
  if (/syntax error/i.test(mensagem)) {
    return { erro: `Erro de sintaxe: ${mensagem.replace(/^.*?:\s*/, '')}`, dica: 'Confira vírgulas, parênteses e aspas.' }
  }
  return { erro: mensagem, dica: null }
}

function nomesUnicos(colunas) {
  const vistos = new Map()
  return colunas.map((c) => {
    const n = (vistos.get(c) ?? 0) + 1
    vistos.set(c, n)
    return n === 1 ? c : `${c}_${n}`
  })
}

function valorSeguro(v) {
  if (v instanceof Uint8Array) return '[blob]'
  return v
}

// ---------- criação do banco ----------

function popular(db) {
  const inserir = (sql, linhas) => {
    const stmt = db.prepare(sql)
    for (const l of linhas) stmt.run(l)
    stmt.free()
  }

  inserir(
    'INSERT INTO perfil VALUES (?,?,?,?,?,?,?,?,?,?)',
    [[perfil.id, perfil.nome, perfil.cargo, perfil.empresa, perfil.cidade, perfil.foco, perfil.resumo, perfil.email, perfil.github, perfil.linkedin]],
  )
  inserir('INSERT INTO tecnologias VALUES (?,?,?)', tecnologias.map((t) => [t.id, t.nome, t.grupo]))
  inserir(
    'INSERT INTO projetos VALUES (?,?,?,?,?,?,?,?,?,?)',
    projetos.map((p) => [p.id, p.slug, p.nome, p.descricao, p.detalhe, p.origem, p.destino, p.github, p.imagem, p.categoria]),
  )
  inserir('INSERT INTO projeto_tecnologia VALUES (?,?)', projetoTecnologia.map((r) => [r.projeto_id, r.tecnologia_id]))
  inserir('INSERT INTO experiencias VALUES (?,?,?,?,?)', experiencias.map((e) => [e.id, e.empresa, e.cargo, e.inicio, e.fim]))
  inserir('INSERT INTO atividades (experiencia_id, texto) VALUES (?,?)', atividades.map((a) => [a.experiencia_id, a.texto]))
  inserir('INSERT INTO formacao VALUES (?,?,?,?,?)', formacao.map((f) => [f.id, f.nivel, f.curso, f.instituicao, f.situacao]))
  inserir('INSERT INTO compras_raw VALUES (?,?,?)', comprasRaw)
}

export function criarBanco(SQL) {
  const db = new SQL.Database()
  db.run(gerarDdl())
  popular(db)
  db.run(SQL_VISAO)

  let mensagensEnviadas = 0

  const versao = db.exec('SELECT sqlite_version()')[0].values[0][0]

  function lerResultado(sql) {
    const inicio = performance.now()
    const stmt = db.prepare(sql)
    try {
      const colunas = nomesUnicos(stmt.getColumnNames())
      const linhas = []
      let truncado = false
      while (stmt.step()) {
        if (linhas.length >= LIMITE_LINHAS) {
          truncado = true
          break
        }
        const valores = stmt.get()
        const linha = {}
        colunas.forEach((c, i) => {
          linha[c] = valorSeguro(valores[i])
        })
        linhas.push(linha)
      }
      return { ok: true, tipo: 'tabela', colunas, linhas, truncado, ms: performance.now() - inicio }
    } finally {
      stmt.free()
    }
  }

  function metacomando(texto) {
    const [cmd, arg] = texto.trim().split(/\s+/)
    const nome = (arg ?? '').replace(/[^A-Za-z0-9_]/g, '')
    switch (cmd.toLowerCase()) {
      case '\\dt':
      case '.tables':
        return lerResultado(
          "SELECT name AS nome, type AS tipo FROM sqlite_master WHERE type IN ('table','view') AND name NOT LIKE 'sqlite_%' ORDER BY type DESC, name",
        )
      case '\\d':
      case '.schema':
        if (!nome) return { ok: false, erro: 'Falta o nome da tabela.', dica: 'Exemplo: \\d projetos' }
        return lerResultado(
          `SELECT name AS coluna, type AS tipo, CASE pk WHEN 1 THEN 'PK' ELSE '' END AS chave, "notnull" AS obrigatorio FROM pragma_table_info('${nome}')`,
        )
      case '\\help':
      case '\\?':
      case '.help':
        return {
          ok: true,
          tipo: 'tabela',
          colunas: ['comando', 'o que faz'],
          linhas: [
            { comando: '\\dt', 'o que faz': 'lista as tabelas e visões' },
            { comando: '\\d projetos', 'o que faz': 'mostra as colunas de uma tabela' },
            { comando: 'SELECT ... JOIN ...', 'o que faz': 'consulta e cruza as tabelas' },
            { comando: 'INSERT INTO mensagens ...', 'o que faz': 'grava uma mensagem e me envia por e-mail' },
            { comando: 'Ctrl+Enter', 'o que faz': 'executa a consulta' },
          ],
          ms: 0,
        }
      case '\\q':
        return { ok: true, tipo: 'mensagem', texto: 'Não tem como sair: isto é uma página web. Pode fechar a aba quando quiser.', ms: 0 }
      default:
        return { ok: false, erro: `Comando ${cmd} desconhecido.`, dica: 'Digite \\help para ver os comandos.' }
    }
  }

  function inserirMensagem(sql, aoInserir) {
    const inicio = performance.now()
    if (mensagensEnviadas >= LIMITE_MENSAGENS) {
      return Promise.resolve({
        ok: false,
        erro: 'Você já enviou mensagens demais nesta sessão.',
        dica: 'Se for urgente, escreva direto para o meu e-mail.',
      })
    }
    db.run('BEGIN')
    try {
      db.run(sql)
      if (db.getRowsModified() !== 1) {
        db.run('ROLLBACK')
        return Promise.resolve({ ok: false, erro: 'Insira uma mensagem por vez.', dica: 'Use um único VALUES (...).' })
      }
      const linha = lerResultado('SELECT nome, email, link, mensagem FROM mensagens ORDER BY id DESC LIMIT 1').linhas[0]
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(linha.email ?? ''))
      if (!linha.nome?.trim() || !emailOk || !linha.mensagem?.trim() || String(linha.mensagem).length > 2000) {
        db.run('ROLLBACK')
        return Promise.resolve({
          ok: false,
          erro: 'Preencha nome, um e-mail válido e uma mensagem de até 2000 caracteres.',
          dica: null,
        })
      }
      db.run('COMMIT')
      return Promise.resolve(aoInserir ? aoInserir(linha) : { enviado: false }).then(
        (retorno) => {
          mensagensEnviadas += 1
          const enviado = retorno?.enviado !== false
          return {
            ok: true,
            tipo: 'mensagem',
            texto: enviado
              ? '1 linha inserida em mensagens. E-mail enviado, respondo em breve.'
              : '1 linha inserida em mensagens (só neste navegador, nada foi enviado).',
            ms: performance.now() - inicio,
          }
        },
        () => ({
          ok: false,
          erro: 'A linha foi gravada aqui, mas o e-mail não saiu.',
          dica: 'Tente de novo ou escreva direto para o meu e-mail.',
        }),
      )
    } catch (e) {
      try {
        db.run('ROLLBACK')
      } catch {
        // sem transação aberta
      }
      return Promise.resolve({ ok: false, ...traduzirErro(String(e.message ?? e)) })
    }
  }

  // Execução com as guardas de visitante.
  async function executarUsuario(texto, opcoes = {}) {
    const sql = String(texto ?? '').trim()
    if (!sql) return { ok: false, erro: 'Escreva uma consulta primeiro.', dica: 'Exemplo: SELECT * FROM projetos;' }
    if (sql.startsWith('\\') || sql.startsWith('.')) return metacomando(sql)

    const casco = esqueleto(sql)
    for (const [regex, mensagem] of BLOQUEIOS) {
      if (regex.test(casco)) return { ok: false, erro: mensagem, dica: null }
    }
    const instrucoes = casco.split(';').map((s) => s.trim()).filter(Boolean)
    if (instrucoes.length > 1) {
      return { ok: false, erro: 'Execute uma consulta por vez.', dica: 'Deixe só uma instrução, com ; no fim.' }
    }
    const primeira = /^\s*(\w+)/.exec(casco)?.[1]?.toUpperCase()
    if (primeira === 'INSERT') {
      if (!/^\s*INSERT\s+INTO\s+mensagens\b/i.test(casco)) {
        return { ok: false, erro: 'Só a tabela mensagens aceita INSERT.', dica: null }
      }
      return inserirMensagem(sql, opcoes.aoInserirMensagem)
    }
    if (!['SELECT', 'WITH', 'EXPLAIN', 'VALUES'].includes(primeira)) {
      return { ok: false, erro: 'Comece com SELECT.', dica: 'Digite \\help para ver o que dá para fazer.' }
    }
    try {
      return lerResultado(sql)
    } catch (e) {
      return { ok: false, ...traduzirErro(String(e.message ?? e)) }
    }
  }

  // Execução confiável, só para o ETL do hero (cria a visão de novo).
  function recriarVisaoDemo(sqlVisao) {
    db.run('DROP VIEW IF EXISTS compras_limpa')
    db.run(sqlVisao)
    return { ok: true, tipo: 'mensagem', texto: 'Visão compras_limpa criada.', ms: 0 }
  }

  return { versao, executarUsuario, recriarVisaoDemo, tabelas: TABELAS, visoes: VISOES }
}
