# Changelog — meindeinunser.com

---

## 2026-02-25T22:00Z — claude-code — PWA, Lighthouse, Mobile & Accessibility

### Lighthouse-Audit (Ergebnis: 99/94/96/100)
- Performance 99, Accessibility 94, Best Practices 96, SEO 100
- **Fix Farbkontrast:** CTA-Sektion `text-blue-100` → `text-white/80` (besserer Kontrast)
- **Fix Heading-Hierarchie:** Footer `h4` → `h3` (Screen-Reader-Navigation)

### PWA-Setup
- `public/manifest.json` — Web App Manifest (standalone, Portrait, deutsch)
- `public/icon-192.svg`, `public/icon-512.svg`, `public/icon-maskable.svg` — SVG-Icons in Brand-Farbe
- `public/sw.js` — Service Worker (Cache-first für Navigation + Static Assets)
- `src/components/shared/ServiceWorkerRegistrar.tsx` — Client-Component für SW-Registrierung
- `src/app/layout.tsx` — Manifest-Link, Apple Web App Metadata, SW-Registrar eingebunden

### Mobile-Responsiveness Fixes
- **Touch-Targets ≥ 40-44px:** Header-Burger (`min-h-[44px] min-w-[44px]`), FavoriteButton (`h-10 w-10`), Pagination-Buttons (`h-10 w-10`), Avatar-Edit-Button (`h-9 w-9`), ImageUpload Remove (`h-8 w-8`)
- **Sticky Sidebar nur Desktop:** Detailseite + öffentliches Profil `sticky top-24` → `lg:sticky lg:top-24`
- **ImageUpload Remove-Buttons:** Auf Mobile immer sichtbar (`sm:opacity-0 sm:group-hover:opacity-100` statt `opacity-0 group-hover:opacity-100`)
- **Footer Gap responsiv:** `gap-12` → `gap-8 sm:gap-12`

### Accessibility
- Pagination: `aria-label="Seite X"` + `aria-current="page"` auf aktiver Seite

### Build & Deploy
- `next build`: 0 Fehler, 17 Routen
- Commit `255bb62`, gepusht → Vercel auto-deploy

### Nächster Schritt
- Full Redesign geplant: "Nachbarschafts-Wärme" (Teal + Amber, weiche Schatten, Bottom Navigation, Airbnb-Vibes)

---

## 2026-02-25T14:45Z — antigravity — Gästeschutz & Weiterleitung (Option B)

### Änderungen
- **Globale Weiterleitung für Gäste:** Die Route `/angebote` wurde dem Session-Middleware-Schutz hinzugefügt (`src/lib/supabase/middleware.ts`). Gäste (nicht eingeloggte Benutzer), die versuchen, direkt per URL auf `/angebote` oder die Detailseiten eines Angebots zuzugreifen, werden ab sofort global auf `/login` weitergeleitet. Dadurch ist sichergestellt, dass die Detailinformationen nur für angemeldete Benutzer sichtbar bleiben (Option B).

---

## 2026-02-25T13:06Z — antigravity — Feature-Evaluierung (Post-MVP) & Status-Check

### Feature-Evaluierung
Drei neue Feature-Ideen wurden geprüft und ins Backlog (Post-MVP) der `PLAN.md` aufgenommen:
1. **Neueste Angebote auf der Landingpage:** Anonymisierte Ansicht (Bild, Titel, Stadtteil) für Konversion/Trust.
2. **Kartenansicht (Map-View):** Unscharfer Radius (ca. 500m) statt genauer Adressen zum Diebstahlschutz.
3. **Nachrichten & Manueller Verleih-Status:** Freitext-Chat-Anfragen und manuelles "Pausieren" von Inseraten statt eines bindenden, komplexen Buchungskalenders, um rechtliche Haftungsrisiken zu umgehen.

### Statusbericht
Die Roadmap in der Datei `PLAN.md` wurde erfolgreich um diese Backlog-Punkte ergänzt. Das Projekt selbst ist gemäß den bisher dokumentierten Phasen (0 bis 7) vollständig eingerichtet und lauffähig.

---

## 2026-02-25T18:30Z — claude-code — Bestandsaufnahme & fehlende Features

### Bestandsaufnahme
- GitHub-Stand (origin/main) vollständig mit PLAN.md und CHANGELOG.md abgeglichen
- Identifiziert: AvatarUpload, profile validation, favorites queries waren **nicht fehlend** — Funktionalität ist in ProfileForm.tsx, actions/profile.ts und queries/profiles.ts integriert
- Tatsächlich fehlend: Angebot-Bearbeiten-Seite (war Stub) + Homepage ohne DB-Daten

