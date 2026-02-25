import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { ListingGrid } from "@/components/listings/ListingGrid";
import { EmptyState } from "@/components/shared/EmptyState";
import { ListingActions } from "@/components/listings/ListingActions";
import { getProfileWithListings, getUserFavoriteListings } from "@/lib/queries/profiles";
import { signOut } from "@/lib/actions/auth";
import Link from "next/link";
import type { Profile } from "@/types";

export const metadata = { title: "Mein Profil" };

const STATUS_STYLES: Record<string, string> = {
  aktiv: "bg-green-100 text-green-700",
  pausiert: "bg-yellow-100 text-yellow-700",
  abgeschlossen: "bg-gray-100 text-gray-500",
};

export default async function ProfilPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { profile, listings } = await getProfileWithListings(user.id);
  if (!profile) notFound();

  const favoriteListings = await getUserFavoriteListings(user.id);

  return (
    <Container className="py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-text">Mein Profil</h1>
        <form action={signOut}>
          <Button variant="outline" size="sm" type="submit">Abmelden</Button>
        </form>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Profile form */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-base font-semibold text-text mb-5">Profil bearbeiten</h2>
              <ProfileForm profile={profile as Profile} />
            </CardContent>
          </Card>
        </div>

        {/* Right: Listings + Favourites */}
        <div className="lg:col-span-2 space-y-8">
          {/* My Listings */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-text">
                Meine Angebote
                <span className="ml-2 text-sm font-normal text-text-light">({listings.length})</span>
              </h2>
              <Link href="/angebot-erstellen">
                <Button size="sm">+ Neues Angebot</Button>
              </Link>
            </div>

            {listings.length === 0 ? (
              <EmptyState
                title="Noch keine Angebote"
                description="Erstelle dein erstes Angebot und teile es mit deinen Nachbarn."
                action={<Link href="/angebot-erstellen"><Button>Angebot erstellen</Button></Link>}
              />
            ) : (
              <div className="space-y-3">
                {listings.map((listing) => (
                  <Card key={listing.id}>
                    <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[listing.status]}`}>
                            {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                          </span>
                          <Link href={`/angebote/${listing.id}`} className="font-medium text-text hover:text-primary truncate">
                            {listing.title}
                          </Link>
                        </div>
                      </div>
                      <ListingActions listingId={listing.id} status={listing.status} />
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>

          {/* Favourites */}
          <section>
            <h2 className="text-lg font-semibold text-text mb-4">
              Meine Favoriten
              <span className="ml-2 text-sm font-normal text-text-light">({favoriteListings.length})</span>
            </h2>
            {favoriteListings.length === 0 ? (
              <EmptyState
                title="Noch keine Favoriten"
                description="Klick auf das Herz-Symbol bei einem Angebot, um es hier zu speichern."
              />
            ) : (
              <ListingGrid listings={favoriteListings} />
            )}
          </section>
        </div>
      </div>
    </Container>
  );
}
