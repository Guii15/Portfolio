// Conteúdo do portfólio. Estes arrays alimentam o banco SQLite e também servem
// de resposta imediata enquanto o banco carrega (ou se ele não carregar).
import { personal } from './personal'

export const perfil = {
  id: 1,
  nome: personal.name,
  cargo: 'Auxiliar de TI',
  empresa: 'Binário Tecnologia',
  cidade: personal.location,
  foco: 'Engenharia de dados',
  resumo:
    'Sou o desenvolvedor interno da Binário Tecnologia, uma distribuidora em Varginha, MG. Desde 2024 construo os sistemas que os setores usam todo dia e os scripts que tiram dados do ERP WinThor, organizam e entregam num formato que alguém consegue usar.\n\n' +
    'Quero seguir carreira em engenharia de dados. O que me atrai é o trabalho que já faço: pegar dado bagunçado, com nome escrito de três jeitos, data inválida e acento quebrado, padronizar e fazer chegar certo ao destino. Me formei em Análise e Desenvolvimento de Sistemas em 2026 e estou aberto a novas oportunidades.',
  email: personal.email,
  github: personal.github,
  linkedin: personal.linkedin,
}

// ordem = id
export const tecnologias = [
  ['Python', 'Dados'],
  ['Oracle SQL', 'Dados'],
  ['SQLite', 'Dados'],
  ['MySQL', 'Dados'],
  ['cx_Oracle', 'Dados'],
  ['Selenium', 'Dados'],
  ['openpyxl', 'Dados'],
  ['Pillow', 'Dados'],
  ['ReportLab', 'Dados'],
  ['JSON', 'Dados'],
  ['Laravel', 'Aplicações'],
  ['PHP', 'Aplicações'],
  ['React', 'Aplicações'],
  ['JavaScript', 'Aplicações'],
  ['TypeScript', 'Aplicações'],
  ['Alpine.js', 'Aplicações'],
  ['Tailwind CSS', 'Aplicações'],
  ['Git', 'Ferramentas'],
  ['GitHub', 'Ferramentas'],
].map(([nome, grupo], i) => ({ id: i + 1, nome, grupo }))

const idTec = (nome) => tecnologias.find((t) => t.nome === nome).id

// Todo projeto vive em repositório no GitHub, então Git e GitHub entram em todos.
const comGit = (tech) => [...tech, 'Git', 'GitHub']

export const projetos = [
  {
    id: 1,
    slug: 'catalogo-winthor',
    nome: 'Catálogo de produtos WinThor',
    descricao: 'Catálogo online com os produtos do ERP WinThor, com e sem preço.',
    detalhe:
      'Um script Python consulta o Oracle do WinThor com cx_Oracle e exporta produtos, estoque e preços para JSON. O frontend em React lê esses dados e mostra tudo numa grade para os clientes. O site roda num servidor próprio e tem dois links, um com preço e outro sem. Também gera catálogos em PDF por marca. Hoje estou refazendo o visual e a categorização dos produtos.',
    origem: 'WinThor (Oracle)',
    destino: 'Catálogo web, com e sem preço',
    github: null,
    imagem: 'projeto-catalogo.png',
    categoria: 'dados',
    tech: comGit(['Python', 'Oracle SQL', 'cx_Oracle', 'ReportLab', 'JSON', 'React']),
  },
  {
    id: 2,
    slug: 'extrator-selenium',
    nome: 'Extrator de dados de portais web',
    descricao: 'Faz login sozinho num portal, varre os produtos e gera relatórios em Excel.',
    detalhe:
      'Faz login automático no portal, percorre as listas de produtos coletando códigos e descrições e gera relatórios formatados em .xlsx para análise de estoque.',
    origem: 'Portal web de produtos',
    destino: 'Planilha .xlsx',
    github: 'https://github.com/Guii15/Extrator-selenium',
    imagem: 'Extrator selenium.png',
    categoria: 'dados',
    tech: comGit(['Python', 'Selenium', 'JavaScript', 'openpyxl']),
  },
  {
    id: 3,
    slug: 'fotos-produtos',
    nome: 'Automação de fotos de produtos',
    descricao: 'Coloca as fotos no papel timbrado, empacota em ZIP e mantém o acervo enxuto.',
    detalhe:
      'Scripts em Python percorrem a pasta de fotos, ajustam cada imagem na proporção certa para o papel timbrado dos catálogos e empacotam tudo em ZIP para subir no sistema. Também estou montando uma rotina que arquiva a foto de produto sem estoque e a traz de volta quando o estoque volta.',
    origem: 'Pasta de fotos',
    destino: 'Fotos timbradas em ZIP',
    github: 'https://github.com/Guii15/Fotos-Python',
    imagem: 'Automação catalogo.png',
    categoria: 'dados',
    tech: comGit(['Python', 'Pillow']),
  },
  {
    id: 4,
    slug: 'reclassificacao-produtos',
    nome: 'Reclassificação de produtos',
    descricao: 'Descobre o departamento certo dos produtos cadastrados como AJUSTAR.',
    detalhe:
      'Mais de 2.800 produtos estavam num departamento provisório, o AJUSTAR. Um script em Python compara a descrição de cada um com cerca de 6.700 produtos já classificados, usando TF-IDF com n-gramas, e sugere o departamento mais parecido. A saída são arquivos prontos para importar no MySQL e propostas de novos departamentos.',
    origem: 'Produtos em AJUSTAR',
    destino: 'Departamento sugerido',
    github: null,
    imagem: null,
    categoria: 'dados',
    tech: comGit(['Python', 'MySQL']),
  },
  {
    id: 5,
    slug: 'requisicao-compras',
    nome: 'Sistema de requisição de compras',
    descricao: 'Sistema web em produção: da requisição do setor até a compra conferida e paga.',
    detalhe:
      'Aplicação em Laravel com login por perfil, aprovação do comprador, conferência com foto de cada item, controle de coleta e entrada e um Financeiro com o saldo devedor por fornecedor. Importa o histórico de compras de planilhas Excel (mais de 3 mil registros) e tem mais de 300 testes automatizados.',
    origem: 'Pedidos dos setores',
    destino: 'Compra conferida e paga',
    github: 'https://github.com/Guii15/Requisicao-compras',
    imagem: 'Requisição de compras.png',
    categoria: 'aplicação',
    tech: comGit(['Laravel', 'PHP', 'SQLite', 'Tailwind CSS', 'Alpine.js']),
  },
  {
    id: 6,
    slug: 'requisicao-material',
    nome: 'Requisição de material do estoque',
    descricao: 'Pedido, aprovação e retirada de material, com assinatura e histórico.',
    detalhe:
      'Os setores pedem material, o líder aprova e só então o estoque separa. Há dois tipos de pedido: Teste, que precisa voltar no prazo e é conferido na devolução, e Uso e Consumo, que segue para a baixa. A retirada é assinada na tela e o comprovante e o histórico saem em PDF. Em desenvolvimento.',
    origem: 'Pedido do setor',
    destino: 'Retirada assinada e histórico',
    github: 'https://github.com/Guii15/requisicao-material',
    imagem: 'requisicao-material.webp',
    categoria: 'aplicação',
    tech: comGit(['Laravel', 'PHP', 'Alpine.js', 'Tailwind CSS']),
  },
  {
    id: 7,
    slug: 'binario-builds',
    nome: 'Binário Builds',
    descricao: 'Site para montar o PC do cliente peça por peça, com orçamento pronto.',
    detalhe:
      'Escolhe-se a plataforma (Intel ou AMD) e o site filtra as peças compatíveis, monta o orçamento com preço no PIX e envia a montagem pelo WhatsApp ou em PDF. Também tem configurações prontas por perfil de uso. Em desenvolvimento.',
    origem: 'Peças do estoque',
    destino: 'Orçamento em PDF e WhatsApp',
    github: 'https://github.com/Guii15/binario-builds',
    imagem: 'binario-builds.webp',
    categoria: 'aplicação',
    tech: comGit(['React', 'TypeScript', 'Tailwind CSS']),
  },
]

