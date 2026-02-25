import { Container } from "@/components/layout/Container";
import { Card, CardContent } from "@/components/ui/Card";

export const metadata = {
  title: "Angebot bearbeiten",
};

export default function AngebotBearbeitenPage() {
  return (
    <Container className="py-8">
      <h1 className="text-2xl font-bold text-text mb-6">Angebot bearbeiten</h1>
      <Card>
        <CardContent className="p-6">
          <p className="text-sm text-text-light">
            Das Bearbeitungs-Formular wird in Phase 2 implementiert.
          </p>
        </CardContent>
      </Card>
    </Container>
  );
}
