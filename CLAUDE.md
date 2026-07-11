# CLAUDE.md — Notitie-app (intern gebruik)

## Ontwikkelomgeving

| Aspect | Details |
|---|---|
| Dev-server | Vite (`npm run dev`, draait met `--host`), op de ontwikkel-pc |
| Tablet-toegang | Via lokaal IP: `http://192.168.x.x` — **geen HTTPS** |
| Primaire testapparaten | Windows-tablet/Surface (pen + touch, Edge/Chromium) en iPad (Apple Pencil, WebKit) |
| Performance-referentie | De pc is véél sneller dan de tablets; performance altijd op tablet beoordelen |

### Gevolgen van plain HTTP (geen secure context)

- `crypto.randomUUID()` werkt **niet** — gooit `TypeError` op tablet
- `crypto.subtle` en andere secure-context-API's werken niet
- Gebruik altijd de bestaande `Math.random()`-gebaseerde `generateId()`-helper (staat in `CanvasView.jsx` en `db.js`) — geen nieuwe secure-context-afhankelijkheden introduceren

---

## Projectoverzicht

Een browser-gebaseerde notitie-app als intern alternatief voor Microsoft OneNote, gericht op aantekeningen en (schaal)plattegronden op Windows- en iOS-tablets. Volledig offline; geen server, geen accounts. Interne medewerkers van één bedrijf.

---

## Technische stack

| Onderdeel | Keuze | Toelichting |
|---|---|---|
| Framework | React 18 | UI/state; canvas-logica draait grotendeels buiten React om |
| Canvas | **Konva 9** | Stage + layers; níet Fabric.js (oude docs verwijzen daar soms naar) |
| Freehand | perfect-freehand | Outline-polygoon van pen-strokes (drukgevoelig) |
| Math parser | math.js | Expressies in tekstvakken (`2*5=` → `10`) |
| Lokale DB | Dexie 4 (IndexedDB) | Alles via `src/db/db.js`; nooit direct in componenten |
| PDF-export | jsPDF | Automatisch kader om inhoud, optioneel met maat-pills |
| Zip | fflate | `.jnote` = zip met `note.json` |
| Bundler | Vite 6 | |
| Styling | Gewone CSS | Geen framework |

---

## Architectuur — kerncomponenten

| Bestand | Verantwoordelijkheid |
|---|---|
| `src/components/Canvas/CanvasView.jsx` | Hart van de app (~3000 regels). Konva Stage + layers, alle pointer-afhandeling (Effect 2 = raw events/touch/nav, Effect 3 = Konva-events/tekenen/selectie), tekengereedschappen, selectie/transformer, lijnsysteem-handlers, object-toolbar |
| `src/components/Canvas/LineGizmo.jsx` | Bewerkings-gizmo voor het lijnsysteem: endpoint-handles, fan-knoppen (extrude), snapping, maatinvoer |
| `src/components/Canvas/MeasurementLabels.jsx` | Maat-pills (DOM-overlay) op alle lijnsegmenten, rAF-loop |
| `src/components/Canvas/HingeDecorations.jsx` | Scharnier-stippen op lijn-eindpunten, eigen Konva-layer, rAF-loop met change-detectie |
| `src/components/Canvas/usePersistence.js` | Debounced/idle-geplande volledige snapshot-save naar IndexedDB + in-memory `liveSnapshotCache` |
| `src/components/Canvas/useHistory.js` | Snapshot-gebaseerde undo/redo (max 50), exclusief Images |
| `src/components/Canvas/konvaSerialize.js` | (De)serialisatie van de mainLayer; centrale plek voor wat wél/niet wordt opgeslagen |
| `src/components/Canvas/viewportCulling.js` | Viewport-culling (zie performance-architectuur) |
| `src/components/Canvas/useGrid.js` | Rasterachtergrond op los canvas; exporteert `GRID_SIZE = 25` (1 gridcel = 1 m) |
| `src/components/Minimap/Minimap.jsx` | Thumbnail-navigatie; idle-gedeferde regeneratie |
| `src/db/db.js` | Alle Dexie/IndexedDB-toegang (notes, app_settings, prullenbak, templates) |
| `src/export/exportJnote.js` / `exportPdf.js` | Export; `src/import/importJnote.js` import |
| `src/platform/inputConfig.js` | Platform-specifieke peninstellingen (iOS vs. Windows: druk-exponent, streamline, predicted events) |