export const projetoTecnologia = projetos.flatMap((p) =>
  p.tech.map((t) => ({ projeto_id: p.id, tecnologia_id: idTec(t) })),
)

export const experiencias = [
  {
    id: 1,
    empresa: 'Binário Tecnologia',
    cargo: 'Auxiliar de TI',
    inicio: 2024,
    fim: null,
    atividades: [
      'Scripts Python para automatizar rotinas internas e auditar dados de estoque, com Flask e SQLAlchemy.',
      'Manutenção e evolução de sistemas web internos com JavaScript, TypeScript e React.',
      'Consultas e manipulação de SQL para gerar relatórios e atender chamados técnicos.',
    ],
  },
  {
    id: 2,
    empresa: 'Senac',
    cargo: 'Aprendiz de TI',
    inicio: 2021,
    fim: 2023,
    atividades: [
      'Configuração de redes locais, cabeamento estruturado e manutenção de equipamentos de rede.',
      'Atendimento de chamados e suporte técnico a alunos, professores e funcionários.',
    ],
  },
]

export const atividades = experiencias.flatMap((e) => e.atividades.map((texto) => ({ experiencia_id: e.id, texto })))

export const formacao = [
  { nivel: 'Graduação', curso: 'Tecnólogo em Análise e Desenvolvimento de Sistemas', instituicao: 'UNIASSELVI', situacao: 'Concluído em 2026' },
  { nivel: 'Técnico', curso: 'Técnico em Informática', instituicao: 'Senac', situacao: 'Concluído' },
  { nivel: 'Curso livre', curso: 'Bootcamp Java, trilha Back-end', instituicao: 'DIO e Santander', situacao: 'Certificado' },
  { nivel: 'Curso livre', curso: 'Formação Full Stack', instituicao: 'DevMedia', situacao: 'Certificado' },
  { nivel: 'Curso livre', curso: 'Formação em Python', instituicao: 'Curso em Vídeo', situacao: 'Certificado' },
  { nivel: 'Curso livre', curso: 'Formação em JavaScript', instituicao: 'Curso em Vídeo', situacao: 'Certificado' },
  { nivel: 'Curso livre', curso: 'Git e GitHub', instituicao: 'Curso em Vídeo', situacao: 'Certificado' },
].map((f, i) => ({ id: i + 1, ...f }))

// Dados sujos de exemplo usados no hero: nomes de fornecedores digitados de várias formas (inventados só para a demonstração).
export const comprasRaw = [
  ['NORTEC ', 'R$ 1.250,00', '2026-03-04'],
  ['nortec', '980,50', '04/03/2026'],
  ['Nortec', '300', '2026-13-45'],
  ['INFOPLUS  ', 'R$ 430,00', '2026-03-09'],
  ['infoplus', '1.200,00', ''],
  ['cabolar', 'R$ 2.100,00', '2026-03-11'],
  [' CABOLAR', '150,75', '2026-03-11'],
  ['datafix', null, '2026-03-12'],
  ['Redefix', 'R$ 89,90', '2026-03-12'],
  ['Tonerix', '540', '2026-03-13'],
]
