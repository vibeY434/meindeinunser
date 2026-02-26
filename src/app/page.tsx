import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { ListingGrid } from "@/components/listings/ListingGrid";
import { CATEGORIES } from "@/lib/constants/categories";
import { getFeaturedListings } from "@/lib/queries/listings";
import { createClient } from "@/lib/supabase/server";

export default async function HomePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const isGuest = !user;

  const featuredListings = await getFeaturedListings(isGuest ? 3 : 6);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary-light to-background py-16 sm:py-24">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl sm:text-5xl font-bold text-text tracking-tight">
              Teile mit deinen{" "}
              <span className="text-primary">Nachbarn</span> in Mainz
            </h1>
            <p className="mt-4 text-lg text-text-light max-w-lg mx-auto">
              Verleihen, Verschenken, Suchen — entdecke, was deine Nachbarschaft zu bieten hat.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/angebote">
                <Button size="lg" className="w-full sm:w-auto">
                  Angebote entdecken
                </Button>
              </Link>
              <Link href="/angebot-erstellen">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Angebot erstellen
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* So funktioniert's */}
      <section className="py-16">
        <Container>
          <h2 className="text-2xl font-bold text-text text-center mb-10">
            So funktioniert&apos;s
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                ),
                title: "Angebot erstellen",
                description: "Stelle ein, was du verleihen, verschenken oder suchen möchtest.",
              },
              {
                icon: (
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                  </svg>
                ),
                title: "Nachbarn finden",
                description: "Durchstöbere Angebote in deinem Stadtteil und finde, was du brauchst.",
              },
              {
                icon: (
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                ),
                title: "Teilen & Helfen",
                description: "Kontaktiere deine Nachbarn und stärkt gemeinsam eure Community.",
              },
            ].map((step) => (
              <Card key={step.title} className="text-center">
                <CardContent className="py-8">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary-light text-primary">
                    {step.icon}
                  </div>
                  <h3 className="text-base font-semibold text-text">{step.title}</h3>
                  <p className="mt-2 text-sm text-text-light">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Neueste Angebote */}
      {featuredListings.length > 0 && (
        <section className="py-16 bg-surface">
          <Container>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-text">
                Neueste Angebote
              </h2>
              <Link href="/angebote" className="text-sm font-medium text-primary hover:text-primary-hover transition-colors">
                Alle anzeigen &rarr;
              </Link>
            </div>
            <ListingGrid listings={featuredListings} isGuest={isGuest} />
          </Container>
        </section>
      )}

      {/* Kategorien */}
      <section className={featuredListings.length > 0 ? "py-16" : "py-16 bg-surface"}>
        <Container>
          <h2 className="text-2xl font-bold text-text text-center mb-10">
            Kategorien
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {CATEGORIES.map((cat) => (
              <Link key={cat.value} href={`/angebote?category=${cat.value}`}>
                <Card hover className="text-center">
                  <CardContent className="py-10">
                    <span className="text-4xl">{cat.icon}</span>
                    <h3 className="mt-3 text-lg font-semibold text-text">
                      {cat.label}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16">
        <Container>
          <div className="rounded-2xl bg-primary p-8 sm:p-12 text-center text-white">
            <h2 className="text-2xl sm:text-3xl font-bold">
              Werde Teil der Nachbarschaft
            </h2>
            <p className="mt-3 text-white/80 max-w-md mx-auto">
              Registriere dich kostenlos und teile mit deinen Nachbarn in Mainz.
            </p>
            <div className="mt-6">
              <Link href="/registrieren">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white text-primary hover:bg-teal-50"
                >
                  Kostenlos registrieren
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
