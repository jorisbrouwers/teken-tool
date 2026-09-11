// Kort, zelfstandig UI-feedback-tekstje ("floaty toast"): verschijnt op een
// gegeven schermpositie, zakt langzaam naar beneden terwijl het vervaagt, en
// ruimt zichzelf daarna op. Bedoeld voor feedback op het moment dat er geen
// blijvend UI-element (zoals de Gebouweigenschappen-sidebar, die na een
// canvas-tik alweer gesloten kan zijn) meer zichtbaar is om iets te
// bevestigen — bv. "referentiepunt gekoppeld" of een foutmelding, vlak bij
// de aangetikte scharnier i.p.v. bij een (op een tablet met pen toch niet
// betrouwbare) cursorpositie.
//
// Bewust DOM-gebaseerd (geen Konva-tekst): geen afhankelijkheid van de
// stage-transform (de tekst hoeft niet met de content mee te pannen/zoomen,
// hij is er maar heel even), dezelfde aanpak als de bestaande fixed-position
// overlays (maat-pill, object-toolbar). Los bestand i.p.v. een functie in
// CanvasView.jsx zodat het ook vanuit andere plekken herbruikbaar is.
import './Canvas.css'

// Moet lang genoeg blijven staan om te kunnen lezen — de animatie zelf
// (Canvas.css, floaty-text-fall) houdt de tekst het grootste deel van deze
// tijd stilstaand/leesbaar en valt/vervaagt pas in het laatste stuk.
const FLOATY_TEXT_LIFETIME_MS = 3000

// anchor: 'center' (default) centreert de tekst horizontaal op x (translate
// -50%); 'left' laat x de linkerkant zijn — voor plekken waar je 'm tegen een
// vaste UI-hoek aan wilt zetten (bv. de export-waarschuwing naast de FAB-stack).
export function spawnFloatyText(x, y, text, tone = 'neutral', anchor = 'center') {
  const el = document.createElement('div')
  el.className = `floaty-text${tone === 'error' ? ' floaty-text-error' : ''}${anchor === 'left' ? ' floaty-text-left' : ''}`
  el.textContent = text
  el.style.left = `${x}px`
  el.style.top = `${y}px`
  document.body.appendChild(el)
  const remove = () => el.remove()
  el.addEventListener('animationend', remove, { once: true })
  // Vangnet: als de animatie om wat voor reden dan ook niet afvuurt (bv. de
  // tab staat op de achtergrond), toch opruimen.
  setTimeout(remove, FLOATY_TEXT_LIFETIME_MS)
}
