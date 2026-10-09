// "Bit", o bichinho de pixel do site. Desenhado em grade 12x10, sem imagem externa.
const CORES = { y: '#ffe14d', K: '#0b0d12', g: '#5af0a0', c: '#1636e8', d: '#c9a800' }

const CORPO = [
  '..g......g..',
  '..d......d..',
  '.yyyyyyyyyy.',
  '.yyyyyyyyyy.',
]
const ROSTO_ABERTO = ['.yyKKyyKKyy.', '.yyKKyyKKyy.']
const ROSTO_DORMINDO = ['.yyyyyyyyyy.', '.yyKKyyKKyy.']
const BARRIGA = ['.yyyyccyyyy.', '.yyyyyyyyyy.']
const PERNAS_A = ['..yy....yy..', '..yy....yy..']
const PERNAS_B = ['...yy..yy...', '...yy..yy...']

function pixels(linhas, y0, chave, filtro) {
  const out = []
  linhas.forEach((linha, dy) => {
    for (let x = 0; x < linha.length; x++) {
      const ch = linha[x]
      if (ch === '.' || (filtro && !filtro(ch))) continue
      out.push(<rect key={`${chave}-${dy}-${x}`} x={x} y={y0 + dy} width="1" height="1" fill={CORES[ch]} />)
    }
  })
  return out
}

export default function Mascote({ estado = 'parado', espelhado = false, escala = 4, className = '', rotulo }) {
  const dormindo = estado === 'dormindo'
  return (
    <svg
      viewBox="0 0 12 10"
      width={12 * escala}
      height={10 * escala}
      shapeRendering="crispEdges"
      role={rotulo ? 'img' : undefined}
      aria-label={rotulo}
      aria-hidden={rotulo ? undefined : 'true'}
      className={`mascote-${estado} ${className}`}
      style={{ transform: espelhado ? 'scaleX(-1)' : undefined, overflow: 'visible' }}
    >
      <g className="corpo">
        {pixels(CORPO, 0, 'c')}
        <g className="olhos">{pixels(dormindo ? ROSTO_DORMINDO : ROSTO_ABERTO, 4, 'r')}</g>
        {pixels(BARRIGA, 6, 'b')}
      </g>
      <g className="pose-a">{pixels(PERNAS_A, 8, 'a')}</g>
      <g className="pose-b">{pixels(PERNAS_B, 8, 'p')}</g>
    </svg>
  )
}
