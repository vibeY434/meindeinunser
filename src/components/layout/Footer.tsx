import Link from "next/link";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface mt-auto">
      <Container>
        <div className="py-8">
          {/* Top section */}
          <div className="flex flex-col sm:flex-row justify-between gap-6 mb-8">
            <div>
              <Link href="/" className="flex items-center gap-2 mb-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white font-bold text-sm">
                  M
                </div>
                <span className="text-base font-bold text-text">
                  mein<span className="text-primary">dein</span>unser
                </span>
              </Link>
              <p className="text-sm text-text-light max-w-xs">
                Deine Nachbarschafts-Plattform für Mainz. Teilen, Leihen, Schenken.
              </p>
            </div>

            <div className="flex gap-12">
              <div>
                <h4 className="text-sm font-semibold text-text mb-3">Plattform</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/angebote" className="text-sm text-text-light hover:text-text transition-colors">
                      Angebote
                    </Link>
                  </li>
                  <li>
                    <Link href="/angebot-erstellen" className="text-sm text-text-light hover:text-text transition-colors">
                      Angebot erstellen
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-text mb-3">Rechtliches</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/impressum" className="text-sm text-text-light hover:text-text transition-colors">
                      Impressum
                    </Link>
                  </li>
                  <li>
                    <Link href="/datenschutz" className="text-sm text-text-light hover:text-text transition-colors">
                      Datenschutz
                    </Link>
                  </li>
                  <li>
                    <Link href="/agb" className="text-sm text-text-light hover:text-text transition-colors">
                      AGB
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-border pt-6">
            <p className="text-xs text-text-light text-center">
              &copy; {new Date().getFullYear()} meindeinunser.com — Nachbarn verbinden in Mainz
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
