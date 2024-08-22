import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-200">
      <div className="container px-4">
        <div className="grid gap-6 py-12 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          <div className="xl:col-span-2">
            <Link href="/">
              <img
                src="assets/images/logo-dark.png"
                className="h-8"
                alt="Logo"
              />
            </Link>
            <p className="text-gray-500/80 mt-5 lg:w-4/5">
              Make your web application stand out with a high-quality landing
              page.
            </p>
          </div>
          <div className="xl:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div className="flex flex-col gap-3">
              <h5 className="mb-3 uppercase">Typing Tests</h5>
              <div className="text-gray-500/80">
                <Link href="/typing-test">Typing Test</Link>
              </div>
              <div className="text-gray-500/80">
                <Link href="/advance-typing-test">Advance Typing Test</Link>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <h5 className="mb-3 uppercase">Typing Games</h5>
              <div className="text-gray-500/80">
                <Link href="/type-and-destroy-game">Type & Destroy</Link>
              </div>
              <div className="text-gray-500/80">
                <Link href="/typing-speed-ai">Typing with AI</Link>
              </div>
              <div className="text-gray-500/80">
                <Link href="/words-fall-game">Words Fall</Link>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <h5 className="mb-3 uppercase">Company</h5>
              <div className="text-gray-500/80">
                <a href="#">About us</a>
              </div>
              <div className="text-gray-500/80">
                <a href="#">Career</a>
              </div>
              <div className="text-gray-500/80">
                <a href="#">Contact Us</a>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <h5 className="mb-3 uppercase">Legal</h5>
              <div className="text-gray-500/80">
                <a href="#">Usage Policy</a>
              </div>
              <div className="text-gray-500/80">
                <a href="#">Privacy Policy</a>
              </div>
              <div className="text-gray-500/80">
                <a href="#">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t py-6">
          <div className="grid gap-6 text-center sm:grid-cols-2 sm:text-start">
            <div>
              <p className="text-gray-500/80 text-sm">
                © 2024 Typing Tests. All rights reserved. Powered by{" "}
                <a
                  href="https://khaliddanishyar.com"
                  className="text-gray-800 hover:text-primary transition-all"
                >
                  Khalid Danishyar
                </a>
              </p>
            </div>
            <div className="flex justify-center sm:justify-end gap-7">
              <div>
                <a href="#">
                  <svg
                    className="w-5 h-5 text-gray-500 hover:text-primary transition-all"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
              </div>
              <div>
                <a href="#">
                  <svg
                    className="w-5 h-5 text-gray-500 hover:text-primary transition-all"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                </a>
              </div>
              <div>
                <a href="#">
                  <svg
                    className="w-5 h-5 text-gray-500 hover:text-primary transition-all"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
