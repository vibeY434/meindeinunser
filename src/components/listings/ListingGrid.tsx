import { ListingCard } from "./ListingCard";
import type { ListingWithProfile } from "@/types";

interface ListingGridProps {
  listings: ListingWithProfile[];
}

export function ListingGrid({ listings }: ListingGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
}
