"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (menu) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  const toggleMobileDropdown = (menu) => {
    setActiveMobileDropdown(activeMobileDropdown === menu ? null : menu);
  };

  return (
    <>
      <header
        id="navbar"
        className={`fixed top-0 inset-x-0 flex items-center z-40 w-full transition-all py-5 ${
          isScrolled
            ? "bg-white bg-opacity-70 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <img
              src="assets/images/logo-dark.png"
              className="h-8 logo-dark"
              alt="Logo Dark"
            />
            <img
              src="assets/images/logo-light.png"
              className="h-8 logo-light"
              alt="Logo Light"
            />
          </Link>

          <div className="hidden lg:block">
            <ul className="navbar-nav flex gap-x-6 items-center justify-center">
              <li className="nav-item">
                <Link className="nav-link" href="/">
                  Home
                </Link>
              </li>
              <li
                className="nav-item relative"
                onMouseEnter={() => handleMouseEnter("typing")}
                onMouseLeave={handleMouseLeave}
              >
                <a className="nav-link cursor-pointer">
                  Typing{" "}
                  <i className="fa-solid fa-angle-down ms-2 align-middle"></i>
                </a>
                {activeDropdown === "typing" && (
                  <div className="absolute left-0 mt-2 bg-white rounded-lg shadow-lg border p-2 w-48">
                    <div className="nav-item">
                      <Link className="nav-link" href="/typing-test">
                        Typing Test
                      </Link>
                    </div>
                    <div className="nav-item">
                      <Link className="nav-link" href="/advance-typing-test">
                        Advanced Test
                      </Link>
                    </div>
                  </div>
                )}
              </li>
              <li
                className="nav-item relative"
                onMouseEnter={() => handleMouseEnter("games")}
                onMouseLeave={handleMouseLeave}
              >
                <a className="nav-link cursor-pointer">
                  Games{" "}
                  <i className="fa-solid fa-angle-down ms-2 align-middle"></i>
                </a>
                {activeDropdown === "games" && (
                  <div className="absolute left-0 mt-2 bg-white rounded-lg shadow-lg border p-2 w-48">
                    <div className="nav-item">
                      <Link className="nav-link" href="/words-fall-game">
                        Words Fall Game
                      </Link>
                    </div>
                    <div className="nav-item">
                      <Link className="nav-link" href="/type-and-destroy-game">
                        Type & Destroy
                      </Link>
                    </div>
                    <div className="nav-item">
                      <Link className="nav-link" href="/typing-speed-ai">
                        Typing Speed AI
                      </Link>
                    </div>
                  </div>
                )}
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/text-practice">
                  Text Practice
                </Link>
              </li>
            </ul>
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/login"
              className="bg-primary text-white px-4 py-2 rounded-lg inline-flex items-center text-sm font-medium shadow-md hover:bg-primary-dark transition-colors"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="text-primary px-4 py-2 rounded-lg border border-primary inline-flex items-center text-sm font-medium shadow-md hover:bg-primary hover:text-white transition-colors"
            >
              Sign Up
            </Link>
          </div>

          <div className="lg:hidden flex items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-2xl text-gray-500"
            >
              <i className="fa-solid fa-bars"></i>
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div
          id="mobileMenu"
          className="fixed top-0 inset-x-0 z-50 h-screen bg-white p-6 flex flex-col space-y-4 overflow-y-auto"
        >
          <div className="flex justify-between items-center mb-4">
            <Link href="/" className="flex items-center">
              <img
                src="assets/images/logo-dark.png"
                className="h-8"
                alt="Logo"
              />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl text-gray-500"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <ul className="flex flex-col space-y-4">
            <li className="nav-item">
              <Link href="/" className="nav-link text-lg font-medium">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <button
                className="nav-link text-lg font-medium flex justify-between items-center w-full"
                onClick={() => toggleMobileDropdown("typing")}
              >
                Typing
                <i
                  className={`fa-solid fa-angle-down ${
                    activeMobileDropdown === "typing" ? "rotate-180" : ""
                  } transition-transform`}
                ></i>
              </button>
              {activeMobileDropdown === "typing" && (
                <ul className="pl-4 mt-2 space-y-2">
                  <li>
                    <Link className="nav-link" href="/typing-test">
                      Typing Test
                    </Link>
                  </li>
                  <li>
                    <Link className="nav-link" href="/advance-typing-test">
                      Advanced Test
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li className="nav-item">
              <button
                className="nav-link text-lg font-medium flex justify-between items-center w-full"
                onClick={() => toggleMobileDropdown("games")}
              >
                Games
                <i
                  className={`fa-solid fa-angle-down ${
                    activeMobileDropdown === "games" ? "rotate-180" : ""
                  } transition-transform`}
                ></i>
              </button>
              {activeMobileDropdown === "games" && (
                <ul className="pl-4 mt-2 space-y-2">
                  <li>
                    <Link className="nav-link" href="/words-fall-game">
                      Words Fall Game
                    </Link>
                  </li>
                  <li>
                    <Link className="nav-link" href="/type-and-destroy-game">
                      Type & Destroy
                    </Link>
                  </li>
                  <li>
                    <Link className="nav-link" href="/typing-speed-ai">
                      Typing Speed AI
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li className="nav-item">
              <Link
                href="/text-practice"
                className="nav-link text-lg font-medium"
              >
                Text Practice
              </Link>
            </li>
            <div className="flex space-x-4">
              <Link
                href="/login"
                className="bg-primary text-white px-4 py-3 rounded-lg text-center font-medium shadow-md hover:bg-primary-dark transition-colors flex-1"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="text-primary px-4 py-3 rounded-lg text-center border border-primary font-medium shadow-md hover:transition-colors flex-1"
              >
                Sign Up
              </Link>
            </div>
          </ul>
        </div>
      )}
    </>
  );
};

export default Header;
