import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

// Devolve o progresso da limpeza (0 a 1), rodando sozinho ao montar o componente.
// Quem prefere menos movimento já recebe 1 (tudo limpo).
export function useLimpeza({ duracao = 3000, atraso = 400 } = {}) {
  const reduzir = useReducedMotion()
  const [progresso, setProgresso] = useState(0)

  useEffect(() => {
    if (reduzir) return
    let raf
    let inicio
    const passo = (agora) => {
      if (inicio === undefined) inicio = agora
      const p = Math.min((agora - inicio) / duracao, 1)
      setProgresso(p)
      if (p < 1) raf = requestAnimationFrame(passo)
    }
    const t = setTimeout(() => {
      raf = requestAnimationFrame(passo)
    }, atraso)
    return () => {
      clearTimeout(t)
      cancelAnimationFrame(raf)
    }
  }, [duracao, atraso, reduzir])

  return reduzir ? 1 : progresso
}
