"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useRef } from "react";
import { Input } from "@/components/ui/Input";
import { LISTING_TYPES } from "@/lib/constants/listing-types";
import { CATEGORIES } from "@/lib/constants/categories";
import { MAINZ_DISTRICTS } from "@/lib/constants/districts";
import { cn } from "@/lib/utils/cn";

export function ListingFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentType = searchParams.get("type") ?? "";
  const currentCategory = searchParams.get("category") ?? "";
  const currentDistrict = searchParams.get("district") ?? "";
  const currentSearch = searchParams.get("search") ?? "";

  const updateParams = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.delete("page");
      router.push(`/angebote?${params.toString()}`);
    },
    [router, searchParams]
  );

  return (
    <div className="space-y-4">
      {/* Search */}
      <Input
        placeholder="Suche nach Angeboten..."
        defaultValue={currentSearch}
        onChange={(e) => {
          const value = e.target.value;
          if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
          searchTimeoutRef.current = setTimeout(() => {
            updateParams("search", value);
          }, 400);
        }}
      />

      {/* Type filter pills */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => updateParams("type", "")}
          className={cn(
            "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
            !currentType
              ? "bg-primary text-white"
              : "bg-background text-text-light hover:bg-border"
          )}
        >
          Alle
        </button>
        {LISTING_TYPES.map((type) => (
          <button
            key={type.value}
            onClick={() => updateParams("type", currentType === type.value ? "" : type.value)}
            className={cn(
              "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
              currentType === type.value
                ? "bg-primary text-white"
                : "bg-background text-text-light hover:bg-border"
            )}
          >
            {type.label}
          </button>
        ))}
      </div>

      {/* Category & District */}
      <div className="flex flex-col sm:flex-row gap-3">
        <select
          value={currentCategory}
          onChange={(e) => updateParams("category", e.target.value)}
          className="flex-1 rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-text transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="">Alle Kategorien</option>
          {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.icon} {cat.label}
            </option>
          ))}
        </select>

        <select
          value={currentDistrict}
          onChange={(e) => updateParams("district", e.target.value)}
          className="flex-1 rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-text transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="">Alle Stadtteile</option>
          {MAINZ_DISTRICTS.map((d) => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
