"use client";

import { useState } from "react";
import { updatePassword } from "@/lib/actions/auth";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function NewPasswordForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await updatePassword(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-lg bg-error-light p-3 text-sm text-error">
          {error}
        </div>
      )}

      <Input
        id="password"
        name="password"
        type="password"
        label="Neues Passwort"
        placeholder="Mindestens 6 Zeichen"
        required
        autoComplete="new-password"
      />

      <Input
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        label="Passwort bestätigen"
        placeholder="Passwort wiederholen"
        required
        autoComplete="new-password"
      />

      <Button type="submit" loading={loading} className="w-full">
        Passwort ändern
      </Button>
    </form>
  );
}
