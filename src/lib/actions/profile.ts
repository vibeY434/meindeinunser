"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const profileSchema = z.object({
    display_name: z.string().min(2, "Name muss mindestens 2 Zeichen haben").max(50),
    phone: z.string().max(30).optional().or(z.literal("")),
    district: z.string().min(1),
    bio: z.string().max(500).optional().or(z.literal("")),
    show_email: z.boolean(),
    show_phone: z.boolean(),
});

export type ProfileResult = { error?: string; success?: boolean };

export async function updateProfile(formData: FormData): Promise<ProfileResult> {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: "Nicht angemeldet." };

    const raw = {
        display_name: formData.get("display_name") as string,
        phone: formData.get("phone") as string,
        district: formData.get("district") as string,
        bio: formData.get("bio") as string,
        show_email: formData.get("show_email") === "true",
        show_phone: formData.get("show_phone") === "true",
    };

    const result = profileSchema.safeParse(raw);
    if (!result.success) return { error: result.error.issues[0].message };

    const { error } = await supabase
        .from("profiles")
        .update({
            display_name: result.data.display_name,
            phone: result.data.phone || null,
            district: result.data.district,
            bio: result.data.bio || null,
            show_email: result.data.show_email,
            show_phone: result.data.show_phone,
        })
        .eq("id", user.id);

    if (error) return { error: "Profil konnte nicht gespeichert werden." };

    revalidatePath("/profil");
    revalidatePath(`/profil/${user.id}`);
    return { success: true };
}

export async function uploadAvatar(formData: FormData): Promise<ProfileResult & { url?: string }> {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: "Nicht angemeldet." };

    const file = formData.get("avatar") as File;
    if (!file || file.size === 0) return { error: "Kein Bild ausgewählt." };
    if (file.size > 2 * 1024 * 1024) return { error: "Bild darf maximal 2 MB groß sein." };

    const ext = file.name.split(".").pop() ?? "jpg";
    const path = `avatars/${user.id}.${ext}`;

    const { error: uploadError } = await supabase.storage
        .from("listing-images")
        .upload(path, file, { upsert: true, contentType: file.type });

    if (uploadError) return { error: "Avatar-Upload fehlgeschlagen." };

    const { data: { publicUrl } } = supabase.storage
        .from("listing-images")
        .getPublicUrl(path);

    await supabase.from("profiles").update({ avatar_url: publicUrl }).eq("id", user.id);

    revalidatePath("/profil");
    return { success: true, url: publicUrl };
}
