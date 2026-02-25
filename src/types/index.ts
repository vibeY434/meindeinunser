export type ListingType = "verleihen" | "verschenken" | "suchen";
export type ListingCategory = "haus_garten" | "spielzeug" | "lifestyle";
export type ListingStatus = "aktiv" | "pausiert" | "abgeschlossen";

export interface Profile {
  id: string;
  email: string;
  display_name: string;
  phone: string | null;
  district: string;
  avatar_url: string | null;
  bio: string | null;
  show_email: boolean;
  show_phone: boolean;
  created_at: string;
  updated_at: string;
}

export interface Listing {
  id: string;
  user_id: string;
  title: string;
  description: string;
  type: ListingType;
  category: ListingCategory;
  district: string;
  status: ListingStatus;
  images: string[];
  created_at: string;
  updated_at: string;
}

export interface ListingWithProfile extends Listing {
  profiles: Pick<Profile, "id" | "display_name" | "avatar_url" | "district">;
}

export interface ListingFilters {
  type?: ListingType;
  category?: ListingCategory;
  district?: string;
  search?: string;
}