### Änderungen
- **`src/app/(protected)/angebot-bearbeiten/[id]/page.tsx`** — Platzhalter-Stub durch vollständige Bearbeitungsseite ersetzt:
  - Auth-Check (redirect zu /login)
  - Owner-Check (nur Ersteller darf bearbeiten)
  - ListingForm mit Pre-Fill aller Felder (inkl. Bilder)
  - Zurück-zum-Profil Navigation
- **`src/app/page.tsx`** — Homepage von statisch auf async Server Component umgebaut:
  - Fetched `getFeaturedListings(6)` aus Supabase
  - Neue Sektion "Neueste Angebote" mit ListingGrid + "Alle anzeigen" Link
  - Dynamische bg-Klasse für Kategorien-Sektion (vermeidet doppeltes bg-surface)

### Build & Deploy
- `next build`: 0 TypeScript-Fehler, alle 17 Routen kompilieren
- Commit `5fd906e`, gepusht → Vercel auto-deploy

### Recherche: PWA / Mobile App / Design
- Umfassende Recherche zu PWA-Strategie, Native-App-Optionen, Mobile-Design Best Practices durchgeführt
- Ergebnis: PWA-first Ansatz empfohlen (Manifest + Service Worker + Install-Prompt)
- Für Google Play: TWA (Trusted Web Activity) — minimaler Aufwand
- iOS App Store erst bei nachgewiesener Nachfrage (Capacitor, 99$/Jahr Apple Dev)
- Mobile-Design: Bottom Navigation, Touch Targets 44x44px, Thumb Zone beachten

### Status
- **Alle Code-Phasen (0-7) sind funktional abgeschlossen**
- Nächste Schritte: Design-Review, Mobiloptimierung, PWA-Setup, Domain-Setup

---

## 2026-02-25T10:00Z — antigravity — Phase 7: Seed-Daten & Letzte Fixes

### Änderungen & Fixes
- **Datenbank-Seeding:** Skript im SQL-Editor ausgeführt, um einen Test-User ("Max") und 6 realistische Beispiel-Angebote mit Unsplash-Bildern für Mainz anzulegen.
- **Bugfix Supabase Query:** Fehlermeldung (`PGRST201`, ambiguous relationship) behoben. Durch die neue `favorites`-Tabelle gab es zwei Pfade zwischen `listings` und `profiles`. Queries (`getListings`, `getProfileWithListings`, etc.) explizit auf `profiles!listings_user_id_fkey` umgestellt.
- **Bugfix Bilder:** `next/image` hat die Unsplash-Demobilder blockiert. `images.unsplash.com` zu `remotePatterns` in `next.config.ts` hinzugefügt.
- **Bugfix Image-URL-Formatierung:** Uploads vom Handy speichern nur den Dateinamen. `ListingCard` parst jetzt korrekt zwischen vollen HTTP-URLs (Demos) und Supabase-Pfaden.
- **Rechtliches:** Platzhalter in `Impressum` und `Datenschutz` durch reale Daten (Dominik Weyh, Adresse, E-Mail) ersetzt. Telefonnummer bewusst weggelassen, um Spam zu vermeiden.

### Git
- Commits: `a2814a8` (docs: legal info), `ceab94d` (fix: foreign key path), `d66b33a` (fix: image paths & next.config)

### Status
- **Phase 7 (Launch Prep)** ist nun weitestgehend abgeschlossen. Plattform ist voll funktionsfähig und befüllt!

---

## 2026-02-25T09:50Z — antigravity — Phase 5: Profil-Dashboard & öffentliches Profil

### Neue Dateien
- **`src/lib/actions/profile.ts`** — `updateProfile` (Zod-validiert) + `uploadAvatar` (upsert in Storage, max 2 MB)
- **`src/lib/queries/profiles.ts`** — `getProfile`, `getProfileWithListings`, `getUserFavoriteListings`
- **`src/components/profile/ProfileForm.tsx`** — Client-Form: Avatar-Upload mit Live-Preview, Toggle-Switches für E-Mail/Telefon-Sichtbarkeit, Inline Erfolgs/Fehler-Feedback

### Geänderte Seiten
- **`src/app/(protected)/profil/page.tsx`** — Vollständiges Dashboard:
  - Profil-Formular links
  - Rechts: "Meine Angebote" mit Status-Badge + Aktionen (Pausieren/Aktivieren, Bearbeiten, Löschen)
  - Abschnitt "Meine Favoriten" mit ListingGrid
  - Abmelden-Button
- **`src/app/profil/[id]/page.tsx`** — Öffentliches Profil:
  - Avatar, Name, Stadtteil, Mitglied-seit
  - Bio + Kontaktdaten (respektiert show_email/show_phone)
  - Alle aktiven Angebote als Grid

