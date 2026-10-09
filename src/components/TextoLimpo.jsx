import { useMemo } from 'react'
import { sujar, momentosDeLimpeza } from '../lib/sujar'

// Texto que começa "sujo" (letras erradas em células amarelas) e vai ficando limpo
// conforme o progresso `p` (0 a 1) passa pela janela entre `de` e `ate`.
// Cada letra reserva o espaço da letra limpa, então o layout nunca se mexe.
export default function TextoLimpo({ texto, p, de = 0, ate = 1, seed = 1, className = '' }) {
  const sujo = useMemo(() => sujar(texto, seed), [texto, seed])
  const momentos = useMemo(() => momentosDeLimpeza(texto, seed), [texto, seed])

  const partes = texto.split(' ')
  const inicios = partes.map((_, k) => partes.slice(0, k).reduce((soma, w) => soma + w.length + 1, 0))

  const palavras = partes.map((palavra, k) => (
    <span key={k}>
      {k > 0 && ' '}
      <span className="inline-block whitespace-nowrap">
        {palavra.split('').map((letra, j) => {
          const i = inicios[k] + j
          const limpo = letra === sujo[i] || p >= de + (ate - de) * momentos[i]
          return (
            <span key={j} aria-hidden="true" className="relative inline-block">
              <span className="opacity-0">{letra}</span>
              <span
                className={
                  'absolute inset-0 flex items-center justify-center ' +
                  (limpo ? '' : 'bg-marca text-preto')
                }
              >
                {limpo ? letra : sujo[i]}
              </span>
            </span>
          )
        })}
      </span>
    </span>
  ))

  return (
    <span role="text" aria-label={texto} className={className}>
      {palavras}
    </span>
  )
}
