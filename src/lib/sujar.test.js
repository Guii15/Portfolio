import { describe, it, expect } from 'vitest'
import { sujar, momentosDeLimpeza } from './sujar'

describe('sujar', () => {
  it('mantém o mesmo tamanho do texto original', () => {
    for (const t of ['Guilherme', 'Oliveira', 'Engenharia de dados com Python e SQL']) {
      expect(sujar(t, 3)).toHaveLength(t.length)
    }
  })

  it('preserva os espaços', () => {
    const t = 'Engenharia de dados'
    const s = sujar(t, 8)
    for (let i = 0; i < t.length; i++) {
      if (t[i] === ' ') expect(s[i]).toBe(' ')
    }
  })

  it('sempre gera o mesmo resultado para a mesma semente', () => {
    expect(sujar('Guilherme', 11)).toBe(sujar('Guilherme', 11))
  })

  it('estraga pelo menos uma letra', () => {
    expect(sujar('Guilherme', 11)).not.toBe('Guilherme')
  })

  it('troca letras acentuadas por encoding quebrado', () => {
    expect(sujar('ção', 1).slice(0, 2)).toBe('ÃÃ')
  })
})

describe('momentosDeLimpeza', () => {
  it('devolve um momento entre 0 e 1 para cada letra', () => {
    const m = momentosDeLimpeza('Santana', 5)
    expect(m).toHaveLength(7)
    expect(m.every((x) => x >= 0 && x <= 1)).toBe(true)
  })
})
