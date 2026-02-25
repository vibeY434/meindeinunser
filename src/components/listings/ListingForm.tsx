"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { ImageUpload } from "@/components/listings/ImageUpload";
import { LISTING_TYPES } from "@/lib/constants/listing-types";
import { CATEGORIES } from "@/lib/constants/categories";
import { MAINZ_DISTRICTS } from "@/lib/constants/districts";
import { createListing, updateListing } from "@/lib/actions/listings";
import { cn } from "@/lib/utils/cn";
import type { Listing } from "@/types";

interface ListingFormProps {
  listing?: Listing;
}

export function ListingForm({ listing }: ListingFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState(listing?.type ?? "verleihen");
  const [images, setImages] = useState<string[]>(listing?.images ?? []);

  const isEdit = !!listing;

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);

    formData.set("type", selectedType);
    formData.set("images", JSON.stringify(images));

    const result = isEdit
      ? await updateListing(listing.id, formData)
      : await createListing(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg bg-error-light p-3 text-sm text-error">
          {error}
        </div>
      )}

      <Input
        id="title"
        name="title"
        label="Titel"
        placeholder="Was möchtest du anbieten oder suchen?"
        defaultValue={listing?.title}
        required
        maxLength={100}
      />

      {/* Type selection */}
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-text">Art des Angebots</label>
        <div className="grid grid-cols-3 gap-2">
          {LISTING_TYPES.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => setSelectedType(type.value)}
              className={cn(
                "rounded-lg border-2 px-3 py-3 text-sm font-medium transition-all text-center",
                selectedType === type.value
                  ? "border-primary bg-primary-light text-primary"
                  : "border-border bg-surface text-text-light hover:border-border-hover"
              )}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      <Select
        id="category"
        name="category"
        label="Kategorie"
        options={CATEGORIES.map((c) => ({ value: c.value, label: `${c.icon} ${c.label}` }))}
        defaultValue={listing?.category ?? ""}
        placeholder="Kategorie wählen"
        required
      />

      <Select
        id="district"
        name="district"
        label="Stadtteil"
        options={[...MAINZ_DISTRICTS]}
        defaultValue={listing?.district ?? "gonsenheim"}
      />

      <Textarea
        id="description"
        name="description"
        label="Beschreibung"
        placeholder="Beschreibe dein Angebot oder deine Suche genauer..."
        defaultValue={listing?.description}
        required
        maxLength={2000}
        className="min-h-[150px]"
      />

      <ImageUpload
        value={images}
        onChange={setImages}
        disabled={loading}
      />

      <div className="flex gap-3 pt-2">
        <Button type="submit" loading={loading} className="flex-1">
          {isEdit ? "Änderungen speichern" : "Angebot erstellen"}
        </Button>
      </div>
    </form>
  );
}
