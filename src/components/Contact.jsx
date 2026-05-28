import { motion } from 'framer-motion'
import { SiGithub, SiInstagram, SiWhatsapp } from 'react-icons/si'
import { FaLinkedinIn } from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md'
import { personal } from '../data/personal'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Contact() {
  return (
    <section
      id="contato"
      className="py-32 px-4"
      style={{ backgroundColor: '#1C1C1E' }}
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
            Vamos conversar
          </p>
          <h2 className="text-4xl font-bold text-white mb-4">
            Entre em{' '}
            <span style={{ color: '#C9A84C' }}>contato</span>
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Estou disponível para oportunidades de estágio, trainee e vagas júnior.
            Pode me chamar por email ou pelas redes sociais!
          </p>
          <div className="w-12 h-0.5 mx-auto mt-6" style={{ backgroundColor: '#C9A84C' }} />
        </motion.div>

        {/* Links sociais */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex justify-center gap-6 mb-10"
        >
          <a
            href={`mailto:${personal.email}`}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm"
          >
            <MdEmail size={20} style={{ color: '#C9A84C' }} />
            {personal.email}
          </a>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex justify-center gap-5 mb-12"
        >
          {[
            { href: personal.github,   Icon: SiGithub,   label: 'GitHub'   },
            { href: personal.linkedin, Icon: FaLinkedinIn, label: 'LinkedIn' },
            { href: `mailto:${personal.email}`, Icon: MdEmail, label: 'Email' },
          ].map(({ href, Icon, label }) => (
            <a
              key={label}
              href={href}
              target={label !== 'Email' ? '_blank' : undefined}
              rel="noopener noreferrer"
              aria-label={label}
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{
                border: '1px solid #C9A84C',
                color: '#C9A84C',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#C9A84C'
                e.currentTarget.style.color = '#111111'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = '#C9A84C'
              }}
            >
              <Icon size={20} />
            </a>
          ))}
        </motion.div>

        {/* Formulário via Formspree */}
        <motion.form
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          action="https://formspree.io/f/YOUR_FORM_ID"
          method="POST"
          className="flex flex-col gap-4"
          style={{ maxWidth: '640px', margin: '0 auto' }}
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="nome"
              placeholder="Seu nome"
              required
              className="px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
              style={{
                backgroundColor: '#2C2C2E',
                border: '1px solid #3C3C3E',
                color: '#FFFFFF',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#C9A84C')}
              onBlur={(e) => (e.currentTarget.style.borderColor = '#3C3C3E')}
            />
            <input
              type="email"
              name="email"
              placeholder="Seu email"
              required
              className="px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
              style={{
                backgroundColor: '#2C2C2E',
                border: '1px solid #3C3C3E',
                color: '#FFFFFF',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#C9A84C')}
              onBlur={(e) => (e.currentTarget.style.borderColor = '#3C3C3E')}
            />
          </div>
          <textarea
            name="mensagem"
            placeholder="Sua mensagem..."
            rows={5}
            required
            className="px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all duration-200"
            style={{
              backgroundColor: '#2C2C2E',
              border: '1px solid #3C3C3E',
              color: '#FFFFFF',
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#C9A84C')}
            onBlur={(e) => (e.currentTarget.style.borderColor = '#3C3C3E')}
          />
          <button
            type="submit"
            className="py-3 rounded-full font-semibold text-sm transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
            style={{ backgroundColor: '#C9A84C', color: '#111111' }}
          >
            Enviar mensagem
          </button>
        </motion.form>

        {/* Footer */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center text-xs mt-12"
          style={{ color: '#4B4B4D' }}
        >
          © {new Date().getFullYear()} Guilherme Oliveira Santana — Feito com React + Vite
        </motion.p>
      </div>
    </section>
  )
}
