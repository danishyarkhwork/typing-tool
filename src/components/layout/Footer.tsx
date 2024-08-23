import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
      <div className="container sm:px-8 md:px-6xl lg:px-6xl">
        <div className="grid gap-10 lg:grid-cols-5 text-left">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <Link href="/">
              <img
                src="assets/images/logo-dark.png"
                className="h-12 mb-6"
                alt="Logo"
              />
            </Link>
            <p className="text-gray-400 leading-relaxed max-w-sm">
              Elevate your web presence with a high-quality landing page that
              captures attention and drives engagement.
            </p>
          </div>

          {/* Typing Tests */}
          <div>
            <h5 className="uppercase font-semibold mb-4 text-white">
              Typing Tests
            </h5>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/typing-test"
                  className="hover:text-gray-100 transition-colors duration-200"
                >
                  Typing Test
                </Link>
              </li>
              <li>
                <Link
                  href="/advance-typing-test"
                  className="hover:text-gray-100 transition-colors duration-200"
                >
                  Advance Typing Test
                </Link>
              </li>
            </ul>
          </div>

          {/* Typing Games */}
          <div>
            <h5 className="uppercase font-semibold mb-4 text-white">
              Typing Games
            </h5>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/type-and-destroy-game"
                  className="hover:text-gray-100 transition-colors duration-200"
                >
                  Type & Destroy
                </Link>
              </li>
              <li>
                <Link
                  href="/typing-speed-ai"
                  className="hover:text-gray-100 transition-colors duration-200"
                >
                  Typing with AI
                </Link>
              </li>
              <li>
                <Link
                  href="/words-fall-game"
                  className="hover:text-gray-100 transition-colors duration-200"
                >
                  Words Fall
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h5 className="uppercase font-semibold mb-4 text-white">Company</h5>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="hover:text-gray-100 transition-colors duration-200"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-gray-100 transition-colors duration-200"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center text-gray-500 text-sm">
            <p className="sm:mb-4 lg:mb-0">
              © 2024 Typing Tests. All rights reserved. Powered by{" "}
              <a
                href="https://khaliddanishyar.com"
                className="text-white hover:text-primary transition-colors duration-200"
              >
                Khalid Danishyar
              </a>
            </p>
            <p>
              <ul className="flex space-x-3">
                <li>
                  <Link
                    href="#"
                    className="hover:text-gray-100 transition-colors duration-200"
                  >
                    Usage Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-gray-100 transition-colors duration-200"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-gray-100 transition-colors duration-200"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
