import { Container } from "@/components/layout/Container";
import { Card, CardContent } from "@/components/ui/Card";
import { ListingForm } from "@/components/listings/ListingForm";

export const metadata = {
  title: "Angebot erstellen",
};

export default function AngebotErstellenPage() {
  return (
    <Container className="py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-text mb-6">Angebot erstellen</h1>
        <Card>
          <CardContent className="p-6">
            <ListingForm />
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}
