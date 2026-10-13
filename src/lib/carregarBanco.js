// Carrega o SQLite (WebAssembly) uma única vez e devolve o banco do portfólio.
import initSqlJs from 'sql.js'
import wasmUrl from 'sql.js/dist/sql-wasm-browser.wasm?url'
import { criarBanco } from './banco'

let promessa

export function carregar() {
  if (!promessa) {
    promessa = initSqlJs({ locateFile: () => wasmUrl }).then(criarBanco)
    promessa.catch(() => {
      promessa = undefined // permite tentar de novo
    })
  }
  return promessa
}
