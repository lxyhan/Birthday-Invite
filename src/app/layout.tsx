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
  title: "James Han's Birthday Party - September 27th, 2025",
  description: "You're invited to James Han's birthday celebration! Saturday, September 27th, 2025 from 5:00 PM - 9:00 PM at 57 St Joseph Street. RSVP now!",
  keywords: ["birthday party", "invitation", "James Han", "September 2025", "RSVP"],
  authors: [{ name: "James Han" }],
  openGraph: {
    title: "James Han's Birthday Party 🎂",
    description: "You're invited! Saturday, Sep 27th, 2025 • 5:00-9:00 PM • 57 St Joseph Street",
    type: "website",
    locale: "en_US",
    siteName: "Birthday Invitation",
  },
  twitter: {
    card: "summary_large_image",
    title: "James Han's Birthday Party 🎂",
    description: "You're invited! Saturday, Sep 27th, 2025 • 5:00-9:00 PM • 57 St Joseph Street",
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
