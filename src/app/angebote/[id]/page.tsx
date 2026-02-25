import { Container } from "@/components/layout/Container";
import { Card, CardContent } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ListingTypeBadge } from "@/components/listings/ListingTypeBadge";
import { getListingById } from "@/lib/queries/listings";
import { formatDate } from "@/lib/utils/format-date";
import { MAINZ_DISTRICTS } from "@/lib/constants/districts";
import { CATEGORIES } from "@/lib/constants/categories";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { ListingType, ListingCategory } from "@/types";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const listing = await getListingById(id);
  if (!listing) return { title: "Angebot nicht gefunden" };
  return { title: listing.title };
}

export default async function AngebotDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const listing = await getListingById(id);

  if (!listing) {
    notFound();
  }

  const profile = listing.profiles as {
    id: string;
    display_name: string;
    avatar_url: string | null;
    district: string;
    email: string;
    phone: string | null;
    show_email: boolean;
    show_phone: boolean;
    bio: string | null;
    created_at: string;
  };

  const districtLabel = MAINZ_DISTRICTS.find((d) => d.value === listing.district)?.label ?? listing.district;
  const categoryLabel = CATEGORIES.find((c) => c.value === listing.category)?.label ?? listing.category;
  const categoryIcon = CATEGORIES.find((c) => c.value === listing.category)?.icon ?? "";
  const hasImages = listing.images && listing.images.length > 0;

  return (
    <Container className="py-8">
      <Link
        href="/angebote"
        className="inline-flex items-center gap-1 text-sm text-text-light hover:text-text transition-colors mb-6"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Zurück zu allen Angeboten
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image */}
          {hasImages && (
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-background">
              <Image
                src={listing.images[0]}
                alt={listing.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Listing info */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <ListingTypeBadge type={listing.type as ListingType} />
              <Badge>{categoryIcon} {categoryLabel}</Badge>
              <Badge>{districtLabel}</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-text">{listing.title}</h1>
            <p className="mt-1 text-sm text-text-light">
              Erstellt am {formatDate(listing.created_at)}
            </p>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-lg font-semibold text-text mb-2">Beschreibung</h2>
            <p className="text-text-light whitespace-pre-line">{listing.description}</p>
          </div>
        </div>

        {/* Sidebar - Contact */}
        <div>
          <Card className="sticky top-24">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Avatar name={profile.display_name} src={profile.avatar_url} size="lg" />
                <div>
                  <p className="font-semibold text-text">{profile.display_name}</p>
                  <p className="text-xs text-text-light">
                    Mitglied seit {formatDate(profile.created_at)}
                  </p>
                </div>
              </div>

              {profile.bio && (
                <p className="text-sm text-text-light">{profile.bio}</p>
              )}

              <div className="border-t border-border pt-4 space-y-3">
                <h3 className="text-sm font-semibold text-text">Kontakt</h3>

                {profile.show_email && (
                  <a
                    href={`mailto:${profile.email}`}
                    className="flex items-center gap-2 text-sm text-primary hover:text-primary-hover transition-colors"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    {profile.email}
                  </a>
                )}

                {profile.show_phone && profile.phone && (
                  <a
                    href={`tel:${profile.phone}`}
                    className="flex items-center gap-2 text-sm text-primary hover:text-primary-hover transition-colors"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                    {profile.phone}
                  </a>
                )}

                {!profile.show_email && !profile.show_phone && (
                  <p className="text-sm text-text-light">
                    Keine Kontaktdaten freigegeben.
                  </p>
                )}
              </div>

              <Link href={`/profil/${profile.id}`}>
                <Button variant="outline" className="w-full mt-2">
                  Profil ansehen
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  );
}
