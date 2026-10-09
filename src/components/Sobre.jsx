import { useState } from 'react'
import Secao from './Secao'
import CelulaSql from './CelulaSql'
import FotoPixelada from './FotoPixelada'
import { personal } from '../data/personal'
import { publico } from '../lib/publico'
import { SQL_SOBRE, COLUNAS_SOBRE, sobreInicial } from '../lib/consultas'

const etapas = [
  { titulo: 'WinThor (Oracle)', texto: 'Onde os produtos moram' },
  { titulo: 'Python e cx_Oracle', texto: 'Consulta e exporta' },
  { titulo: 'JSON estático', texto: 'Um arquivo, sem backend' },
  { titulo: 'Catálogo em React', texto: 'Publicado no GitHub Pages' },
]

function Seta() {
  return (
    <li aria-hidden="true" className="flex items-center justify-center py-1 text-azul md:px-2 md:py-0">
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.2" className="rotate-90 md:rotate-0">
        <path d="M3 12h17M14 6l6 6-6 6" strokeLinecap="square" />
      </svg>
    </li>
  )
}

function SobreVisual({ resultado }) {
  const r = resultado.linhas[0]
  if (!r) return <p className="px-4 py-6 text-lg">A tabela perfil não devolveu nenhuma linha.</p>
  const paragrafos = String(r.resumo ?? '').split('\n\n')

  return (
    <div className="grid gap-8 p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_14rem]">
      <div>
        <div className="max-w-[58ch] space-y-5 text-xl leading-relaxed">
          {paragrafos.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <dl className="mt-8 grid border-l border-t border-linha text-lg sm:grid-cols-3">
          {[
            ['Cargo', `${r.cargo}, ${r.empresa}`],
            ['Cidade', r.cidade],
            ['Foco', r.foco],
          ].map(([rotulo, valor]) => (
            <div key={rotulo} className="border-b border-r border-linha px-4 py-3">
              <dt className="text-sm font-semibold text-tinta/60">{rotulo}</dt>
              <dd className="mt-0.5 font-semibold">{valor}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="w-full max-w-[14rem] self-start border-2 border-borda bg-cobalto-claro p-1.5 shadow-janela">
        <FotoPixelada src={publico(personal.photo)} alt={`Retrato de ${r.nome}`} />
      </div>
    </div>
  )
}

export default function Sobre() {
  const [sql, setSql] = useState(SQL_SOBRE)

  return (
    <Secao
      id="sobre"
      titulo="Sobre"
      descricao="Cada bloco desta página é uma consulta SQL de verdade. Edite o código e execute."
    >
      <CelulaSql
        arquivo="sobre.sql"
        rotulo="Consulta SQL da seção Sobre"
        sql={sql}
        onSql={setSql}
        inicial={sobreInicial()}
        requer={COLUNAS_SOBRE}
        Visual={SobreVisual}
        minLinhas={2}
      />

      <figure className="mt-14">
        <ol className="grid items-stretch md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]">
          {etapas.flatMap((e, i) => [
            i > 0 && <Seta key={`seta-${i}`} />,
            <li key={e.titulo} className="border border-linha bg-superficie p-4">
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
