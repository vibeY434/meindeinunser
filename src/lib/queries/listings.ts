import { createClient } from "@/lib/supabase/server";
import type { ListingFilters, ListingWithProfile } from "@/types";

const LISTINGS_PER_PAGE = 12;

export async function getListings(
  filters?: ListingFilters,
  page = 1
): Promise<{ listings: ListingWithProfile[]; total: number }> {
  const supabase = await createClient();

  let query = supabase
    .from("listings")
    .select("*, profiles(id, display_name, avatar_url, district)", { count: "exact" })
    .eq("status", "aktiv")
    .order("created_at", { ascending: false });

  if (filters?.type) {
    query = query.eq("type", filters.type);
  }
  if (filters?.category) {
    query = query.eq("category", filters.category);
  }
  if (filters?.district) {
    query = query.eq("district", filters.district);
  }
  if (filters?.search) {
    query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
  }

  const from = (page - 1) * LISTINGS_PER_PAGE;
  const to = from + LISTINGS_PER_PAGE - 1;
  query = query.range(from, to);

  const { data, count, error } = await query;

  if (error) {
    console.error("Error fetching listings:", error);
    return { listings: [], total: 0 };
  }

  return {
    listings: (data as unknown as ListingWithProfile[]) ?? [],
    total: count ?? 0,
  };
}

export async function getListingById(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("listings")
    .select("*, profiles(id, display_name, avatar_url, district, email, phone, show_email, show_phone, bio, created_at)")
    .eq("id", id)
    .single();

  if (error) {
    return null;
  }

  return data;
}

export async function getFeaturedListings(limit = 6): Promise<ListingWithProfile[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("listings")
    .select("*, profiles(id, display_name, avatar_url, district)")
    .eq("status", "aktiv")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    return [];
  }

  return (data as unknown as ListingWithProfile[]) ?? [];
}

export async function getUserListings(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("listings")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    return [];
  }

  return data ?? [];
}
