"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Twitter, Linkedin, Send } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Tools", path: "/tools" },
    { name: "Contact", path: "/contact" },
  ];

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Feedback submitted:", { name, email, message });
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setName("");
      setEmail("");
      setMessage("");
    }, 3000);
  };

  return (
    <footer className="py-16 px-6 bg-toolnest-text text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Column 1: Logo + Tagline */}
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-bold mb-2">GrockTool</h3>
              <p className="text-white/80 text-lg">Smart Tools, Simplified.</p>
            </div>
            <p className="text-white/70 leading-relaxed">
              Your go-to platform for 150+ essential tools. Fast, free, and
              always accessible.
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-4 pt-4">
              <motion.a
                href="#"
                className="text-white/80 hover:text-white transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Twitter size={24} />
              </motion.a>
              <motion.a
                href="#"
                className="text-white/80 hover:text-white transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin size={24} />
              </motion.a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className="text-white/80 hover:text-white transition-colors duration-200 hover:translate-x-1 transform transition-transform"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Contact Info */}
            <div className="pt-6 border-t border-white/20">
              <p className="text-white/70 text-sm mb-2">Need support?</p>
              <a
                href="mailto:support@grocktool.com"
                className="text-white/80 hover:text-white transition-colors duration-200"
              >
                support@grocktool.com
              </a>
            </div>
          </div>

          {/* Column 3: Feedback Form */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold mb-4">Have Suggestions?</h4>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 text-center"
              >
                <p className="text-green-300 font-medium">
                  Thanks for your feedback!
                </p>
                <p className="text-green-200/80 text-sm mt-1">
                  We appreciate your input.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-200"
                  required
                />
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-200"
                  required
                />
                <textarea
                  placeholder="Your message or suggestion"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-200 resize-none"
                  required
                />
                <motion.button
                  type="submit"
                  className="w-full bg-white/20 hover:bg-white/30 text-white py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Feedback
                  <Send size={16} />
                </motion.button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-white/70 mb-4 md:mb-0">
              © 2025 GrockTool. All rights reserved.
            </div>
            <div className="text-white/60 text-sm">
              Made with ❤️ for developers and creators (Arman Dhuka)
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
