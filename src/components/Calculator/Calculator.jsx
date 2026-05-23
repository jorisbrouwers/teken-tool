import { useState } from 'react'
import { evaluate } from 'mathjs'
import './Calculator.css'

const BUTTONS = [
  ['(', ')', 'C', '/'],
  ['7', '8', '9', '*'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '+'],
  ['⌫', '0', '.', '='],
]

function calcEval(expr) {
  try {
    const result = evaluate(expr)
    if (typeof result !== 'number' && typeof result !== 'bigint') return 'Fout'
    const n = typeof result === 'bigint' ? Number(result) : result
    return Number.isInteger(n) ? String(n) : String(parseFloat(n.toFixed(10)))
  } catch {
    return 'Fout'
  }
}

function btnClass(label) {
  const cls = ['calc-btn']
  if (label === '=')              cls.push('calc-btn--eq')
  if (label === 'C' || label === '⌫') cls.push('calc-btn--clear')
  if (['+', '-', '*', '/'].includes(label)) cls.push('calc-btn--op')
  return cls.join(' ')
}

export default function Calculator({ onClose }) {
  const [expr, setExpr]     = useState('')
  const [result, setResult] = useState('')

  function handleButton(label) {
    if (label === 'C')  { setExpr(''); setResult(''); return }
    if (label === '⌫')  { setExpr(e => e.slice(0, -1)); setResult(''); return }
    if (label === '=')  { setResult(calcEval(expr)); return }
    setExpr(e => e + label)
    setResult('')
  }

  return (
    <div className="calc-panel" onPointerDown={e => e.stopPropagation()}>
      <div className="calc-header">
        <span>Rekenmachine</span>
        <button className="calc-close" onClick={onClose} title="Sluiten">✕</button>
      </div>
      <div className="calc-input--display">
        {expr || <span className="calc-placeholder">0</span>}
      </div>
      {result && (
        <div className={`calc-result${result === 'Fout' ? ' calc-result--error' : ''}`}>
          = {result}
        </div>
      )}
      <div className="calc-grid">
        {BUTTONS.flat().map((label, i) => (
          <button
            key={i}
            className={btnClass(label)}
            onPointerDown={e => e.preventDefault()}
            onClick={() => handleButton(label)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
