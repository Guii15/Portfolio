import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Navbar from './Navbar'

describe('Navbar', () => {
  it('mostra o nome', () => {
    render(<Navbar />)
    expect(screen.getByText('Guilherme Santana')).toBeInTheDocument()
  })

  it('tem os links das seções', () => {
    render(<Navbar />)
    for (const nome of ['Sobre', 'Projetos', 'Stack', 'Histórico', 'Formação', 'Console']) {
      expect(screen.getAllByText(nome).length).toBeGreaterThan(0)
    }
  })

  it('tem o botão Baixar CV', () => {
    render(<Navbar />)
    expect(screen.getAllByText('Baixar CV').length).toBeGreaterThan(0)
  })

  it('abre e fecha o menu no celular', () => {
    render(<Navbar />)
    const botao = screen.getByRole('button', { name: 'Menu' })
    expect(botao).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(botao)
    expect(screen.getByRole('button', { name: 'Fechar' })).toHaveAttribute('aria-expanded', 'true')
  })
})
