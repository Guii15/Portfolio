import { motion } from 'framer-motion'
import * as Si from 'react-icons/si'
import { skills } from '../data/skills'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

function SkillBadge({ skill }) {
  const Icon = Si[skill.icon]
  return (
    <div
      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium cursor-default transition-all duration-200"
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #E0E0E0',
        color: '#1C1C1E',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#C9A84C'
        e.currentTarget.style.transform = 'translateY(-1px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#E0E0E0'
        e.currentTarget.style.transform = 'none'
      }}
    >
      {Icon && <Icon size={16} style={{ color: '#C9A84C', flexShrink: 0 }} />}
      <span>{skill.name}</span>
    </div>
  )
}

export default function Skills() {
  return (
    <section
      id="habilidades"
      className="py-24 px-4"
      style={{ backgroundColor: '#E8E8E4' }}
    >
      <div className="container-inner">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold tracking-widest uppercase mb-2" style={{ color: '#C9A84C' }}>
            O que domino
          </p>
          <h2 className="text-4xl font-bold" style={{ color: '#1C1C1E' }}>
            Habilidades
          </h2>
          <div className="w-12 h-0.5 mx-auto mt-4" style={{ backgroundColor: '#C9A84C' }} />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {Object.entries(skills).map(([group, items], groupIndex) => (
            <motion.div
              key={group}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: groupIndex * 0.1 }}
            >
              <h3
                className="font-bold text-sm tracking-widest uppercase mb-4 pb-2"
                style={{ color: '#6B6B6B', borderBottom: '1px solid #C9A84C' }}
              >
                {group}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <SkillBadge key={skill.name} skill={skill} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
