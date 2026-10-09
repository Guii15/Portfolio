import { useState } from 'react'
import Secao from './Secao'
import CelulaSql from './CelulaSql'
import { SQL_HISTORICO, COLUNAS_HISTORICO, historicoInicial } from '../lib/consultas'

function periodo(inicio, fim) {
  return fim === 'hoje' ? `${inicio} até hoje` : `${inicio} a ${fim}`
}

function HistoricoVisual({ resultado }) {
  const empresas = []
  for (const l of resultado.linhas) {
    let e = empresas.find((x) => x.empresa === l.empresa && x.cargo === l.cargo)
    if (!e) {
      e = { empresa: l.empresa, cargo: l.cargo, inicio: l.inicio, fim: l.fim, atividades: [] }
      empresas.push(e)
    }
    e.atividades.push(l.atividade)
  }

  return (
    <ul>
      {empresas.map((e) => (
        <li key={`${e.empresa}-${e.cargo}`} className="grid gap-3 border-b border-linha p-5 last:border-b-0 sm:p-6 md:grid-cols-[9rem_minmax(0,1fr)] md:gap-8">
          <p className="numeros-tabulares text-lg font-semibold text-tinta/70">{periodo(e.inicio, e.fim)}</p>
          <div>
            <h3 className="text-2xl font-bold leading-tight">{e.empresa}</h3>
            <p className="text-lg font-semibold text-cobalto">{e.cargo}</p>
            <ul className="mt-4 max-w-[62ch] list-disc space-y-2 pl-5 text-lg leading-relaxed marker:text-cobalto">
              {e.atividades.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default function Historico() {
  const [sql, setSql] = useState(SQL_HISTORICO)

  return (
    <Secao id="historico" titulo="Histórico" descricao="Onde trabalhei e o que fiz em cada lugar: duas tabelas ligadas por um JOIN.">
      <CelulaSql
        arquivo="historico.sql"
        rotulo="Consulta SQL da seção Histórico"
        sql={sql}
        onSql={setSql}
        inicial={historicoInicial()}
        requer={COLUNAS_HISTORICO}
        Visual={HistoricoVisual}
        minLinhas={6}
      />
    </Secao>
  )
}
