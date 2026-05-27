import { useState, useEffect } from 'react'
import { Link } from 'react-scroll'
import { personal } from '../data/personal'

const navLinks = [
  { to: 'sobre',       label: 'Sobre'       },
  { to: 'habilidades', label: 'Habilidades' },
  { to: 'projetos',    label: 'Projetos'    },
  { to: 'experiencia', label: 'Experiência' },
  { to: 'formacao',    label: 'Formação'    },
  { to: 'contato',     label: 'Contato'     },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: '#111111',
        borderBottom: '1px solid #C9A84C',
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.4)' : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="hero"
            smooth={true}
            duration={500}
            className="cursor-pointer text-white font-bold text-lg tracking-tight hover:text-[#C9A84C] transition-colors"
          >
            <span style={{ color: '#C9A84C' }}>G</span>uilherme
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                smooth={true}
                duration={500}
                offset={-64}
                spy={true}
                activeClass="nav-active"
                className="text-gray-300 text-sm font-medium cursor-pointer hover:text-white transition-colors relative group"
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                  style={{ backgroundColor: '#C9A84C' }}
                />
              </Link>
            ))}

            <a
              href="/portfolio/cv-guilherme-santana.pdf"
              download
              className="px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 hover:opacity-90"
              style={{
                backgroundColor: '#C9A84C',
                color: '#111111',
              }}
            >
              Baixar CV
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span
              className="block w-6 h-0.5 transition-all duration-300"
              style={{
                backgroundColor: '#C9A84C',
                transform: menuOpen ? 'translateY(8px) rotate(45deg)' : 'none',
              }}
            />
            <span
              className="block w-6 h-0.5 transition-all duration-300"
              style={{
                backgroundColor: '#C9A84C',
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-6 h-0.5 transition-all duration-300"
              style={{
                backgroundColor: '#C9A84C',
                transform: menuOpen ? 'translateY(-8px) rotate(-45deg)' : 'none',
              }}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300"
        style={{ maxHeight: menuOpen ? '400px' : '0' }}
      >
        <div
          className="px-4 pt-2 pb-4 flex flex-col gap-1"
          style={{ backgroundColor: '#111111' }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              smooth={true}
              duration={500}
              offset={-64}
              spy={true}
              onClick={() => setMenuOpen(false)}
              className="text-gray-300 py-2 px-3 rounded-lg text-sm font-medium cursor-pointer hover:text-white hover:bg-white/5 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="/portfolio/cv-guilherme-santana.pdf"
            download
            className="mt-2 text-center px-4 py-2 rounded-full text-sm font-semibold"
            style={{ backgroundColor: '#C9A84C', color: '#111111' }}
          >
            Baixar CV
          </a>
        </div>
      </div>
    </nav>
  )
}
