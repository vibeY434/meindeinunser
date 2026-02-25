"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { loginSchema, registerSchema, resetPasswordSchema, newPasswordSchema } from "@/lib/validations/auth";

export type AuthResult = {
  error?: string;
  success?: boolean;
};

export async function signUp(formData: FormData): Promise<AuthResult> {
  const raw = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
    displayName: formData.get("displayName") as string,
    district: formData.get("district") as string,
  };

  const result = registerSchema.safeParse(raw);
  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email: result.data.email,
    password: result.data.password,
    options: {
      data: {
        display_name: result.data.displayName,
        district: result.data.district,
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/auth/callback`,
    },
  });

  if (error) {
    if (error.message.includes("already registered")) {
      return { error: "Diese E-Mail-Adresse ist bereits registriert." };
    }
    return { error: "Registrierung fehlgeschlagen. Bitte versuche es erneut." };
  }

  return { success: true };
}

export async function signIn(formData: FormData): Promise<AuthResult> {
  const raw = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const result = loginSchema.safeParse(raw);
  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: result.data.email,
    password: result.data.password,
  });

  if (error) {
    if (error.message.includes("Invalid login")) {
      return { error: "E-Mail oder Passwort ist falsch." };
    }
    if (error.message.includes("Email not confirmed")) {
      return { error: "Bitte bestätige zuerst deine E-Mail-Adresse." };
    }
    return { error: "Anmeldung fehlgeschlagen. Bitte versuche es erneut." };
  }

  const redirectTo = (formData.get("redirect") as string) || "/";
  redirect(redirectTo);
}

export async function signOut(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

export async function resetPassword(formData: FormData): Promise<AuthResult> {
  const raw = { email: formData.get("email") as string };

  const result = resetPasswordSchema.safeParse(raw);
  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(result.data.email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/auth/callback?next=/passwort-zuruecksetzen`,
  });

  if (error) {
    return { error: "Fehler beim Zurücksetzen. Bitte versuche es erneut." };
  }

  return { success: true };
}

export async function updatePassword(formData: FormData): Promise<AuthResult> {
  const raw = {
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };

  const result = newPasswordSchema.safeParse(raw);
  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({
    password: result.data.password,
  });

  if (error) {
    return { error: "Passwort konnte nicht geändert werden." };
  }

  redirect("/login?success=password-reset");
}
