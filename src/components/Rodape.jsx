import { personal } from '../data/personal'

export default function Rodape() {
  return (
    <footer className="bg-superficie text-white/85">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-6 text-base sm:px-8">
        <p>
          © 2026 {personal.name}. {personal.location}.
        </p>
        <a href="#topo" className="font-semibold underline underline-offset-4 hover:text-marca">
          Voltar ao topo
        </a>
      </div>
    </footer>
  )
}
