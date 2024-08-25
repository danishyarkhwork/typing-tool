"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Modal from "react-modal";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { signIn, signOut, useSession } from "next-auth/react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<
    string | null
  >(null);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [signupForm, setSignupForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    agreeToPrivacy: false,
  });
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (menu: string) => {
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

  const toggleMobileDropdown = (menu: string) => {
    setActiveMobileDropdown(activeMobileDropdown === menu ? null : menu);
  };

  const openSignupModal = () => {
    setIsSignupModalOpen(true);
  };

  const closeSignupModal = () => {
    setIsSignupModalOpen(false);
    setSignupForm({
      name: "",
      username: "",
      email: "",
      password: "",
      agreeToPrivacy: false,
    });
    setFormErrors({});
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
    setLoginForm({
      email: "",
      password: "",
    });
    setFormErrors({});
  };

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSignupForm({
      ...signupForm,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  const validateSignupForm = () => {
    let errors: { [key: string]: string } = {};
    if (!signupForm.name) errors.name = "Name is required";
    if (!signupForm.username) errors.username = "Username is required";
    if (!signupForm.email) errors.email = "Email is required";
    if (!signupForm.password) errors.password = "Password is required";
    if (!signupForm.agreeToPrivacy)
      errors.agreeToPrivacy = "You must agree to the privacy policy";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateSignupForm()) {
      try {
        const response = await fetch("/api/user/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signupForm),
        });
        if (response.ok) {
          closeSignupModal();
        } else {
          const errorData = await response.json();
          setFormErrors({ server: errorData.message });
        }
      } catch (error) {
        setFormErrors({ server: "An error occurred. Please try again." });
      }
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: loginForm.email,
        password: loginForm.password,
      });

      if (result?.error) {
        setFormErrors({ server: result.error });
      } else {
        closeLoginModal();
      }
    } catch (error) {
      setFormErrors({ server: "An error occurred. Please try again." });
    }
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
              className="h-10 logo-dark"
              alt="Logo Dark"
            />
            <img
              src="assets/images/logo-light.png"
              className="h-10 logo-light"
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
                    <div className="nav-item">
                      <Link className="nav-link" href="/custom-typing-test">
                        Custom Typing Test
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
                <Link className="nav-link" href="/multiplayer-typing-test">
                  Multiplayer Typing Test
                </Link>
              </li>
            </ul>
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            {session ? (
              <>
                <div className="relative">
                  <a
                    href="javascript:void(0);"
                    className="nav-link flex items-center"
                    onClick={() =>
                      setActiveDropdown(
                        activeDropdown === "profile" ? null : "profile"
                      )
                    }
                  >
                    <div className="shrink">
                      <div className="h-8 w-8 me-2">
                        {session?.user ? (
                          <img
                            src={
                              session.user.image ||
                              "assets/images/avators/default-avatar.jpg"
                            }
                            className="avatar h-full w-full rounded-full me-2"
                            alt="User Avatar"
                          />
                        ) : (
                          <img
                            src="assets/images/avators/default-avatar.jpg"
                            className="avatar h-full w-full rounded-full me-2"
                            alt="Default Avatar"
                          />
                        )}
                      </div>
                    </div>
                    {session?.user ? (
                      <div className="hidden lg:block grow ms-1 leading-normal">
                        <span className="block text-sm font-medium">
                          {session.user.name}
                        </span>
                        <span className="block text-gray-400 text-xs">
                          User
                        </span>
                      </div>
                    ) : (
                      <div className="hidden lg:block grow ms-1 leading-normal">
                        <span className="block text-sm font-medium">Guest</span>
                        <span className="block text-gray-400 text-xs">
                          User
                        </span>
                      </div>
                    )}
                  </a>

                  {activeDropdown === "profile" && (
                    <div
                      id="innerPageDropdownMenu"
                      className="absolute right-0 mt-4 bg-white rounded-lg shadow-lg border p-2 w-56 z-50"
                    >
                      <div className="nav-item rounded hover:bg-gray-100 transition-all">
                        <a className="nav-link flex items-center p-2" href="#">
                          <svg
                            className="h-5 w-5 text-gray-500 mr-3"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                          Profile
                        </a>
                      </div>

                      <div className="nav-item rounded hover:bg-gray-100 transition-all">
                        <a className="nav-link flex items-center p-2" href="#">
                          <svg
                            className="h-5 w-5 text-gray-500 mr-3"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <circle cx="12" cy="12" r="3"></circle>
                            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                          </svg>
                          Settings
                        </a>
                      </div>

                      <div className="nav-item rounded hover:bg-gray-100 transition-all">
                        <a className="nav-link flex items-center p-2" href="#">
                          <svg
                            className="h-5 w-5 text-gray-500 mr-3"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <circle cx="12" cy="12" r="10"></circle>
                            <line
                              x1="14.31"
                              y1="8"
                              x2="20.05"
                              y2="17.94"
                            ></line>
                            <line x1="9.69" y1="8" x2="21.17" y2="8"></line>
                            <line x1="7.38" y1="12" x2="13.12" y2="2.06"></line>
                            <line x1="9.69" y1="16" x2="3.95" y2="6.06"></line>
                            <line x1="14.31" y1="16" x2="2.83" y2="16"></line>
                            <line
                              x1="16.62"
                              y1="12"
                              x2="10.88"
                              y2="21.94"
                            ></line>
                          </svg>
                          Support
                        </a>
                      </div>

                      <hr className="border-gray-200 my-2" />

                      <div className="nav-item rounded hover:bg-gray-100 transition-all">
                        <a
                          className="nav-link flex items-center p-2"
                          href="#"
                          onClick={() => signOut()}
                        >
                          <svg
                            className="h-5 w-5 text-gray-500 mr-3"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect
                              x="3"
                              y="11"
                              width="18"
                              height="11"
                              rx="2"
                              ry="2"
                            ></rect>
                            <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
                          </svg>
                          Sign Out
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={openLoginModal}
                  className="bg-primary text-white px-4 py-2 rounded-lg inline-flex items-center text-sm font-medium shadow-md hover:bg-primary-dark transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={openSignupModal}
                  className="text-primary px-4 py-2 rounded-lg border border-primary inline-flex items-center text-sm font-medium shadow-md hover:bg-primary hover:text-white transition-colors"
                >
                  Sign Up
                </button>
              </>
            )}
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
                className="nav-link text-lg font-medium"
                href="/multiplayer-typing-test"
              >
                Multiplayer Typing Test
              </Link>
            </li>
            <div className="flex space-x-4">
              {session ? (
                <button
                  onClick={() => signOut()}
                  className="bg-red-500 text-white px-4 py-3 rounded-lg text-center font-medium shadow-md hover:bg-red-600 transition-colors flex-1"
                >
                  Logout
                </button>
              ) : (
                <>
                  <button
                    onClick={openLoginModal}
                    className="bg-primary text-white px-4 py-3 rounded-lg text-center font-medium shadow-md hover:bg-primary-dark transition-colors flex-1"
                  >
                    Login
                  </button>
                  <button
                    onClick={openSignupModal}
                    className="text-primary px-4 py-3 rounded-lg text-center border border-primary font-medium shadow-md hover:transition-colors flex-1"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </ul>
        </div>
      )}

      {/* <Modal
        isOpen={isSignupModalOpen}
        onRequestClose={closeSignupModal}
        contentLabel="Sign Up"
        className="Modal"
        overlayClassName="Overlay"
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Sign Up
        </h2>
        <form onSubmit={handleSignupSubmit}>
          {formErrors.server && (
            <div className="text-red-500 text-sm mb-4">{formErrors.server}</div>
          )}
          <div className="mb-4 flex items-center">
            <FaUser className="mr-2 text-gray-500" />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={signupForm.name}
              onChange={handleSignupChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
            />
          </div>
          {formErrors.name && (
            <div className="text-red-500 text-sm mb-4">{formErrors.name}</div>
          )}
          <div className="mb-4 flex items-center">
            <FaUser className="mr-2 text-gray-500" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={signupForm.username}
              onChange={handleSignupChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
            />
          </div>
          {formErrors.username && (
            <div className="text-red-500 text-sm mb-4">
              {formErrors.username}
            </div>
          )}
          <div className="mb-4 flex items-center">
            <FaEnvelope className="mr-2 text-gray-500" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={signupForm.email}
              onChange={handleSignupChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
            />
          </div>
          {formErrors.email && (
            <div className="text-red-500 text-sm mb-4">{formErrors.email}</div>
          )}
          <div className="mb-4 flex items-center">
            <FaLock className="mr-2 text-gray-500" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={signupForm.password}
              onChange={handleSignupChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
            />
          </div>
          {formErrors.password && (
            <div className="text-red-500 text-sm mb-4">
              {formErrors.password}
            </div>
          )}
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              name="agreeToPrivacy"
              checked={signupForm.agreeToPrivacy}
              onChange={handleSignupChange}
              className="mr-2"
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              I agree to the Privacy Policy
            </span>
          </div>
          {formErrors.agreeToPrivacy && (
            <div className="text-red-500 text-sm mb-4">
              {formErrors.agreeToPrivacy}
            </div>
          )}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={closeSignupModal}
              className="p-3 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 transition duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="p-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
            >
              Sign Up
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isLoginModalOpen}
        onRequestClose={closeLoginModal}
        contentLabel="Login"
        className="Modal"
        overlayClassName="Overlay"
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Login
        </h2>
        <form onSubmit={handleLoginSubmit}>
          {formErrors.server && (
            <div className="text-red-500 text-sm mb-4">{formErrors.server}</div>
          )}
          <div className="mb-4 flex items-center">
            <FaEnvelope className="mr-2 text-gray-500" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={loginForm.email}
              onChange={handleLoginChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
            />
          </div>
          {formErrors.email && (
            <div className="text-red-500 text-sm mb-4">{formErrors.email}</div>
          )}
          <div className="mb-4 flex items-center">
            <FaLock className="mr-2 text-gray-500" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginForm.password}
              onChange={handleLoginChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
            />
          </div>
          {formErrors.password && (
            <div className="text-red-500 text-sm mb-4">
              {formErrors.password}
            </div>
          )}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={closeLoginModal}
              className="p-3 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 transition duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="p-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
            >
              Login
            </button>
          </div>
        </form>
      </Modal> */}

      <style jsx global>{`
        .Modal {
          position: absolute;
          top: 50%;
          left: 50%;
          right: auto;
          bottom: auto;
          margin-right: -50%;
          transform: translate(-50%, -50%);
          background-color: #ffffff;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          max-width: 500px;
          width: 100%;
        }

        .Overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.75);
          z-index: 9999;
        }
      `}</style>
    </>
  );
};

export default Header;
