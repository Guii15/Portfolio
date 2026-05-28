import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SiGithub } from 'react-icons/si'
import { projects } from '../data/projects'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const filters = [
  { key: 'all',       label: 'Todos'      },
  { key: 'fullstack', label: 'Full Stack' },
  { key: 'backend',   label: 'Back-end'   },
]

function ProjectPlaceholder({ title }) {
  return (
    <div
      className="w-full h-40 rounded-xl flex items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #1C1C1E 0%, #2C2C2E 50%, #A07830 100%)',
      }}
    >
      <span className="text-white font-semibold text-center px-4 text-sm leading-relaxed">
        {title}
      </span>
    </div>
  )
}

function ProjectCard({ project, featured }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="rounded-xl overflow-hidden flex flex-col"
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #E0E0E0',
      }}
    >
      {/* Imagem / Placeholder */}
      <div className="p-4 pb-0">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-40 object-cover rounded-xl"
          />
        ) : (
          <ProjectPlaceholder title={project.title} />
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        {/* Featured badge */}
        {project.featured && (
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full self-start mb-3"
            style={{ backgroundColor: '#C9A84C20', color: '#A07830', border: '1px solid #C9A84C' }}
          >
            Destaque
          </span>
        )}

        <h3 className="font-bold text-lg mb-2" style={{ color: '#1C1C1E' }}>
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: '#6B6B6B' }}>
          {project.longDescription}
        </p>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: '#F2F2F0',
                color: '#6B6B6B',
                border: '1px solid #D0D0CC',
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200"
            style={{
              backgroundColor: '#1C1C1E',
              color: '#FFFFFF',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2C2C2E')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1C1C1E')}
          >
            <SiGithub size={14} />
            GitHub
          </a>
          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200"
              style={{
                border: '1px solid #C9A84C',
                color: '#C9A84C',
              }}
            >
              Demo
            </a>
          ) : (
            <span
              className="px-3 py-1.5 rounded-lg text-sm font-medium opacity-40 cursor-not-allowed"
              style={{ border: '1px solid #C9A84C', color: '#C9A84C' }}
            >
              Demo
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filtered = projects.filter(
    (p) => activeFilter === 'all' || p.category === activeFilter
  )

  return (
    <section
      id="projetos"
      className="py-32 px-4"
      style={{ backgroundColor: '#F2F2F0' }}
    >
      <div className="container-inner">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold tracking-widest uppercase mb-2" style={{ color: '#C9A84C' }}>
            O que construí
          </p>
          <h2 className="text-4xl font-bold" style={{ color: '#1C1C1E' }}>
            Projetos
          </h2>
          <div className="w-12 h-0.5 mx-auto mt-4" style={{ backgroundColor: '#C9A84C' }} />
        </motion.div>

        {/* Filtros */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex gap-3 justify-center mb-10"
        >
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-200"
              style={{
                backgroundColor: activeFilter === f.key ? '#C9A84C' : 'transparent',
                color: activeFilter === f.key ? '#111111' : '#6B6B6B',
                border: `1px solid ${activeFilter === f.key ? '#C9A84C' : '#D0D0CC'}`,
              }}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
