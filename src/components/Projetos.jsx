import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Secao from './Secao'
import { projects } from '../data/projects'
import { publico } from '../lib/publico'

function Seta() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" aria-label="vira" role="img" className="mx-1 inline-block align-[-2px] text-cobalto">
      <path d="M3 12h17M14 6l6 6-6 6" strokeLinecap="square" />
    </svg>
  )
}

function Indicador({ aberto }) {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.2" className="text-cobalto">
      <path d="M3 10h14" strokeLinecap="square" />
      {!aberto && <path d="M10 3v14" strokeLinecap="square" />}
    </svg>
  )
}

export default function Projetos() {
  const [aberto, setAberto] = useState(null)

  return (
    <Secao
      id="projetos"
      titulo="Projetos"
      descricao="Sistemas e automações do trabalho e dos estudos. Abra uma linha para ver os detalhes."
    >
      <div className="border-y-2 border-tinta">
        <div className="hidden grid-cols-[1.4fr_1.2fr_1fr_1.25rem] gap-6 border-b border-linha px-4 py-3 text-sm font-semibold text-tinta/65 md:grid">
          <span>Projeto</span>
          <span>Do dado ao resultado</span>
          <span>Stack</span>
          <span />
        </div>

        <ul>
          {projects.map((p) => {
            const ativo = aberto === p.id
            const resumo = p.tech.slice(0, 3).join(', ') + (p.tech.length > 3 ? ` e mais ${p.tech.length - 3}` : '')
            return (
              <li key={p.id} className={'border-b border-linha last:border-b-0 ' + (ativo ? 'bg-cobalto-claro/60' : '')}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={ativo}
                    aria-controls={`painel-${p.id}`}
                    onClick={() => setAberto(ativo ? null : p.id)}
                    className={
                      'grid w-full gap-2 border-l-4 px-4 py-5 text-left hover:bg-cobalto-claro/60 md:grid-cols-[1.4fr_1.2fr_1fr_1.25rem] md:items-start md:gap-6 ' +
                      (ativo ? 'border-cobalto' : 'border-transparent')
                    }
                  >
                    <span>
                      <span className="block text-xl font-bold leading-tight">{p.title}</span>
                      <span className="mt-1 block text-base font-normal text-tinta/70">{p.description}</span>
                    </span>
                    <span className="text-base font-normal">
                      {p.origem}
                      <Seta />
                      {p.destino}
                    </span>
                    <span className="text-base font-normal text-tinta/80">{resumo}</span>
                    <span className="hidden md:block">
                      <Indicador aberto={ativo} />
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {ativo && (
                    <motion.div
                      id={`painel-${p.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-6 border-l-4 border-cobalto px-4 pb-6 pt-1 lg:grid-cols-[minmax(0,1fr)_18rem]">
                        <div>
                          <p className="max-w-[60ch] text-lg leading-relaxed">{p.longDescription}</p>
                          <ul className="mt-4 flex flex-wrap gap-2">
                            {p.tech.map((t) => (
                              <li key={t} className="border border-tinta/30 bg-papel px-2 py-0.5 text-base">
                                {t}
                              </li>
                            ))}
                          </ul>
                          <a
                            href={p.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-5 inline-block text-lg font-bold text-cobalto underline underline-offset-4 hover:text-tinta"
                          >
                            Ver código no GitHub
                          </a>
                        </div>
                        <img
                          src={publico(p.image)}
                          alt={`Captura de tela do projeto ${p.title}`}
                          loading="lazy"
                          className="w-full border border-linha bg-white"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            )
          })}
        </ul>
      </div>
    </Secao>
  )
}
