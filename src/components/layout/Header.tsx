"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Container } from "./Container";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { createClient } from "@/lib/supabase/client";
import { signOut } from "@/lib/actions/auth";
import type { User } from "@supabase/supabase-js";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const displayName = user?.user_metadata?.display_name || user?.email?.split("@")[0] || "";

  // Escape-Key schließt Menüs
  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setUserMenuOpen(false);
      setMobileOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [handleEscape]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur-sm">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white font-bold text-lg">
              M
            </div>
            <span className="text-lg font-bold text-text hidden sm:block">
              mein<span className="text-primary">dein</span>unser
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-4">
            <Link
              href="/angebote"
              className="text-sm font-medium text-text-light hover:text-text transition-colors"
            >
              Angebote
            </Link>
            <Link href="/angebot-erstellen">
              <Button size="sm">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Angebot erstellen
              </Button>
            </Link>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  aria-expanded={userMenuOpen}
                  aria-haspopup="true"
                  className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-background transition-colors"
                >
                  <Avatar name={displayName} size="sm" />
                  <span className="text-sm font-medium text-text">{displayName}</span>
                  <svg className="h-4 w-4 text-text-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0" onClick={() => setUserMenuOpen(false)} />
                    <div className="absolute right-0 mt-1 w-48 rounded-lg border border-border bg-surface shadow-modal py-1">
                      <Link
                        href="/profil"
                        className="block px-4 py-2 text-sm text-text hover:bg-background transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Mein Profil
                      </Link>
                      <form action={signOut}>
                        <button
                          type="submit"
                          className="w-full text-left px-4 py-2 text-sm text-error hover:bg-background transition-colors"
                        >
                          Abmelden
                        </button>
                      </form>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="text-sm font-medium text-text-light hover:text-text transition-colors"
                >
                  Anmelden
                </Link>
                <Link href="/registrieren">
                  <Button variant="secondary" size="sm">Registrieren</Button>
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-text-light hover:bg-background transition-colors"
            aria-label="Menü öffnen"
          >
            {mobileOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border py-4 space-y-1">
            <Link
              href="/angebote"
              className="block px-3 py-2.5 text-sm font-medium text-text-light hover:text-text rounded-lg hover:bg-background transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Angebote
            </Link>
            <Link
              href="/angebot-erstellen"
              className="block px-3 py-2.5 text-sm font-medium text-text-light hover:text-text rounded-lg hover:bg-background transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Angebot erstellen
            </Link>

            {user ? (
              <>
                <div className="border-t border-border my-2" />
                <div className="px-3 py-2 flex items-center gap-2">
                  <Avatar name={displayName} size="sm" />
                  <span className="text-sm font-medium text-text">{displayName}</span>
                </div>
                <Link
                  href="/profil"
                  className="block px-3 py-2.5 text-sm font-medium text-text-light hover:text-text rounded-lg hover:bg-background transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Mein Profil
                </Link>
                <form action={signOut}>
                  <button
                    type="submit"
                    className="w-full text-left px-3 py-2.5 text-sm font-medium text-error hover:bg-background rounded-lg transition-colors"
                  >
                    Abmelden
                  </button>
                </form>
              </>
            ) : (
              <>
                <div className="border-t border-border my-2" />
                <Link
                  href="/login"
                  className="block px-3 py-2.5 text-sm font-medium text-text-light hover:text-text rounded-lg hover:bg-background transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Anmelden
                </Link>
                <Link
                  href="/registrieren"
                  className="block px-3 py-2.5 text-sm font-medium text-primary hover:text-primary-hover rounded-lg hover:bg-primary-light transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Registrieren
                </Link>
              </>
            )}
          </div>
        )}
      </Container>
    </header>
  );
}
