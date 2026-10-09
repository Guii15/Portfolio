import { createContext, useContext } from 'react'

// pronta: a intro já passou (ou nem existe) e as animações do site podem começar.
export const ContextoIntro = createContext({ pronta: true })

export function useIntro() {
  return useContext(ContextoIntro)
}
