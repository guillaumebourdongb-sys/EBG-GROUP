import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EBG GROUP | Location de matériel BTP en Guyane française",
  description:
    "EBG GROUP — Votre partenaire BTP en Guyane française. Location de mini-pelles, terrassement, transport et services chantier. Disponible 24/7.",
  keywords:
    "location mini-pelle, BTP Guyane, terrassement Guyane, location matériel construction, 973",
  authors: [{ name: "EBG GROUP" }],
  openGraph: {
    title: "EBG GROUP | Location de matériel BTP en Guyane française",
    description:
      "Votre partenaire BTP de confiance. Location de mini-pelles et services chantier en Guyane française.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${bebasNeue.variable} ${inter.variable}`}
    >
      <body className="bg-ebg-black text-white font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
