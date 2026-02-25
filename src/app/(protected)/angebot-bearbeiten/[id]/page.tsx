import { createClient } from "@/lib/supabase/server";
import { Container } from "@/components/layout/Container";
import { Card, CardContent } from "@/components/ui/Card";
import { ListingForm } from "@/components/listings/ListingForm";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import type { Listing } from "@/types";

export const metadata = {
  title: "Angebot bearbeiten",
};

export default async function AngebotBearbeitenPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: listing, error } = await supabase
    .from("listings")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !listing) notFound();

  // Nur der Ersteller darf bearbeiten
  if (listing.user_id !== user.id) {
    redirect("/profil");
  }

  return (
    <Container className="py-8">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/profil"
          className="inline-flex items-center gap-1 text-sm text-text-light hover:text-text transition-colors mb-6"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Zurück zum Profil
        </Link>
        <h1 className="text-2xl font-bold text-text mb-6">Angebot bearbeiten</h1>
        <Card>
          <CardContent className="p-6">
            <ListingForm listing={listing as Listing} />
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}
