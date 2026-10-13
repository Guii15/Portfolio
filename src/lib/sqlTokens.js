// Divide um texto SQL em pedaços (palavra-chave, texto, número...) para colorir no editor.
const PALAVRAS = new Set(
  (
    'select from where join left right inner outer cross on group by order having limit offset as and or not in like glob ' +
    'between is null distinct case when then else end union all intersect except insert into values with asc desc exists ' +
    'cast create view table drop delete update set explain query plan default collate escape using natural'
  ).split(' '),
)

const REGEX =
  /(--[^\n]*|\/\*[\s\S]*?(?:\*\/|$))|('(?:[^']|'')*'?)|("(?:[^"]|"")*"?)|(\\[A-Za-z?]+|\.(?:tables|schema|help)\b)|(\b\d+(?:\.\d+)?\b)|([A-Za-z_][\w$]*)|(\s+)|([\s\S])/g

export function tokenizar(sql) {
  const tokens = []
  let m
  REGEX.lastIndex = 0
  while ((m = REGEX.exec(sql)) !== null) {
    const [texto, comentario, texto1, ident, meta, numero, palavra, espaco] = m
    if (comentario) tokens.push({ tipo: 'com', texto })
    else if (texto1) tokens.push({ tipo: 'str', texto })
    else if (ident) tokens.push({ tipo: 'id-aspas', texto })
    else if (meta) tokens.push({ tipo: 'kw', texto })
    else if (numero) tokens.push({ tipo: 'num', texto })
    else if (palavra) {
      const proximo = sql[REGEX.lastIndex]
      if (PALAVRAS.has(palavra.toLowerCase())) tokens.push({ tipo: 'kw', texto })
      else if (proximo === '(') tokens.push({ tipo: 'fn', texto })
      else tokens.push({ tipo: 'id', texto })
    } else if (espaco) tokens.push({ tipo: 'esp', texto })
    else tokens.push({ tipo: 'op', texto })
  }
  return tokens
}
