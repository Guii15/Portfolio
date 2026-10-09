import { createContext, useContext } from 'react'

// status: 'carregando' | 'pronto' | 'erro'
export const ContextoBanco = createContext({ status: 'carregando', banco: null })

export function useBanco() {
  return useContext(ContextoBanco)
}
