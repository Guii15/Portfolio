import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const experiences = [
  {
    company: 'Binário Tecnologia',
    role: 'Desenvolvedor de Software',
    period: '2024 — Presente',
    location: 'Varginha, MG',
    bullets: [
      'Desenvolvi pipeline de integração entre Oracle/WinThor e plataformas de e-commerce',
      'Automatizei processo de gestão de fotos de produtos com Python (Pillow + Pandas)',
      'Construí extrator de estoque com Selenium, eliminando trabalho manual de inventário',
      'Desenvolvi sistema RSVP com Flask, SQLite e integração WhatsApp',
    ],
  },
]

export default function Experience() {
  return (
    <section
      id="experiencia"
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
            Onde trabalhei
          </p>
          <h2 className="text-4xl font-bold" style={{ color: '#1C1C1E' }}>
            Experiência
          </h2>
          <div className="w-12 h-0.5 mx-auto mt-4" style={{ backgroundColor: '#C9A84C' }} />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Linha central */}
          <div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{ backgroundColor: '#C9A84C', opacity: 0.3 }}
          />

          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-8 mb-12"
            >
              {/* Dot */}
              <div
                className="absolute left-4 md:left-1/2 top-5 w-3 h-3 rounded-full -translate-x-1/2 ring-4"
                style={{
                  backgroundColor: '#C9A84C',
                  ringColor: '#E8E8E4',
                }}
              />

              {/* Lado esquerdo: empresa + período */}
              <div className="md:text-right md:pr-10 mb-4 md:mb-0">
                <h3 className="font-bold text-xl" style={{ color: '#1C1C1E' }}>
                  {exp.company}
                </h3>
                <p className="font-semibold text-sm mt-1" style={{ color: '#C9A84C' }}>
                  {exp.role}
                </p>
                <p className="text-sm mt-1" style={{ color: '#6B6B6B' }}>
                  {exp.period}
                </p>
                <p className="text-sm" style={{ color: '#6B6B6B' }}>
                  {exp.location}
                </p>
              </div>

              {/* Lado direito: bullets */}
              <div className="md:pl-10">
                <ul className="space-y-2">
                  {exp.bullets.map((b, j) => (
                    <li
                      key={j}
                      className="flex gap-2 text-sm leading-relaxed"
                      style={{ color: '#6B6B6B' }}
                    >
                      <span
                        className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: '#C9A84C' }}
                      />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
