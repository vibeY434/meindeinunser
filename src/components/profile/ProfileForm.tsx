"use client";

import { useState, useTransition, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Avatar } from "@/components/ui/Avatar";
import { updateProfile, uploadAvatar } from "@/lib/actions/profile";
import { MAINZ_DISTRICTS } from "@/lib/constants/districts";
import type { Profile } from "@/types";

interface ProfileFormProps {
    profile: Profile;
}

export function ProfileForm({ profile }: ProfileFormProps) {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [showEmail, setShowEmail] = useState(profile.show_email);
    const [showPhone, setShowPhone] = useState(profile.show_phone);
    const [avatarUrl, setAvatarUrl] = useState(profile.avatar_url);
    const [avatarUploading, setAvatarUploading] = useState(false);
    const avatarInputRef = useRef<HTMLInputElement>(null);

    function handleSubmit(formData: FormData) {
        setError(null);
        setSuccess(false);
        formData.set("show_email", String(showEmail));
        formData.set("show_phone", String(showPhone));
        startTransition(async () => {
            const res = await updateProfile(formData);
            if (res.error) setError(res.error);
            else setSuccess(true);
        });
    }

    async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        setAvatarUploading(true);
        setError(null);
        const fd = new FormData();
        fd.append("avatar", file);
        const res = await uploadAvatar(fd);
        if (res.url) setAvatarUrl(res.url);
        if (res.error) setError(res.error);
        setAvatarUploading(false);
    }

    return (
        <div className="space-y-8">
            {/* Avatar */}
            <div className="flex items-center gap-4">
                <div className="relative">
                    {avatarUrl ? (
                        <div className="relative h-20 w-20 rounded-full overflow-hidden ring-2 ring-border">
                            <Image src={avatarUrl} alt="Avatar" fill className="object-cover" sizes="80px" />
                        </div>
                    ) : (
                        <Avatar name={profile.display_name} size="lg" className="h-20 w-20 text-xl" />
                    )}
                    {avatarUploading && (
                        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40">
                            <svg className="h-5 w-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                        </div>
                    )}
                    <button
                        type="button"
                        onClick={() => avatarInputRef.current?.click()}
                        disabled={avatarUploading}
                        className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white shadow hover:bg-primary-hover transition-colors disabled:opacity-50"
                        aria-label="Profilbild ändern"
                    >
                        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487z" />
                        </svg>
                    </button>
                    <input ref={avatarInputRef} type="file" accept="image/*" className="sr-only" onChange={handleAvatarChange} />
                </div>
                <div>
                    <p className="font-semibold text-text">{profile.display_name}</p>
                    <p className="text-sm text-text-light">{profile.email}</p>
                </div>
            </div>

            <form action={handleSubmit} className="space-y-5">
                {error && <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>}
                {success && <div className="rounded-lg bg-green-50 p-3 text-sm text-green-700">Profil gespeichert ✓</div>}

                <Input id="display_name" name="display_name" label="Anzeigename" defaultValue={profile.display_name} required maxLength={50} />
                <Input id="phone" name="phone" label="Telefon" type="tel" placeholder="+49 151 ..." defaultValue={profile.phone ?? ""} />
                <Select id="district" name="district" label="Stadtteil" options={[...MAINZ_DISTRICTS]} defaultValue={profile.district} />
                <Textarea id="bio" name="bio" label="Über mich" placeholder="Kurze Beschreibung..." defaultValue={profile.bio ?? ""} maxLength={500} />

                {/* Visibility toggles */}
                <div className="space-y-3 pt-1">
                    <p className="text-sm font-medium text-text">Sichtbarkeit für andere</p>
                    {[
                        { id: "show_email", label: "E-Mail-Adresse anzeigen", value: showEmail, set: setShowEmail },
                        { id: "show_phone", label: "Telefonnummer anzeigen", value: showPhone, set: setShowPhone },
                    ].map(({ id, label, value, set }) => (
                        <label key={id} className="flex items-center justify-between cursor-pointer">
                            <span className="text-sm text-text-light">{label}</span>
                            <button
                                type="button"
                                role="switch"
                                aria-checked={value}
                                onClick={() => set(!value)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${value ? "bg-primary" : "bg-border"}`}
                            >
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${value ? "translate-x-6" : "translate-x-1"}`} />
                            </button>
                        </label>
                    ))}
                </div>

                <Button type="submit" loading={isPending} className="w-full sm:w-auto">
                    Änderungen speichern
                </Button>
            </form>
        </div>
    );
}
