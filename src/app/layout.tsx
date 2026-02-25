import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/shared/CookieBanner";
import { ServiceWorkerRegistrar } from "@/components/shared/ServiceWorkerRegistrar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "meindeinunser — Nachbarn verbinden in Mainz",
    template: "%s | meindeinunser",
  },
  description:
    "Verleihen, Verschenken, Suchen — die Nachbarschafts-Plattform für Mainz. Teile mit deinen Nachbarn und stärke deine Community.",
  keywords: ["Nachbarschaft", "Mainz", "Verleihen", "Verschenken", "Teilen", "Community"],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "meindeinunser",
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`${geistSans.variable} font-sans antialiased flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieBanner />
        <ServiceWorkerRegistrar />
      </body>
    </html>
  );
}
