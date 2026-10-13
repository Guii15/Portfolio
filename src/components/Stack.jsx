import { useState } from 'react'
import Secao from './Secao'
import CelulaSql from './CelulaSql'
import { SQL_STACK, COLUNAS_STACK, stackInicial } from '../lib/consultas'

function StackVisual({ resultado }) {
  const linhas = resultado.linhas
  const maximo = Math.max(1, ...linhas.map((l) => Number(l.projetos) || 0))
  const grupos = []
  for (const l of linhas) {
    let g = grupos.find((x) => x.nome === l.grupo)
    if (!g) {
      g = { nome: l.grupo, itens: [] }
      grupos.push(g)
    }
    g.itens.push(l)
  }

  return (
    <div className="p-5 sm:p-6">
      <div className="grid gap-8 md:grid-cols-3">
        {grupos.map((g) => (
          <div key={g.nome}>
            <h3 className="border-b-2 border-borda pb-2 text-2xl font-bold">{g.nome}</h3>
            <ul>
              {g.itens.map((item) => {
                const n = Number(item.projetos) || 0
                return (
                  <li key={item.nome} className="border-b border-linha py-2">
                    <div className="flex items-baseline justify-between gap-3 text-lg">
                      <span>{item.nome}</span>
                      <span className="numeros-tabulares text-base text-tinta/60">{n}</span>
                    </div>
                    <div className="mt-1.5 flex gap-[3px]" role="presentation">
                      {Array.from({ length: maximo }, (_, i) => (
                        <span
                          key={i}
                          className={'block h-2.5 flex-1 ' + (i < n ? 'bg-verde bloco-entrando' : 'bg-linha')}
                          style={i < n ? { animationDelay: `${i * 120}ms` } : undefined}
                        />
                      ))}
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-6 text-base text-tinta/70">
        O número e os blocos mostram em quantos dos meus projetos eu usei cada tecnologia. Git e GitHub aparecem em todos
        porque todo projeto vive num repositório.
      </p>
    </div>
  )
}

export default function Stack() {
  const [sql, setSql] = useState(SQL_STACK)

  return (
    <Secao
      id="stack"
      titulo="Stack"
      descricao="Os blocos vêm de um JOIN com GROUP BY: a contagem é calculada na hora, não escrita à mão."
    >
      <CelulaSql
        arquivo="stack.sql"
        rotulo="Consulta SQL da seção Stack"
        sql={sql}
        onSql={setSql}
        inicial={stackInicial()}
        requer={COLUNAS_STACK}
        Visual={StackVisual}
        minLinhas={6}
      />
    </Secao>
  )
}
