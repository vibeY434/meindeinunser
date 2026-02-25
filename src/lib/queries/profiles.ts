import { createClient } from "@/lib/supabase/server";
import type { Profile, ListingWithProfile } from "@/types";

export async function getProfile(id: string): Promise<Profile | null> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single();
    if (error) return null;
    return data as Profile;
}

export async function getProfileWithListings(id: string) {
    const supabase = await createClient();
    const [profileRes, listingsRes] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", id).single(),
        supabase
            .from("listings")
            .select("*, profiles!listings_user_id_fkey(id, display_name, avatar_url, district)")
            .eq("user_id", id)
            .order("created_at", { ascending: false }),
    ]);
    return {
        profile: (profileRes.data as Profile) ?? null,
        listings: (listingsRes.data as unknown as ListingWithProfile[]) ?? [],
    };
}

export async function getUserFavoriteListings(userId: string) {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("favorites")
        .select("listing_id, listings(*, profiles!listings_user_id_fkey(id, display_name, avatar_url, district))")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

    if (error) return [];
    return (data?.map((f) => f.listings).filter(Boolean) as unknown as ListingWithProfile[]) ?? [];
}
