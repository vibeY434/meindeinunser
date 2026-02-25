# meindeinunser.com — Nachbarschafts-Sharing-Plattform

## Kontext

Die Domain meindeinunser.com hat aktuell eine WordPress-Seite. Diese wird komplett neu als Next.js-App gebaut (kein Datentransfer). GitHub-Repo `vibeY434/meindeinunser` existiert. Supabase-Projekt: **ID `svsfwenqmpcdlpyyytgd`**, Name "vibeY434's meindeinunser". Ziel: MVP einer Nachbarschafts-Plattform für Mainz mit Verleihen, Verschenken und Suchanfragen.

### Design-Prinzipien
- **Niederschwellig**: Einfache Bedienung, minimale Hürden für Nutzer
- **Mobile-first**: Optimiert für Smartphone-Nutzung (primäres Gerät der Zielgruppe)
- **Modern & Clean**: Ansprechendes, aufgeräumtes Design ohne Überladung
- **Zweckgebunden**: Jedes UI-Element dient dem Ziel: Nachbarn verbinden

---

## Tech-Stack

- **Next.js 14** (App Router, TypeScript, `src/`-Verzeichnis)
- **Supabase** (Auth, PostgreSQL-DB, Storage für Bilder)
- **Tailwind CSS** (Mobile-first, Custom-Farben)
- **Vercel** (Hosting, automatische Deploys via GitHub)
- **Bun** (Package Manager + Runtime auf dem VPS)

---

## Datenbank-Schema (Supabase/PostgreSQL)

### Enums
```sql
CREATE TYPE listing_type AS ENUM ('verleihen', 'verschenken', 'suchen');
CREATE TYPE listing_category AS ENUM ('haus_garten', 'spielzeug', 'lifestyle');
CREATE TYPE listing_status AS ENUM ('aktiv', 'pausiert', 'abgeschlossen');
```

### `profiles` (erweitert Supabase auth.users)
| Spalte | Typ | Beschreibung |
|--------|-----|-------------|
| id | UUID PK | Referenz auf auth.users |
| email | TEXT | E-Mail |
| display_name | TEXT | Anzeigename |
| phone | TEXT? | Telefon (optional) |
| district | TEXT | Stadtteil (Default: gonsenheim) |
| avatar_url | TEXT? | Profilbild-URL |
| bio | TEXT? | Kurzbeschreibung |
| show_email | BOOLEAN | E-Mail öffentlich zeigen |
| show_phone | BOOLEAN | Telefon öffentlich zeigen |

### `listings`
| Spalte | Typ | Beschreibung |
|--------|-----|-------------|
| id | UUID PK | Auto-generiert |
| user_id | UUID FK | Ersteller |
| title | TEXT | Titel |
| description | TEXT | Beschreibung |
| type | listing_type | verleihen/verschenken/suchen |
| category | listing_category | Kategorie |
| district | TEXT | Stadtteil |
| status | listing_status | aktiv/pausiert/abgeschlossen |
| images | TEXT[] | Array von Storage-Pfaden |

### `favorites`
- Junction-Tabelle (user_id + listing_id)

### Storage
- Bucket `listing-images` (öffentlich lesbar, Upload nur authentifiziert)
- Pfadmuster: `{user_id}/{timestamp}-{filename}`

### Stadtteile (15 Mainzer Stadtteile — TypeScript-Konstante)
Altstadt, Bretzenheim, Drais, Ebersheim, Finthen, Gonsenheim, Hartenberg-Münchfeld, Hechtsheim, Laubenheim, Lerchenberg, Marienborn, Mombach, Neustadt, Oberstadt, Weisenau

---

## Routen-Struktur

```
/                           Homepage (Hero + neueste Angebote)
/angebote                   Alle Inserate mit Filtern
/angebote/[id]              Inserat-Detailseite
/angebot-erstellen          Neues Inserat (geschützt)
/angebot-bearbeiten/[id]    Inserat bearbeiten (geschützt)
/profil                     Eigenes Dashboard (geschützt)
/profil/[id]                Öffentliches Profil
/login                      Anmelden
/registrieren               Registrieren
/passwort-vergessen         Passwort zurücksetzen
/auth/callback              Supabase Auth Callback
/auth/confirm               E-Mail-Bestätigung
/impressum                  Impressum
/datenschutz                Datenschutzerklärung
/agb                        AGB
```

---

## Implementierungs-Phasen

### Phase 0: Projekt-Scaffolding ✅
- create-next-app mit TypeScript, Tailwind, App Router, src/
- Basis-UI-Komponenten, Header, Footer
- Seiten als Stubs angelegt

### Phase 1: Supabase + Auth
1. SQL-Migration: Tabellen, Enums, RLS, Trigger
2. Supabase-Clients (Browser + Server + Middleware)
3. Auth Server Actions (signUp, signIn, signOut, resetPassword)
4. Auth Callback Route
5. Login-, Registrierungs-, Passwort-Reset-Formulare
6. Middleware für geschützte Routen

### Phase 2: Inserate CRUD
1. Listings-Tabelle + RLS + Indizes
2. Konstanten (Stadtteile, Kategorien, Typen)
3. Zod-Schema für Inserate
4. Query-Funktionen (getListings, getListingById)
5. Server Actions (create, update, delete)
6. ListingCard, ListingGrid, ListingTypeBadge
7. ListingForm (ohne Bilder zunächst)
8. Seiten: /angebot-erstellen, /angebote, /angebote/[id], /angebot-bearbeiten/[id]

