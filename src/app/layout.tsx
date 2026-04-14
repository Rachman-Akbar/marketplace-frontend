import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { Container } from "@/components/layout/Container";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Curated Canvas",
  description: "Buyer marketplace UI built with Next.js App Router and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${playfair.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1"
        />
      </head>
      <body className="min-h-full bg-[var(--color-canvas)] text-[var(--color-text)]">
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">
            <Container className="py-8 md:py-10">{children}</Container>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
