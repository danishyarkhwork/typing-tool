// pages/_app.tsx
import { useEffect } from "react";
import type { AppProps } from "next/app";
import "./globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isDesktop = window.innerWidth >= 1024; // Set a threshold for desktop devices

      if (isDesktop && "serviceWorker" in navigator) {
        navigator.serviceWorker.register("/sw.js").then(
          (registration) => {
            console.log(
              "Service Worker registered with scope:",
              registration.scope
            );
          },
          (error) => {
            console.error("Service Worker registration failed:", error);
          }
        );
      }
    }
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
