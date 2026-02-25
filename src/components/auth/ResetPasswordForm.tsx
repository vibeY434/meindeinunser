"use client";

import { useState } from "react";
import { resetPassword } from "@/lib/actions/auth";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function ResetPasswordForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await resetPassword(formData);
    if (result.error) {
      setError(result.error);
    } else {
      setSuccess(true);
    }
    setLoading(false);
  }

  if (success) {
    return (
      <div className="rounded-lg bg-primary-light p-6 text-center">
        <h3 className="text-base font-semibold text-primary">E-Mail gesendet!</h3>
        <p className="mt-2 text-sm text-blue-700">
          Falls ein Konto mit dieser E-Mail-Adresse existiert, erhältst du einen Link zum Zurücksetzen deines Passworts.
        </p>
      </div>
    );
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-lg bg-error-light p-3 text-sm text-error">
          {error}
        </div>
      )}

      <p className="text-sm text-text-light">
        Gib deine E-Mail-Adresse ein und wir senden dir einen Link zum Zurücksetzen deines Passworts.
      </p>

      <Input
        id="email"
        name="email"
        type="email"
        label="E-Mail"
        placeholder="deine@email.de"
        required
        autoComplete="email"
      />

      <Button type="submit" loading={loading} className="w-full">
        Link senden
      </Button>
    </form>
  );
}
