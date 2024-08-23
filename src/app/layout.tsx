// app/layout.tsx or pages/_app.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Typing Game & Tests",
  description: "A typing game and typing tests to improve your typing skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
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
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
        <Script src="assets/libs/@frostui/tailwindcss/frostui.js" />
        <Script src="assets/libs/swiper/swiper-bundle.min.js" />
        <Script src="assets/libs/aos/aos.js" />
        <Script src="assets/js/theme.min.js" />
        {/* PWA Install Button Script */}
        <Script id="install-button-script">
          {`
            let deferredPrompt;
            const installButton = document.createElement('button');
            installButton.innerText = 'Install App';
            installButton.style.display = 'none';
            installButton.style.position = 'fixed';
            installButton.style.bottom = '20px';
            installButton.style.right = '20px';
            installButton.style.padding = '10px 20px';
            installButton.style.fontSize = '16px';
            installButton.style.backgroundColor = '#007bff';
            installButton.style.color = '#fff';
            installButton.style.border = 'none';
            installButton.style.borderRadius = '5px';
            installButton.style.cursor = 'pointer';
            installButton.addEventListener('click', () => {
              if (deferredPrompt) {
                deferredPrompt.prompt();
                deferredPrompt.userChoice.then((result) => {
                  if (result.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                  } else {
                    console.log('User dismissed the install prompt');
                  }
                  deferredPrompt = null;
                  installButton.style.display = 'none';
                });
              }
            });
            document.body.appendChild(installButton);

            window.addEventListener('beforeinstallprompt', (e) => {
              e.preventDefault();
              deferredPrompt = e;
              if (navigator.userAgent.indexOf('Windows') !== -1 || navigator.userAgent.indexOf('Macintosh') !== -1) {
                installButton.style.display = 'block';
              }
            });
          `}
        </Script>
      </body>
    </html>
  );
}
