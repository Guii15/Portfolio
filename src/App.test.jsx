import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'
import { projects } from './data/projects'

describe('App', () => {
  it('mostra o nome completo no título principal', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1, name: 'Guilherme Oliveira Santana' })).toBeInTheDocument()
  })

  it('lista todos os projetos e abre os detalhes ao clicar', () => {
    render(<App />)
    for (const p of projects) {
      expect(screen.getByRole('button', { name: new RegExp(p.title) })).toBeInTheDocument()
    }
    const primeiro = screen.getByRole('button', { name: new RegExp(projects[0].title) })
    expect(primeiro).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(primeiro)
    expect(primeiro).toHaveAttribute('aria-expanded', 'true')
  })

  it('tem o formulário de contato com os campos obrigatórios', () => {
    render(<App />)
    expect(screen.getByLabelText('Nome')).toBeRequired()
    expect(screen.getByLabelText('E-mail')).toBeRequired()
    expect(screen.getByLabelText('Mensagem')).toBeRequired()
  })
})
