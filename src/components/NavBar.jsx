import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const activeLink = location.pathname;

  const NavLinks = [
    { href: "/", label: "Hero" },
    { href: "/home", label: "Home" },
    { href: "/about", label: "About Us" },
    // { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 right-0 left-0 bg-gray-900/95 backdrop-blur-sm z-50 shadow-lg border-b border-gray-700">
      <div className="w-full container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 md:h-20 h-16">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">T</span>
          </div>
          <Link
          to="/home"
          >
          <span className="text-white font-bold text-xl hidden sm:block">TRANSIT</span>
        </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-white hover:bg-gray-800 rounded-lg transition-colors"
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-8">
          {NavLinks.map((link, index) => (
            <Link
              key={index}
              to={link.href}
              className={`text-sm font-medium px-3 py-2 rounded-lg transition-all ${
                activeLink === link.href
                  ? "text-blue-400 bg-gray-800/50"
                  : "text-gray-300 hover:text-blue-400 hover:bg-gray-800/30"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <Link
          to="/contact"
          className="hidden md:block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2.5 rounded-lg hover:from-blue-600 hover:to-purple-700 text-sm font-medium transition-all"
        >
          Get in touch
        </Link>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900/98 border-t border-gray-700 py-4">
          <div className="container mx-auto px-4 space-y-2">
            {NavLinks.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg transition-all text-sm font-medium ${
                  activeLink === link.href
                    ? "text-blue-400 bg-gray-800/70"
                    : "text-gray-300 hover:text-blue-400 hover:bg-gray-800/50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="block w-full text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 text-sm font-medium transition-all mt-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Get in touch
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;