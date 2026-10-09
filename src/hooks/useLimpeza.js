import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

// Progresso da limpeza do texto (0 a 1). Fica em 0 até `ativo` virar verdadeiro
// e então anima sozinho. Quem prefere menos movimento já vê tudo limpo.
export function useLimpeza({ ativo, duracao = 1800 }) {
  const reduzir = useReducedMotion()
  const [progresso, setProgresso] = useState(0)

  useEffect(() => {
    if (!ativo || reduzir) return
    let raf
    let inicio
    const passo = (agora) => {
      if (inicio === undefined) inicio = agora
      const p = Math.min((agora - inicio) / duracao, 1)
      setProgresso(p)
      if (p < 1) raf = requestAnimationFrame(passo)
    }
    raf = requestAnimationFrame(passo)
    return () => cancelAnimationFrame(raf)
  }, [ativo, duracao, reduzir])

  if (reduzir) return 1
  return ativo ? progresso : 0
}
