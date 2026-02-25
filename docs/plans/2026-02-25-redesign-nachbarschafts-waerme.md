# Redesign: "Nachbarschafts-Wärme"

## Kontext & Ziel

meindeinunser.com bekommt ein Full Redesign. Bisher: funktionaler MVP mit kaltem Blau (#046BD2). Neues Ziel: warme, einladende Optik, die sich klar von nebenan.de (corporate-blau, werbelastig) abhebt. Positionierung als "die freundliche Alternative".

**Design-Richtung**: Warm & vertrauensvoll (Airbnb-meets-Vinted)
**Scope**: Full Redesign (Farben, Shadows, Layout, Bottom Nav, Komponenten)
**Navigation**: 4 Tabs Bottom Nav (Home, Suche, Erstellen, Profil)

---

## Farbpalette

| Rolle | Farbe | Hex | Tailwind-Äquivalent |
|---|---|---|---|
| Primary | Teal | `#0D9488` | teal-600 |
| Primary-Hover | Teal Dark | `#0F766E` | teal-700 |
| Primary-Light | Teal Soft | `#CCFBF1` | teal-50 |
| Warm-Akzent | Amber | `#F59E0B` | amber-500 |
| Warm-Akzent-Light | Amber Soft | `#FEF3C7` | amber-50 |
| Background | Warmstone | `#FAFAF9` | stone-50 |
| Surface | Weiß | `#FFFFFF` | white |
| Text | Stone Dark | `#1C1917` | stone-900 |
| Text-Light | Stone Mid | `#78716C` | stone-500 |
| Border | Stone Light | `#E7E5E4` | stone-200 |
| Border-Hover | Stone Med | `#D6D3D1` | stone-300 |
| Error | Rot | `#DC2626` | red-600 |
| Success | Grün | `#16A34A` | green-600 |

### Listing-Typ-Farben (beibehalten, passen zu warm)
- Verleihen: Amber `#F59E0B` / `#FEF3C7`
- Verschenken: Grün `#16A34A` / `#DCFCE7`
- Suchen: Violet `#7C3AED` / `#EDE9FE`

---

## Haptik-System

### Schatten (wärmer, weicher)
```
--shadow-card: 0 1px 3px rgba(28, 25, 23, 0.06), 0 1px 2px rgba(28, 25, 23, 0.04);
--shadow-card-hover: 0 8px 25px rgba(28, 25, 23, 0.08), 0 4px 10px rgba(28, 25, 23, 0.04);
--shadow-modal: 0 20px 40px rgba(28, 25, 23, 0.12), 0 8px 16px rgba(28, 25, 23, 0.06);
--shadow-button: 0 1px 2px rgba(13, 148, 136, 0.2);
```

### Border-Radius (größer, weicher)
- Cards: `rounded-2xl` (16px)
- Buttons: `rounded-xl` (12px)
- Inputs: `rounded-xl` (12px)
- Badges: `rounded-full` (beibehalten)
- Images: `rounded-xl` (12px)

### Transitions & Animationen
- Card Hover: `hover:-translate-y-1 hover:shadow-card-hover` (Lift-Effekt)
- Button Active: `active:scale-[0.98]` (Druckgefühl)
- Button Hover: Subtiler Gradient-Shift
- Page Transitions: Keine (zu komplex für MVP)

---

## Komponenten-Änderungen

### Button
- Primary: `bg-gradient-to-b from-teal-500 to-teal-600`, `shadow-button`, `active:scale-[0.98]`
- Secondary: `bg-teal-50 text-teal-700`
- Outline: Warm-Stone Border statt kalt-grau
- Größere Radii: `rounded-xl`

### Card
- `rounded-2xl`, wärmere Schatten
- Hover: `hover:-translate-y-1` + Shadow-Lift
- Kein Border mehr (Shadow stattdessen) oder sehr subtiler Border

### Badge
- Gleiche Farben, aber `font-semibold` statt `font-medium`
- Leicht größer: `px-3 py-1`

### Input/Select/Textarea
- `rounded-xl`, Focus: `ring-teal-500/20 border-teal-500`
- Wärmeres Placeholder: `stone-400`

### Avatar
- Ring bei Profil: `ring-2 ring-teal-200`

---

## Layout-Änderungen

### Bottom Navigation (Mobile, NEU)
- Fixiert am unteren Bildschirmrand, nur auf Mobile (`md:hidden`)
- 4 Tabs: Home (🏠), Suche (🔍), Erstellen (+), Profil (👤)
- "+"-Button: Amber/Orange, rund, leicht erhöht (physischer Button-Effekt)
- Aktiver Tab: Teal-Farbe + Dot-Indicator unten
- Header wird auf Mobile simpler (nur Logo + ggf. Benachrichtigungen)

### Header (Desktop)
- Logo-Farbe: Teal statt Blau
- Desktop bleibt wie gehabt (Navigation oben)
- Mobile: Hamburger-Menü entfällt → Bottom Nav übernimmt

### Hero-Section
- Gradient: `from-teal-50 via-warmstone to-background` (warmer Verlauf)
- Optional: Dezentes Wellenmuster-SVG als Trenner

### Footer
- Teal-Akzente statt Blau

---

## Seiten-Änderungen

### Homepage
- Hero mit wärmerem Gradient
- "So funktioniert's" Icons in Teal
- Kategorien-Cards mit Hover-Lift
- CTA-Banner: Teal-Gradient statt Blau

### Listing-Cards
- `rounded-2xl`, Hover-Lift
- Weichere Bildübergänge
- FavoriteButton behält aktuelle Position

### Listing-Detail
- Sidebar-Card mit wärmeren Schatten
- Kontakt-Sektion: Teal-Links statt Blau

### Profil-Dashboard
- Avatar-Ring in Teal
- Toggle-Switches: Teal statt Blau

### Auth-Seiten
- Teal-Akzente, wärmerer Look
- Gleiche Struktur

---

## Was NICHT geändert wird
- Keine neuen Seiten
- Keine Datenbank-Änderungen
- Keine neuen npm-Packages
- Keine Änderung an Server Actions / Queries
- Keine Änderung an Routing-Logik
- Cookie-Banner, Middleware, Auth-Flow bleiben identisch

---

## Implementierungs-Reihenfolge
1. `globals.css` — Neue Farbpalette + Schatten
2. UI-Komponenten — Button, Card, Badge, Input, Select, Textarea, Avatar
3. Layout — Header (Teal), Footer (Teal), neue BottomNav-Komponente
4. `layout.tsx` — BottomNav einbinden, Header-Anpassung
5. Seiten — Hero, Homepage, Cards, Auth, Profil, Detail
6. Build-Verification + Test
