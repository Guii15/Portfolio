import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Secao from './Secao'
import CelulaSql from './CelulaSql'
import { publico } from '../lib/publico'
import { COLUNAS_PROJETOS, projetosInicial, sqlProjetos, tecnologiasDeFiltro } from '../lib/consultas'

const filtros = tecnologiasDeFiltro()

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

function ProjetosVisual({ resultado, aoLimpar }) {
  const [aberto, setAberto] = useState(null)

  if (!resultado.linhas.length) {
    return (
      <div className="px-4 py-8">
        <p className="text-lg font-bold">Nenhum projeto encontrado.</p>
        <p className="mt-1 text-base text-tinta/70">Essa combinação de busca e tecnologia não devolveu nenhuma linha.</p>
        <button type="button" onClick={aoLimpar} className="mt-3 text-lg font-bold text-cobalto underline underline-offset-4 hover:text-tinta">
          Limpar filtros
        </button>
      </div>
    )
  }

  return (
    <ul>
      {resultado.linhas.map((p) => {
        const ativo = aberto === p.id
        const techs = String(p.stack ?? '').split(', ')
        const resumo = techs.slice(0, 3).join(', ') + (techs.length > 3 ? ` e mais ${techs.length - 3}` : '')
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
                  <span className="block text-xl font-bold leading-tight">{p.nome}</span>
                  <span className="mt-1 block text-base font-normal text-tinta/70">{p.descricao}</span>
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
                  <div className="grid gap-6 border-l-4 border-cobalto px-4 pb-6 pt-1 lg:grid-cols-[minmax(0,1fr)_16rem]">
                    <div>
                      <p className="max-w-[60ch] text-lg leading-relaxed">{p.detalhe}</p>
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {techs.map((t) => (
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
                      src={publico(p.imagem)}
                      alt={`Captura de tela do projeto ${p.nome}`}
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
  )
}

export default function Projetos() {
  const [tech, setTech] = useState(null)
  const [busca, setBusca] = useState('')
  const [sql, setSql] = useState(sqlProjetos())
  const [versao, setVersao] = useState(0)
  const [manual, setManual] = useState(false)

  const aplicar = (novo) => {
    setSql(sqlProjetos(novo))
    setVersao((v) => v + 1)
    setManual(false)
  }
  const escolherTech = (nome) => {
    const novo = tech === nome ? null : nome
    setTech(novo)
    aplicar({ tech: novo, busca })
  }
  const digitarBusca = (valor) => {
    setBusca(valor)
    aplicar({ tech, busca: valor })
  }
  const limpar = () => {
    setTech(null)
    setBusca('')
    aplicar({})
  }

  const barra = (
    <div className="space-y-3 border-b border-linha bg-papel px-3 py-3">
      <label className="flex items-center gap-3">
        <span className="text-sm font-semibold">Buscar</span>
        <input
          type="search"
          value={busca}
          onChange={(e) => digitarBusca(e.target.value)}
          placeholder="catálogo, estoque, roleta…"
          className="min-w-0 flex-1 border border-tinta/40 bg-white px-2.5 py-1.5 text-base placeholder:text-tinta/45"
        />
      </label>
      <div role="group" aria-label="Filtrar por tecnologia" className="flex flex-wrap gap-2">
        {filtros.map((f) => (
          <button
            key={f.nome}
            type="button"
            aria-pressed={tech === f.nome}
            onClick={() => escolherTech(f.nome)}
            className={
              'flex items-center gap-1.5 border px-2.5 py-1 text-sm font-semibold ' +
              (tech === f.nome ? 'border-cobalto bg-cobalto text-white' : 'border-tinta/40 bg-white hover:bg-cobalto-claro')
            }
          >
            {f.nome}
            <span className={'numeros-tabulares font-normal ' + (tech === f.nome ? 'text-white/80' : 'text-tinta/55')}>{f.projetos}</span>
          </button>
        ))}
      </div>
      <p className="text-sm text-tinta/70">
        {manual
          ? 'Você editou a consulta à mão, então a busca e os filtros acima não se aplicam a ela.'
          : 'A busca e os filtros reescrevem a consulta abaixo e executam na hora.'}
      </p>
    </div>
  )

  return (
    <Secao
      id="projetos"
      titulo="Projetos"
      descricao="Sistemas e automações do trabalho e dos estudos. Filtre, ou edite o SQL e pergunte do seu jeito."
    >
      <CelulaSql
        arquivo="projetos.sql"
        rotulo="Consulta SQL da seção Projetos"
        sql={sql}
        onSql={(texto) => {
          setSql(texto)
          setManual(true)
        }}
        versao={versao}
        inicial={projetosInicial()}
        requer={COLUNAS_PROJETOS}
        Visual={ProjetosVisual}
        visualProps={{ aoLimpar: limpar }}
        barra={barra}
        minLinhas={8}
      />
    </Secao>
  )
}
