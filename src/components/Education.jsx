import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const education = [
  {
    institution: 'UNIASSELVI',
    course: 'Tecnólogo em Análise e Desenvolvimento de Sistemas',
    period: '2024 — Em andamento',
    status: 'Em andamento',
  },
]

const certifications = [
  {
    institution: 'DIO × Santander',
    course: 'Bootcamp Java — Trilha Back-end',
    status: 'Em andamento',
  },
  {
    institution: 'DevMedia',
    course: 'Formação Full Stack',
    status: 'Em andamento',
  },
  {
    institution: 'Udemy',
    course: 'Formação em Python',
    status: 'Concluído',
  },
  {
    institution: 'Curso em Vídeo',
    course: 'Lógica de Programação e Algoritmos',
    status: 'Concluído',
  },
]

const statusStyle = (status) =>
  status === 'Em andamento'
    ? { bg: '#C9A84C20', color: '#A07830', border: '1px solid #C9A84C' }
    : { bg: '#1C1C1E10', color: '#6B6B6B', border: '1px solid #D0D0CC' }

export default function Education() {
  return (
    <section
      id="formacao"
      className="py-32 px-4"
      style={{ backgroundColor: '#F2F2F0' }}
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
            Minha formação
          </p>
          <h2 className="text-4xl font-bold" style={{ color: '#1C1C1E' }}>
            Formação
          </h2>
          <div className="w-12 h-0.5 mx-auto mt-4" style={{ backgroundColor: '#C9A84C' }} />
        </motion.div>

        {/* Graduação */}
        <div style={{ maxWidth: '42rem', margin: '0 auto' }}>
          {education.map((edu, i) => {
            const s = statusStyle(edu.status)
            return (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl mb-6"
                style={{ backgroundColor: '#E8E8E4', border: '1px solid #D0D0CC' }}
              >
                <div className="flex items-start justify-between mb-3">
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: s.bg, color: s.color, border: s.border }}
                  >
                    {edu.status}
                  </span>
                </div>
                <h3 className="font-bold text-lg mb-1" style={{ color: '#1C1C1E' }}>
                  {edu.institution}
                </h3>
                <p className="text-sm leading-relaxed mb-2" style={{ color: '#6B6B6B' }}>
                  {edu.course}
                </p>
                <p className="text-xs font-medium" style={{ color: '#C9A84C' }}>
                  {edu.period}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Certificados */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-8 mt-12"
        >
          <p
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ color: '#6B6B6B' }}
          >
            Cursos & Certificações
          </p>
          <div className="w-8 h-px mx-auto mt-3" style={{ backgroundColor: '#C9A84C', opacity: 0.5 }} />
        </motion.div>

        <div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {certifications.map((cert, i) => {
            const s = statusStyle(cert.status)
            return (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-4 rounded-xl"
                style={{ backgroundColor: '#E8E8E4', border: '1px solid #D0D0CC' }}
              >
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded-full inline-block mb-3"
                  style={{ backgroundColor: s.bg, color: s.color, border: s.border }}
                >
                  {cert.status}
                </span>
                <p className="text-xs font-semibold mb-1" style={{ color: '#C9A84C' }}>
                  {cert.institution}
                </p>
                <p className="text-sm font-medium leading-snug" style={{ color: '#1C1C1E' }}>
                  {cert.course}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
