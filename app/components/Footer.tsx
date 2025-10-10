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
    { name: "Text Tools", path: "/tools/text" },
    { name: "Image Tools", path: "/tools/image" },
    { name: "Developer Tools", path: "/tools/developer" },
    { name: "Calculator Tools", path: "/tools/calculator" },
  ];

  const popularTools = [
    { name: "Length Converter", path: "/tools/length-converter" },
    { name: "Color Picker", path: "/tools/color-picker" },
    { name: "JSON Formatter", path: "/tools/json-formatter" },
    { name: "PDF Converter", path: "/tools/pdf-converter" },
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
    <footer className="relative bg-gray-900 text-white border-t border-gray-700">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, #EEEEEE 2%, transparent 0%), radial-gradient(circle at 75px 75px, #EEEEEE 2%, transparent 0%)`,
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
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl">G</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">GrockTool</h3>
                    <p className="text-gray-400 text-sm font-light">Smart Tools, Simplified</p>
                  </div>
                </motion.div>
                <p className="text-gray-400 leading-relaxed text-sm max-w-md">
                  Your ultimate platform for 150+ essential tools. Fast, free, and always accessible 
                  for developers, designers, and creators worldwide.
                </p>
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-3 pt-2">
                {[
                  { icon: Twitter, href: "#", label: "Twitter" },
                  { icon: Linkedin, href: "#", label: "LinkedIn" },
                  { icon: Github, href: "#", label: "GitHub" },
                  { icon: MessageCircle, href: "#", label: "Chat" }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    className="text-gray-400 hover:text-white transition-all duration-300 p-2 rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-gray-600"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <social.icon size={18} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Navigation</h4>
              <nav className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <motion.div
                    key={item.name}
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Link
                      href={item.path}
                      className="text-gray-400 hover:text-white transition-all duration-300 text-sm flex items-center gap-2 group"
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
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Categories</h4>
              <nav className="flex flex-col space-y-3">
                {toolCategories.map((category) => (
                  <motion.div
                    key={category.name}
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Link
                      href={category.path}
                      className="text-gray-400 hover:text-white transition-all duration-300 text-sm flex items-center gap-2 group"
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
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Popular Tools</h4>
              <nav className="flex flex-col space-y-3">
                {popularTools.map((tool) => (
                  <motion.div
                    key={tool.name}
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Link
                      href={tool.path}
                      className="text-gray-400 hover:text-white transition-all duration-300 text-sm flex items-center gap-2 group"
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
            className="border-t border-gray-800 pt-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-800 rounded-lg border border-gray-700">
                    <Mail size={18} className="text-gray-300" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">Share Your Feedback</h4>
                    <p className="text-gray-400 text-sm">We'd love to hear your thoughts and suggestions</p>
                  </div>
                </div>
                
                {/* Contact Info */}
                <div className="space-y-2">
                  <motion.a
                    href="mailto:support@grocktool.com"
                    className="flex items-center gap-3 text-gray-400 hover:text-white transition-all duration-300 group"
                    whileHover={{ x: 5 }}
                  >
                    <Mail size={16} />
                    <span className="text-sm">support@grocktool.com</span>
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
                      className="bg-gray-800 border border-gray-700 rounded-xl p-6 text-center"
                    >
                      <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-gray-300 font-semibold text-sm mb-1">
                        Thank You!
                      </p>
                      <p className="text-gray-400 text-xs">
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
                          className="col-span-2 sm:col-span-1 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all duration-300 text-sm"
                          required
                          disabled={isSubmitting}
                        />
                        <input
                          type="email"
                          name="email"
                          placeholder="Your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="col-span-2 sm:col-span-1 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all duration-300 text-sm"
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
                        className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all duration-300 resize-none text-sm"
                        required
                        disabled={isSubmitting}
                      />
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-gray-600 text-white py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed group"
                        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
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
            className="border-t border-gray-800 pt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              <div className="text-gray-500 text-sm text-center lg:text-left">
                © 2025 GrockTool. All rights reserved.
              </div>
              
              <motion.div 
                className="flex items-center gap-4 text-gray-500 text-sm"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-1">
                  <span>Made with</span>
                  <Heart size={14} className="text-gray-400" />
                  <span>by Arman Dhuka</span>
                </div>
                
                {/* Scroll to Top Button */}
                <motion.button
                  onClick={scrollToTop}
                  className="p-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Scroll to top"
                >
                  <ArrowUp size={14} className="text-gray-400" />
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