"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const COOKIE_CONSENT_KEY = "mdu-cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Kleines Delay damit das Banner nicht sofort beim Laden aufpoppt
      const timer = setTimeout(() => setVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  function accept() {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem(COOKIE_CONSENT_KEY, "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie-Hinweis"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-surface shadow-modal p-4 sm:p-0"
    >
      <div className="mx-auto max-w-6xl sm:flex sm:items-center sm:justify-between sm:gap-6 sm:px-6 sm:py-4">
        <p className="text-sm text-text-light mb-3 sm:mb-0">
          Diese Website verwendet nur technisch notwendige Cookies für die
          Anmeldung und Sitzungsverwaltung. Keine Tracking- oder Werbe-Cookies.{" "}
          <Link
            href="/datenschutz"
            className="text-primary hover:text-primary-hover underline"
          >
            Mehr erfahren
          </Link>
        </p>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button variant="ghost" size="sm" onClick={decline}>
            Ablehnen
          </Button>
          <Button size="sm" onClick={accept}>
            Verstanden
          </Button>
        </div>
      </div>
    </div>
  );
}
