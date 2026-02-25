import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { ListingTypeBadge } from "./ListingTypeBadge";
import { FavoriteButton } from "@/components/shared/FavoriteButton";
import { timeAgo } from "@/lib/utils/format-date";
import { MAINZ_DISTRICTS } from "@/lib/constants/districts";
import type { ListingWithProfile } from "@/types";

interface ListingCardProps {
  listing: ListingWithProfile;
  favoriteIds?: string[];
}

// Retrieve Supabase URL safely
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;

function getPublicUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${SUPABASE_URL}/storage/v1/object/public/listing-images/${path}`;
}

export function ListingCard({ listing, favoriteIds = [] }: ListingCardProps) {
  const districtLabel =
    MAINZ_DISTRICTS.find((d) => d.value === listing.district)?.label ?? listing.district;

  const hasImage = listing.images && listing.images.length > 0;
  const isFavorited = favoriteIds.includes(listing.id);

  return (
    <Link href={`/angebote/${listing.id}`}>
      <Card hover className="h-full flex flex-col">
        {/* Image */}
        <div className="relative aspect-[4/3] bg-background">
          {hasImage ? (
            <Image
              src={getPublicUrl(listing.images[0])}
              alt={listing.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-text-light/40">
              <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a2.25 2.25 0 002.25-2.25V5.25a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 003.75 21z" />
              </svg>
            </div>
          )}
          <div className="absolute top-2 left-2">
            <ListingTypeBadge type={listing.type} />
          </div>
          <div className="absolute top-2 right-2">
            <FavoriteButton listingId={listing.id} initialFavorited={isFavorited} />
          </div>
        </div>

        {/* Content */}
        <CardContent className="flex-1 flex flex-col gap-2">
          <h3 className="font-semibold text-text line-clamp-1">{listing.title}</h3>
          <p className="text-sm text-text-light line-clamp-2 flex-1">
            {listing.description}
          </p>
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div className="flex items-center gap-2">
              <Avatar
                name={listing.profiles.display_name}
                src={listing.profiles.avatar_url}
                size="sm"
              />
              <div className="text-xs">
                <p className="font-medium text-text">{listing.profiles.display_name}</p>
                <p className="text-text-light">{districtLabel}</p>
              </div>
            </div>
            <span className="text-xs text-text-light">{timeAgo(listing.created_at)}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
