// Esquema do banco do portfólio. A mesma lista gera o CREATE TABLE e a árvore
// de tabelas do console, então os dois nunca ficam diferentes.

export const TABELAS = [
  {
    nome: 'perfil',
    descricao: 'Quem sou eu',
    colunas: [
      { nome: 'id', tipo: 'INTEGER', pk: true },
      { nome: 'nome', tipo: 'TEXT' },
      { nome: 'cargo', tipo: 'TEXT' },
      { nome: 'empresa', tipo: 'TEXT' },
      { nome: 'cidade', tipo: 'TEXT' },
      { nome: 'foco', tipo: 'TEXT' },
      { nome: 'resumo', tipo: 'TEXT' },
      { nome: 'email', tipo: 'TEXT' },
      { nome: 'github', tipo: 'TEXT' },
      { nome: 'linkedin', tipo: 'TEXT' },
    ],
  },
  {
    nome: 'tecnologias',
    descricao: 'Ferramentas que uso',
    colunas: [
      { nome: 'id', tipo: 'INTEGER', pk: true },
      { nome: 'nome', tipo: 'TEXT' },
      { nome: 'grupo', tipo: 'TEXT' },
    ],
  },
  {
    nome: 'projetos',
    descricao: 'Sistemas e automações',
    colunas: [
      { nome: 'id', tipo: 'INTEGER', pk: true },
      { nome: 'slug', tipo: 'TEXT' },
      { nome: 'nome', tipo: 'TEXT' },
      { nome: 'descricao', tipo: 'TEXT' },
      { nome: 'detalhe', tipo: 'TEXT' },
      { nome: 'origem', tipo: 'TEXT' },
      { nome: 'destino', tipo: 'TEXT' },
      { nome: 'github', tipo: 'TEXT' },
      { nome: 'imagem', tipo: 'TEXT' },
      { nome: 'categoria', tipo: 'TEXT' },
    ],
  },
  {
    nome: 'projeto_tecnologia',
    descricao: 'Qual projeto usa qual tecnologia',
    colunas: [
      { nome: 'projeto_id', tipo: 'INTEGER', ref: 'projetos.id' },
      { nome: 'tecnologia_id', tipo: 'INTEGER', ref: 'tecnologias.id' },
    ],
  },
  {
    nome: 'experiencias',
    descricao: 'Onde trabalhei',
    colunas: [
      { nome: 'id', tipo: 'INTEGER', pk: true },
      { nome: 'empresa', tipo: 'TEXT' },
      { nome: 'cargo', tipo: 'TEXT' },
      { nome: 'inicio', tipo: 'INTEGER' },
      { nome: 'fim', tipo: 'INTEGER', nulo: true },
    ],
  },
  {
    nome: 'atividades',
    descricao: 'O que fiz em cada lugar',
    colunas: [
      { nome: 'id', tipo: 'INTEGER', pk: true },
      { nome: 'experiencia_id', tipo: 'INTEGER', ref: 'experiencias.id' },
      { nome: 'texto', tipo: 'TEXT' },
    ],
  },
  {
    nome: 'formacao',
    descricao: 'Estudos e cursos',
    colunas: [
      { nome: 'id', tipo: 'INTEGER', pk: true },
      { nome: 'nivel', tipo: 'TEXT' },
      { nome: 'curso', tipo: 'TEXT' },
      { nome: 'instituicao', tipo: 'TEXT' },
      { nome: 'situacao', tipo: 'TEXT' },
    ],
  },
  {
    nome: 'mensagens',
    descricao: 'Aceita INSERT: vira e-mail para mim',
    colunas: [
      { nome: 'id', tipo: 'INTEGER', pk: true },
      { nome: 'nome', tipo: 'TEXT', obrigatorio: true },
      { nome: 'email', tipo: 'TEXT', obrigatorio: true },
      { nome: 'link', tipo: 'TEXT', nulo: true },
      { nome: 'mensagem', tipo: 'TEXT', obrigatorio: true },
      { nome: 'criada_em', tipo: 'TEXT', padrao: 'CURRENT_TIMESTAMP' },
    ],
  },
  {
    nome: 'vendas_raw',
    descricao: 'Dados sujos de exemplo (hero)',
    colunas: [
      { nome: 'cliente', tipo: 'TEXT' },
      { nome: 'valor', tipo: 'TEXT' },
      { nome: 'data', tipo: 'TEXT' },
    ],
  },
]

// Visões criadas pelo banco (aparecem na árvore, mas não aceitam INSERT).
export const VISOES = [
  {
    nome: 'vendas_limpa',
    descricao: 'Resultado do ETL do hero',
    colunas: [
      { nome: 'cliente', tipo: 'TEXT' },
      { nome: 'pedidos', tipo: 'INTEGER' },
      { nome: 'total', tipo: 'REAL' },
    ],
  },
]

export function gerarDdl() {
  return TABELAS.map((t) => {
    const cols = t.colunas.map((c) => {
      let def = `${c.nome} ${c.tipo}`
      if (c.pk) def += ' PRIMARY KEY'
      if (c.obrigatorio) def += ' NOT NULL'
      if (c.padrao) def += ` DEFAULT ${c.padrao}`
      if (c.ref) {
        const [tabela, coluna] = c.ref.split('.')
        def += ` REFERENCES ${tabela}(${coluna})`
      }
      return def
    })
    return `CREATE TABLE ${t.nome} (${cols.join(', ')});`
  }).join('\n')
}
