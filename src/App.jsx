import { useCallback, useMemo, useState } from 'react'
import { MotionConfig } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Sobre from './components/Sobre'
import Projetos from './components/Projetos'
import Stack from './components/Stack'
import Historico from './components/Historico'
import Formacao from './components/Formacao'
import Console from './components/Console'
import BancoProvider from './components/BancoProvider'
import Contato from './components/Contato'
import Rodape from './components/Rodape'
import Intro from './components/Intro'
import { ContextoIntro } from './hooks/contextoIntro'
import { deveMostrarIntro } from './lib/movimento'

function App() {
  const [mostrarIntro, setMostrarIntro] = useState(() => deveMostrarIntro())
  const terminar = useCallback(() => setMostrarIntro(false), [])
  const intro = useMemo(() => ({ pronta: !mostrarIntro }), [mostrarIntro])

  return (
    <MotionConfig reducedMotion="user">
      <BancoProvider>
        <ContextoIntro.Provider value={intro}>
          <Navbar />
          <main>
            <Hero />
            <Sobre />
            <Projetos />
            <Stack />
            <Historico />
            <Formacao />
            <Console />
            <Contato />
          </main>
          <Rodape />
          {mostrarIntro && <Intro aoTerminar={terminar} />}
        </ContextoIntro.Provider>
      </BancoProvider>
    </MotionConfig>
  )
}

export default App
