import { Container } from "@/components/layout/Container";

export const metadata = {
  title: "Datenschutzerklärung",
};

export default function DatenschutzPage() {
  return (
    <Container className="py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-text mb-6">Datenschutzerklärung</h1>

        <div className="space-y-8 text-sm text-text">
          <section>
            <h2 className="text-base font-semibold mb-2">1. Datenschutz auf einen Blick</h2>
            <p className="text-text-light">
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten
              passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich
              identifiziert werden können.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-2">2. Verantwortliche Stelle</h2>
            <p className="text-text-light">
              [Name / Firma]<br />
              [Straße und Hausnummer]<br />
              [PLZ und Ort]<br />
              E-Mail: [E-Mail-Adresse]
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-2">3. Datenerfassung auf dieser Website</h2>
            <h3 className="text-sm font-medium mb-1 mt-4">Wer ist verantwortlich für die Datenerfassung?</h3>
            <p className="text-text-light">
              Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten
              können Sie dem Impressum entnehmen.
            </p>
            <h3 className="text-sm font-medium mb-1 mt-4">Wie erfassen wir Ihre Daten?</h3>
            <p className="text-text-light">
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z.B.
              um Daten handeln, die Sie in ein Registrierungsformular eingeben. Andere Daten werden automatisch
              beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten
              (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-2">4. Ihre Rechte</h2>
            <p className="text-text-light">
              Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer
              gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung
              oder Löschung dieser Daten zu verlangen. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz
              können Sie sich jederzeit an uns wenden.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-2">5. Hosting</h2>
            <p className="text-text-light">
              Diese Website wird bei Vercel Inc. gehostet. Details zur Datenverarbeitung finden Sie in der
              Datenschutzerklärung von Vercel.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-2">6. Registrierung und Nutzerkonto</h2>
            <p className="text-text-light">
              Sie können sich auf unserer Website registrieren, um zusätzliche Funktionen nutzen zu können.
              Die eingegebenen Daten verwenden wir nur zum Zwecke der Nutzung des jeweiligen Angebotes.
              Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO.
              Ihre Daten werden bei Supabase Inc. gespeichert und verarbeitet.
            </p>
          </section>
        </div>
      </div>
    </Container>
  );
}
