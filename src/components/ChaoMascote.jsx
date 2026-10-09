import { useEffect, useRef, useState } from 'react'
import Mascote from './Mascote'
import { podeAnimar } from '../lib/movimento'

const FALAS = [
  'SELECT * FROM voce;',
  'Clique no console!',
  'JOIN é abraço de tabela.',
  'NULL não é zero.',
  'Já limpou seus dados hoje?',
]

// O Bit passeia sozinho pelo chão de blocos, dorme se ninguém mexe e vem até o cursor.
export default function ChaoMascote({ ativo = true }) {
  const area = useRef(null)
  const [e, setE] = useState({ x: 82, estado: 'parado', espelhado: true, dur: 0 })
  const [fala, setFala] = useState(null)
  const movimento = podeAnimar()
  const xAtual = useRef(82)
  const timers = useRef([])
  const proximoPasseio = useRef(null)

  useEffect(() => {
    if (!movimento || !ativo) return
    let vivo = true
    let paradas = 0
    const limpar = () => {
      timers.current.forEach(clearTimeout)
      timers.current = []
    }
    const agendar = (fn, ms) => {
      timers.current.push(setTimeout(() => vivo && fn(), ms))
    }

    const irPara = (alvo, depois) => {
      const dist = Math.abs(alvo - xAtual.current)
      const dur = Math.max(400, dist * 55)
      setE({ x: alvo, estado: 'andando', espelhado: alvo < xAtual.current, dur })
      xAtual.current = alvo
      agendar(() => {
        setE((a) => ({ ...a, estado: 'parado', dur: 0 }))
        depois?.()
      }, dur)
    }

    const passear = () => {
      paradas += 1
      if (paradas % 3 === 0) {
        setE((a) => ({ ...a, estado: 'dormindo' }))
        agendar(passear, 6500)
        return
      }
      agendar(() => irPara(4 + Math.random() * 88, passear), 1200 + Math.random() * 1800)
    }
    proximoPasseio.current = () => {
      limpar()
      passear()
    }
    agendar(passear, 2500)
    return () => {
      vivo = false
      limpar()
    }
  }, [movimento, ativo])

  // Quando o cursor passa pela área do hero, o Bit vem na direção dele.
  useEffect(() => {
    if (!movimento || !ativo) return
    let ultimo = 0
    const aoMover = (ev) => {
      const el = area.current
      if (!el) return
      const r = el.parentElement.getBoundingClientRect()
      if (ev.clientY < r.top || ev.clientY > r.bottom) return
      const agora = performance.now()
      if (agora - ultimo < 700) return
      ultimo = agora
      const alvo = Math.min(94, Math.max(3, ((ev.clientX - r.left) / r.width) * 100))
      if (Math.abs(alvo - xAtual.current) < 10) return
      timers.current.forEach(clearTimeout)
      timers.current = []
      const dist = Math.abs(alvo - xAtual.current)
      const dur = Math.max(400, dist * 45)
      setE({ x: alvo, estado: 'andando', espelhado: alvo < xAtual.current, dur })
      xAtual.current = alvo
      timers.current.push(
        setTimeout(() => {
          setE((a) => ({ ...a, estado: 'parado', dur: 0 }))
          proximoPasseio.current?.()
        }, dur),
      )
    }
    window.addEventListener('pointermove', aoMover, { passive: true })
    return () => window.removeEventListener('pointermove', aoMover)
  }, [movimento, ativo])

  const falar = () => {
    setFala(FALAS[Math.floor(Math.random() * FALAS.length)])
    setTimeout(() => setFala(null), 2600)
  }

  return (
    <div ref={area} className="relative h-24" aria-hidden="false">
      <div
        className="absolute bottom-[10px] -translate-x-1/2"
        style={{ left: `${e.x}%`, transition: e.dur ? `left ${e.dur}ms linear` : 'none' }}
      >
        {e.estado === 'dormindo' && (
          <p className="absolute -top-6 left-6 whitespace-nowrap font-display text-[0.65rem] text-azul">
            <span className="cursor-piscando">Z</span>z<span className="cursor-piscando">z</span>
          </p>
        )}
        {fala && (
          <p
            role="status"
            className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap border-2 border-borda bg-tinta px-2 py-1 font-display text-[0.65rem] text-preto"
          >
            {fala}
          </p>
        )}
        <button type="button" onClick={falar} aria-label="Conversar com o Bit, o mascote do site" className="block">
          <Mascote estado={e.estado} espelhado={e.espelhado} escala={4} />
        </button>
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[10px]"
        style={{
          backgroundImage: 'linear-gradient(to right, #c9cfdc 0 44px, transparent 44px 48px)',
          backgroundSize: '48px 6px',
          backgroundRepeat: 'repeat-x',
          backgroundPosition: '0 0',
        }}
      />
    </div>
  )
}
