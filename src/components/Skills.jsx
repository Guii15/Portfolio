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
      className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium cursor-default transition-all duration-200"
      style={{
        backgroundColor: '#2E2B28',
        border: '1px solid #3A3733',
        color: '#F0EDE8',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#C9A84C'
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.boxShadow = '0 4px 12px #C9A84C20'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#3A3733'
        e.currentTarget.style.transform = 'none'
        e.currentTarget.style.boxShadow = 'none'
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
      className="py-32 px-4"
      style={{ backgroundColor: '#252220' }}
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
          <h2 className="text-4xl font-bold" style={{ color: '#F0EDE8' }}>
            Habilidades
          </h2>
          <div className="w-12 h-0.5 mx-auto mt-4" style={{ backgroundColor: '#C9A84C' }} />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {Object.entries(skills).map(([group, items], groupIndex) => (
            <motion.div
              key={group}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: groupIndex * 0.1 }}
              className="p-6 rounded-2xl"
              style={{ backgroundColor: '#1E1C1A', border: '1px solid #3A3733' }}
            >
              <h3
                className="font-bold text-sm tracking-widest uppercase mb-5 pb-3"
                style={{ color: '#9B9895', borderBottom: '1px solid #3A3733' }}
              >
                {group}
              </h3>
              <div className="grid grid-cols-2 gap-2">
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
