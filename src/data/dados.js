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
  ['PostgreSQL', 'Dados'],
  ['SQLite', 'Dados'],
  ['cx_Oracle', 'Dados'],
  ['Selenium', 'Dados'],
  ['openpyxl', 'Dados'],
  ['Pillow', 'Dados'],
  ['JSON', 'Dados'],
  ['Flask', 'Aplicações'],
  ['Laravel', 'Aplicações'],
  ['PHP', 'Aplicações'],
  ['React', 'Aplicações'],
  ['JavaScript', 'Aplicações'],
  ['Alpine.js', 'Aplicações'],
  ['Tailwind CSS', 'Aplicações'],
  ['HTML', 'Aplicações'],
  ['CSS', 'Aplicações'],
  ['Git', 'Ferramentas'],
  ['GitHub', 'Ferramentas'],
  ['GitHub Pages', 'Ferramentas'],
  ['VS Code', 'Ferramentas'],
].map(([nome, grupo], i) => ({ id: i + 1, nome, grupo }))

const idTec = (nome) => tecnologias.find((t) => t.nome === nome).id

export const projetos = [
  {
    id: 1,
    slug: 'catalogo-winthor',
    nome: 'Catálogo de produtos WinThor',
    descricao: 'Exporta os produtos do ERP WinThor (Oracle) para um catálogo web em React.',
    detalhe:
      'Um script Python consulta o banco Oracle com cx_Oracle e exporta tudo para um JSON estático. O frontend em React lê esse arquivo e mostra os produtos numa grade, no estilo Netflix. O catálogo é publicado no GitHub Pages e gerou vendas diretas, com elogios de clientes pela facilidade de consulta.',
    origem: 'WinThor (Oracle)',
    destino: 'Catálogo web em React',
    github: 'https://github.com/Guii15',
    imagem: 'projeto-catalogo.png',
    categoria: 'dados',
    tech: ['Python', 'Oracle SQL', 'cx_Oracle', 'JSON', 'React', 'GitHub Pages'],
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
    tech: ['Python', 'Selenium', 'JavaScript', 'openpyxl'],
  },
  {
    id: 3,
    slug: 'fotos-catalogo',
    nome: 'Automação de fotos de catálogo',
    descricao: 'Coloca fotos de produtos no papel timbrado oficial dos catálogos WinThor.',
    detalhe:
      'Percorre uma pasta de fotos, redimensiona cada imagem na proporção certa para não cobrir as bordas do timbrado e centraliza o produto automaticamente.',
    origem: 'Pasta de fotos',
    destino: 'Fotos no papel timbrado',
    github: 'https://github.com/Guii15/Fotos-Python',
    imagem: 'Automação catalogo.png',
    categoria: 'dados',
    tech: ['Python', 'Pillow'],
  },
  {
    id: 4,
    slug: 'requisicao-compras',
    nome: 'Sistema de requisição de compras',
    descricao: 'Sistema web em produção, com fluxo de aprovação e aviso por e-mail.',
    detalhe:
      'Aplicação completa com login, painel administrativo, controle de status e notificações por e-mail. Já processou mais de 300 requisições e foi elogiada internamente pela organização e pela economia gerada.',
    origem: 'Pedidos dos setores',
    destino: 'Aprovação e aviso por e-mail',
    github: 'https://github.com/Guii15/Requisicao-compras',
    imagem: 'Requisição de compras.png',
    categoria: 'aplicação',
    tech: ['Laravel', 'PHP', 'SQLite', 'Tailwind CSS', 'Alpine.js'],
  },
  {
    id: 5,
    slug: 'rastreacarga',
    nome: 'RastreaCarga',
    descricao: 'Rastreamento de entregas feitas pelos motoristas da própria empresa.',
    detalhe:
      'Funciona como um mini-Correios: o líder de estoque cria as rotas, o motorista atualiza a posição pelo celular e o cliente acompanha a entrega com um código.',
    origem: 'Rotas criadas pelo estoque',
    destino: 'Rastreio do cliente por código',
    github: 'https://github.com/Guii15/Rastreamento-de-cargas-Binario',
    imagem: 'Rastreamento de cargas.png',
    categoria: 'aplicação',
    tech: ['Python', 'Flask', 'SQLite', 'HTML', 'CSS'],
  },
  {
    id: 6,
    slug: 'roleta',
    nome: 'Jogo da roleta',
    descricao: 'Projeto de estudo que liga um backend em Flask a uma roleta animada em JavaScript.',
    detalhe:
      'Feito para praticar lógica de programação e a integração entre web e backend. A roleta é animada no navegador e o servidor Flask processa os resultados.',
    origem: 'Giro da roleta',
    destino: 'Resultado calculado no servidor',
    github: 'https://github.com/Guii15/Jogo-Roleta',
    imagem: 'Jogo Roleta.png',
    categoria: 'aplicação',
    tech: ['Python', 'Flask', 'JavaScript', 'HTML', 'CSS'],
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

// Dados sujos de exemplo usados no hero (inventados só para a demonstração).
export const vendasRaw = [
  ['JOYCE ', 'R$ 1.250,00', '2026-03-04'],
  ['joyce', '980,50', '04/03/2026'],
  ['Joyce', '300', '2026-13-45'],
  ['MARCOS  ', 'R$ 430,00', '2026-03-09'],
  ['marcos', '1.200,00', ''],
  ['ana', 'R$ 2.100,00', '2026-03-11'],
  [' ANA', '150,75', '2026-03-11'],
  ['carlos', null, '2026-03-12'],
  ['Beatriz', 'R$ 89,90', '2026-03-12'],
  ['Pedro', '540', '2026-03-13'],
]
