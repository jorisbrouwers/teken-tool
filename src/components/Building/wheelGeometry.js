import { useEffect, useRef, useState } from 'react'

// Gedeelde geometrie + rotatie-logica voor de twee windrichting-wielen
// (NorthWheel = oriëntatie, FrontFacadeWheel = voorgevel). Beide tekenen exact
// hetzelfde 8-segmentenwiel; alleen wat ze met de rotatie en de wijzer doen
// verschilt. Hier bij elkaar zodat die twee componenten niet uit elkaar lopen.

export const DIRECTIONS = [
  { angle: 0, label: 'N' },
  { angle: 45, label: 'NO' },
  { angle: 90, label: 'O' },
  { angle: 135, label: 'ZO' },
  { angle: 180, label: 'Z' },
  { angle: 225, label: 'ZW' },
  { angle: 270, label: 'W' },
  { angle: 315, label: 'NW' },
]

export const CX = 50, CY = 42, R = 32, R_LABEL = 23
export const ROTATE_TRANSITION = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'

// Ruime viewBox, symmetrisch rond het wielmidden (50, 42): de voorgevel-wijzer
// zwaait naar alle 8 richtingen en moet ook naar boven binnen beeld blijven.
// Beide wielen gebruiken dezelfde viewBox zodat de cirkels naast elkaar exact
// uitlijnen.
export const VIEWBOX = '-6 -14 112 112'

export const norm360 = (a) => ((a % 360) + 360) % 360

// 0° = boven (noord), oplopend met de klok mee — standaard kompasconventie.
export function polar(r, angleDeg) {
  const rad = (angleDeg - 90) * Math.PI / 180
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) }
}

export function wedgePath(angleStart, angleEnd) {
  const p0 = polar(R, angleStart)
  const p1 = polar(R, angleEnd)
  return `M ${CX} ${CY} L ${p0.x} ${p0.y} A ${R} ${R} 0 0 1 ${p1.x} ${p1.y} Z`
}

// Normaliseert naar (-180, 180] — voor de kortste draairichting.
export function shortestDelta(delta) {
  return ((delta + 180) % 360 + 360) % 360 - 180
}

// Onbegrensde (accumulerende) rotatie-state zodat de CSS-transform altijd de
// kortste weg interpoleert — anders zou bv. NW (315°) → N (0°) bijna een hele
// cirkel terugdraaien i.p.v. één stapje verder. `value` is de kompashoek die
// naar de onderwijzer (Z-positie, schermhoek 180°) moet draaien.
export function useWheelRotation(value) {
  const targetMod = (180 - value + 360) % 360
  const rotationRef = useRef(targetMod)
  const [rotation, setRotation] = useState(targetMod)

  useEffect(() => {
    const delta = shortestDelta(targetMod - (((rotationRef.current % 360) + 360) % 360))
    const next = rotationRef.current + delta
    rotationRef.current = next
    setRotation(next)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return rotation
}
