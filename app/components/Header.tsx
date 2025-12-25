"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

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

  // Theme toggle button for desktop
  const ThemeToggleButton = () => (
    <motion.button
      className={`p-2 rounded-full ${
        theme === 'dark' 
          ? 'bg-gray-800 text-yellow-300 hover:bg-gray-700' 
          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
      } transition-all duration-300`}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
    >
      {theme === 'dark' ? (
        <Sun size={20} className="transition-all duration-300" />
      ) : (
        <Moon size={20} className="transition-all duration-300" />
      )}
    </motion.button>
  );

  // Theme toggle button for mobile
  const MobileThemeToggleButton = () => (
    <button
      className={`flex items-center justify-center w-full py-3 rounded-lg transition-all duration-200 ${
        theme === 'dark'
          ? 'bg-gray-800 text-yellow-300 hover:bg-gray-700'
          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
      }`}
      onClick={toggleTheme}
    >
      {theme === 'dark' ? (
        <>
          <Sun size={20} className="mr-3" />
          Switch to Light Mode
        </>
      ) : (
        <>
          <Moon size={20} className="mr-3" />
          Switch to Dark Mode
        </>
      )}
    </button>
  );

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
                <span className="text-[hsl(var(--toolnest-accent))]">
                  GrockTool
                </span>
              </Link>
            </motion.div>

            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              <ThemeToggleButton />
              
              {/* Mobile Menu Button */}
              <motion.button
                className="p-2 rounded-lg text-toolnest-text hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
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
            </div>
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
                    <span className="text-[hsl(var(--toolnest-accent))]">
                      GrockTool
                    </span>
                  </Link>
                </motion.div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                  <nav className="flex space-x-8" aria-label="Main navigation">
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
                  
                  {/* Theme Toggle for Desktop */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <ThemeToggleButton />
                  </motion.div>
                </div>
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
                  <div className="glass rounded-full px-8 py-3 shadow-2xl shadow-[hsl(var(--toolnest-accent))]/20">
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
                          <span className="text-[hsl(var(--toolnest-accent))] drop-shadow-lg">
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
                        className="h-6 w-px bg-foreground/20"
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
                              className={`text-sm font-medium transition-all duration-200 relative text-foreground hover:text-foreground/80 ${
                                pathname === item.path ? "text-foreground font-semibold drop-shadow-lg" : ""
                              }`}
                              aria-current={pathname === item.path ? "page" : undefined}
                            >
                              {item.name}
                              {pathname === item.path && (
                                <motion.div
                                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[hsl(var(--toolnest-accent))] rounded-full shadow-lg shadow-[hsl(var(--toolnest-accent))]/50"
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

                      {/* Separator */}
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ 
                          scale: 0, 
                          opacity: 0,
                          transition: { duration: 0.2 }
                        }}
                        transition={{ delay: 0.6 }}
                        className="h-6 w-px bg-foreground/20"
                      />

                      {/* Theme Toggle */}
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.8 }}
                      >
                        <ThemeToggleButton />
                      </motion.div>
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
                      <span className="text-[hsl(var(--toolnest-accent))]">
                        GrockTool
                      </span>
                    </Link>
                  </motion.div>

                  <div className="flex items-center gap-2">
                    {/* Theme Toggle */}
                    <ThemeToggleButton />
                    
                    {/* Mobile Menu Button */}
                    <motion.button
                      className="p-2 rounded-lg text-toolnest-text hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      onClick={() => setMobileMenuOpen((prev) => !prev)}
                      aria-controls="mobile-menu"
                      aria-expanded={mobileMenuOpen}
                      aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                    >
                      {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </motion.button>
                  </div>
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
                className="md:hidden fixed left-4 right-4 top-20 z-50 bg-background rounded-xl shadow-lg border border-border overflow-hidden"
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
                            ? "bg-[hsl(var(--toolnest-accent))] text-primary-foreground font-semibold shadow-sm"
                            : "text-foreground hover:bg-secondary active:bg-secondary/80"
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                  
                  {/* Theme Toggle in Mobile Menu */}
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: navItems.length * 0.05 }}
                    className="px-2 pt-4 border-t border-border"
                  >
                    <MobileThemeToggleButton />
                  </motion.div>
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