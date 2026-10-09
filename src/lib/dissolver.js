// Apaga um canvas opaco aos poucos, em quadradinhos, deixando aparecer o que está embaixo.
// Mistura uma varredura diagonal com sorteio, que dá o ar de "página sendo montada".
export function pintarCanvas(cv, largura, altura, cor) {
  cv.width = Math.max(1, Math.ceil(largura))
  cv.height = Math.max(1, Math.ceil(altura))
  const ctx = cv.getContext('2d')
  if (!ctx) return null
  ctx.fillStyle = cor
  ctx.fillRect(0, 0, cv.width, cv.height)
  return ctx
}

export function tamanhoDaCelula(largura, altura, minimo = 16, maximoDeCelulas = 3600) {
  return Math.max(minimo, Math.ceil(Math.sqrt((largura * altura) / maximoDeCelulas)))
}

export function dissolver(cv, { celula = 16, duracao = 900, aoFim }) {
  const ctx = cv.getContext('2d')
  if (!ctx) {
    aoFim?.()
    return () => {}
  }
  const colunas = Math.ceil(cv.width / celula)
  const linhas = Math.ceil(cv.height / celula)
  const itens = []
  for (let y = 0; y < linhas; y++) {
    for (let x = 0; x < colunas; x++) {
      const diagonal = (x / colunas + y / linhas) / 2
      itens.push({ x, y, quando: (diagonal * 0.55 + Math.random() * 0.45) * duracao })
    }
  }
  itens.sort((a, b) => a.quando - b.quando)

  let i = 0
  let raf
  let inicio
  const passo = (agora) => {
    if (inicio === undefined) inicio = agora
    const t = agora - inicio
    while (i < itens.length && itens[i].quando <= t) {
      const c = itens[i++]
      ctx.clearRect(c.x * celula, c.y * celula, celula, celula)
    }
    if (i < itens.length) raf = requestAnimationFrame(passo)
    else aoFim?.()
  }
  raf = requestAnimationFrame(passo)
  return () => cancelAnimationFrame(raf)
}
