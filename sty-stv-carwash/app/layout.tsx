import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sty & Stv Carwash",
  description: "Spălătorie auto hibrid modernă în Craiova cu peste 20 de ani experiență. Self-Wash + Serviciu Complet cu Personal. 5 posturi performante.",
  icons: {
    icon: "/images/logo.jpg",           // logo-ul tău
    apple: "/images/logo.jpg",
  },
  openGraph: {
    title: "Sty & Stv Carwash",
    description: "Spălătorie auto Self Wash & Cu Personal",
    images: [{ url: "/images/logo.jpg" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
