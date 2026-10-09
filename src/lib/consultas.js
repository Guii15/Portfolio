// SQL de cada seção do site, e o resultado equivalente (pré-calculado) usado enquanto o banco carrega.
import { perfil, projetos, tecnologias, projetoTecnologia, experiencias, formacao } from '../data/dados'

const tabela = (colunas, linhas) => ({ ok: true, tipo: 'tabela', colunas, linhas, ms: 0 })
const escapar = (s) => String(s).replace(/'/g, "''")

// ---------- Sobre ----------
export const SQL_SOBRE = `SELECT nome, cargo, empresa, cidade, foco, resumo
FROM perfil;`

export const COLUNAS_SOBRE = ['nome', 'cargo', 'empresa', 'cidade', 'foco', 'resumo']

export const sobreInicial = () =>
  tabela(COLUNAS_SOBRE, [Object.fromEntries(COLUNAS_SOBRE.map((c) => [c, perfil[c]]))])

// ---------- Projetos ----------
export function sqlProjetos({ tech = null, busca = '' } = {}) {
  const condicoes = []
  if (tech) {
    condicoes.push(`p.id IN (SELECT projeto_id FROM projeto_tecnologia
               WHERE tecnologia_id = (SELECT id FROM tecnologias
                                      WHERE nome = '${escapar(tech)}'))`)
  }
  const termo = busca.trim().replace(/[%_]/g, '')
  if (termo) {
    const t = escapar(termo)
    condicoes.push(`(p.nome LIKE '%${t}%' OR p.descricao LIKE '%${t}%')`)
  }
  const where = condicoes.length ? `WHERE ${condicoes.join('\n  AND ')}\n` : ''
  return `SELECT p.id, p.nome, p.descricao, p.origem, p.destino,
       GROUP_CONCAT(t.nome, ', ') AS stack,
       p.github, p.imagem, p.detalhe
FROM projetos p
JOIN projeto_tecnologia pt ON pt.projeto_id = p.id
JOIN tecnologias t ON t.id = pt.tecnologia_id
${where}GROUP BY p.id
ORDER BY p.id;`
}

export const COLUNAS_PROJETOS = ['id', 'nome', 'descricao', 'origem', 'destino', 'stack', 'github', 'imagem', 'detalhe']

export const projetosInicial = () =>
  tabela(
    COLUNAS_PROJETOS,
    projetos.map((p) => ({
      id: p.id,
      nome: p.nome,
      descricao: p.descricao,
      origem: p.origem,
      destino: p.destino,
      stack: p.tech.join(', '),
      github: p.github,
      imagem: p.imagem,
      detalhe: p.detalhe,
    })),
  )

// Tecnologias que aparecem em algum projeto, da mais usada para a menos usada (chips de filtro).
export function tecnologiasDeFiltro() {
  const contagem = new Map()
  for (const { tecnologia_id } of projetoTecnologia) {
    contagem.set(tecnologia_id, (contagem.get(tecnologia_id) ?? 0) + 1)
  }
  return tecnologias
    .filter((t) => contagem.has(t.id))
    .map((t) => ({ nome: t.nome, projetos: contagem.get(t.id) }))
    .sort((a, b) => b.projetos - a.projetos || a.nome.localeCompare(b.nome))
}

// ---------- Stack ----------
export const SQL_STACK = `SELECT t.grupo, t.nome, COUNT(pt.projeto_id) AS projetos
FROM tecnologias t
LEFT JOIN projeto_tecnologia pt ON pt.tecnologia_id = t.id
GROUP BY t.id
ORDER BY CASE t.grupo WHEN 'Dados' THEN 1
                      WHEN 'Aplicações' THEN 2 ELSE 3 END,
         projetos DESC, t.nome;`

export const COLUNAS_STACK = ['grupo', 'nome', 'projetos']

export const stackInicial = () => {
  const ordem = { Dados: 1, Aplicações: 2 }
  const linhas = tecnologias
    .map((t) => ({
      grupo: t.grupo,
      nome: t.nome,
      projetos: projetoTecnologia.filter((r) => r.tecnologia_id === t.id).length,
    }))
    .sort(
      (a, b) =>
        (ordem[a.grupo] ?? 3) - (ordem[b.grupo] ?? 3) || b.projetos - a.projetos || a.nome.localeCompare(b.nome),
    )
  return tabela(COLUNAS_STACK, linhas)
}

// ---------- Histórico ----------
export const SQL_HISTORICO = `SELECT e.empresa, e.cargo, e.inicio,
       COALESCE(CAST(e.fim AS TEXT), 'hoje') AS fim,
       a.texto AS atividade
FROM experiencias e
JOIN atividades a ON a.experiencia_id = e.id
ORDER BY e.inicio DESC, a.id;`

export const COLUNAS_HISTORICO = ['empresa', 'cargo', 'inicio', 'fim', 'atividade']

export const historicoInicial = () =>
  tabela(
    COLUNAS_HISTORICO,
    [...experiencias]
      .sort((a, b) => b.inicio - a.inicio)
      .flatMap((e) =>
        e.atividades.map((atividade) => ({
          empresa: e.empresa,
          cargo: e.cargo,
          inicio: e.inicio,
          fim: e.fim === null ? 'hoje' : String(e.fim),
          atividade,
        })),
      ),
  )

// ---------- Formação ----------
export const SQL_FORMACAO = `SELECT nivel, curso, instituicao, situacao
FROM formacao
ORDER BY CASE nivel WHEN 'Graduação' THEN 1
                    WHEN 'Técnico' THEN 2 ELSE 3 END, id;`

export const COLUNAS_FORMACAO = ['nivel', 'curso', 'instituicao', 'situacao']

export const formacaoInicial = () => {
  const ordem = { Graduação: 1, Técnico: 2 }
  const linhas = [...formacao]
    .sort((a, b) => (ordem[a.nivel] ?? 3) - (ordem[b.nivel] ?? 3) || a.id - b.id)
    .map((f) => ({ nivel: f.nivel, curso: f.curso, instituicao: f.instituicao, situacao: f.situacao }))
  return tabela(COLUNAS_FORMACAO, linhas)
}

// ---------- Contato ----------
export function sqlMensagem({ nome = '', email = '', link = '', mensagem = '' }) {
  const v = (s) => `'${escapar(s)}'`
  return `INSERT INTO mensagens (nome, email, link, mensagem)
VALUES (${v(nome)}, ${v(email)},
        ${link.trim() ? v(link.trim()) : 'NULL'},
        ${v(mensagem)});`
}

// ---------- Console ----------
export const PERGUNTAS = [
  {
    rotulo: 'Quais projetos usam Python?',
    sql: `SELECT p.nome, p.origem, p.destino
FROM projetos p
JOIN projeto_tecnologia pt ON pt.projeto_id = p.id
JOIN tecnologias t ON t.id = pt.tecnologia_id
WHERE t.nome = 'Python'
ORDER BY p.nome;`,
  },
  {
    rotulo: 'Qual tecnologia aparece em mais projetos?',
    sql: `SELECT t.nome, t.grupo, COUNT(*) AS projetos
FROM tecnologias t
JOIN projeto_tecnologia pt ON pt.tecnologia_id = t.id
GROUP BY t.id
ORDER BY projetos DESC, t.nome
LIMIT 5;`,
  },
  {
    rotulo: 'Há quantos anos trabalho na Binário?',
    sql: `SELECT empresa, cargo, inicio,
       CAST(strftime('%Y','now') AS INTEGER) - inicio AS anos
FROM experiencias
WHERE fim IS NULL;`,
  },
  {
    rotulo: 'Projetos de dados ou de aplicação?',
    sql: `SELECT categoria, COUNT(*) AS projetos,
       GROUP_CONCAT(nome, ' | ') AS quais
FROM projetos
GROUP BY categoria;`,
  },
  {
    rotulo: 'Ver o resultado do ETL do hero',
    sql: `SELECT cliente, pedidos, total
FROM vendas_limpa
ORDER BY total DESC;`,
  },
]
