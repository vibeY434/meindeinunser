import { Card, CardContent } from "@/components/ui/Card";
import { LoginForm } from "@/components/auth/LoginForm";
import Link from "next/link";

export const metadata = {
  title: "Anmelden",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string; success?: string; error?: string }>;
}) {
  const params = await searchParams;

  return (
    <div>
      <h1 className="text-2xl font-bold text-text text-center mb-6">Anmelden</h1>

      {params.success === "password-reset" && (
        <div className="mb-4 rounded-lg bg-verschenken-light p-3 text-sm text-green-800 text-center">
          Passwort erfolgreich geändert. Du kannst dich jetzt anmelden.
        </div>
      )}

      {params.error === "auth" && (
        <div className="mb-4 rounded-lg bg-error-light p-3 text-sm text-error text-center">
          Anmeldung fehlgeschlagen. Bitte versuche es erneut.
        </div>
      )}

      <Card>
        <CardContent className="p-6">
          <LoginForm redirectTo={params.redirect} />
        </CardContent>
      </Card>
      <p className="mt-4 text-center text-sm text-text-light">
        Noch kein Konto?{" "}
        <Link href="/registrieren" className="font-medium text-primary hover:text-primary-hover">
          Jetzt registrieren
        </Link>
      </p>
    </div>
  );
}
