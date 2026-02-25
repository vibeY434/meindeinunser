import { Card, CardContent } from "@/components/ui/Card";
import { RegisterForm } from "@/components/auth/RegisterForm";
import Link from "next/link";

export const metadata = {
  title: "Registrieren",
};

export default function RegisterPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-text text-center mb-6">Registrieren</h1>
      <Card>
        <CardContent className="p-6">
          <RegisterForm />
        </CardContent>
      </Card>
      <p className="mt-4 text-center text-sm text-text-light">
        Bereits registriert?{" "}
        <Link href="/login" className="font-medium text-primary hover:text-primary-hover">
          Jetzt anmelden
        </Link>
      </p>
    </div>
  );
}
