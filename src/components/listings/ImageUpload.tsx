"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { getUploadUrl, deleteImage } from "@/lib/actions/upload";
import { cn } from "@/lib/utils/cn";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const MAX_FILES = 5;
const MAX_SIZE_MB = 5;
const ACCEPTED = ["image/jpeg", "image/png", "image/webp", "image/gif"];

interface ImageUploadProps {
    value: string[]; // array of storage paths
    onChange: (paths: string[]) => void;
    disabled?: boolean;
}

function getPublicUrl(path: string): string {
    return `${SUPABASE_URL}/storage/v1/object/public/listing-images/${path}`;
}

export function ImageUpload({ value, onChange, disabled }: ImageUploadProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [dragOver, setDragOver] = useState(false);

    async function uploadFiles(files: FileList | null) {
        if (!files || files.length === 0) return;
        setError(null);

        const remaining = MAX_FILES - value.length;
        if (remaining <= 0) {
            setError(`Maximal ${MAX_FILES} Bilder erlaubt.`);
            return;
        }

        const toUpload = Array.from(files).slice(0, remaining);
        const invalid = toUpload.find(
            (f) => !ACCEPTED.includes(f.type) || f.size > MAX_SIZE_MB * 1024 * 1024
        );
        if (invalid) {
            setError(`Nur JPG, PNG, WebP oder GIF bis ${MAX_SIZE_MB} MB erlaubt.`);
            return;
        }

        setUploading(true);
        const newPaths: string[] = [];

        for (const file of toUpload) {
            const { signedUrl, path, error: urlError } = await getUploadUrl(file.name, file.type);
            if (urlError || !signedUrl || !path) {
                setError(urlError ?? "Upload fehlgeschlagen.");
                setUploading(false);
                return;
            }

            const res = await fetch(signedUrl, {
                method: "PUT",
                headers: { "Content-Type": file.type },
                body: file,
            });

            if (!res.ok) {
                setError("Bild konnte nicht hochgeladen werden.");
                setUploading(false);
                return;
            }

            newPaths.push(path);
        }

        onChange([...value, ...newPaths]);
        setUploading(false);
    }

    async function handleRemove(path: string) {
        await deleteImage(path);
        onChange(value.filter((p) => p !== path));
    }

    return (
        <div className="space-y-3">
            <label className="block text-sm font-medium text-text">
                Bilder{" "}
                <span className="text-text-light font-normal">
                    (optional, max. {MAX_FILES})
                </span>
            </label>

            {/* Upload zone */}
            {value.length < MAX_FILES && (
                <div
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={(e) => {
                        e.preventDefault();
                        setDragOver(false);
                        uploadFiles(e.dataTransfer.files);
                    }}
                    onClick={() => !disabled && !uploading && inputRef.current?.click()}
                    className={cn(
                        "relative flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-8 text-center transition-colors cursor-pointer",
                        dragOver
                            ? "border-primary bg-primary-light"
                            : "border-border bg-surface hover:border-border-hover hover:bg-background",
                        (disabled || uploading) && "pointer-events-none opacity-60"
                    )}
                >
                    <input
                        ref={inputRef}
                        type="file"
                        accept={ACCEPTED.join(",")}
                        multiple
                        className="sr-only"
                        onChange={(e) => uploadFiles(e.target.files)}
                        disabled={disabled || uploading}
                    />
                    {uploading ? (
                        <>
                            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                            <p className="text-sm text-text-light">Wird hochgeladen…</p>
                        </>
                    ) : (
                        <>
                            <svg
                                className="h-8 w-8 text-text-light"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={1.5}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                                />
                            </svg>
                            <div>
                                <p className="text-sm font-medium text-text">
                                    Klicken oder Bilder hierher ziehen
                                </p>
                                <p className="text-xs text-text-light mt-0.5">
                                    JPG, PNG, WebP bis {MAX_SIZE_MB} MB · noch{" "}
                                    {MAX_FILES - value.length} Bild
                                    {MAX_FILES - value.length !== 1 ? "er" : ""} möglich
                                </p>
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* Error */}
            {error && (
                <p className="text-sm text-error">{error}</p>
            )}

            {/* Preview grid */}
            {value.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {value.map((path, i) => (
                        <div key={path} className="relative group aspect-square rounded-lg overflow-hidden bg-background">
                            <Image
                                src={getPublicUrl(path)}
                                alt={`Bild ${i + 1}`}
                                fill
                                className="object-cover"
                                sizes="120px"
                            />
                            {/* Cover badge */}
                            {i === 0 && (
                                <span className="absolute bottom-1 left-1 rounded bg-black/60 px-1.5 py-0.5 text-[10px] text-white font-medium">
                                    Titelbild
                                </span>
                            )}
                            {/* Remove button */}
                            {!disabled && (
                                <button
                                    type="button"
                                    onClick={() => handleRemove(path)}
                                    className="absolute top-1 right-1 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white sm:opacity-0 sm:group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                    aria-label="Bild entfernen"
                                >
                                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
