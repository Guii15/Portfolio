import { useState } from 'react'
import { personal } from '../data/personal'
import { publico } from '../lib/publico'
import { useLimpeza } from '../hooks/useLimpeza'
import TextoLimpo from './TextoLimpo'
import EtlJanela from './EtlJanela'
import ChaoMascote from './ChaoMascote'
import { useIntro } from '../hooks/contextoIntro'

const [nome1, nome2, nome3] = personal.name.split(' ')

function HeroCorpo({ onRepetir }) {
  const [fase, setFase] = useState('inicio') // 'inicio' | 'sujo' | 'limpando' | 'limpo'
  const { pronta } = useIntro()
  const p = useLimpeza({ ativo: fase === 'limpando' || fase === 'limpo', duracao: 1800 })

  // Antes de a consulta de limpeza rodar, o texto fica sujo (p = 0).
  return (
    <section id="topo" className="relative overflow-hidden">
      <div className="mx-auto grid min-h-[calc(100svh-3.5rem-7rem)] max-w-6xl items-center gap-12 px-5 py-8 sm:px-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] lg:gap-10">
        <div>
          <h1
            aria-label={personal.name}
            className="text-[clamp(1.9rem,5vw,4.1rem)] font-bold leading-[1.08]"
          >
            <span className="block"><TextoLimpo texto={nome1} p={p} de={0} ate={0.6} seed={11} /></span>
            <span className="block"><TextoLimpo texto={nome2} p={p} de={0.08} ate={0.75} seed={23} /></span>
            <span className="block"><TextoLimpo texto={nome3} p={p} de={0.16} ate={0.9} seed={5} /></span>
          </h1>

          <p className="mt-7 text-2xl font-bold sm:text-3xl">
            <TextoLimpo texto="Engenharia de dados com Python e SQL" p={p} de={0.3} ate={1} seed={8} />
          </p>

          <p className="mt-4 max-w-xl text-lg leading-relaxed text-tinta/85">
            Transformo dados de ERP em informação confiável: extraio do WinThor, organizo com Python e SQL e
            entrego onde as pessoas precisam.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#projetos" className="botao-pixel bg-marca text-preto">
              Ver projetos
            </a>
            <a
              href="#console"
              className="botao-pixel bg-superficie text-white"
            >
              Consultar o banco
            </a>
            <a
              href={publico(personal.cv)}
              download
              className="px-2 py-3 text-base font-bold text-azul underline underline-offset-4 hover:text-marca"
            >
              Baixar CV
            </a>
          </div>

          <p className="mt-6 font-mono text-sm text-verde">
            &gt; {personal.location}. Disponível para oportunidades<span className="cursor-piscando">_</span>
          </p>
        </div>

        <div>
          <EtlJanela onFase={setFase} onRepetir={onRepetir} />
          <p className="mt-5 max-w-lg text-base text-tinta/80">
            Fornecedores inventados, escritos de vários jeitos: o mesmo problema que resolvo nos sistemas de compras.
            A consulta roda de verdade, em SQLite, dentro do seu navegador. Dá para editar e executar de novo.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <ChaoMascote ativo={pronta} />
      </div>
    </section>
  )
}

export default function Hero() {
  const [rodada, setRodada] = useState(0)
  return <HeroCorpo key={rodada} onRepetir={() => setRodada((r) => r + 1)} />
}
