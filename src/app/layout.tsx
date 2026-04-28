import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PageLoader from "@/components/PageLoader";
import ScrollToTop from "@/components/ScrollToTop";
import RefreshHandler from "@/components/RefreshHandler";
import SmoothScroll from "@/components/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bilax Constructions",
  description: "Transforming ideas into reality through comprehensive construction services",
  icons: {
    icon: "/favicon.png",
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
      style={{ fontSize: '16px' }}
    >
      <body className="min-h-full flex flex-col">
        <ScrollToTop />
        <RefreshHandler />
        <SmoothScroll />
        <PageLoader />
        {children}
      </body>
    </html>
  );
}
