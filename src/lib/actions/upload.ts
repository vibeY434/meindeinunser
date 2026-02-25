"use server";

import { createClient } from "@/lib/supabase/server";

export type UploadUrlResult = {
    signedUrl?: string;
    path?: string;
    error?: string;
};

export async function getUploadUrl(
    filename: string,
    contentType: string
): Promise<UploadUrlResult> {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { error: "Du musst angemeldet sein, um Bilder hochzuladen." };
    }

    const ext = filename.split(".").pop() ?? "jpg";
    const path = `${user.id}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { data, error } = await supabase.storage
        .from("listing-images")
        .createSignedUploadUrl(path);

    if (error || !data) {
        console.error("Signed URL error:", error);
        return { error: "Upload-URL konnte nicht erstellt werden." };
    }

    return { signedUrl: data.signedUrl, path };
}

export async function deleteImage(path: string): Promise<{ error?: string }> {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: "Nicht authentifiziert." };

    // Security: only allow deleting own files (path starts with user.id)
    if (!path.startsWith(user.id + "/")) {
        return { error: "Keine Berechtigung." };
    }

    const { error } = await supabase.storage.from("listing-images").remove([path]);
    if (error) return { error: "Bild konnte nicht gelöscht werden." };

    return {};
}
