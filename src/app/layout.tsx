import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ClientProviders } from "@/components/ClientProviders";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const sans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const serif = Playfair_Display({
  variable: "--font-editorial",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Purience",
    default: "Purience — What is actually worth experiencing?",
  },
  description:
    "Purience is a consumer-first discovery and booking platform for extraordinary experiences worldwide. Pure + Experience.",
  keywords: [
    "experiences",
    "travel experiences",
    "craft workshops",
    "curated travel",
    "Marrakech experiences",
    "Seville flamenco",
    "culinary adventures",
    "authentic travel",
  ],
  authors: [{ name: "Purience Editorial Team" }],
  openGraph: {
    title: "Purience — Find something worth experiencing.",
    description: "Extraordinary things to do, wherever life takes you.",
    url: "https://purience.com",
    siteName: "Purience",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Purience — Find something worth experiencing.",
    description: "Extraordinary things to do, wherever life takes you.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-ivory text-charcoal font-body selection:bg-terracotta/20 selection:text-charcoal">
        <ClientProviders>
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
