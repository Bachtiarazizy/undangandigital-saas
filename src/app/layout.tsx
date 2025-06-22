import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import AuthProvider from "./api/auth/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UndanganDigital - Buat Undangan Digital Impian Anda",
  description: "Platform terlengkap untuk membuat undangan digital yang memukau dengan fitur RSVP, galeri foto, musik latar, dan banyak lagi.",
  keywords: "undangan digital, undangan online, wedding invitation, RSVP, undangan pernikahan",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
