import { ListingCard } from "./ListingCard";
import type { ListingWithProfile } from "@/types";

interface ListingGridProps {
  listings: ListingWithProfile[];
  favoriteIds?: string[];
}

export function ListingGrid({ listings, favoriteIds = [] }: ListingGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} favoriteIds={favoriteIds} />
      ))}
    </div>
  );
}
