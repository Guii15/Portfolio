import { useEffect, useRef, useState } from 'react'
import { podeAnimar } from '../lib/movimento'

const PASSOS = [40, 28, 20, 14, 10, 7, 5, 3, 2]

// A foto aparece como pixel art grande e vai ganhando nitidez sozinha, passo a passo.
export default function FotoPixelada({ src, alt, className = '' }) {
  const img = useRef(null)
  const cv = useRef(null)
  const [pronta, setPronta] = useState(() => !podeAnimar())

  useEffect(() => {
    if (pronta) return
    const imagem = img.current
    const tela = cv.current
    if (!imagem || !tela) return
    let timers = []
    let io

    const desenhar = (bloco) => {
      const largura = tela.width
      const altura = tela.height
      const ctx = tela.getContext('2d')
      if (!ctx) return
      const mini = document.createElement('canvas')
      mini.width = Math.max(1, Math.ceil(largura / bloco))
      mini.height = Math.max(1, Math.ceil(altura / bloco))
      mini.getContext('2d').drawImage(imagem, 0, 0, mini.width, mini.height)
      ctx.imageSmoothingEnabled = false
      ctx.clearRect(0, 0, largura, altura)
      ctx.drawImage(mini, 0, 0, mini.width, mini.height, 0, 0, mini.width * bloco, mini.height * bloco)
    }

    const iniciar = () => {
      tela.width = 280
      tela.height = Math.round(280 * ((imagem.naturalHeight || 280) / (imagem.naturalWidth || 280)))
      desenhar(PASSOS[0])
      io = new IntersectionObserver(
        ([e]) => {
          if (!e.isIntersecting) return
          io.disconnect()
          PASSOS.forEach((b, i) => timers.push(setTimeout(() => desenhar(b), i * 130)))
          timers.push(setTimeout(() => setPronta(true), PASSOS.length * 130 + 80))
        },
        { threshold: 0.3 },
      )
      io.observe(tela)
    }

    if (imagem.complete && imagem.naturalWidth) iniciar()
    else imagem.addEventListener('load', iniciar, { once: true })

    return () => {
      timers.forEach(clearTimeout)
      timers = []
      io?.disconnect()
      imagem.removeEventListener('load', iniciar)
    }
  }, [pronta])

  return (
    <div className={`relative ${className}`}>
      <img ref={img} src={src} alt={alt} className="block aspect-square w-full object-cover object-top grayscale contrast-125" />
      {!pronta && (
        <canvas
          ref={cv}
          aria-hidden="true"
          className="pixel-nitido absolute inset-0 h-full w-full bg-superficie object-cover grayscale contrast-125"
        />
      )}
    </div>
  )
}
