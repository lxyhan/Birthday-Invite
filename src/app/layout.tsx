import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "James Han's Birthday Party 🎂",
  description: "Sep 27 • 5-9pm • 57 St Joseph St",
  keywords: ["birthday party", "invitation", "James Han", "September 2025", "RSVP"],
  authors: [{ name: "James Han" }],
  openGraph: {
    title: "James Han's Birthday Party 🎂",
    description: "Sep 27 • 5-9pm • 57 St Joseph St",
    type: "website",
    locale: "en_US",
    siteName: "Birthday Invitation",
  },
  twitter: {
    card: "summary_large_image",
    title: "James Han's Birthday Party 🎂",
    description: "Sep 27 • 5-9pm • 57 St Joseph St",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