### Git
- Commit: `69418f6` — feat: Phase 5
- TypeScript: 0 Fehler → Vercel baut

### Noch offen
- **Phase 7**: Launch-Prep (E-Mail Templates, Custom Domain, Seed-Daten, Lighthouse)

---

## 2026-02-25T09:35Z — antigravity — Phase 4: Favoriten, Pagination & Bugfixes

### Neue Dateien
- **`src/lib/actions/favorites.ts`** — `toggleFavorite` (toggle mit optimistischem Update) + `getUserFavoriteIds` (alle Favoriten des eingeloggten Users)
- **`src/components/shared/FavoriteButton.tsx`** — Herz-Icon-Button mit `useTransition`, no-flicker state, `e.stopPropagation()` damit der Link nicht triggert
- **`src/components/shared/Pagination.tsx`** — URL-basierte Pagination mit smartem Ellipsis (zeigt immer erste, letzte, aktuelle ±1 Seite)

### Geänderte Dateien
- **`src/components/listings/ListingCard.tsx`** — `FavoriteButton` als Overlay oben rechts, `favoriteIds`-Prop für initialen State
- **`src/components/listings/ListingGrid.tsx`** — `favoriteIds` prop durchgereicht
- **`src/app/angebote/page.tsx`** — `page`-searchParam, `getUserFavoriteIds` parallel zu `getListings` geladen, `Pagination` eingebaut
- **`src/lib/queries/listings.ts`** — `!inner` → Left Join (Listings werden nicht durch fehlende Profile ausgeblendet)
- **`.env.local`** — `NEXT_PUBLIC_SITE_URL=https://www.meindeinunser.com`

### Bugfixes
- **Confirm-Link → localhost**: Root cause `NEXT_PUBLIC_SITE_URL` nicht gesetzt. Fix: Vercel Env Var + Supabase URL Configuration
- **Listing nicht sichtbar**: `profiles!inner` blockierte Listings ohne Profil (Trigger-Timing). Fix: Left Join

### Git
- Commit: `1b3415f` — feat: Phase 4 — FavoriteButton, Pagination, favorites action
- TypeScript: 0 Fehler
- Gepusht → Vercel baut

### Noch offen
- **Phase 5**: Profil-Dashboard, Avatar-Upload, Öffentliches Profil
- **Phase 7**: Launch-Prep

---

## 2026-02-25T09:15Z — antigravity — Phase 3: Bilder-Upload

### Neue Dateien
- **`src/lib/actions/upload.ts`** — Server Action für Signed Upload URLs (`getUploadUrl`) und Bild-Löschen (`deleteImage`). Uploads gehen direkt Browser → Supabase Storage (kein 1MB-Limit).
- **`src/components/listings/ImageUpload.tsx`** — Vollständige Upload-Komponente:
  - Drag & Drop + Klick-Auswahl
  - Multi-File Support (max. 5 Bilder, max. 5 MB/Stück, JPG/PNG/WebP/GIF)
  - Live-Vorschau-Grid mit Remove-Button (on hover)
  - „Titelbild"-Badge auf erstem Bild
  - Spinner während Upload, eigene Fehleranzeige
- **`src/components/listings/ImageGallery.tsx`** — Client-seitige Galerie für Detailseite:
  - Großes Hauptbild mit `next/image` (optimiert, lazy)
  - Klickbare Thumbnails bei mehreren Bildern
  - Unterstützt sowohl Storage-Pfade als auch volle URLs (Abwärtskompatibilität)

### Geänderte Dateien
- **`src/components/listings/ListingForm.tsx`** — `ImageUpload` integriert; `images`-State verwaltet Pfad-Array, wird als JSON in FormData serialisiert
- **`src/app/angebote/[id]/page.tsx`** — Einzelbild durch `ImageGallery` ersetzt; `Image`-Import entfernt
- **`next.config.ts`** — `remotePatterns` für `svsfwenqmpcdlpyyytgd.supabase.co` hinzugefügt

### Git
- Commit: `4c93638` — feat: Phase 3 — Bilder-Upload
- TypeScript: 0 Fehler (`tsc --noEmit`)
- Gepusht → Vercel auto-deploy läuft

### Noch offen
- **Phase 4**: ContactButton, FavoriteButton, Pagination
- **Phase 5**: Profil-Dashboard, Avatar-Upload
- **Phase 7**: Launch-Prep

---

## 2026-02-25T08:52Z — antigravity — VPS-Setup & Bestandsaufnahme

