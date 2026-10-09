import { useCallback, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import EditorSql from './EditorSql'
import GradeResultado from './GradeResultado'
import { useBanco } from '../hooks/contextoBanco'
import { useIntro } from '../hooks/contextoIntro'
import {
  SQL_ORIGEM,
  SQL_VISAO,
  SQL_LIMPA,
  celulaSuja,
  linhaSuja,
  qualidade,
  resultadoOrigemEstatico,
  resultadoLimpoEstatico,
} from '../lib/demoEtl'

const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// A janela do hero: digita e executa de verdade um ETL em SQL, de dados sujos para limpos.
export default function EtlJanela({ onFase, onRepetir }) {
  const { status, banco } = useBanco()
  const { pronta } = useIntro()
  const reduzir = useReducedMotion()
  const [sql, setSql] = useState('')
  const [resultado, setResultado] = useState(null)
  const [etapa, setEtapa] = useState('animando') // 'animando' | 'livre'
  const token = useRef({ cancelado: false })

  const consultar = useCallback(
    async (texto) => {
      if (banco) return banco.executarUsuario(texto)
      return texto === SQL_ORIGEM ? resultadoOrigemEstatico() : resultadoLimpoEstatico()
    },
    [banco],
  )

  const finalizar = useCallback(async () => {
    token.current.cancelado = true
    if (banco) banco.recriarVisaoDemo(SQL_VISAO)
    setSql(SQL_LIMPA)
    setResultado(await consultar(SQL_LIMPA))
    setEtapa('livre')
    onFase('limpo')
  }, [banco, consultar, onFase])

  useEffect(() => {
    if (status === 'carregando' || !pronta) return
    const meu = { cancelado: false }
    token.current = meu

    const digitar = async (texto, passo, atraso) => {
      for (let i = passo; i < texto.length + passo; i += passo) {
        if (meu.cancelado) return false
        setSql(texto.slice(0, i))
        await esperar(atraso)
      }
      setSql(texto)
      return true
    }

    const roteiro = async () => {
      if (reduzir) {
        await finalizar()
        return
      }
      await esperar(500)
      onFase('sujo')
      if (!(await digitar(SQL_ORIGEM, 1, 34))) return
      const origem = await consultar(SQL_ORIGEM)
      if (meu.cancelado) return
      setResultado(origem)
      await esperar(2000)
      if (meu.cancelado) return
      if (!(await digitar(SQL_VISAO, 3, 15))) return
      await esperar(600)
      if (meu.cancelado) return
      if (banco) banco.recriarVisaoDemo(SQL_VISAO)
      onFase('limpando')
      setResultado({ ok: true, tipo: 'mensagem', texto: 'Visão vendas_limpa criada.', ms: 0 })
      await esperar(1100)
      if (meu.cancelado) return
      if (!(await digitar(SQL_LIMPA, 1, 34))) return
      const limpo = await consultar(SQL_LIMPA)
      if (meu.cancelado) return
      setResultado(limpo)
      onFase('limpo')
      setEtapa('livre')
    }

    roteiro()
    return () => {
      meu.cancelado = true
    }
  }, [status, banco, pronta, reduzir, consultar, finalizar, onFase])

  const executar = async () => {
    if (!banco) return
    setResultado(await banco.executarUsuario(sql))
  }

  const tabela = resultado?.ok && resultado.tipo === 'tabela'
  const eRaw = tabela && resultado.colunas.includes('valor') && resultado.colunas.includes('data')
  const ruins = eRaw ? resultado.linhas.filter(linhaSuja).length : 0
  const pct = tabela && resultado.colunas.includes('cliente') ? qualidade(resultado.linhas) : null

  return (
    <div className="border-2 border-borda bg-superficie text-tinta shadow-janela-marca">
      <div className="flex items-center justify-between gap-3 bg-superficie2 px-3 py-2 text-white">
        <p className="truncate font-mono text-sm">vendas.sql</p>
        <p className="hidden truncate font-mono text-xs text-white/70 sm:block">
          {status === 'pronto' ? `SQLite ${banco.versao}, conectado` : status === 'erro' ? 'Sem banco, dados salvos' : 'Conectando ao banco…'}
        </p>
        {etapa === 'animando' ? (
          <button
            type="button"
            onClick={finalizar}
            className="shrink-0 px-3 py-1 text-sm font-bold text-white ring-1 ring-white/70 hover:bg-white hover:text-preto"
          >
            Pular animação
          </button>
        ) : (
          <button
            type="button"
            onClick={executar}
            disabled={!banco}
            className="flex shrink-0 items-center gap-2 bg-marca px-3 py-1 text-sm font-bold text-preto hover:bg-white disabled:opacity-50"
          >
            <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden="true" fill="currentColor">
              <path d="M2 1l9 5-9 5z" />
            </svg>
            Executar
          </button>
        )}
      </div>

      <EditorSql
        valor={sql}
        onChange={setSql}
        onExecutar={executar}
        somenteLeitura={etapa === 'animando'}
        minLinhas={8}
        rotulo="Editor SQL do exemplo de limpeza de dados"
      />

      <div className="min-h-[15.5rem] border-t-2 border-borda">
        {tabela && (
          <GradeResultado
            colunas={resultado.colunas}
            linhas={resultado.linhas}
            destacar={eRaw ? celulaSuja : undefined}
            altura="max-h-[15.5rem]"
          />
        )}
        {resultado?.ok && resultado.tipo === 'mensagem' && (
          <p role="status" className="px-4 py-6 text-lg font-semibold">
            {resultado.texto}
          </p>
        )}
        {resultado && !resultado.ok && (
          <div role="alert" className="border-l-4 border-marca bg-marca/15 px-4 py-4">
            <p className="text-lg font-bold">{resultado.erro}</p>
            {resultado.dica && <p className="mt-1">{resultado.dica}</p>}
          </div>
        )}
        {!resultado && (
          <p className="px-4 py-6 font-mono text-sm text-tinta/60">
            {status === 'carregando' ? 'Conectando ao banco…' : 'Executando…'}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t-2 border-borda bg-papel px-3 py-2 text-sm">
        <p className="font-semibold">Qualidade dos dados</p>
        <div className="h-2 min-w-16 flex-1 bg-linha" role="presentation">
          <div className="h-full bg-verde transition-[width] duration-500" style={{ width: `${pct ?? 0}%` }} />
        </div>
        <p className="numeros-tabulares font-mono font-medium">{pct === null ? '--' : `${pct}%`}</p>
        <p className="text-tinta/70">
          {eRaw ? `${ruins} de ${resultado.linhas.length} linhas com problema` : pct === 100 ? 'nenhuma linha com problema' : ''}
        </p>
        <button type="button" onClick={onRepetir} className="ml-auto font-semibold text-azul underline underline-offset-4 hover:text-tinta">
          Repetir
        </button>
      </div>
    </div>
  )
}
