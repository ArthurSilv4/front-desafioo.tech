import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Layout/Header/page";
import { Footer } from "@/components/Layout/Footer/page";
import FAQ from "@/components/Layout/Main/FAQ/page";
import { Separator } from "@radix-ui/react-separator";
import { Creators } from "@/components/Layout/Main/Creators/page";
import { CategoryList } from "@/components/Layout/Main/CategoryList/page";
import { StartProgramming } from "@/components/Layout/Main/StartProgramming/page";
import { CTA } from "@/components/Layout/Main/CTA/page";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Desafioo.Tech",
  description: "Desafioo.Tech: Desafios de programação",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <Header />
        <main className="max-w-screen-2xl mx-auto">
          <CategoryList />
          <CTA />
          {children}
          <StartProgramming />
          <Creators />
          <FAQ />
          <Separator className="bg-gray-300 h-[1px]" />
        </main>
        <Footer />
      </body>
    </html>
  );
}
