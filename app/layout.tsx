import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NexMind - AI Life Assistant",
  description: "Your intelligent companion for personalized recommendations across all aspects of life",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col antialiased bg-background text-foreground`}>
        <Header />
        <div className="flex-1">
          {children}
        </div>
      </body>
    </html>
  );
}