### Phase 3: Bilder-Upload
1. Storage-Bucket `listing-images` anlegen
2. Signed-URL-Upload Server Action
3. ImageUpload-Komponente (Drag & Drop, Vorschau, max 5 Bilder)
4. ImageGallery für Detailseite

### Phase 4: Filter, Suche & Kontakt
1. ListingFilters-Komponente (Typ, Kategorie, Stadtteil, Freitext)
2. URL-basiertes Filtern mit searchParams
3. Pagination / "Mehr laden"
4. ContactButton (zeigt E-Mail/Telefon des Anbieters)
5. FavoriteButton + Favorites-Tabelle

### Phase 5: Profil & Dashboard
1. Profil-Formular + Server Action
2. Avatar-Upload
3. Dashboard (/profil): Tabs "Meine Angebote" + "Meine Favoriten"
4. Öffentliches Profil (/profil/[id])

### Phase 6: Homepage, Legal & Feinschliff
1. Homepage-Sektionen: Hero, "So funktioniert's", Neueste Angebote, Kategorien
2. Legal-Seiten: Impressum, Datenschutz, AGB
3. SEO-Metadaten + Open Graph Tags
4. Mobile-Responsiveness finalisieren

### Phase 7: Launch-Vorbereitung
1. Supabase-E-Mail-Templates auf Deutsch
2. Custom Domain bei Vercel (DNS bei IONOS)
3. Seed-Daten für Launch
4. Lighthouse-Audit (Ziel: 90+ Performance, A11y, SEO)

---

## Farbschema

| Farbe | Hex | Verwendung |
|-------|-----|-----------|
| Primary | #046BD2 | Buttons, Links, Akzente |
| Primary Hover | #045CB4 | Hover-Zustände |
| Verschenken | #16A34A (Grün) | Badge |
| Verleihen | #F59E0B (Orange) | Badge |
| Suchen | #7C3AED (Lila) | Badge |
| Hintergrund | #F0F5FA | Page Background |
| Text | #1E293B | Fließtext |

---

## Technische Entscheidungen

| Entscheidung | Begründung |
|---|---|
| Server Actions statt API Routes | Weniger Boilerplate, eingebaute Formular-Integration |
| URL-basiertes Filtern | Shareable Links, SSR-fähig, SEO-freundlich |
| Stadtteile als TS-Konstante | Stabil, kein DB-Roundtrip nötig |
| Signed URL Uploads | Umgeht 1MB Server-Action-Limit |
| clsx + tailwind-merge | Standard-Pattern für bedingte Tailwind-Klassen |

---

## VPS-Setup (openclaw VPS)

- **Pfad:** `/home/openclaw/meindeinunser/`
- **Runtime:** Bun 1.x
- **Dev-Server starten:** `cd /home/openclaw/meindeinunser && bun run dev`
- **Port:** 3000 (für Browser-Tests via Tailscale)
- **GitHub Remote:** https://github.com/vibeY434/meindeinunser
- **Workflow:** Entwicklung auf VPS → git push → Vercel auto-deploy

## Umgebungsvariablen (.env.local)

```
NEXT_PUBLIC_SUPABASE_URL=https://svsfwenqmpcdlpyyytgd.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
```

---

## Zukünftige Feature-Ideen (Backlog)
*Bewertet und aktualisiert von antigravity am 2026-02-25T10:58Z*

Folgende Ideen wurden geprüft und für nach den Launch (Post-MVP) vermerkt:

1. **✅ Neueste Angebote auf der Landingpage (anonymisiert):**
   - **Idee:** Die neuesten drei Inserate werden auf der Startseite angeteasert.
   - **Bewertung:** Hervorragendes Feature für Konversion und Trust. Aus Datenschutzgründen wird für nicht-eingeloggte Gäste nur das Bild, der Titel und der Stadtteil sichtbar sein (keine Namen, Kontaktdaten oder volle Beschreibungen). Klick darauf leitet zum Login/Registrieren.

2. **🗺️ Kartenansicht (Map-View) für Angebote (Unscharfer Radius):**
   - **Idee:** Angebote auf einer interaktiven Karte markieren, um die lokale Nähe zu betonen.
   - **Bewertung & Privacy-Fix:** Wir zeigen NIEMALS die Hausnummer. Es wird entweder nur das Zentrum der Straße gepinnt oder ein Radius von ca. 500 Metern um die Adresse gezogen. Das schützt vor Diebstählen (z. B. teures Werkzeug, Bikes). OpenStreetMap/Leaflet ist hierfür die beste Wahl.

3. **💬 Nachrichten & Manueller Verleih-Status (statt hartem Buchungskalender):**
   - **Ursprungs-Idee:** Ein harter Kalender (von-bis) für Ausleihen.
   - **Bewertung:** Ein echtes Buchungssystem sprengt die Komplexität und bringt rechtliche Haftungsrisiken (verbindlicher Leihvertrag). 
   - **Beschluss/Alternative:** Wir implementieren eine einfache **Nachrichtenfunktion (Chat/Freitext)**. Der Suchende fragt formlos an: *"Ist die Dachbox am Wochenende 12.-14. noch da?"*. Der Verleiher bestätigt und stellt sein Inserat in dieser Zeit mit zwei Klicks manuell auf den Status **"Pausiert"**. Das hält die Plattform simpel und rechtlich unangreifbar.
