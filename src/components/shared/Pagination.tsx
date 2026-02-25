"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";

interface PaginationProps {
    total: number;
    perPage: number;
    currentPage: number;
}

export function Pagination({ total, perPage, currentPage }: PaginationProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const totalPages = Math.ceil(total / perPage);

    if (totalPages <= 1) return null;

    function goToPage(page: number) {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", String(page));
        router.push(`/angebote?${params.toString()}`);
    }

    return (
        <div className="flex items-center justify-center gap-2 mt-10">
            <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage <= 1}
            >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Zurück
            </Button>

            <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    // Show first, last, current ±1
                    const show =
                        page === 1 ||
                        page === totalPages ||
                        Math.abs(page - currentPage) <= 1;
                    const ellipsisBefore = page === currentPage - 2 && currentPage > 3;
                    const ellipsisAfter = page === currentPage + 2 && currentPage < totalPages - 2;

                    if (ellipsisBefore || ellipsisAfter) {
                        return (
                            <span key={page} className="px-1 text-text-light text-sm">…</span>
                        );
                    }
                    if (!show) return null;

                    return (
                        <button
                            key={page}
                            onClick={() => goToPage(page)}
                            aria-label={`Seite ${page}`}
                            aria-current={page === currentPage ? "page" : undefined}
                            className={`h-10 w-10 rounded-lg text-sm font-medium transition-colors ${page === currentPage
                                    ? "bg-primary text-white"
                                    : "text-text-light hover:bg-border"
                                }`}
                        >
                            {page}
                        </button>
                    );
                })}
            </div>

            <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage >= totalPages}
            >
                Weiter
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
            </Button>
        </div>
    );
}
