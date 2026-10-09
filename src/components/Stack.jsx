import Secao from './Secao'
import { skills } from '../data/skills'

export default function Stack() {
  return (
    <Secao id="stack" titulo="Stack" descricao="O que uso para mover e organizar dados e para construir as aplicações em volta deles.">
      <div className="grid gap-10 md:grid-cols-3">
        {skills.map((g) => (
          <div key={g.grupo}>
            <h3 className="border-b-2 border-tinta pb-2 text-2xl font-bold">{g.grupo}</h3>
            <ul>
              {g.itens.map((item) => (
                <li key={item} className="border-b border-linha py-2.5 text-lg">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Secao>
  )
}
