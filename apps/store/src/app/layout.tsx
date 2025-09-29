import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "@renovabit/ui/globals.css";
import { Toaster } from "@renovabit/ui/components/ui/sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { QueryProvider } from "@/providers/query-provider";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Renovabit",
  description: "Renovabit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={outfit.className}>
        <Toaster />
        <QueryProvider>
          <NuqsAdapter>{children}</NuqsAdapter>
        </QueryProvider>
      </body>
    </html>
  );
}
