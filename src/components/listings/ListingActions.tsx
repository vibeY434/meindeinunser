"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/Button";
import { updateListingStatus, deleteListing } from "@/lib/actions/listings";
import Link from "next/link";

interface ListingActionsProps {
  listingId: string;
  status: string;
}

export function ListingActions({ listingId, status }: ListingActionsProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  function handleToggleStatus() {
    setError(null);
    const next = status === "aktiv" ? "pausiert" : "aktiv";
    startTransition(async () => {
      const result = await updateListingStatus(listingId, next as "aktiv" | "pausiert" | "abgeschlossen");
      if (result.error) setError(result.error);
    });
  }

  function handleDelete() {
    setError(null);
    startTransition(async () => {
      const result = await deleteListing(listingId);
      if (result?.error) setError(result.error);
    });
  }

  return (
    <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
      {error && (
        <span className="text-xs text-error w-full">{error}</span>
      )}

      <Button
        variant="outline"
        size="sm"
        onClick={handleToggleStatus}
        disabled={isPending}
        loading={isPending}
      >
        {status === "aktiv" ? "Pausieren" : "Aktivieren"}
      </Button>

      <Link href={`/angebot-bearbeiten/${listingId}`}>
        <Button variant="outline" size="sm">Bearbeiten</Button>
      </Link>

      {showConfirm ? (
        <div className="flex items-center gap-1">
          <Button
            variant="danger"
            size="sm"
            onClick={handleDelete}
            disabled={isPending}
            loading={isPending}
          >
            Ja, löschen
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowConfirm(false)}
            disabled={isPending}
          >
            Abbrechen
          </Button>
        </div>
      ) : (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowConfirm(true)}
          className="text-red-500 hover:text-red-700 hover:border-red-300"
        >
          Löschen
        </Button>
      )}
    </div>
  );
}
