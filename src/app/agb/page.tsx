import { Container } from "@/components/layout/Container";

export const metadata = {
  title: "Allgemeine Geschäftsbedingungen",
};

export default function AGBPage() {
  return (
    <Container className="py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-text mb-6">Allgemeine Geschäftsbedingungen</h1>

        <div className="space-y-8 text-sm text-text">
          <section>
            <h2 className="text-base font-semibold mb-2">1. Geltungsbereich</h2>
            <p className="text-text-light">
              Diese Allgemeinen Geschäftsbedingungen gelten für die Nutzung der Plattform meindeinunser.com
              (nachfolgend &quot;Plattform&quot;). Die Plattform ermöglicht es Nutzern, Gegenstände zum Verleihen
              oder Verschenken anzubieten sowie Suchanfragen zu erstellen.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-2">2. Registrierung</h2>
            <p className="text-text-light">
              Für die aktive Nutzung der Plattform (Erstellen von Angeboten, Kontaktaufnahme) ist eine
              Registrierung erforderlich. Der Nutzer verpflichtet sich, wahrheitsgemäße Angaben zu machen.
              Ein Anspruch auf Registrierung besteht nicht.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-2">3. Nutzung der Plattform</h2>
            <p className="text-text-light">
              Die Plattform dient ausschließlich der nachbarschaftlichen Vernetzung. Kommerzielle Nutzung ist
              nicht gestattet. Die Vereinbarungen zwischen den Nutzern kommen ausschließlich zwischen diesen
              zustande. meindeinunser.com ist nicht Vertragspartei.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-2">4. Pflichten der Nutzer</h2>
            <p className="text-text-light">
              Nutzer verpflichten sich, keine rechtswidrigen, beleidigenden oder irreführenden Inhalte
              einzustellen. Angebote müssen wahrheitsgemäß beschrieben werden. Der Nutzer ist für seine
              Inhalte selbst verantwortlich.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-2">5. Haftung</h2>
            <p className="text-text-light">
              meindeinunser.com haftet nicht für die Richtigkeit der eingestellten Angebote oder für
              Schäden, die aus Vereinbarungen zwischen Nutzern entstehen. Die Haftung ist auf Vorsatz
              und grobe Fahrlässigkeit beschränkt.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-2">6. Löschung und Sperrung</h2>
            <p className="text-text-light">
              meindeinunser.com behält sich das Recht vor, Nutzerkonten und Inhalte zu löschen oder
              zu sperren, die gegen diese AGB verstoßen.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-2">7. Schlussbestimmungen</h2>
            <p className="text-text-light">
              Es gilt das Recht der Bundesrepublik Deutschland. Sollten einzelne Bestimmungen dieser AGB
              unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.
            </p>
          </section>
        </div>
      </div>
    </Container>
  );
}
