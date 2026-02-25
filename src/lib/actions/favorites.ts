"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function toggleFavorite(
    listingId: string
): Promise<{ favorited: boolean; error?: string }> {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { favorited: false, error: "Nicht angemeldet." };

    // Check if already favorited
    const { data: existing } = await supabase
        .from("favorites")
        .select("listing_id")
        .eq("user_id", user.id)
        .eq("listing_id", listingId)
        .maybeSingle();

    if (existing) {
        await supabase
            .from("favorites")
            .delete()
            .eq("user_id", user.id)
            .eq("listing_id", listingId);
        revalidatePath("/profil");
        return { favorited: false };
    } else {
        await supabase.from("favorites").insert({ user_id: user.id, listing_id: listingId });
        revalidatePath("/profil");
        return { favorited: true };
    }
}

export async function getUserFavoriteIds(): Promise<string[]> {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) return [];

    const { data } = await supabase
        .from("favorites")
        .select("listing_id")
        .eq("user_id", user.id);

    return data?.map((f) => f.listing_id) ?? [];
}
