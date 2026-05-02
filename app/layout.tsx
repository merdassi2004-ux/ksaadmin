import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "KSAR AYED Lounge | Relax. Sip. Enjoy.",
  description: "Experience premium shisha, coffee, and a beautiful rooftop city view at KSAR AYED Lounge in Gammarth, Tunis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased bg-dark text-light font-sans`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
