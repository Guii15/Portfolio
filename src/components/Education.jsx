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

export default function Education() {
  return (
    <section
      id="formacao"
      className="py-24 px-4"
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

        <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {education.map((edu, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-xl"
              style={{
                backgroundColor: '#E8E8E4',
                border: '1px solid #D0D0CC',
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: edu.status === 'Em andamento' ? '#C9A84C20' : '#1C1C1E10',
                    color: edu.status === 'Em andamento' ? '#A07830' : '#6B6B6B',
                    border: `1px solid ${edu.status === 'Em andamento' ? '#C9A84C' : '#D0D0CC'}`,
                  }}
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
          ))}

          {/* Card placeholder para certificados futuros */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-xl flex flex-col items-center justify-center text-center"
            style={{
              backgroundColor: '#E8E8E4',
              border: '1px dashed #C9A84C',
              opacity: 0.6,
            }}
          >
            <span className="text-3xl mb-2" style={{ color: '#C9A84C' }}>+</span>
            <p className="text-sm font-medium" style={{ color: '#6B6B6B' }}>
              Cursos & certificados em breve
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
