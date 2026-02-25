import { Container } from "@/components/layout/Container";

export const metadata = {
  title: "Impressum",
};

export default function ImpressumPage() {
  return (
    <Container className="py-12">
      <div className="max-w-2xl mx-auto prose prose-slate">
        <h1 className="text-2xl font-bold text-text mb-6">Impressum</h1>
        <p className="text-text-light text-sm">
          Angaben gemäß § 5 TMG
        </p>

        <div className="mt-6 space-y-6 text-sm text-text">
          <div>
            <h2 className="text-base font-semibold mb-2">Anbieter</h2>
            <p className="text-text-light">
              [Name / Firma]<br />
              [Straße und Hausnummer]<br />
              [PLZ und Ort]
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold mb-2">Kontakt</h2>
            <p className="text-text-light">
              E-Mail: [E-Mail-Adresse]<br />
              Telefon: [Telefonnummer]
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold mb-2">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
            <p className="text-text-light">
              [Name]<br />
              [Adresse]
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold mb-2">Haftungsausschluss</h2>
            <p className="text-text-light">
              Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und
              Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
