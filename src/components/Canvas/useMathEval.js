import { useEffect } from 'react'
import { evaluateExpression } from '../../math/mathEval.js'

export function useMathEval(fabricRef, skipHistoryPush) {
  useEffect(() => {
    const canvas = fabricRef.current
    if (!canvas) return

    function handleTextChanged({ target }) {
      if (!target || target.type !== 'i-text') return
      const original = target.text
      const evaluated = evaluateExpression(original)
      if (evaluated !== original) {
        skipHistoryPush()
        target.set('text', evaluated)
        target.setCoords()
        canvas.renderAll()
      }
    }

    canvas.on('text:changed', handleTextChanged)
    return () => canvas.off('text:changed', handleTextChanged)
  }, [fabricRef, skipHistoryPush])
}
