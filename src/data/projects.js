// "origem" e "destino" contam o caminho do dado em cada projeto.
export const projects = [
  {
    id: 'catalogo-winthor',
    title: "Catálogo de produtos WinThor",
    description: "Exporta os produtos do ERP WinThor (Oracle) para um catálogo web em React.",
    longDescription:
      "Um script Python consulta o banco Oracle com cx_Oracle e exporta tudo para um JSON estático. O frontend em React lê esse arquivo e mostra os produtos numa grade, no estilo Netflix. O catálogo é publicado no GitHub Pages e gerou vendas diretas, com elogios de clientes pela facilidade de consulta.",
    origem: "WinThor (Oracle)",
    destino: "Catálogo web em React",
    tech: ["Python", "Oracle", "cx_Oracle", "JSON", "React", "GitHub Pages"],
    github: "https://github.com/Guii15",
    image: "projeto-catalogo.png",
  },
  {
    id: 'extrator-selenium',
    title: "Extrator de dados de portais web",
    description: "Faz login sozinho num portal, varre os produtos e gera relatórios em Excel.",
    longDescription:
      "Faz login automático no portal, percorre as listas de produtos coletando códigos e descrições e gera relatórios formatados em .xlsx para análise de estoque.",
    origem: "Portal web de produtos",
    destino: "Planilha .xlsx",
    tech: ["Python", "Selenium", "JavaScript", "openpyxl"],
    github: "https://github.com/Guii15/Extrator-selenium",
    image: "Extrator selenium.png",
  },
  {
    id: 'fotos-catalogo',
    title: "Automação de fotos de catálogo",
    description: "Coloca fotos de produtos no papel timbrado oficial dos catálogos WinThor.",
    longDescription:
      "Percorre uma pasta de fotos, redimensiona cada imagem na proporção certa para não cobrir as bordas do timbrado e centraliza o produto automaticamente.",
    origem: "Pasta de fotos",
    destino: "Fotos no papel timbrado",
    tech: ["Python", "Pillow"],
    github: "https://github.com/Guii15/Fotos-Python",
    image: "Automação catalogo.png",
  },
  {
    id: 'requisicao-compras',
    title: "Sistema de requisição de compras",
    description: "Sistema web em produção, com fluxo de aprovação e aviso por e-mail.",
    longDescription:
      "Aplicação completa com login, painel administrativo, controle de status e notificações por e-mail. Já processou mais de 300 requisições e foi elogiada internamente pela organização e pela economia gerada.",
    origem: "Pedidos dos setores",
    destino: "Aprovação e aviso por e-mail",
    tech: ["Laravel 12", "PHP 8.4", "SQLite", "Tailwind CSS", "Alpine.js"],
    github: "https://github.com/Guii15/Requisicao-compras",
    image: "Requisição de compras.png",
  },
  {
    id: 'rastreacarga',
    title: "RastreaCarga",
    description: "Rastreamento de entregas feitas pelos motoristas da própria empresa.",
    longDescription:
      "Funciona como um mini-Correios: o líder de estoque cria as rotas, o motorista atualiza a posição pelo celular e o cliente acompanha a entrega com um código.",
    origem: "Rotas criadas pelo estoque",
    destino: "Rastreio do cliente por código",
    tech: ["Python", "Flask", "SQLite", "HTML", "CSS"],
    github: "https://github.com/Guii15/Rastreamento-de-cargas-Binario",
    image: "Rastreamento de cargas.png",
  },
  {
    id: 'roleta',
    title: "Jogo da roleta",
    description: "Projeto de estudo que liga um backend em Flask a uma roleta animada em JavaScript.",
    longDescription:
      "Feito para praticar lógica de programação e a integração entre web e backend. A roleta é animada no navegador e o servidor Flask processa os resultados.",
    origem: "Giro da roleta",
    destino: "Resultado calculado no servidor",
    tech: ["Python", "Flask", "JavaScript", "HTML5", "CSS3"],
    github: "https://github.com/Guii15/Jogo-Roleta",
    image: "Jogo Roleta.png",
  },
]
