import type React from "react";
import type { Metadata } from "next";
import { Cormorant_Garamond, Lora } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["300", "400", "500", "600", "700"],
});
const lora = Lora({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Seatlee - Elegant Seating Chart Designer",
  description: "Create beautiful seating arrangements for your events",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lora.variable} ${cormorant.variable} font-sans antialiased`}
      >
        {children}
        <Analytics />
        <Toaster />
      </body>
    </html>
  );
}
