import Secao from './Secao'
import { personal } from '../data/personal'
import { publico } from '../lib/publico'

const etapas = [
  { titulo: 'WinThor (Oracle)', texto: 'Onde os produtos moram' },
  { titulo: 'Python e cx_Oracle', texto: 'Consulta e exporta' },
  { titulo: 'JSON estático', texto: 'Um arquivo, sem backend' },
  { titulo: 'Catálogo em React', texto: 'Publicado no GitHub Pages' },
]

function Seta() {
  return (
    <li aria-hidden="true" className="flex items-center justify-center py-1 text-cobalto md:px-2 md:py-0">
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.2" className="rotate-90 md:rotate-0">
        <path d="M3 12h17M14 6l6 6-6 6" strokeLinecap="square" />
      </svg>
    </li>
  )
}

export default function Sobre() {
  return (
    <Secao id="sobre" titulo="Sobre" descricao="Quem constrói e mantém os sistemas da Binário.">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="max-w-[58ch] space-y-5 text-xl leading-relaxed">
          <p>
            Sou o desenvolvedor interno da Binário Tecnologia, uma distribuidora em Varginha, MG. Desde 2024
            construo os sistemas que os setores usam todo dia e os scripts que tiram dados do ERP WinThor,
            organizam e entregam num formato que alguém consegue usar.
          </p>
          <p>
            Quero seguir carreira em engenharia de dados. O que me atrai é o trabalho que já faço: pegar dado
            bagunçado, com nome escrito de três jeitos, data inválida e acento quebrado, padronizar e fazer
            chegar certo ao destino. Me formei em Análise e Desenvolvimento de Sistemas em 2026 e estou
            aberto a novas oportunidades.
          </p>
        </div>

        <div className="w-full max-w-[15rem] self-start bg-cobalto-claro">
          <img
            src={publico(personal.photo)}
            alt="Retrato de Guilherme Oliveira Santana"
            className="aspect-square w-full object-cover object-top mix-blend-multiply grayscale contrast-125"
          />
        </div>
      </div>

      <figure className="mt-16">
        <ol className="grid items-stretch md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]">
          {etapas.flatMap((e, i) => [
            i > 0 && <Seta key={`seta-${i}`} />,
            <li key={e.titulo} className="border border-linha bg-white p-4">
              <p className="text-lg font-bold leading-tight">{e.titulo}</p>
              <p className="mt-1 text-base text-tinta/70">{e.texto}</p>
            </li>,
          ])}
        </ol>
        <figcaption className="mt-3 text-base text-tinta/70">
          O caminho do dado no catálogo de produtos, um dos meus pipelines.
        </figcaption>
      </figure>
    </Secao>
  )
}
