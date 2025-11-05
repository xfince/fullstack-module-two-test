import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    setMobileOpen(false);
    logout && logout();
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-2xl font-bold text-primary">
            MentorLink
          </Link>

          {/* Desktop / Tablet Links */}
          <div className="hidden md:flex gap-4 items-center">
            <Link to="/mentors" className="text-gray-700 hover:text-primary">
              Find Mentors
            </Link>

            {user ? (
              <>
                {user.role === "mentor" && (
                  <Link
                    to="/dashboard"
                    className="text-gray-700 hover:text-primary"
                  >
                    Dashboard
                  </Link>
                )}
                <span className="text-gray-600">Hi, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-primary">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-controls="mobile-menu"
              aria-expanded={mobileOpen}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span className="sr-only">Open main menu</span>
              {mobileOpen ? (
                <svg
                  className="block h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`md:hidden ${mobileOpen ? "block" : "hidden"}`}
      >
        <div className="px-4 pt-2 pb-4 space-y-2 border-t">
          <Link
            to="/mentors"
            onClick={() => setMobileOpen(false)}
            className="block text-gray-700 hover:bg-gray-100 rounded-md px-3 py-2"
          >
            Find Mentors
          </Link>

          {user ? (
            <>
              {user.role === "mentor" && (
                <Link
                  to="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="block text-gray-700 hover:bg-gray-100 rounded-md px-3 py-2"
                >
                  Dashboard
                </Link>
              )}
              <div className="px-3 py-2 text-gray-600">Hi, {user.name}</div>
              <button
                onClick={handleLogout}
                className="w-full text-left bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="block text-gray-700 hover:bg-gray-100 rounded-md px-3 py-2"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setMobileOpen(false)}
                className="block bg-primary text-white text-center px-3 py-2 rounded-md hover:bg-blue-600"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
