import type { Metadata } from "next";
import AuthProvider from "@/lib/auth-context";
import "./globals.css";

export const metadata: Metadata = {
  title: "Paw-some Retail | POS Dashboard",
  description: "Point of Sale Dashboard for Paw-some Retail Petshop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-[#FDF8F3] font-sans text-[#1F2937]">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
