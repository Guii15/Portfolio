import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-scroll'
import { SiGithub } from 'react-icons/si'
import { FaLinkedinIn } from 'react-icons/fa6'
import { personal } from '../data/personal'

const roles = [
  'Desenvolvedor Full Stack',
  'Especialista em Python',
  'React Developer',
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = roles[roleIndex]
    let timeout

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80)
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setRoleIndex((i) => (i + 1) % roles.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, deleting, roleIndex])

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: '#111111' }}
    >
      {/* Grid pattern de fundo */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A84C' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
          className="text-sm font-medium tracking-widest uppercase mb-4"
          style={{ color: '#C9A84C' }}
        >
          {personal.location}
        </motion.p>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 leading-tight"
        >
          {personal.name.split(' ')[0]}{' '}
          <span style={{ color: '#C9A84C' }}>
            {personal.name.split(' ').slice(1).join(' ')}
          </span>
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
          className="text-2xl sm:text-3xl font-semibold mb-6 h-10 flex items-center justify-center"
          style={{ color: '#E2C97E' }}
        >
          <span>{displayed}</span>
          <span
            className="ml-1 inline-block w-0.5 h-7 animate-pulse"
            style={{ backgroundColor: '#C9A84C' }}
          />
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
          className="text-lg text-gray-400 mb-10 max-w-xl mx-auto leading-relaxed"
        >
          {personal.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10"
        >
          <Link
            to="projetos"
            smooth={true}
            duration={500}
            offset={-64}
            className="px-8 py-3 rounded-full font-semibold cursor-pointer transition-all duration-200 hover:opacity-90 hover:scale-105"
            style={{ backgroundColor: '#C9A84C', color: '#111111' }}
          >
            Ver Projetos
          </Link>
          <a
            href="/portfolio/cv-guilherme-santana.pdf"
            download
            className="px-8 py-3 rounded-full font-semibold transition-all duration-200 hover:bg-white/5"
            style={{
              border: '1px solid #C9A84C',
              color: '#C9A84C',
            }}
          >
            Baixar CV
          </a>
        </motion.div>

        {/* Social icons */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
          className="flex gap-6 justify-center"
        >
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform duration-200"
            aria-label="GitHub"
          >
            <SiGithub size={28} />
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 transition-colors hover:scale-110 transform duration-200"
            onMouseEnter={(e) => (e.currentTarget.style.color = '#C9A84C')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '')}
            aria-label="LinkedIn"
          >
            <FaLinkedinIn size={28} />
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-gray-500 tracking-widest uppercase">Scroll</span>
        <div
          className="w-px h-12 animate-pulse"
          style={{ backgroundColor: '#C9A84C', opacity: 0.5 }}
        />
      </motion.div>
    </section>
  )
}
