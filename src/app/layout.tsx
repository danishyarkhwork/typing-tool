// app/layout.tsx
"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SessionProvider } from "next-auth/react";
import { useSession } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Improve your typing speed and accuracy with fun typing tests and games on Asan Typing. Start practicing today and enhance your typing skills."
        />
        <meta
          name="keywords"
          content="asan typing, asan type, typing asan, typing, typing tests, typing games, improve typing, typing practice, typing speed"
        />
        <meta name="author" content="Asan Typing" />
        <link
          href="assets/libs/swiper/swiper-bundle.min.css"
          rel="stylesheet"
          type="text/css"
        />
        <link href="assets/libs/aos/aos.css" rel="stylesheet" type="text/css" />
        <link
          href="assets/css/style.min.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="assets/css/icons.min.css"
          rel="stylesheet"
          type="text/css"
        />
        <title>Asan Typing - Improve Your Typing Skills</title>
      </head>

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
