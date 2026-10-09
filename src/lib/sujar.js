// Estraga um texto de propósito (letras trocadas, símbolos, encoding quebrado)
// mantendo o MESMO tamanho, para a página não pular quando o texto for limpo.

const LEET = { a: '@', e: '3', i: '1', o: '0', s: '$', l: '1', t: '7', g: '9' }
const LIXO = '#%?;&!'
const ACENTUADAS = /[áàâãäéèêíóôõúçÁÀÂÃÉÊÍÓÔÕÚÇ]/

// Gerador pseudoaleatório com semente: o texto sujo sai sempre igual
export function criarRand(seed) {
  let r = seed
  return () => {
    r = (r * 9301 + 49297) % 233280
    return r / 233280
  }
}

export function sujar(texto, seed = 1) {
  const rand = criarRand(seed)
  return texto
    .split('')
    .map((c) => {
      if (c === ' ') return ' '
      if (ACENTUADAS.test(c)) return 'Ã'
      const x = rand()
      const baixa = c.toLowerCase()
      if (x < 0.3 && LEET[baixa]) return LEET[baixa]
      if (x < 0.55) return c === baixa ? c.toUpperCase() : baixa
      if (x < 0.65) return LIXO[Math.floor(rand() * LIXO.length)]
      return c
    })
    .join('')
}

// Para cada letra, o momento (entre 0 e 1) em que ela fica limpa:
// vai da esquerda para a direita, com um pouco de desordem.
export function momentosDeLimpeza(texto, seed = 1) {
  const rand = criarRand(seed * 7 + 3)
  return texto.split('').map((_, i) => (i / texto.length) * 0.75 + rand() * 0.25)
}
