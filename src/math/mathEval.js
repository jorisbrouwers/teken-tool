import { evaluate } from 'mathjs'

// Evalueer expressies van de vorm "expr=" aan het einde van de tekst.
// Voorbeeld: "2*5=" → "2*5= 10"
// Bij fout: return de originele tekst ongewijzigd.
export function evaluateExpression(text) {
  const match = text.match(/^([\d\s+\-*/^().,%a-zA-Z]+)=\s*$/)
  if (!match) return text

  const expr = match[1].trim()
  if (!expr) return text

  try {
    const result = evaluate(expr)
    if (typeof result !== 'number' && typeof result !== 'bigint') return text
    const formatted = Number.isInteger(result) ? String(result) : String(parseFloat(result.toFixed(10)))
    return `${expr}= ${formatted}`
  } catch {
    return text
  }
}
