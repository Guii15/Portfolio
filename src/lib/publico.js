// Monta o caminho de um arquivo da pasta /public respeitando o "base" do Vite
// (assim funciona no Vercel, em subpasta e também abrindo o index.html direto).
export function publico(arquivo) {
  return import.meta.env.BASE_URL + encodeURI(arquivo)
}
