"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link
        href="assets/libs/swiper/swiper-bundle.min.css"
        rel="stylesheet"
        type="text/css"
      />
      <link href="assets/libs/aos/aos.css" rel="stylesheet" type="text/css" />

      <link href="assets/css/style.min.css" rel="stylesheet" type="text/css" />

      <link href="assets/css/icons.min.css" rel="stylesheet" type="text/css" />

      <body className={inter.className}>
        <SessionProvider>
          <Header />
          {children}
          <Footer />
        </SessionProvider>
      </body>

      <Script src="assets/libs/@frostui/tailwindcss/frostui.js"></Script>
      <Script src="assets/libs/swiper/swiper-bundle.min.js"></Script>
      <Script src="assets/libs/aos/aos.js"></Script>
      <Script src="assets/js/theme.min.js"></Script>
    </html>
  );
}
