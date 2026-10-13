import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Mascote from './Mascote'
import { useBanco } from '../hooks/contextoBanco'
import { dissolver, pintarCanvas } from '../lib/dissolver'
import { marcarIntroVista } from '../lib/movimento'

const BLOCOS = 24
const DURACAO_MIN = 2800
const MENSAGENS = [
  'abrindo o banco',
  'criando as tabelas',
  'importando os dados',
  'limpando o que estava sujo',
  'montando a página',
]

// Tela de abertura: o Bit assenta um bloco de cada vez enquanto o banco carrega de verdade.
export default function Intro({ aoTerminar }) {
  const { status } = useBanco()
  const [pct, setPct] = useState(0)
  const [saindo, setSaindo] = useState(false)
  const canvas = useRef(null)
  const botao = useRef(null)
  const statusRef = useRef(status)
  const saindoRef = useRef(false)

  useEffect(() => {
    statusRef.current = status
  }, [status])

  useEffect(() => {
    const anterior = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    botao.current?.focus()
    return () => {
      document.body.style.overflow = anterior
    }
  }, [])

  const sair = () => {
    if (saindoRef.current) return
    saindoRef.current = true
    marcarIntroVista()
    setSaindo(true)
  }

  useEffect(() => {
    let raf
    let inicio
    const passo = (agora) => {
      if (inicio === undefined) inicio = agora
      const t = agora - inicio
      const banco = statusRef.current !== 'carregando'
      // Sem o banco pronto, a barra segura em 92%. O limite de 7 s evita ficar preso.
      const alvo = Math.min(t / DURACAO_MIN, 1) * 100
      const limite = banco || t > 7000 ? 100 : 92
      const valor = Math.min(alvo, limite)
      setPct(valor)
      if (valor >= 100) {
        sair()
        return
      }
      raf = requestAnimationFrame(passo)
    }
    raf = requestAnimationFrame(passo)
    const aoTeclar = (e) => {
      if (e.key === 'Escape') sair()
    }
    window.addEventListener('keydown', aoTeclar)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('keydown', aoTeclar)
    }
  }, [])

  useLayoutEffect(() => {
    if (!saindo) return
    const cv = canvas.current
    if (!cv) return
    pintarCanvas(cv, window.innerWidth, window.innerHeight, '#0b0d12')
    const parar = dissolver(cv, { celula: 24, duracao: 800, aoFim: aoTerminar })
    return parar
  }, [saindo, aoTerminar])

  const cheios = Math.round((pct / 100) * BLOCOS)
  const mensagem = MENSAGENS[Math.min(MENSAGENS.length - 1, Math.floor((pct / 100) * MENSAGENS.length))]

  return (
    <div role="dialog" aria-label="Abertura do site" className="fixed inset-0 z-[100]">
      <div className={'absolute inset-0 bg-papel ' + (saindo ? 'opacity-0' : '')} aria-hidden={saindo} />
      <canvas ref={canvas} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" />

      {!saindo && (
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
          <div className="relative w-full max-w-md">
            <div
              className="absolute -top-24 transition-[left] duration-150 ease-linear"
              style={{ left: `calc(${(cheios / BLOCOS) * 100}% - 24px)` }}
            >
              <p className="mb-2 whitespace-nowrap border-2 border-borda bg-tinta px-2 py-1 font-display text-[0.7rem] text-preto">
                CARREGANDO {Math.round(pct)}%
              </p>
              <Mascote estado="andando" escala={4} />
            </div>

            <div className="flex gap-1" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pct)} aria-label="Carregando">
              {Array.from({ length: BLOCOS }, (_, i) => (
                <div key={i} className={'h-3 flex-1 ' + (i < cheios ? 'bg-verde' : 'bg-linha')} />
              ))}
            </div>

            <p className="mt-6 font-mono text-sm text-tinta/70">
              &gt; {mensagem}
              <span className="cursor-piscando">_</span>
            </p>
          </div>
        </div>
      )}

      {!saindo && (
        <button
          ref={botao}
          type="button"
          onClick={sair}
          className="absolute bottom-6 right-6 border-2 border-borda px-3 py-2 font-display text-[0.7rem] text-tinta/80 hover:bg-superficie2"
        >
          PULAR INTRO <span className="ml-1 border border-borda px-1">ESC</span>
        </button>
      )}
    </div>
  )
}
