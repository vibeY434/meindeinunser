# Changelog — meindeinunser.com

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