### Canvas-opbouw (van onder naar boven)

1. Grid-canvas (raw `<canvas>`, buiten Konva)
2. Konva `mainLayer` — álle persistente content + Transformer (+ tijdelijke gizmo-handles/guides)
3. Konva `hingeLayer` (HingeDecorations, listening:false)
4. Konva `drawingLayer` — shape-previews, rubber-band (listening:false)
5. Draw-canvas (raw `<canvas>`) — live pen-stroke, buiten Konva om (perfect-freehand → Canvas2D)
6. DOM-overlays: maat-pills, LineGizmo-fanknoppen, object-toolbar, minimap

### Lijnsysteem (plattegronden)

Een "muur" is een 2-punts `Konva.Line`/`Arrow`. Segmenten zijn geketend via attrs `_ep0conn`/`_ep1conn` = `{id, ep}` (bidirectioneel). Hiërarchie-traversal = recursieve walk over deze verwijzingen. Maten: lengte in px / `GRID_SIZE` = meters.

---

## Performance-architectuur (BELANGRIJK — niet regressen)

Ontstaan uit tablet-profiling (juli 2026). Volledige feiten en metingen: **`PERFORMANCE_AUDIT.md`**; hypotheses + bevestigde oorzaken: **`PERFORMANCE_HYPOTHESES.md`** (map `performance/` bevat de profiler-screenshots).

Kerninvarianten:

1. **Attrs worden geserialiseerd.** Alles in `node.attrs` belandt in persistence/history/export. Runtime-status hoort in gewone JS-properties op de node (voorbeeld: `_culled`) of wordt gestript in `konvaSerialize.js`/`useHistory.js` (voorbeeld: `visible`). Gizmo-handles worden op naam (`lineGizmoHandle*`) uit saves gefilterd.
2. **Viewport-culling** (`viewportCulling.js`): off-screen nodes krijgen `visible(false)` aan het einde van elke navigatie (`endNav`). Renders van de vólledige inhoud (minimap, PDF-export) moeten door `withCulledVisible()` heen.
3. **Hit-canvas uit tijdens de pen-tool**: `mainLayer.listening(false)` (Effect 4) halveert elke draw. Consumers die tóch hit-detectie nodig hebben (pen-gomknop, vinger-tap, dubbelklik op tekst) herbouwen lazy via `hitTestAt()` / `eraseAtContainerPos()`.
4. **Peninvoer is heilig.** O(notitie)-taken (persistence-save, minimap-render) wachten via `penActivityRef` (timestamp) tot de pen ≥1,5 s stil is. Pen-events altijd via `getCoalescedEvents()` consumeren — gecoalescede punten weggooien maakt snelle rondingen hoekig.
5. **Navigatie via frozen canvas**: tijdens pan/zoom wordt de mainLayer-bitmap ge-CSS-transformeerd (`startNav`/`endNav`/`applyNavTransform`); geen Konva-redraws tijdens de gesture. Nieuwe navigatie-animaties via `animateNav`, niet met eigen `batchDraw`-loops.
6. **Stage-transform nooit muteren terwijl de Transformer nodes heeft** — elke `stage.scale()/position()` triggert per attached node een O(N) transformer-update → O(N²)-freeze (dit wás de bulk-move-freeze; zie Minimap voor het detach/re-attach-patroon).
7. **rAF-loops (pills, hinges, grid, gizmo) alleen werk laten doen bij verandering** (signature/key-vergelijking), nooit onvoorwaardelijk tekenen.
8. Undo/redo is snapshot-gebaseerd; persistence is een **volledige** save van de hele notitie als één IndexedDB-record (geen diff) — houd daar rekening mee bij feature-werk dat saves triggert.

