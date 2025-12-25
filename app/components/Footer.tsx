"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Twitter, Linkedin, Send, Mail, Heart, ArrowRight, Github, MessageCircle, ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Tools", path: "/tools" },
    { name: "Contact", path: "/contact" },
  ];

  const toolCategories = [
    { name: "Text Tools", path: "/tool?category=Text%20Tools" },
    { name: "Qr Code", path: "/tool?category=QR%20%26%20Barcode%20Tools" },
    { name: "Number Tools", path: "/tool?category=Number%20Tools" },
    { name: "Math Tools", path: "/tool?category=Math%20Tools" },
  ];

  const popularTools = [
    { name: "Length Converter", path: "/tools/length-converter" },
    { name: "Qr Code ", path: "/QR-Barcode/qr-code-generator" },
    { name: "BMI Calculator", path: "/health-tools/bmi-calculator" },
    { name: "Word Counter", path: "/text-tools/word-counter" },
  ];

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('message', message);
      formData.append('_subject', 'New Feedback from GrockTool');
      formData.append('_captcha', 'false');
      formData.append('_template', 'table');

      await fetch('https://formsubmit.co/ajax/grocktool@gmail.com', {
        method: 'POST',
        body: formData,
      });

      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setName("");
        setEmail("");
        setMessage("");
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-background text-foreground border-t border-border">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, hsl(var(--foreground)) 2%, transparent 0%), radial-gradient(circle at 75px 75px, hsl(var(--foreground)) 2%, transparent 0%)`,
          backgroundSize: '100px 100px'
        }}></div>
      </div>

      <div className="relative py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">
            {/* Brand Column */}
            <motion.div 
              className="lg:col-span-2 space-y-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-4">
                <motion.div
                  className="flex items-center gap-3"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent border border-input rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-primary-foreground font-bold text-xl">G</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">GrockTool</h3>
                    <p className="text-muted-foreground text-sm font-light">Smart Tools, Simplified</p>
                  </div>
                </motion.div>
                <p className="text-muted-foreground leading-relaxed text-sm max-w-md">
                  Your ultimate platform for 150+ essential tools. Fast, free, and always accessible 
                  for developers, designers, and creators worldwide.
                </p>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">Navigation</h4>
              <nav className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <motion.div
                    key={item.name}
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Link
                      href={item.path}
                      className="text-muted-foreground hover:text-foreground transition-all duration-300 text-sm flex items-center gap-2 group"
                    >
                      <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>

            {/* Tool Categories */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">Categories</h4>
              <nav className="flex flex-col space-y-3">
                {toolCategories.map((category) => (
                  <motion.div
                    key={category.name}
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Link
                      href={category.path}
                      className="text-muted-foreground hover:text-foreground transition-all duration-300 text-sm flex items-center gap-2 group"
                    >
                      <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {category.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>

            {/* Popular Tools */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">Popular Tools</h4>
              <nav className="flex flex-col space-y-3">
                {popularTools.map((tool) => (
                  <motion.div
                    key={tool.name}
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Link
                      href={tool.path}
                      className="text-muted-foreground hover:text-foreground transition-all duration-300 text-sm flex items-center gap-2 group"
                    >
                      <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {tool.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          </div>

          {/* Feedback Section */}
          <motion.div 
            className="border-t border-border pt-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-secondary rounded-lg border border-input">
                    <Mail size={18} className="text-muted-foreground" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground">Share Your Feedback</h4>
                    <p className="text-muted-foreground text-sm">We'd love to hear your thoughts and suggestions</p>
                  </div>
                </div>
                
                {/* Contact Info */}
                <div className="space-y-2">
                  <motion.a
                    href="mailto:support@grocktool.com"
                    className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-all duration-300 group"
                    whileHover={{ x: 5 }}
                  >
                    <Mail size={16} />
                    <span className="text-sm">grocktool@gmail.com</span>
                  </motion.a>
                </div>
              </div>

              {/* Feedback Form */}
              <div className="max-w-md">
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="bg-secondary border border-input rounded-xl p-6 text-center"
                    >
                      <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-5 h-5 text-accent-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-foreground font-semibold text-sm mb-1">
                        Thank You!
                      </p>
                      <p className="text-muted-foreground text-xs">
                        Your feedback has been received successfully.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleFeedbackSubmit}
                      className="space-y-3"
                    >
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          name="name"
                          placeholder="Your name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="col-span-2 sm:col-span-1 px-3 py-2 rounded-lg bg-secondary border border-input text-foreground placeholder-muted-foreground focus:outline-none focus:border-ring focus:ring-1 focus:ring-ring/30 transition-all duration-300 text-sm"
                          required
                          disabled={isSubmitting}
                        />
                        <input
                          type="email"
                          name="email"
                          placeholder="Your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="col-span-2 sm:col-span-1 px-3 py-2 rounded-lg bg-secondary border border-input text-foreground placeholder-muted-foreground focus:outline-none focus:border-ring focus:ring-1 focus:ring-ring/30 transition-all duration-300 text-sm"
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                      <textarea
                        name="message"
                        placeholder="Your message or suggestion..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 rounded-lg bg-secondary border border-input text-foreground placeholder-muted-foreground focus:outline-none focus:border-ring focus:ring-1 focus:ring-ring/30 transition-all duration-300 resize-none text-sm"
                        required
                        disabled={isSubmitting}
                      />
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed group"
                        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-accent-foreground border-t-transparent rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Feedback
                            <Send size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                          </>
                        )}
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Bottom Section */}
          <motion.div 
            className="border-t border-border pt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              <div className="text-muted-foreground text-sm text-center lg:text-left">
                © 2025 GrockTool. All rights reserved.
              </div>
              
              <motion.div 
                className="flex items-center gap-4 text-muted-foreground text-sm"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-1">
                  <span>Made with</span>
                  <Heart size={14} className="text-muted-foreground animate-pulse" fill="currentColor" />
                  <span>by Arman Dhuka</span>
                </div>
                
                {/* Scroll to Top Button */}
                <motion.button
                  onClick={scrollToTop}
                  className="p-2 bg-secondary hover:bg-secondary/80 border border-input rounded-lg transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Scroll to top"
                >
                  <ArrowUp size={14} className="text-muted-foreground" />
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;