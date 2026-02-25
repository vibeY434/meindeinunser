import { z } from "zod/v4";

export const loginSchema = z.object({
  email: z.email("Bitte gib eine gültige E-Mail-Adresse ein"),
  password: z.string().min(6, "Passwort muss mindestens 6 Zeichen lang sein"),
});

export const registerSchema = z.object({
  email: z.email("Bitte gib eine gültige E-Mail-Adresse ein"),
  password: z.string().min(6, "Passwort muss mindestens 6 Zeichen lang sein"),
  confirmPassword: z.string(),
  displayName: z.string().min(2, "Name muss mindestens 2 Zeichen lang sein").max(50),
  district: z.string().min(1, "Bitte wähle einen Stadtteil"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwörter stimmen nicht überein",
  path: ["confirmPassword"],
});

export const resetPasswordSchema = z.object({
  email: z.email("Bitte gib eine gültige E-Mail-Adresse ein"),
});

export const newPasswordSchema = z.object({
  password: z.string().min(6, "Passwort muss mindestens 6 Zeichen lang sein"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwörter stimmen nicht überein",
  path: ["confirmPassword"],
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type NewPasswordInput = z.infer<typeof newPasswordSchema>;
