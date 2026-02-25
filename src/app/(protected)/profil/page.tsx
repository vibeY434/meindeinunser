import { Container } from "@/components/layout/Container";
import { Card, CardContent } from "@/components/ui/Card";

export const metadata = {
  title: "Mein Profil",
};

export default function ProfilPage() {
  return (
    <Container className="py-8">
      <h1 className="text-2xl font-bold text-text mb-6">Mein Profil</h1>
      <Card>
        <CardContent className="p-6">
          <p className="text-sm text-text-light">
            Das Dashboard wird in Phase 5 implementiert.
          </p>
        </CardContent>
      </Card>
    </Container>
  );
}
