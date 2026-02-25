import { Card, CardContent } from "@/components/ui/Card";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import Link from "next/link";

export const metadata = {
  title: "Passwort vergessen",
};

export default function ForgotPasswordPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-text text-center mb-6">Passwort vergessen</h1>
      <Card>
        <CardContent className="p-6">
          <ResetPasswordForm />
        </CardContent>
      </Card>
      <p className="mt-4 text-center text-sm text-text-light">
        <Link href="/login" className="font-medium text-primary hover:text-primary-hover">
          Zurück zur Anmeldung
        </Link>
      </p>
    </div>
  );
}
