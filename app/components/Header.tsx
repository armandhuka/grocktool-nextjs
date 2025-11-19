"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  // ✅ Check if mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ✅ Scroll Handler - Mobile pe scrolled effect nahi
  const handleScroll = useCallback(() => {
    if (isMobile) {
      setScrolled(false);
      return;
    }
    const isScrolled = window.scrollY > 10;
    setScrolled(isScrolled);
  }, [isMobile]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // ✅ Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // ✅ Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen, isMobile]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Tools", path: "/tool" },
    { name: "Contact", path: "/contact" },
  ];

  // Mobile pe hamesha normal padding, desktop pe scrolled state ke hisab se
  const getPaddingClass = () => {
    if (isMobile) {
      return "px-6 py-4";
    }
    return scrolled ? "px-4 py-3" : "px-6 py-4";
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      role="banner"
    >
      <div className={`max-w-7xl mx-auto ${getPaddingClass()} transition-all duration-300`}>
        
        {/* Mobile Layout - Always Normal (No Scroll Effects) */}
        {isMobile ? (
          <motion.div
            className="flex items-center justify-between"
          >
            {/* Logo */}
            <motion.div
              className="text-2xl font-bold"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Link href="/" aria-label="Go to Home page">
                <span className="text-[#d8a188]">
                  GrockTool
                </span>
              </Link>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              className="p-2 rounded-lg text-toolnest-text hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              whileTap={{ scale: 0.95 }}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </motion.div>
        ) : (
          /* Desktop Layout - With All Original Scroll Effects */
          <AnimatePresence mode="wait">
            {!scrolled ? (
              /* Before Scroll - Normal Desktop Layout */
              <motion.div
                key="normal-header"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ 
                  opacity: 0,
                  transition: { duration: 0.3 }
                }}
                className="flex items-center justify-around"
              >
                {/* Logo */}
                <motion.div
                  className="text-2xl font-bold"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ 
                    x: -50, 
                    opacity: 0,
                    transition: { duration: 0.3 }
                  }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Link href="/" aria-label="Go to Home page">
                    <span className="text-[#d8a188]">
                      GrockTool
                    </span>
                  </Link>
                </motion.div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-8" aria-label="Main navigation">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ 
                        y: -20, 
                        opacity: 0,
                        transition: { delay: index * 0.05, duration: 0.2 }
                      }}
                      transition={{ 
                        delay: index * 0.1,
                        type: "spring", 
                        stiffness: 400 
                      }}
                      whileHover={{ y: -2 }}
                      className="relative"
                    >
                      <Link
                        href={item.path}
                        className={`text-toolnest-text hover:text-toolnest-text/80 transition-colors duration-200 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-toolnest-text after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${
                          pathname === item.path ? "after:scale-x-100" : ""
                        }`}
                        aria-current={pathname === item.path ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </motion.div>
            ) : (
              /* After Scroll - Centered Desktop Layout with Glass Effect */
              <>
                {/* Desktop Version - Hidden on mobile */}
                <motion.div
                  key="scrolled-header-desktop"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ 
                    opacity: 0, 
                    scale: 0.8,
                    transition: { duration: 0.4 }
                  }}
                  transition={{ 
                    duration: 0.5,
                    type: "spring",
                    stiffness: 200,
                    damping: 25
                  }}
                  className="hidden md:flex items-center justify-center"
                >
                  <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-8 py-3 shadow-2xl shadow-[#d8a188]/20">
                    <div className="flex items-center space-x-8">
                      {/* Logo */}
                      <motion.div
                        className="text-xl font-bold"
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ 
                          x: -100, 
                          opacity: 0,
                          transition: { duration: 0.3 }
                        }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 300,
                          damping: 20
                        }}
                      >
                        <Link href="/" aria-label="Go to Home page">
                          <span className="text-[#d8a188] drop-shadow-lg">
                            GrockTool
                          </span>
                        </Link>
                      </motion.div>

                      {/* Separator */}
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ 
                          scale: 0, 
                          opacity: 0,
                          transition: { duration: 0.2 }
                        }}
                        transition={{ delay: 0.2 }}
                        className="h-6 w-px bg-white/40"
                      />

                      {/* Navigation Items */}
                      <nav className="flex items-center space-x-6" aria-label="Main navigation">
                        {navItems.map((item, index) => (
                          <motion.div
                            key={item.name}
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ 
                              x: 100, 
                              opacity: 0,
                              transition: { 
                                delay: (navItems.length - index - 1) * 0.05,
                                duration: 0.3 
                              }
                            }}
                            transition={{ 
                              delay: 0.3 + (index * 0.1),
                              type: "spring", 
                              stiffness: 300,
                              damping: 20
                            }}
                            whileHover={{ y: -1 }}
                            className="relative"
                          >
                            <Link
                              href={item.path}
                              className={`text-sm font-medium transition-all duration-200 relative text-white hover:text-white/80 ${
                                pathname === item.path ? "text-white font-semibold drop-shadow-lg" : ""
                              }`}
                              aria-current={pathname === item.path ? "page" : undefined}
                            >
                              {item.name}
                              {pathname === item.path && (
                                <motion.div
                                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#d8a188] rounded-full shadow-lg shadow-[#d8a188]/50"
                                  layoutId="activeIndicator"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  exit={{ scale: 0 }}
                                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                              )}
                            </Link>
                          </motion.div>
                        ))}
                      </nav>
                    </div>
                  </div>
                </motion.div>

                {/* Mobile Version - Simple header when scrolled */}
                <motion.div
                  key="scrolled-header-mobile"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ 
                    opacity: 0, 
                    y: -20,
                    transition: { duration: 0.3 }
                  }}
                  className="md:hidden flex items-center justify-between"
                >
                  {/* Logo */}
                  <motion.div
                    className="text-xl font-bold"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ 
                      x: -50, 
                      opacity: 0,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <Link href="/" aria-label="Go to Home page">
                      <span className="text-[#d8a188]">
                        GrockTool
                      </span>
                    </Link>
                  </motion.div>

                  {/* Mobile Menu Button */}
                  <motion.button
                    className="text-toolnest-text"
                    onClick={() => setMobileMenuOpen((prev) => !prev)}
                    aria-controls="mobile-menu"
                    aria-expanded={mobileMenuOpen}
                    aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                  >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                  </motion.button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        )}

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                className="md:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-40 top-0 left-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
              />
              
              {/* Mobile Menu */}
              <motion.nav
                id="mobile-menu"
                className="md:hidden fixed left-4 right-4 top-20 z-50 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
              >
                <div className="space-y-1 p-2">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={item.path}
                        className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                          pathname === item.path
                            ? "bg-[#d8a188] text-white font-semibold shadow-sm"
                            : "text-gray-700 hover:bg-gray-50 active:bg-gray-100"
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.nav>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;