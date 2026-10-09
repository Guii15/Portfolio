import { useState } from 'react'
import { personal } from '../data/personal'
import { publico } from '../lib/publico'

const links = [
  { href: '#sobre', texto: 'Sobre' },
  { href: '#projetos', texto: 'Projetos' },
  { href: '#stack', texto: 'Stack' },
  { href: '#historico', texto: 'Histórico' },
  { href: '#formacao', texto: 'Formação' },
]

export default function Navbar() {
  const [aberto, setAberto] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-linha bg-papel/95 backdrop-blur">
      <nav
        aria-label="Principal"
        className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        <a href="#topo" className="text-lg font-extrabold tracking-tight">
          {personal.shortName}
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-[0.95rem] font-medium text-tinta/75 hover:text-cobalto">
                {l.texto}
              </a>
            </li>
          ))}
          <li>
            <a
              href={publico(personal.cv)}
              download
              className="px-3 py-1.5 text-[0.95rem] font-semibold text-cobalto ring-1 ring-cobalto hover:bg-cobalto-claro"
            >
              Baixar CV
            </a>
          </li>
          <li>
            <a
              href="#contato"
              className="bg-cobalto px-4 py-1.5 text-[0.95rem] font-semibold text-white hover:bg-tinta"
            >
              Contato
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="px-3 py-1.5 text-[0.95rem] font-semibold ring-1 ring-tinta md:hidden"
          aria-expanded={aberto}
          aria-controls="menu-mobile"
          onClick={() => setAberto((v) => !v)}
        >
          {aberto ? 'Fechar' : 'Menu'}
        </button>
      </nav>

      {aberto && (
        <ul id="menu-mobile" className="border-t border-linha bg-papel px-5 pb-4 md:hidden">
          {[...links, { href: '#contato', texto: 'Contato' }].map((l) => (
            <li key={l.href} className="border-b border-linha last:border-b-0">
              <a href={l.href} onClick={() => setAberto(false)} className="block py-3 text-lg font-semibold">
                {l.texto}
              </a>
            </li>
          ))}
          <li className="pt-3">
            <a href={publico(personal.cv)} download className="font-semibold text-cobalto underline">
              Baixar CV
            </a>
          </li>
        </ul>
      )}
    </header>
  )
}
