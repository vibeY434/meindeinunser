"use client";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container className="py-24">
      <div className="text-center">
        <p className="text-6xl font-bold text-error">Fehler</p>
        <h1 className="mt-4 text-2xl font-bold text-text">Etwas ist schiefgelaufen</h1>
        <p className="mt-2 text-text-light">
          Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es erneut.
        </p>
        <div className="mt-8">
          <Button onClick={reset}>Erneut versuchen</Button>
        </div>
      </div>
    </Container>
  );
}
