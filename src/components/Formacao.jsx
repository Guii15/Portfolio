import Secao from './Secao'
import { formacao, cursos } from '../data/skills'

export default function Formacao() {
  return (
    <Secao id="formacao" titulo="Formação" descricao="Graduação, curso técnico e cursos que fiz por conta própria.">
      <ul className="border-t-2 border-tinta">
        {formacao.map((f) => (
          <li
            key={f.curso}
            className="grid items-start gap-2 border-b border-linha py-6 md:grid-cols-[minmax(0,1fr)_9rem_11rem] md:gap-6"
          >
            <h3 className="text-xl font-bold leading-tight">{f.curso}</h3>
            <p className="text-lg">{f.instituicao}</p>
            <p>
              <span
                className={
                  'inline-block px-2 py-0.5 text-base font-semibold ' +
                  (f.destaque ? 'bg-cobalto text-white' : 'border border-tinta/30')
                }
              >
                {f.periodo}
              </span>
            </p>
          </li>
        ))}
      </ul>

      <h3 className="mt-12 text-2xl font-bold">Cursos complementares</h3>
      <ul className="mt-3 border-t border-linha">
        {cursos.map((c) => (
          <li key={c.curso} className="grid gap-1 border-b border-linha py-3 text-lg md:grid-cols-[minmax(0,1fr)_14rem] md:gap-6">
            <span className="font-medium">{c.curso}</span>
            <span className="text-tinta/70">{c.instituicao}</span>
          </li>
        ))}
      </ul>
    </Secao>
  )
}
