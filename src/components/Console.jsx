import { useCallback, useState } from 'react'
import Secao from './Secao'
import CelulaSql from './CelulaSql'
import { useBanco } from '../hooks/contextoBanco'
import { TABELAS, VISOES } from '../data/esquema'
import { PERGUNTAS } from '../lib/consultas'

const SQL_PADRAO = `-- Pergunte qualquer coisa ao banco deste site.
SELECT nome, grupo
FROM tecnologias
ORDER BY grupo, nome;`

function selecionarTudo(nome) {
  return `SELECT *\nFROM ${nome}\nLIMIT 20;`
}

function Arvore({ aoEscolher }) {
  const itens = [
    ...TABELAS.map((t) => ({ ...t, tipo: 'tabela' })),
    ...VISOES.map((v) => ({ ...v, tipo: 'visão' })),
  ]
  return (
    <div className="border-2 border-tinta bg-white shadow-janela">
      <p className="bg-tinta px-3 py-2 font-mono text-sm text-white">esquema</p>
      <ul className="max-h-[34rem] overflow-auto">
        {itens.map((t) => (
          <li key={t.nome} className="border-b border-linha last:border-b-0">
            <details>
              <summary className="flex cursor-pointer items-center justify-between gap-2 px-3 py-2 font-mono text-sm font-semibold hover:bg-cobalto-claro">
                <span>{t.nome}</span>
                <span className="text-xs font-normal text-tinta/55">{t.tipo}</span>
              </summary>
              <div className="bg-papel px-3 pb-3 pt-1">
                {t.descricao && <p className="mb-2 text-sm text-tinta/70">{t.descricao}</p>}
                <ul className="font-mono text-xs">
                  {t.colunas.map((c) => (
                    <li key={c.nome} className="flex justify-between gap-2 py-0.5">
                      <span>{c.nome}</span>
                      <span className="text-tinta/50">{c.tipo}{c.pk ? ' PK' : ''}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => aoEscolher(selecionarTudo(t.nome))}
                  className="mt-2 text-sm font-bold text-cobalto underline underline-offset-4 hover:text-tinta"
                >
                  Ver linhas
                </button>
              </div>
            </details>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Console() {
  const { banco } = useBanco()
  const [sql, setSql] = useState(SQL_PADRAO)
  const [versao, setVersao] = useState(0)
  const [plano, setPlano] = useState(false)
  const [historico, setHistorico] = useState([])

  const executor = useCallback(
    async (texto) => {
      const limpo = texto.trim().replace(/;\s*$/, '')
      const comando = plano && /^(select|with)\b/i.test(limpo) ? `EXPLAIN QUERY PLAN ${limpo}` : texto
      const r = await banco.executarUsuario(comando)
      setHistorico((h) => [texto, ...h.filter((x) => x !== texto)].slice(0, 5))
      return r
    },
    [banco, plano],
  )

  const escolher = (texto) => {
    setSql(texto)
    setVersao((v) => v + 1)
  }

  const barra = (
    <div className="space-y-3 border-b border-linha bg-papel px-3 py-3">
      <div role="group" aria-label="Perguntas de exemplo" className="flex flex-wrap gap-2">
        {PERGUNTAS.map((p) => (
          <button
            key={p.rotulo}
            type="button"
            onClick={() => escolher(p.sql)}
            className="border border-tinta/40 bg-white px-2.5 py-1 text-left text-sm font-semibold hover:bg-cobalto-claro"
          >
            {p.rotulo}
          </button>
        ))}
      </div>
      <label className="flex items-center gap-2 text-sm font-semibold">
        <input
          type="checkbox"
          checked={plano}
          onChange={(e) => {
            setPlano(e.target.checked)
            setVersao((v) => v + 1)
          }}
        />
        Mostrar o plano de execução (EXPLAIN QUERY PLAN)
      </label>
    </div>
  )

  return (
    <Secao
      id="console"
      titulo="Console"
      descricao="O banco inteiro está aberto aqui. Escolha uma pergunta, abra uma tabela no esquema ou escreva o seu SELECT. Digite \help para ver os comandos."
    >
      <div className="grid items-start gap-8 lg:grid-cols-[15rem_minmax(0,1fr)]">
        <Arvore aoEscolher={escolher} />
        <div className="min-w-0">
          <CelulaSql
            arquivo="console.sql"
            rotulo="Console SQL livre"
            sql={sql}
            onSql={setSql}
            versao={versao}
            executor={executor}
            barra={barra}
            minLinhas={6}
          />
          {historico.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-bold">Últimas consultas</h3>
              <ul className="mt-2 border-t border-linha">
                {historico.map((h) => (
                  <li key={h} className="border-b border-linha">
                    <button
                      type="button"
                      onClick={() => escolher(h)}
                      className="block w-full truncate py-2 text-left font-mono text-sm hover:text-cobalto"
                    >
                      {h.replace(/\s+/g, ' ')}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Secao>
  )
}
