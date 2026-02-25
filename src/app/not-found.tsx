import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function NotFound() {
  return (
    <Container className="py-24">
      <div className="text-center">
        <p className="text-6xl font-bold text-primary">404</p>
        <h1 className="mt-4 text-2xl font-bold text-text">Seite nicht gefunden</h1>
        <p className="mt-2 text-text-light">
          Die angeforderte Seite existiert leider nicht.
        </p>
        <div className="mt-8">
          <Link href="/">
            <Button>Zur Startseite</Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}
