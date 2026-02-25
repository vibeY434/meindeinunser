"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;

interface ImageGalleryProps {
    images: string[];
    title: string;
}

function getPublicUrl(path: string): string {
    // Support both full URLs (legacy) and storage paths
    if (path.startsWith("http")) return path;
    return `${SUPABASE_URL}/storage/v1/object/public/listing-images/${path}`;
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
    const [active, setActive] = useState(0);

    if (!images || images.length === 0) return null;

    const activeUrl = getPublicUrl(images[active]);

    return (
        <div className="space-y-2">
            {/* Main image */}
            <div className="relative aspect-[4/3] sm:aspect-[16/9] rounded-xl overflow-hidden bg-background">
                <Image
                    src={activeUrl}
                    alt={`${title} — Bild ${active + 1}`}
                    fill
                    className="object-cover"
                    priority={active === 0}
                    sizes="(max-width: 1024px) 100vw, 66vw"
                />
            </div>

            {/* Thumbnails (only if multiple images) */}
            {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                    {images.map((path, i) => (
                        <button
                            key={path}
                            type="button"
                            onClick={() => setActive(i)}
                            className={cn(
                                "relative flex-shrink-0 h-16 w-16 sm:h-20 sm:w-20 rounded-lg overflow-hidden border-2 transition-colors",
                                i === active
                                    ? "border-primary"
                                    : "border-transparent hover:border-border-hover"
                            )}
                            aria-label={`Bild ${i + 1} anzeigen`}
                        >
                            <Image
                                src={getPublicUrl(path)}
                                alt={`${title} Vorschau ${i + 1}`}
                                fill
                                className="object-cover"
                                sizes="80px"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
