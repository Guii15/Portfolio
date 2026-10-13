import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

// Sem o banco (falha ao carregar), o site precisa continuar inteiro com os resultados salvos.
vi.mock('./lib/carregarBanco', () => ({
  carregar: () => Promise.reject(new Error('sem wasm no teste')),
}))

import App from './App'
import { projetos } from './data/dados'

describe('App', () => {
  it('mostra o nome no título principal', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1, name: 'Guilherme Oliveira Santana' })).toBeInTheDocument()
  })

  it('lista todos os projetos e abre os detalhes ao clicar', () => {
    render(<App />)
    for (const p of projetos) {
      expect(screen.getByRole('button', { name: new RegExp(p.nome) })).toBeInTheDocument()
    }
    const primeiro = screen.getByRole('button', { name: new RegExp(projetos[0].nome) })
    expect(primeiro).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(primeiro)
    expect(primeiro).toHaveAttribute('aria-expanded', 'true')
  })

  it('o formulário de contato vira um INSERT na tabela mensagens', () => {
    render(<App />)
    fireEvent.change(screen.getByLabelText('Nome'), { target: { value: 'Ana' } })
    const editor = screen.getByLabelText('INSERT gerado pelo formulário')
    expect(editor.value).toContain('INSERT INTO mensagens')
    expect(editor.value).toContain("'Ana'")
  })

  it('tem o console com as perguntas de exemplo', () => {
    render(<App />)
    expect(screen.getByRole('button', { name: 'Quais projetos usam Python?' })).toBeInTheDocument()
  })
})
