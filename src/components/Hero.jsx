import { useState } from 'react'
import { personal } from '../data/personal'
import { publico } from '../lib/publico'
import { useLimpeza } from '../hooks/useLimpeza'
import TextoLimpo from './TextoLimpo'
import EtlJanela from './EtlJanela'

const [nome1, nome2, nome3] = personal.name.split(' ')

function HeroCorpo({ onRepetir }) {
  const [fase, setFase] = useState('inicio') // 'inicio' | 'sujo' | 'limpando' | 'limpo'
  const p = useLimpeza({ ativo: fase === 'limpando' || fase === 'limpo', duracao: 1800 })

  // Antes de a consulta de limpeza rodar, o texto fica sujo (p = 0).
  return (
    <section id="topo" className="sobre-cobalto grade-celulas bg-cobalto text-white">
      <div className="mx-auto grid min-h-[calc(100svh-3.5rem)] max-w-6xl items-center gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] lg:gap-10">
        <div>
          <h1
            aria-label={personal.name}
            className="text-[clamp(2.7rem,7.4vw,5.6rem)] font-extrabold leading-[0.95] tracking-[-0.03em]"
          >
            <span className="block"><TextoLimpo texto={nome1} p={p} de={0} ate={0.6} seed={11} /></span>
            <span className="block"><TextoLimpo texto={nome2} p={p} de={0.08} ate={0.75} seed={23} /></span>
            <span className="block"><TextoLimpo texto={nome3} p={p} de={0.16} ate={0.9} seed={5} /></span>
          </h1>

          <p className="mt-7 text-2xl font-bold tracking-tight sm:text-3xl">
            <TextoLimpo texto="Engenharia de dados com Python e SQL" p={p} de={0.3} ate={1} seed={8} />
          </p>

          <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/85">
            Transformo dados de ERP em informação confiável: extraio do WinThor, organizo com Python e SQL e
            entrego onde as pessoas precisam.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#projetos" className="bg-marca px-6 py-3 text-base font-bold text-tinta hover:bg-white">
              Ver projetos
            </a>
            <a
              href="#console"
              className="px-6 py-3 text-base font-bold text-white ring-2 ring-white hover:bg-white hover:text-cobalto"
            >
              Consultar o banco
            </a>
            <a
              href={publico(personal.cv)}
              download
              className="px-2 py-3 text-base font-bold text-white underline underline-offset-4 hover:text-marca"
            >
              Baixar CV
            </a>
          </div>

          <p className="mt-6 text-base text-white/80">{personal.location}. Disponível para oportunidades.</p>
        </div>

        <div>
          <EtlJanela onFase={setFase} onRepetir={onRepetir} />
          <p className="mt-5 max-w-lg text-base text-white/80">
            Dados de exemplo. A consulta roda de verdade, em SQLite, dentro do seu navegador. Dá para editar e
            executar de novo.
          </p>
        </div>
      </div>
    </section>
  )
}

export default function Hero() {
  const [rodada, setRodada] = useState(0)
  return <HeroCorpo key={rodada} onRepetir={() => setRodada((r) => r + 1)} />
}
