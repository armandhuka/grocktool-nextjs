'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Zap, Rocket } from 'lucide-react';
import { useRouter } from 'next/navigation';

const EmailModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => {
      setShowModal(true);
      setTimeout(() => setIsVisible(true), 100);
    }, 1000);
    return () => clearTimeout(t);
  }, []);

  const closeModal = () => {
    setIsVisible(false);
    setTimeout(() => setShowModal(false), 300);
  };

  const handleExploreClick = () => {
    // Close modal first
    setIsVisible(false);
    setTimeout(() => {
      setShowModal(false);
      // Redirect to tools page
      router.push('/tool');
    }, 100);
  };

  if (!showModal) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Enhanced Backdrop with gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-black/60 via-[--toolnest-bg]/80 to-black/40 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        />
        
        {/* Floating Background Elements */}
        <motion.div
          className="absolute inset-0 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-[#d8a188] opacity-10"
              style={{
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </motion.div>

        <motion.div
          className="relative bg-[hsl(var(--toolnest-bg))] border border-[#d8a188]/20 rounded-3xl p-8 max-w-md w-full shadow-2xl"
          initial={{ scale: 0.7, opacity: 0, y: 20 }}
          animate={{ 
            scale: isVisible ? 1 : 0.7, 
            opacity: isVisible ? 1 : 0,
            y: isVisible ? 0 : 20
          }}
          exit={{ scale: 0.7, opacity: 0, y: 20 }}
          transition={{ 
            type: "spring",
            damping: 25,
            stiffness: 300,
            duration: 0.4
          }}
          style={{
            background: 'linear-gradient(135deg, hsl(var(--toolnest-bg)) 0%, hsl(var(--toolnest-bg)/0.95) 100%)',
          }}
        >
          {/* Animated Border Glow */}
          <motion.div
            className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#d8a188] via-[#d8a188] to-transparent opacity-20 blur-sm -z-10"
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {/* Close Button */}
          <motion.button
            onClick={closeModal}
            className="absolute top-4 right-4 text-[hsl(var(--toolnest-text))]/60 hover:text-[hsl(var(--toolnest-text))] transition-all duration-200 hover:scale-110 hover:bg-[#d8a188]/10 p-1 rounded-full"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <X size={20} />
          </motion.button>

          <div className="text-center space-y-6">
            {/* Animated Icon */}
            <motion.div
              className="relative inline-block"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                type: "spring",
                damping: 15,
                stiffness: 200,
                delay: 0.1
              }}
            >
              <div className="relative">
                <motion.div
                  className="w-16 h-16 mx-auto bg-gradient-to-br from-[#d8a188] to-[#d8a188]/80 rounded-2xl flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Rocket className="text-[hsl(var(--toolnest-bg))]" size={28} />
                </motion.div>
                
                {/* Floating particles around icon */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-[#d8a188] rounded-full"
                    style={{
                      top: `${Math.random() * 60 + 20}%`,
                      left: `${Math.random() * 60 + 20}%`,
                    }}
                    animate={{
                      y: [0, -15, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2 + i,
                      repeat: Infinity,
                      delay: i * 0.5,
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Title with character animation */}
            <div className="relative">
              <motion.h3
                className="text-2xl font-bold text-[hsl(var(--toolnest-text))] mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {"GrockTool is Live".split("").map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className="inline-block"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.h3>
              
              {/* Underline animation */}
              <motion.div
                className="h-0.5 bg-gradient-to-r from-transparent via-[#d8a188] to-transparent mx-auto w-3/4"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              />
            </div>

            {/* Description text with staggered animation */}
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <motion.p
                className="text-[hsl(var(--toolnest-text))]/80 text-lg font-medium"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                150+ tools built for your daily workflow
              </motion.p>
              
              <motion.p
                className="text-[hsl(var(--toolnest-text))]/60 text-sm"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Boost your productivity with our curated collection
              </motion.p>
            </motion.div>

            {/* Feature badges */}
            <motion.div
              className="flex justify-center gap-3 flex-wrap"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              {["AI Powered", "Free Tools", "No Signup"].map((feature, index) => (
                <motion.span
                  key={feature}
                  className="px-3 py-1 bg-[#d8a188]/10 border border-[#d8a188]/20 rounded-full text-[hsl(var(--toolnest-text))]/70 text-xs font-medium"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ 
                    type: "spring",
                    delay: 1 + index * 0.1,
                    stiffness: 300
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: "#d8a188/0.15"
                  }}
                >
                  {feature}
                </motion.span>
              ))}
            </motion.div>

            {/* CTA Button - Now with redirect functionality */}
            <motion.button
              onClick={handleExploreClick}
              className="group relative bg-[#d8a188] text-[hsl(var(--toolnest-bg))] px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "#d8a188e0",
                transition: { type: "spring", stiffness: 400 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Button shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                animate={{ x: [-100, 300] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              />
              
              <span className="relative flex items-center justify-center gap-2">
                Explore Now
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Zap size={16} className="group-hover:scale-110 transition-transform" />
                </motion.span>
              </span>
            </motion.button>

            {/* Footer note */}
            <motion.p
              className="text-[hsl(var(--toolnest-text))]/40 text-xs pt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
            >
              Trusted by 10,000+ developers
            </motion.p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EmailModal;