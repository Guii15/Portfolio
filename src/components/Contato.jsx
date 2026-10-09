import { useCallback, useMemo, useState } from 'react'
import emailjs from '@emailjs/browser'
import { SiGithub, SiInstagram, SiWhatsapp } from 'react-icons/si'
import { FaLinkedinIn } from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md'
import { personal } from '../data/personal'
import CelulaSql from './CelulaSql'
import { useBanco } from '../hooks/contextoBanco'
import { sqlMensagem } from '../lib/consultas'

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
  const { banco } = useBanco()
  const [dados, setDados] = useState({ nome: '', email: '', link: '', mensagem: '' })
  const sql = useMemo(() => sqlMensagem(dados), [dados])

  const mudar = (campoNome) => (e) => setDados((d) => ({ ...d, [campoNome]: e.target.value }))

  const executor = useCallback(
    (texto) =>
      banco.executarUsuario(texto, {
        aoInserirMensagem: async (linha) => {
          await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            {
              nome: String(linha.nome).trim(),
              email: String(linha.email).trim(),
              link: String(linha.link ?? '').trim() || 'Não informado',
              mensagem: String(linha.mensagem).trim(),
            },
            { publicKey: EMAILJS_PUBLIC_KEY },
          )
          return { enviado: true }
        },
      }),
    [banco],
  )

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

        <div className="min-w-0 lg:col-span-1">
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="nome" className="mb-1.5 block text-base font-semibold">Nome</label>
                <input id="nome" type="text" autoComplete="name" value={dados.nome} onChange={mudar('nome')} className={campo} />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-base font-semibold">E-mail</label>
                <input id="email" type="email" autoComplete="email" value={dados.email} onChange={mudar('email')} className={campo} />
              </div>
            </div>
            <div>
              <label htmlFor="link" className="mb-1.5 block text-base font-semibold">
                Link <span className="font-normal text-white/70">(opcional)</span>
              </label>
              <input id="link" type="url" value={dados.link} onChange={mudar('link')} className={campo} />
            </div>
            <div>
              <label htmlFor="mensagem" className="mb-1.5 block text-base font-semibold">Mensagem</label>
              <textarea id="mensagem" rows={4} value={dados.mensagem} onChange={mudar('mensagem')} className={campo + ' resize-y'} />
            </div>
          </div>

          <p className="mb-3 mt-6 text-base text-white/90">
            O que você digita vira este INSERT. Clique em Enviar para executá-lo: a linha entra na tabela e o e-mail chega para mim.
          </p>
          <div className="text-tinta">
            <CelulaSql
              arquivo="enviar_mensagem.sql"
              rotulo="INSERT gerado pelo formulário"
              sql={sql}
              onSql={() => {}}
              somenteLeitura
              autoExecutar={false}
              executor={executor}
              textoBotao="Enviar"
              minLinhas={4}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
