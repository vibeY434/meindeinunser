"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toggleFavorite } from "@/lib/actions/favorites";
import { cn } from "@/lib/utils/cn";

interface FavoriteButtonProps {
    listingId: string;
    initialFavorited: boolean;
    className?: string;
}

export function FavoriteButton({
    listingId,
    initialFavorited,
    className,
}: FavoriteButtonProps) {
    const [favorited, setFavorited] = useState(initialFavorited);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    function handleClick(e: React.MouseEvent) {
        e.preventDefault();
        e.stopPropagation();

        startTransition(async () => {
            const result = await toggleFavorite(listingId);
            if (result.error === "Nicht angemeldet.") {
                router.push("/login?redirect=/angebote");
                return;
            }
            if (!result.error) {
                setFavorited(result.favorited);
            }
        });
    }

    return (
        <button
            type="button"
            onClick={handleClick}
            disabled={isPending}
            aria-label={favorited ? "Aus Favoriten entfernen" : "Zu Favoriten hinzufügen"}
            className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full transition-all",
                "bg-white/80 backdrop-blur-sm shadow-sm hover:scale-110",
                isPending && "opacity-50 pointer-events-none",
                className
            )}
        >
            <svg
                className={cn(
                    "h-4 w-4 transition-colors",
                    favorited ? "fill-red-500 text-red-500" : "fill-none text-text-light"
                )}
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
            </svg>
        </button>
    );
}