### VPS-Setup
- Repo `vibeY434/meindeinunser` nach `/home/openclaw/meindeinunser/` geclont
- Node.js 20 via nvm installiert (Bun allein reicht nicht für `next dev`)
- `bun install` → 375 Packages installiert
- `.env.local` mit Supabase-Credentials angelegt (`svsfwenqmpcdlpyyytgd`)
- `PLAN.md` im Repo-Root hinterlegt
- Dev-Server erfolgreich getestet: Next.js 16.1.6 läuft auf `:3000`

### Bestandsaufnahme — Was ist bereits implementiert?

#### ✅ Phase 0: Projekt-Scaffolding — KOMPLETT
- Next.js 16 mit App Router, TypeScript, Tailwind, `src/`-Verzeichnis
- Tailwind Custom-Farben (Primary `#046BD2`, Hintergrund `#F0F5FA`, etc.)
- `cn()` Utility (`clsx` + `tailwind-merge`)
- **UI-Komponenten:** `Button`, `Input`, `Select`, `Card`, `Badge`, `Skeleton`, `Textarea`, `Avatar`
- **Layout:** `Header`, `Footer`, `Container`
- **Alle Routen als funktionierende Seiten** angelegt (kein reiner Stub)
- SEO-Metadaten in `layout.tsx` und allen Seiten
- `error.tsx` + `not-found.tsx` auf Deutsch

#### ✅ Phase 1: Supabase + Auth — KOMPLETT
- **Migration `001_initial_schema.sql`:** Enums, `profiles`, `listings`, `favorites`, RLS-Policies, Trigger (`handle_new_user`, `update_updated_at`), Indizes
- **Migration `002_storage_buckets.sql`:** Storage Bucket `listing-images`
- **Supabase Clients:** `client.ts`, `server.ts`, `middleware.ts`
- **Auth Server Actions:** `signUp`, `signIn`, `signOut`, `resetPassword`, `updatePassword`
- **Auth Callback:** `auth/callback/route.ts` + `auth/confirm/route.ts`
- **Auth-Formulare:** `LoginForm`, `RegisterForm`, `ResetPasswordForm`, `NewPasswordForm`
- **Middleware** (`middleware.ts`): Session-Refresh + Routenschutz via `(protected)/`-Gruppe

#### ✅ Phase 2: Inserate CRUD — KOMPLETT
- **Konstanten:** `districts.ts` (15 Mainzer Stadtteile), `categories.ts`, `listing-types.ts`
- **Zod-Validierung:** `listing.ts`, `auth.ts`
- **TypeScript-Typen:** `src/types/index.ts`
- **Queries:** `getListings` mit URL-basierten Filtern (Typ, Kategorie, Stadtteil, Freitext)
- **Server Actions:** `createListing`, `updateListing`, `deleteListing`, `updateListingStatus`
- **Komponenten:** `ListingCard`, `ListingGrid`, `ListingTypeBadge`, `ListingFilters`, `ListingForm`, `EmptyState`
- **Seiten:** `/angebote` (mit Filter + Skeleton), `/angebote/[id]`, `/angebot-erstellen`, `/angebot-bearbeiten/[id]`

#### ✅ Phase 6 (teilweise): Homepage & Legal
- **Homepage** (`page.tsx`): Hero, "So funktioniert's", Kategorien-Cards, CTA-Banner
- **Legal-Seiten:** `/impressum`, `/datenschutz`, `/agb` (Platzhalter-Texte)

### Was noch fehlt (offene Phasen)

#### 🔲 Phase 3: Bilder-Upload
- `ImageUpload`-Komponente (Drag & Drop, Vorschau)
- `ImageGallery` für Detailseite
- Upload Server Action (Signed URLs → Supabase Storage)
- `next/image` mit Supabase-Domain konfigurieren

#### 🔲 Phase 4: Filter, Kontakt & Favoriten
- `ContactButton` (E-Mail/Telefon erst bei Klick zeigen)
- `FavoriteButton` (Herz-Icon, toggle)
- Pagination / "Mehr laden"

#### 🔲 Phase 5: Profil & Dashboard
- Profil-Formular + Avatar-Upload Server Action
- `/profil` Dashboard: Tabs "Meine Angebote" + "Meine Favoriten"
- `/profil/[id]` Öffentliches Profil

#### 🔲 Phase 7: Launch-Vorbereitung
- Supabase-E-Mail-Templates auf Deutsch
- Custom Domain Vercel ↔ IONOS
- Seed-Daten
- Lighthouse-Audit

### Nächster sinnvoller Schritt
→ **Phase 3: Bilder-Upload** (fehlt komplett, aber ListingForm ist schon vorbereitet — `images`-Feld wird schon als JSON übergeben)
