import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs"

import { HeroSection } from "@/components/Herosection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MovieMirror || Your Movie Hub",
  description: "This is a movie hub where you can find your favourite movies and TV shows, create watchlists, and get recommendations based on your viewing history.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <Header />
          <HeroSection />
          {children}
          <footer>
            <Footer />
          </footer>
        </body>

      </html>
    </ClerkProvider>
  )
}