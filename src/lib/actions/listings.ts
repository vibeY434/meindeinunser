"use server";

import { createClient } from "@/lib/supabase/server";
import { listingSchema } from "@/lib/validations/listing";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type ListingResult = {
  error?: string;
  success?: boolean;
};

export async function createListing(formData: FormData): Promise<ListingResult> {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: "Du musst angemeldet sein, um ein Angebot zu erstellen." };
  }

  const raw = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    type: formData.get("type") as string,
    category: formData.get("category") as string,
    district: formData.get("district") as string,
  };

  const result = listingSchema.safeParse(raw);
  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  // Collect image URLs if any
  const images: string[] = [];
  const imagesJson = formData.get("images") as string;
  if (imagesJson) {
    try {
      const parsed = JSON.parse(imagesJson);
      if (Array.isArray(parsed)) {
        images.push(...parsed);
      }
    } catch {
      // ignore invalid JSON
    }
  }

  const { error } = await supabase.from("listings").insert({
    user_id: user.id,
    title: result.data.title,
    description: result.data.description,
    type: result.data.type,
    category: result.data.category,
    district: result.data.district,
    images,
  });

  if (error) {
    console.error("Error creating listing:", error);
    return { error: "Angebot konnte nicht erstellt werden. Bitte versuche es erneut." };
  }

  revalidatePath("/angebote");
  revalidatePath("/");
  redirect("/angebote");
}

export async function updateListing(id: string, formData: FormData): Promise<ListingResult> {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: "Du musst angemeldet sein." };
  }

  const raw = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    type: formData.get("type") as string,
    category: formData.get("category") as string,
    district: formData.get("district") as string,
  };

  const result = listingSchema.safeParse(raw);
  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  const images: string[] = [];
  const imagesJson = formData.get("images") as string;
  if (imagesJson) {
    try {
      const parsed = JSON.parse(imagesJson);
      if (Array.isArray(parsed)) {
        images.push(...parsed);
      }
    } catch {
      // ignore
    }
  }

  const { error } = await supabase
    .from("listings")
    .update({
      title: result.data.title,
      description: result.data.description,
      type: result.data.type,
      category: result.data.category,
      district: result.data.district,
      images,
    })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    return { error: "Angebot konnte nicht aktualisiert werden." };
  }

  revalidatePath("/angebote");
  revalidatePath(`/angebote/${id}`);
  redirect(`/angebote/${id}`);
}

export async function deleteListing(id: string): Promise<ListingResult> {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: "Du musst angemeldet sein." };
  }

  const { error } = await supabase
    .from("listings")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    return { error: "Angebot konnte nicht gelöscht werden." };
  }

  revalidatePath("/angebote");
  revalidatePath("/profil");
  revalidatePath("/");
  redirect("/profil");
}

export async function updateListingStatus(
  id: string,
  status: "aktiv" | "pausiert" | "abgeschlossen"
): Promise<ListingResult> {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: "Du musst angemeldet sein." };
  }

  const { error } = await supabase
    .from("listings")
    .update({ status })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    return { error: "Status konnte nicht geändert werden." };
  }

  revalidatePath("/angebote");
  revalidatePath("/profil");
  return { success: true };
}
