"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Tools", path: "/tools" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-toolnest-bg shadow-lg" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            className="text-2xl font-bold text-toolnest-text"
            whileHover={{ scale: 1.05 }}
          >
            <Link href="/">GrockTool</Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ y: -2 }}
                className="relative"
              >
                <Link
                  href={item.path}
                  className={`text-toolnest-text hover:text-toolnest-text/80 transition-colors duration-200 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-toolnest-text after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${
                    pathname === item.path ? "after:scale-x-100" : ""
                  }`}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <button
              className="md:hidden text-toolnest-text"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.nav
            className="md:hidden mt-4 pb-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`block py-2 text-toolnest-text hover:text-toolnest-text/80 transition-colors ${
                  pathname === item.path ? "font-semibold" : ""
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
