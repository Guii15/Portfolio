import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import Navbar from "./Navbar"

describe("Navbar", () => {
  it("deve renderizar o logo", () => {
    render(<Navbar />)
    expect(screen.getByText("uilherme")).toBeInTheDocument()
  })

  it("deve renderizar os links de navegacao", () => {
    render(<Navbar />)
    const links = screen.getAllByText("Sobre")
    expect(links.length).toBeGreaterThan(0)
  })

  it("deve renderizar o botao Baixar CV", () => {
    render(<Navbar />)
    const botoes = screen.getAllByText("Baixar CV")
    expect(botoes.length).toBeGreaterThan(0)
  })
})
