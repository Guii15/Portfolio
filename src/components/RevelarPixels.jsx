import { useLayoutEffect, useRef, useState } from 'react'
import { dissolver, pintarCanvas, tamanhoDaCelula } from '../lib/dissolver'
import { podeAnimar } from '../lib/movimento'
import { useIntro } from '../hooks/contextoIntro'

// Cobre o conteúdo com blocos escuros e desmancha tudo em pixels quando ele entra na tela.
export default function RevelarPixels({ children, className = '' }) {
  const { pronta } = useIntro()
  const raiz = useRef(null)
  const canvas = useRef(null)
  const [feito, setFeito] = useState(() => !podeAnimar())

  useLayoutEffect(() => {
    if (feito || !pronta) return
    const el = raiz.current
    const cv = canvas.current
    if (!el || !cv) return
    let revelado = false
    let parar = () => {}

    const pintar = () => {
      const r = el.getBoundingClientRect()
      pintarCanvas(cv, r.width, r.height, '#0b0d12')
    }
    pintar()
    const ro = new ResizeObserver(() => {
      if (!revelado) pintar()
    })
    ro.observe(el)

    const io = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting || revelado) return
        revelado = true
        io.disconnect()
        ro.disconnect()
        const celula = tamanhoDaCelula(cv.width, cv.height)
        parar = dissolver(cv, { celula, duracao: 900, aoFim: () => setFeito(true) })
      },
      { threshold: 0.08, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)

    return () => {
      io.disconnect()
      ro.disconnect()
      parar()
    }
  }, [feito, pronta])

  return (
    <div ref={raiz} className={`relative ${className}`}>
      {children}
      {!feito && <canvas ref={canvas} aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 h-full w-full" />}
    </div>
  )
}
