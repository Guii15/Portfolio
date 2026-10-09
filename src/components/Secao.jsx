// Moldura comum das seções: título fixo à esquerda, conteúdo à direita.
export default function Secao({ id, titulo, descricao, children }) {
  return (
    <section id={id} className="scroll-mt-14 border-t border-linha">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:px-8 md:grid-cols-[14rem_minmax(0,1fr)] md:gap-14 md:py-24">
        <div className="md:sticky md:top-24 md:self-start">
          <h2 className="text-4xl font-extrabold tracking-tight">{titulo}</h2>
          {descricao && <p className="mt-3 max-w-xs text-lg leading-snug text-tinta/70">{descricao}</p>}
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  )
}
