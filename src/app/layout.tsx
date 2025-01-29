import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "./providers";
import { Navbar } from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jiran Dashboard",
  description: "User management dashboard for Jiran",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "min-h-screen bg-gray-50")} suppressHydrationWarning>
        <Providers>
          <Navbar />
          <main className="pt-4">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
