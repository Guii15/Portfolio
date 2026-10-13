import { useEffect, useState } from 'react'
import { ContextoBanco } from '../hooks/contextoBanco'

// Carrega o SQLite em segundo plano. Enquanto isso (ou se falhar), a página mostra os dados salvos.
export default function BancoProvider({ children }) {
  const [estado, setEstado] = useState({ status: 'carregando', banco: null })

  useEffect(() => {
    let vivo = true
    import('../lib/carregarBanco')
      .then((m) => m.carregar())
      .then((banco) => {
        if (vivo) setEstado({ status: 'pronto', banco })
      })
      .catch(() => {
        if (vivo) setEstado({ status: 'erro', banco: null })
      })
    return () => {
      vivo = false
    }
  }, [])

  return <ContextoBanco.Provider value={estado}>{children}</ContextoBanco.Provider>
}
