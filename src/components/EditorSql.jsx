import { useMemo } from 'react'
import { tokenizar } from '../lib/sqlTokens'

const CLASSE = {
  kw: 'sql-kw',
  fn: 'sql-fn',
  str: 'sql-str',
  'id-aspas': 'sql-id',
  num: 'sql-num',
  com: 'sql-com',
  op: 'sql-op',
}

// Editor de SQL: um <textarea> transparente por cima de um <pre> colorido.
// O <pre> define a altura, então o editor cresce sozinho conforme o texto.
export default function EditorSql({ valor, onChange, onExecutar, rotulo, somenteLeitura = false, minLinhas = 1 }) {
  const tokens = useMemo(() => tokenizar(valor), [valor])
  const linhas = Math.max(valor.split('\n').length, minLinhas)

  return (
    <div className="flex bg-superficie font-mono text-[0.84rem] leading-[1.6rem]">
      <div
        aria-hidden="true"
        className="numeros-tabulares select-none border-r border-linha bg-papel px-3 py-2 text-right text-tinta/45"
      >
        {Array.from({ length: linhas }, (_, i) => (
          <div key={i}>{i + 1}</div>
        ))}
      </div>

      <div className="min-w-0 flex-1 overflow-x-auto">
        <div className="relative inline-block min-w-full px-4 py-2">
          <pre aria-hidden="true" className="m-0 whitespace-pre font-[inherit]">
            {tokens.map((t, i) => (
              <span key={i} className={CLASSE[t.tipo]}>
                {t.texto}
              </span>
            ))}
            {'\n'}
          </pre>
          <textarea
            aria-label={rotulo}
            value={valor}
            readOnly={somenteLeitura}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            wrap="off"
            onChange={(e) => onChange?.(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                e.preventDefault()
                onExecutar?.()
              }
            }}
            className="absolute inset-0 h-full w-full resize-none overflow-hidden whitespace-pre bg-transparent px-4 py-2 font-[inherit] leading-[inherit] text-transparent caret-tinta focus-visible:outline-offset-[-3px]"
          />
        </div>
      </div>
    </div>
  )
}
