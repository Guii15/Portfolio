import { useEffect, useRef, useState } from 'react'
import EditorSql from './EditorSql'
import GradeResultado from './GradeResultado'
import { useBanco } from '../hooks/contextoBanco'

function formatarMs(ms) {
  if (!ms) return '0 ms'
  return ms < 1 ? '<1 ms' : `${ms.toLocaleString('pt-BR', { maximumFractionDigits: 1 })} ms`
}

// Uma "janela" de consulta: título, editor SQL, botão Executar e o resultado,
// que pode ser desenhado como Visual (layout do site) ou como Tabela (a grade crua).
export default function CelulaSql({
  arquivo,
  rotulo,
  sql,
  onSql,
  versao = 0,
  inicial,
  requer = [],
  Visual,
  visualProps,
  executor,
  autoExecutar = true,
  barra,
  minLinhas = 1,
  textoBotao = 'Executar',
  somenteLeitura = false,
}) {
  const { status, banco } = useBanco()
  const [resultado, setResultado] = useState(inicial ?? null)
  const [aba, setAba] = useState('visual')
  const sqlRef = useRef(sql)

  useEffect(() => {
    sqlRef.current = sql
  }, [sql])

  const rodar = async (texto) => {
    if (!banco) {
      setResultado({
        ok: false,
        erro:
          status === 'erro'
            ? 'O banco não pôde ser carregado neste navegador.'
            : 'O banco ainda está carregando.',
        dica: status === 'erro' ? 'O conteúdo do site continua disponível na versão salva.' : 'Tente de novo em instantes.',
      })
      return
    }
    const r = await (executor ? executor(texto) : banco.executarUsuario(texto))
    setResultado(r)
    setAba('visual')
  }

  // Quando o banco fica pronto (ou os filtros mudam), roda a consulta de verdade.
  useEffect(() => {
    if (!banco || !autoExecutar) return
    let vivo = true
    ;(async () => {
      const r = await (executor ? executor(sqlRef.current) : banco.executarUsuario(sqlRef.current))
      if (vivo) setResultado(r)
    })()
    return () => {
      vivo = false
    }
  }, [banco, versao, autoExecutar, executor])

  const tabela = resultado?.ok && resultado.tipo === 'tabela'
  const visualDisponivel = Boolean(Visual) && tabela && requer.every((c) => resultado.colunas.includes(c))
  const mostrarVisual = visualDisponivel && aba === 'visual'

  return (
    <div className="border-2 border-borda bg-superficie shadow-janela">
      <div className="flex items-center justify-between gap-3 bg-superficie2 px-3 py-2 text-white">
        <p className="truncate font-mono text-sm">{arquivo}</p>
        <button
          type="button"
          onClick={() => rodar(sql)}
          className="flex shrink-0 items-center gap-2 bg-marca px-3 py-1 text-sm font-bold text-preto hover:bg-white"
        >
          <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden="true" fill="currentColor">
            <path d="M2 1l9 5-9 5z" />
          </svg>
          {textoBotao}
          <span className="hidden font-mono text-xs font-normal text-preto/70 sm:inline">Ctrl+Enter</span>
        </button>
      </div>

      {barra}

      <EditorSql valor={sql} onChange={onSql} onExecutar={() => rodar(sql)} rotulo={rotulo} minLinhas={minLinhas} somenteLeitura={somenteLeitura} />

      <div className="border-t-2 border-borda">
        <div className="flex flex-wrap items-center justify-between gap-2 bg-papel px-3 py-1.5 text-sm">
          <div className="flex gap-1">
            {Visual && (
              <button
                type="button"
                aria-pressed={mostrarVisual}
                disabled={!visualDisponivel}
                onClick={() => setAba('visual')}
                className={
                  'px-3 py-1 font-semibold disabled:cursor-not-allowed disabled:opacity-40 ' +
                  (mostrarVisual ? 'bg-cobalto text-white' : 'hover:bg-cobalto-claro')
                }
              >
                Visual
              </button>
            )}
            <button
              type="button"
              aria-pressed={!mostrarVisual}
              onClick={() => setAba('tabela')}
              className={'px-3 py-1 font-semibold ' + (!mostrarVisual ? 'bg-cobalto text-white' : 'hover:bg-cobalto-claro')}
            >
              Tabela
            </button>
          </div>
          <p className="numeros-tabulares text-tinta/70" role="status">
            {tabela
              ? `${resultado.linhas.length}${resultado.truncado ? '+' : ''} ${resultado.linhas.length === 1 ? 'linha' : 'linhas'} em ${formatarMs(resultado.ms)}`
              : resultado?.ok
                ? `Concluído em ${formatarMs(resultado.ms)}`
                : resultado
                  ? 'Erro'
                  : ''}
          </p>
        </div>

        {resultado && !resultado.ok && (
          <div role="alert" className="border-l-4 border-marca bg-marca/15 px-4 py-4">
            <p className="text-lg font-bold">{resultado.erro}</p>
            {resultado.dica && <p className="mt-1 text-base">{resultado.dica}</p>}
          </div>
        )}

        {resultado?.ok && resultado.tipo === 'mensagem' && (
          <p role="status" className="bg-cobalto-claro/60 px-4 py-4 text-lg font-semibold">
            {resultado.texto}
          </p>
        )}

        {tabela && Visual && !visualDisponivel && (
          <p className="border-b border-linha px-4 py-2 text-base text-tinta/70">
            A consulta mudou as colunas, então só a tabela pode ser mostrada.
          </p>
        )}

        {mostrarVisual && <Visual resultado={resultado} {...visualProps} />}
        {tabela && !mostrarVisual && <GradeResultado colunas={resultado.colunas} linhas={resultado.linhas} />}
      </div>
    </div>
  )
}
