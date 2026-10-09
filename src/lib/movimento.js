// Animações de pixel só rodam em navegador de verdade e para quem não pediu menos movimento.
export function podeAnimar() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function jaVoutouIntro() {
  try {
    return window.sessionStorage.getItem('intro-vista') === '1'
  } catch {
    return false
  }
}

export function marcarIntroVista() {
  try {
    window.sessionStorage.setItem('intro-vista', '1')
  } catch {
    /* sem armazenamento: a intro só passa de novo */
  }
}

export function deveMostrarIntro() {
  return podeAnimar() && !jaVoutouIntro()
}