---

## Functionaliteit — huidige staat

### Canvas & tekenen
- Infinite canvas (pan/zoom via stage-transform), rasterachtergrond aan/uit per notitie
- Vrij tekenen met drukgevoelige pen (perfect-freehand), meerdere kleuren/diktes/opacity, effen/gestreept/gestippeld
- Windows: `pointerrawupdate` (~240 Hz) + predicted events; iOS: coalesced pointermove (instellingen in `inputConfig.js`)
- Gum (pixel-nauwkeurig via hit-canvas) + pen-gomknop; vormen: rechthoek, ellips, lijn, pijl, L-vorm, driehoek (met hoek-snapping)
- Undo/redo (Ctrl+Z/Y), kopiëren/plakken/dupliceren, multi-select via rubber-band + bulk move

### Lijnsysteem (modulaire plattegronden)
- Lijn tekenen → stap voor stap uitbouwen via fan-knoppen (LineGizmo), endpoint-drag met endpoint/uitlijn/hoek-snapping
- Maat-pills op segmenten (tik = maat numeriek aanpassen), opmaak instelbaar, ook in PDF-export
- Scharnier-stippen op verbindingen (toggle in instellingen)

### Tekst, afbeeldingen, notities
- Tekstvakken met ingebouwde rekenmachine (math.js); dubbelklik om te bewerken
- Afbeeldingen: import (base64 in IndexedDB), schalen/roteren/spiegelen/bijsnijden, vergrendelen (wordt navigatie-anker), dubbel-tap = zoom naar afbeelding
- Notitielijst met handmatige volgorde, templates, hernoemen; zachte verwijdering + prullenbak (herstel tot 90 dagen)
- Instellingenmenu (o.a. snapping, pills, pill-stijl, scharnieren, druksensitiviteit) in `app_settings`
- Minimap met klik/sleep-navigatie; centreer-op-inhoud-knop; dubbel-tap op leeg canvas centreert daar

### Opslag & export
- Alles lokaal via Dexie (`notes`, `app_settings`), per apparaat, geen sync
- **PDF**: automatisch kader om inhoud + marge, optioneel grid en maat-pills
- **`.jnote`**: zip met `note.json` — import accepteert ook oude plain-JSON-bestanden; versie 1.0 (Fabric-era) wordt expliciet geweigerd

---

## Bestandsformaat — `.jnote` (versie 2.0)

Zip-bestand met daarin één `note.json`:

```json
{
  "version": "2.0",
  "title": "Projectnaam",
  "created": "…", "modified": "…",
  "settings": { "background": "grid", "zoom": 1.0, "pan": { "x": 0, "y": 0 } },
  "canvas": { "konva_snapshot": [ { "type": "Path", "attrs": { } } ] }
}
```

- `konva_snapshot` = platte array van `{type, attrs}` per node (uit `serializeLayer`); afbeeldingen als base64 in `attrs.src`
- Runtime-attrs (`visible`, gizmo-handles) worden bij serialisatie gestript — zie performance-invariant 1
- Versienummer altijd meeschrijven; migratielogica in `importJnote.js`

---

## Ontwikkelrichtlijnen

- Canvas-logica strikt gescheiden van UI-logica; componenten klein houden
- Alle IndexedDB-interacties via `src/db/db.js`; export in `export/`, import in `import/`
- Geen externe API-calls — volledig offline bruikbaar
- Commit-messages in het Nederlands, in de bestaande stijl (`-fix:`, `-nieuw:`, `-verbetering:`)
- Bij performance-gevoelige wijzigingen: de invarianten hierboven respecteren en op tablet verifiëren (profiling-werkwijze staat in `PERFORMANCE_HYPOTHESES.md`)
