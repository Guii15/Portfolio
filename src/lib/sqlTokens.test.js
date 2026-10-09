import { describe, it, expect } from 'vitest'
import { tokenizar } from './sqlTokens'

describe('tokenizar', () => {
  it('reconstrói o texto original sem perder nada', () => {
    const sql = "SELECT UPPER(nome), 42 FROM t WHERE x = 'a''b' -- fim"
    expect(tokenizar(sql).map((t) => t.texto ?? t[1] ?? '').join('')).toBe(sql)
  })
})
