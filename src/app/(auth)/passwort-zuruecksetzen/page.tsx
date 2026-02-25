import { Card, CardContent } from "@/components/ui/Card";
import { NewPasswordForm } from "@/components/auth/NewPasswordForm";

export const metadata = {
  title: "Passwort zurücksetzen",
};

export default function ResetPasswordPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-text text-center mb-6">Neues Passwort setzen</h1>
      <Card>
        <CardContent className="p-6">
          <NewPasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}
