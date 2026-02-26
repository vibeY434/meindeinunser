"use client";

import { useState } from "react";
import { signIn } from "@/lib/actions/auth";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

interface LoginFormProps {
  redirectTo?: string;
}

export function LoginForm({ redirectTo }: LoginFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    if (redirectTo) {
      formData.set("redirect", redirectTo);
    }
    const result = await signIn(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-xl bg-error-light p-3 text-sm text-error">
          {error}
        </div>
      )}

      <Input
        id="email"
        name="email"
        type="email"
        label="E-Mail"
        placeholder="deine@email.de"
        required
        autoComplete="email"
      />

      <Input
        id="password"
        name="password"
        type="password"
        label="Passwort"
        placeholder="Mindestens 6 Zeichen"
        required
        autoComplete="current-password"
      />

      <div className="flex justify-end">
        <Link
          href="/passwort-vergessen"
          className="text-xs text-primary hover:text-primary-hover"
        >
          Passwort vergessen?
        </Link>
      </div>

      <Button type="submit" loading={loading} className="w-full">
        Anmelden
      </Button>
    </form>
  );
}
