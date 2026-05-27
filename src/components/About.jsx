import { motion } from 'framer-motion'
import { personal } from '../data/personal'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const stats = [
  { value: '3+',  label: 'Projetos entregues'  },
  { value: '10+', label: 'Tecnologias'          },
  { value: '1+',  label: 'Ano de experiência'   },
  { value: '100%', label: 'Dedicação'           },
]

export default function About() {
  return (
    <section
      id="sobre"
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
            Quem sou eu
          </p>
          <h2 className="text-4xl font-bold" style={{ color: '#1C1C1E' }}>
            Sobre mim
          </h2>
          <div className="w-12 h-0.5 mx-auto mt-4" style={{ backgroundColor: '#C9A84C' }} />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Avatar */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex justify-center"
          >
            {personal.photo ? (
              <img
                src={personal.photo}
                alt={personal.name}
                className="w-64 h-64 rounded-full object-cover"
                style={{ border: '3px solid #C9A84C' }}
              />
            ) : (
              <div
                className="w-64 h-64 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#1C1C1E', border: '3px solid #C9A84C' }}
              >
                <span className="text-6xl font-bold" style={{ color: '#C9A84C' }}>
                  GS
                </span>
              </div>
            )}
          </motion.div>

          {/* Texto + Stats */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p
              className="text-base leading-relaxed mb-8"
              style={{ color: '#6B6B6B' }}
            >
              Desenvolvedor de software baseado em Varginha, MG. Atuo na{' '}
              <span className="font-semibold" style={{ color: '#1C1C1E' }}>
                Binário Tecnologia
              </span>{' '}
              desenvolvendo integrações entre o ERP WinThor e plataformas de
              e-commerce. Cursando Tecnólogo em Análise e Desenvolvimento de
              Sistemas pela{' '}
              <span className="font-semibold" style={{ color: '#1C1C1E' }}>
                UNIASSELVI
              </span>
              .
            </p>

            {/* Stat cards */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="p-4 rounded-xl text-center"
                  style={{
                    backgroundColor: '#E8E8E4',
                    border: '1px solid #D0D0CC',
                  }}
                >
                  <p className="text-3xl font-bold" style={{ color: '#C9A84C' }}>
                    {stat.value}
                  </p>
                  <p className="text-sm mt-1" style={{ color: '#6B6B6B' }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
