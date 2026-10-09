import { useState } from 'react'
import { personal } from '../data/personal'
import { publico } from '../lib/publico'
import { useLimpeza } from '../hooks/useLimpeza'
import TextoLimpo from './TextoLimpo'

const regras = [
  { regra: 'Nomes duplicados unificados', antes: 'JOYCE / Joyce', depois: 'Joyce', quando: 0.3 },
  { regra: 'Datas inválidas viram nulo', antes: '2026-13-45', depois: 'NULL', quando: 0.55 },
  { regra: 'Encoding corrigido', antes: 'Ã§Ã£o', depois: 'ção', quando: 0.8 },
]

const [nome1, nome2, nome3] = personal.name.split(' ')

function Check() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.4">
      <path d="M3 8.5l3.2 3L13 4.5" strokeLinecap="square" />
    </svg>
  )
}

function HeroCorpo({ onRepetir }) {
  const p = useLimpeza({ duracao: 3400, atraso: 500 })
  const qualidade = Math.round(38 + 62 * (1 - (1 - p) ** 2))
  const pronto = p >= 1

  return (
    <section id="topo" className="sobre-cobalto grade-celulas bg-cobalto text-white">
      <div className="mx-auto grid min-h-[calc(100svh-3.5rem)] max-w-6xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.2fr_1fr] lg:gap-10">
        <div>
          <h1
            aria-label={personal.name}
            className="text-[clamp(2.9rem,9vw,6.75rem)] font-extrabold leading-[0.95] tracking-[-0.03em]"
          >
            <span className="block"><TextoLimpo texto={nome1} p={p} de={0.04} ate={0.5} seed={11} /></span>
            <span className="block"><TextoLimpo texto={nome2} p={p} de={0.1} ate={0.6} seed={23} /></span>
            <span className="block"><TextoLimpo texto={nome3} p={p} de={0.16} ate={0.72} seed={5} /></span>
          </h1>

          <p className="mt-8 text-2xl font-bold tracking-tight sm:text-3xl">
            <TextoLimpo texto="Engenharia de dados com Python e SQL" p={p} de={0.4} ate={0.95} seed={8} />
          </p>

          <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/85">
            Transformo dados de ERP em informação confiável: extraio do WinThor, organizo com Python e
            entrego onde as pessoas precisam.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projetos"
              className="bg-marca px-6 py-3 text-base font-bold text-tinta hover:bg-white"
            >
              Ver projetos
            </a>
            <a
              href={publico(personal.cv)}
              download
              className="px-6 py-3 text-base font-bold text-white ring-2 ring-white hover:bg-white hover:text-cobalto"
            >
              Baixar CV
            </a>
          </div>

          <p className="mt-6 text-base text-white/80">
            {personal.location}. Disponível para oportunidades.
          </p>
        </div>

        <aside
          aria-label="Relatório de qualidade dos dados deste cabeçalho"
          className="border border-white/40 bg-cobalto-escuro/80"
        >
          <div className="flex items-end justify-between gap-4 p-5">
            <div>
              <p className="text-lg font-bold">Qualidade dos dados</p>
              <p className="text-sm text-white/70">{pronto ? 'Nenhum problema encontrado' : 'Limpando as linhas'}</p>
            </div>
            <p className="numeros-tabulares font-mono text-5xl font-medium leading-none">{qualidade}%</p>
          </div>

          <div className="mx-5 mb-5 h-2 bg-white/20" role="presentation">
            <div className="h-full bg-marca" style={{ width: `${qualidade}%` }} />
          </div>

          <ul>
            {regras.map((r) => {
              const ok = p >= r.quando
              return (
                <li key={r.regra} className="border-t border-white/25 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold">{r.regra}</p>
                    <span
                      className={
                        'inline-flex items-center gap-1 px-2 py-0.5 text-sm font-bold ' +
                        (ok ? 'bg-white text-cobalto' : 'bg-marca text-tinta')
                      }
                    >
                      {ok && <Check />}
                      {ok ? 'Corrigido' : 'Pendente'}
                    </span>
                  </div>
                  <p className="mt-2 font-mono text-sm">
                    <span className={ok ? 'text-white/50 line-through' : 'bg-marca px-1 text-tinta'}>{r.antes}</span>
                    <span className="px-2 text-white/60">vira</span>
                    <span className={ok ? 'font-semibold text-white' : 'text-white/40'}>{r.depois}</span>
                  </p>
                </li>
              )
            })}
          </ul>

          <div className="border-t border-white/25 p-4">
            <button
              type="button"
              onClick={onRepetir}
              className="text-sm font-semibold text-white underline underline-offset-4 hover:text-marca"
            >
              Sujar e limpar de novo
            </button>
          </div>
        </aside>
      </div>
    </section>
  )
}

export default function Hero() {
  const [rodada, setRodada] = useState(0)
  return <HeroCorpo key={rodada} onRepetir={() => setRodada((r) => r + 1)} />
}
