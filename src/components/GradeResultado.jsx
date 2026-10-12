// Tabela de resultado, no estilo de um cliente de banco de dados.
export default function GradeResultado({ colunas, linhas, destacar, altura = 'max-h-[30rem]' }) {
  if (!linhas.length) {
    return <p className="px-4 py-6 text-base text-tinta/70">A consulta não encontrou nenhuma linha.</p>
  }

  return (
    <div role="region" aria-label="Resultado da consulta" tabIndex={0} className={`overflow-auto ${altura}`}>
      <table className="w-full border-collapse font-mono text-[0.82rem]">
        <thead className="sticky top-0 z-10 bg-cobalto-claro text-left">
          <tr>
            <th scope="col" className="w-10 border-b border-r border-linha px-2 py-1.5 text-right font-medium text-tinta/50">
              #
            </th>
            {colunas.map((c) => (
              <th key={c} scope="col" className="whitespace-nowrap border-b border-r border-linha px-3 py-1.5 font-semibold last:border-r-0">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {linhas.map((linha, i) => (
            <tr key={i} className="odd:bg-superficie even:bg-papel">
              <td className="numeros-tabulares border-r border-linha px-2 py-1.5 text-right align-top text-tinta/45">{i + 1}</td>
              {colunas.map((c) => {
                const v = linha[c]
                const suja = destacar?.(c, v, linha)
                return (
                  <td
                    key={c}
                                        className={
                      'max-w-[40rem] whitespace-pre-wrap break-words border-r border-linha px-3 py-1.5 align-top last:border-r-0 ' +
                      (typeof v === 'number' ? 'numeros-tabulares text-right ' : '') +
                      (suja ? 'bg-marca text-preto' : '')
                    }
                  >
                    {v === null || v === undefined ? <span className="italic text-tinta/40">NULL</span> : String(v)}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
