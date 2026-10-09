import Secao from './Secao'
import { experiencias } from '../data/skills'

export default function Historico() {
  return (
    <Secao id="historico" titulo="Histórico" descricao="Onde trabalhei e o que fiz em cada lugar.">
      <ul className="border-t-2 border-tinta">
        {experiencias.map((e) => (
          <li key={e.empresa} className="grid gap-3 border-b border-linha py-8 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-8">
            <p className="numeros-tabulares text-lg font-semibold text-tinta/70">{e.periodo}</p>
            <div>
              <h3 className="text-2xl font-bold leading-tight">{e.empresa}</h3>
              <p className="text-lg font-semibold text-cobalto">{e.cargo}</p>
              <ul className="mt-4 max-w-[62ch] list-disc space-y-2 pl-5 text-lg leading-relaxed marker:text-cobalto">
                {e.itens.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </Secao>
  )
}
