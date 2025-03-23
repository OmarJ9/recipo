import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import "./globals.css";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Toaster } from "sonner";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Tasty Recipes",
    template: "%s | Tasty Recipes",
  },
  description:
    "Discover delicious recipes from around the world. Find easy-to-follow cooking instructions, ingredients lists, and helpful video guides.",
  keywords: [
    "recipes",
    "cooking",
    "food",
    "international cuisine",
    "cooking instructions",
    "ingredients",
  ],
  authors: [{ name: "Tasty Recipes Team" }],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const isLoggedIn = !!session;
  const isAdmin = session?.user?.role === "admin";
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased min-h-screen flex flex-col">
        <Navbar isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
        <main className="flex-1">{children}</main>
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
