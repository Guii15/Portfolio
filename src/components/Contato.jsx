import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { SiGithub, SiInstagram, SiWhatsapp } from 'react-icons/si'
import { FaLinkedinIn } from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md'
import { personal } from '../data/personal'

const EMAILJS_SERVICE_ID = 'service_9bnnn54'
const EMAILJS_TEMPLATE_ID = 'template_p6c2u46'
const EMAILJS_PUBLIC_KEY = 'TToKcFv2MqIjqm4qF'

const contatos = [
  { Icone: MdEmail, texto: personal.email, href: `mailto:${personal.email}` },
  { Icone: FaLinkedinIn, texto: 'LinkedIn', href: personal.linkedin },
  { Icone: SiGithub, texto: 'GitHub', href: personal.github },
  { Icone: SiWhatsapp, texto: personal.whatsappDisplay, href: personal.whatsapp },
  { Icone: SiInstagram, texto: 'Instagram', href: personal.instagram },
]

const campo =
  'w-full border border-white/50 bg-cobalto-escuro/70 px-3 py-2.5 text-lg text-white placeholder:text-white/50 focus:border-marca'

export default function Contato() {
  const formRef = useRef(null)
  const [status, setStatus] = useState('parado') // 'parado' | 'enviando' | 'enviado' | 'erro'

  const enviar = async (e) => {
    e.preventDefault()
    setStatus('enviando')
    const form = formRef.current
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          nome: form.nome.value.trim(),
          email: form.email.value.trim(),
          link: form.link.value.trim() || 'Não informado',
          mensagem: form.mensagem.value.trim(),
        },
        { publicKey: EMAILJS_PUBLIC_KEY },
      )
      setStatus('enviado')
      form.reset()
    } catch {
      setStatus('erro')
    }
  }

  return (
    <section id="contato" className="sobre-cobalto grade-celulas scroll-mt-14 bg-cobalto text-white">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-2">
        <div>
          <h2 className="text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl">Vamos conversar</h2>
          <p className="mt-5 max-w-md text-xl leading-relaxed text-white/90">
            Tem uma vaga ou um projeto com dados? Escreva pelo formulário ou use um dos contatos.
          </p>
          <ul className="mt-8 border-t border-white/30">
            {contatos.map(({ Icone, texto, href }) => (
              <li key={texto} className="border-b border-white/30">
                <a
                  href={href}
                  target={href.startsWith('mailto:') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 py-3.5 text-lg font-semibold hover:text-marca"
                >
                  <Icone size={20} aria-hidden="true" />
                  {texto}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <form ref={formRef} onSubmit={enviar} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="nome" className="mb-1.5 block text-base font-semibold">Nome</label>
              <input id="nome" name="nome" type="text" required autoComplete="name" className={campo} />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-base font-semibold">E-mail</label>
              <input id="email" name="email" type="email" required autoComplete="email" className={campo} />
            </div>
          </div>
          <div>
            <label htmlFor="link" className="mb-1.5 block text-base font-semibold">
              Link <span className="font-normal text-white/70">(opcional: LinkedIn, GitHub, site)</span>
            </label>
            <input id="link" name="link" type="url" className={campo} />
          </div>
          <div>
            <label htmlFor="mensagem" className="mb-1.5 block text-base font-semibold">Mensagem</label>
            <textarea id="mensagem" name="mensagem" rows={5} required className={campo + ' resize-y'} />
          </div>

          <button
            type="submit"
            disabled={status === 'enviando'}
            className="bg-marca px-7 py-3 text-lg font-bold text-tinta hover:bg-white disabled:opacity-60"
          >
            {status === 'enviando' ? 'Enviando…' : 'Enviar mensagem'}
          </button>

          <p role="status" className="min-h-6 text-lg font-semibold">
            {status === 'enviado' && 'Mensagem enviada. Respondo em breve.'}
            {status === 'erro' && `Não foi possível enviar. Tente de novo ou escreva para ${personal.email}.`}
          </p>
        </form>
      </div>
    </section>
  )
}
