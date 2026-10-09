import { MotionConfig } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Sobre from './components/Sobre'
import Projetos from './components/Projetos'
import Stack from './components/Stack'
import Historico from './components/Historico'
import Formacao from './components/Formacao'
import Contato from './components/Contato'
import Rodape from './components/Rodape'

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Navbar />
      <main>
        <Hero />
        <Sobre />
        <Projetos />
        <Stack />
        <Historico />
        <Formacao />
        <Contato />
      </main>
      <Rodape />
    </MotionConfig>
  )
}

export default App
