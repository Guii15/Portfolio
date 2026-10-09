import { useState } from 'react'
import Secao from './Secao'
import CelulaSql from './CelulaSql'
import { SQL_FORMACAO, COLUNAS_FORMACAO, formacaoInicial } from '../lib/consultas'

function FormacaoVisual({ resultado }) {
  const grupos = []
  for (const l of resultado.linhas) {
    let g = grupos.find((x) => x.nivel === l.nivel)
    if (!g) {
      g = { nivel: l.nivel, itens: [] }
      grupos.push(g)
    }
    g.itens.push(l)
  }

  return (
    <div className="p-5 sm:p-6">
      {grupos.map((g, i) => (
        <section key={g.nivel} className={i > 0 ? 'mt-8' : ''}>
          <h3 className="border-b-2 border-tinta pb-2 text-2xl font-bold">{g.nivel}</h3>
          <ul>
            {g.itens.map((f) => (
              <li
                key={f.curso}
                className="grid items-start gap-1 border-b border-linha py-4 md:grid-cols-[minmax(0,1fr)_11rem_10rem] md:gap-6"
              >
                <p className={g.nivel === 'Graduação' ? 'text-xl font-bold leading-tight' : 'text-lg font-semibold leading-tight'}>
                  {f.curso}
                </p>
                <p className="text-lg text-tinta/80">{f.instituicao}</p>
                <p>
                  <span
                    className={
                      'inline-block px-2 py-0.5 text-base font-semibold ' +
                      (g.nivel === 'Graduação' ? 'bg-cobalto text-white' : 'border border-tinta/30')
                    }
                  >
                    {f.situacao}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}

export default function Formacao() {
  const [sql, setSql] = useState(SQL_FORMACAO)

  return (
    <Secao id="formacao" titulo="Formação" descricao="Graduação, curso técnico e cursos que fiz por conta própria.">
      <CelulaSql
        arquivo="formacao.sql"
        rotulo="Consulta SQL da seção Formação"
        sql={sql}
        onSql={setSql}
        inicial={formacaoInicial()}
        requer={COLUNAS_FORMACAO}
        Visual={FormacaoVisual}
        minLinhas={4}
      />
    </Secao>
  )
}
