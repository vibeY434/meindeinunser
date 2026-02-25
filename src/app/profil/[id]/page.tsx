import { Container } from "@/components/layout/Container";
import { Card, CardContent } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { ListingGrid } from "@/components/listings/ListingGrid";
import { EmptyState } from "@/components/shared/EmptyState";
import { getProfileWithListings } from "@/lib/queries/profiles";
import { MAINZ_DISTRICTS } from "@/lib/constants/districts";
import { formatDate } from "@/lib/utils/format-date";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { profile } = await getProfileWithListings(id);
  if (!profile) return { title: "Profil nicht gefunden" };
  return { title: `${profile.display_name} – Profil` };
}

export default async function PublicProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { profile, listings } = await getProfileWithListings(id);

  if (!profile) notFound();

  const activeListings = listings.filter((l) => l.status === "aktiv");
  const districtLabel = MAINZ_DISTRICTS.find((d) => d.value === profile.district)?.label ?? profile.district;

  return (
    <Container className="py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div>
          <Card className="lg:sticky lg:top-24">
            <CardContent className="p-6 space-y-4">
              {/* Avatar */}
              <div className="flex flex-col items-center text-center">
                {profile.avatar_url ? (
                  <div className="relative h-24 w-24 rounded-full overflow-hidden ring-2 ring-border mb-3">
                    <Image src={profile.avatar_url} alt={profile.display_name} fill className="object-cover" sizes="96px" />
                  </div>
                ) : (
                  <Avatar name={profile.display_name} size="lg" className="h-24 w-24 text-2xl mb-3" />
                )}
                <h1 className="text-xl font-bold text-text">{profile.display_name}</h1>
                <p className="text-sm text-text-light">{districtLabel} · Mainz</p>
                <p className="text-xs text-text-light mt-1">Dabei seit {formatDate(profile.created_at)}</p>
              </div>

              {profile.bio && (
                <p className="text-sm text-text-light text-center border-t border-border pt-4">{profile.bio}</p>
              )}

              {/* Contact */}
              <div className="border-t border-border pt-4 space-y-2">
                <p className="text-xs font-semibold text-text uppercase tracking-wide">Kontakt</p>
                {profile.show_email && (
                  <a href={`mailto:${profile.email}`} className="flex items-center gap-2 text-sm text-primary hover:text-primary-hover">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    {profile.email}
                  </a>
                )}
                {profile.show_phone && profile.phone && (
                  <a href={`tel:${profile.phone}`} className="flex items-center gap-2 text-sm text-primary hover:text-primary-hover">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                    {profile.phone}
                  </a>
                )}
                {!profile.show_email && !profile.show_phone && (
                  <p className="text-sm text-text-light">Keine Kontaktdaten freigegeben.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Listings */}
        <div className="lg:col-span-2">
          <h2 className="text-lg font-semibold text-text mb-4">
            Angebote von {profile.display_name}
            <span className="ml-2 text-sm font-normal text-text-light">({activeListings.length})</span>
          </h2>
          {activeListings.length === 0 ? (
            <EmptyState
              title="Keine aktiven Angebote"
              description="Diese Person hat noch keine Angebote eingestellt."
              action={<Link href="/angebote"><Button variant="outline">Alle Angebote ansehen</Button></Link>}
            />
          ) : (
            <ListingGrid listings={activeListings} />
          )}
        </div>
      </div>
    </Container>
  );
}
