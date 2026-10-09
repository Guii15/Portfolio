import { MotionConfig } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Sobre from "./components/Sobre";
import Projetos from "./components/Projetos";
import Stack from "./components/Stack";
import Historico from "./components/Historico";
import Formacao from "./components/Formacao";
import Console from "./components/Console";
import BancoProvider from "./components/BancoProvider";
import Contato from "./components/Contato";
import Rodape from "./components/Rodape";

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BancoProvider>
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
      </BancoProvider>
    </MotionConfig>
  );
}

export default App;
