import { Suspense } from "react";
import { Container } from "@/components/layout/Container";
import { ListingGrid } from "@/components/listings/ListingGrid";
import { ListingFilters } from "@/components/listings/ListingFilters";
import { EmptyState } from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { getListings } from "@/lib/queries/listings";
import Link from "next/link";
import type { ListingFilters as Filters } from "@/types";

export const metadata = {
  title: "Angebote",
  description: "Durchstöbere Angebote deiner Nachbarn in Mainz — Verleihen, Verschenken, Suchen.",
};

async function ListingsContent({ filters }: { filters: Filters }) {
  const { listings, total } = await getListings(filters);

  if (listings.length === 0) {
    return (
      <EmptyState
        title="Keine Angebote gefunden"
        description="Versuche andere Filter oder erstelle selbst ein Angebot!"
        action={
          <Link href="/angebot-erstellen">
            <Button>Angebot erstellen</Button>
          </Link>
        }
      />
    );
  }

  return (
    <>
      <p className="text-sm text-text-light mb-4">
        {total} {total === 1 ? "Angebot" : "Angebote"} gefunden
      </p>
      <ListingGrid listings={listings} />
    </>
  );
}

function ListingsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-xl border border-border bg-surface overflow-hidden">
          <Skeleton className="aspect-[4/3]" />
          <div className="p-4 space-y-3">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function AngebotePage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; category?: string; district?: string; search?: string }>;
}) {
  const params = await searchParams;
  const filters: Filters = {
    type: params.type as Filters["type"],
    category: params.category as Filters["category"],
    district: params.district,
    search: params.search,
  };

  return (
    <Container className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-text">Angebote</h1>
        <Link href="/angebot-erstellen">
          <Button size="sm">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Neues Angebot
          </Button>
        </Link>
      </div>

      <div className="mb-8">
        <Suspense fallback={null}>
          <ListingFilters />
        </Suspense>
      </div>

      <Suspense fallback={<ListingsSkeleton />}>
        <ListingsContent filters={filters} />
      </Suspense>
    </Container>
  );
}
