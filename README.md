# Guilherme Oliveira Santana — Portfólio

> Desenvolvedor na Binário Distribuidora e Tecnologia (Varginha-MG), indo para engenharia de dados.

🌐 **[guilhermesantana.vercel.app](https://guilhermesantana.vercel.app)**

---

## O que é este site

Um portfólio em pixel art com cara de banco de dados. Todo o conteúdo (projetos, tecnologias, histórico e formação) vive num **SQLite que roda no próprio navegador** (sql.js / WebAssembly), e cada seção é desenhada a partir do resultado de uma consulta SQL.

- **Hero com ETL ao vivo:** uma tabela `compras_raw` com dados sujos de fornecedores é limpa por uma `VIEW` (`UPPER`, `TRIM`, `REPLACE`, `CAST`, `GROUP BY`) e vira um resultado consolidado.
- **Console SQL:** qualquer pessoa pode consultar o banco do site. Só leitura (`SELECT`, `WITH`, `EXPLAIN`), com comandos `\dt`, `\d tabela` e `\help`, e um mapa que acende as tabelas usadas na consulta.
- **Contato por `INSERT`:** o formulário gera um `INSERT INTO mensagens`; ao executar, a linha entra no banco e a mensagem chega por e-mail (EmailJS).
- **Animações:** intro com o mascote Bit, revelação das seções em pixels, foto que vai ganhando nitidez. Tudo respeita `prefers-reduced-motion`.

## Tecnologias do site

| | |
|---|---|
| **Base** | React 19 · Vite · Tailwind CSS v4 |
| **Dados** | sql.js (SQLite em WebAssembly) |
| **Animação** | Framer Motion · Canvas |
| **Testes** | Vitest · Testing Library · ESLint |
| **Deploy** | Vercel (CI no GitHub Actions) |

## Projetos que aparecem no site

| Projeto | Stack |
|---|---|
| Catálogo de produtos WinThor | Python · Oracle SQL · cx_Oracle · ReportLab · React |
| [Extrator de dados de portais web](https://github.com/Guii15/Extrator-selenium) | Python · Selenium · openpyxl |
| [Automação de fotos de produtos](https://github.com/Guii15/Fotos-Python) | Python · Pillow |
| Reclassificação de produtos | Python · MySQL |
| [Sistema de requisição de compras](https://github.com/Guii15/Requisicao-compras) | Laravel 12 · PHP 8.4 · SQLite · Alpine.js · Tailwind CSS |
| [Requisição de material do estoque](https://github.com/Guii15/requisicao-material) | Laravel · PHP · Alpine.js · Tailwind CSS |
| [Binário Builds](https://github.com/Guii15/binario-builds) | React · TypeScript · Tailwind CSS |

## Impacto

```
+300     requisições processadas no sistema de compras
+3.000   imagens de produtos processadas automaticamente
80%      menos tempo manual na automação de imagens
```

## Rodando localmente

```bash
npm install
npm run dev      # servidor de desenvolvimento
npm test         # testes
npm run build    # build de produção
```

## Contato

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/guilherme-oliveira-santana)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Guii15)
[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:guiiholi513@gmail.com)
