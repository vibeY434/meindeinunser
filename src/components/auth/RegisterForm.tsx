"use client";

import { useState } from "react";
import { signUp } from "@/lib/actions/auth";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { MAINZ_DISTRICTS } from "@/lib/constants/districts";

export function RegisterForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await signUp(formData);
    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else if (result.success) {
      setSuccess(true);
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="rounded-lg bg-verschenken-light p-6 text-center">
        <svg
          className="mx-auto h-10 w-10 text-verschenken mb-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
        <h3 className="text-base font-semibold text-green-800">Bestätigungsmail gesendet!</h3>
        <p className="mt-2 text-sm text-green-700">
          Bitte überprüfe dein E-Mail-Postfach und klicke auf den Bestätigungslink.
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

      <Input
        id="displayName"
        name="displayName"
        type="text"
        label="Name"
        placeholder="Dein Anzeigename"
        required
        autoComplete="name"
      />

      <Input
        id="email"
        name="email"
        type="email"
        label="E-Mail"
        placeholder="deine@email.de"
        required
        autoComplete="email"
      />

      <Select
        id="district"
        name="district"
        label="Stadtteil"
        options={[...MAINZ_DISTRICTS]}
        defaultValue="gonsenheim"
      />

      <Input
        id="password"
        name="password"
        type="password"
        label="Passwort"
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
        Registrieren
      </Button>

      <p className="text-xs text-text-light text-center">
        Mit der Registrierung akzeptierst du unsere{" "}
        <a href="/agb" className="text-primary hover:underline">AGB</a> und{" "}
        <a href="/datenschutz" className="text-primary hover:underline">Datenschutzerklärung</a>.
      </p>
    </form>
  );
}
