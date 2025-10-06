'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Twitter, Linkedin, Github, MessageCircle } from 'lucide-react';

const SocialLinks = () => {
  const socialLinks = [
    {
      icon: Twitter,
      name: 'Twitter',
      href: '#',
      color: 'hover:bg-blue-500',
      description: 'Latest updates'
    },
    {
      icon: Linkedin,
      name: 'LinkedIn',
      href: '#',
      color: 'hover:bg-blue-600',
      description: 'Professional network'
    },
    {
      icon: Github,
      name: 'GitHub',
      href: '#',
      color: 'hover:bg-gray-800',
      description: 'Open source'
    },
    {
      icon: MessageCircle,
      name: 'Community',
      href: '#',
      color: 'hover:bg-green-500',
      description: 'Join discussion'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
    >
      <h3 className="text-xl font-bold text-toolnest-text mb-4">Follow Us</h3>
      <p className="text-toolnest-text/60 text-sm mb-4">
        Stay connected and get the latest updates
      </p>
      
      <div className="grid grid-cols-2 gap-3">
        {socialLinks.map((social, index) => {
          const IconComponent = social.icon;
          return (
            <motion.a
              key={index}
              href={social.href}
              className={`flex items-center gap-3 p-3 rounded-xl bg-gray-50 text-toolnest-text transition-all duration-200 ${social.color} hover:text-white hover:shadow-md`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconComponent className="w-4 h-4 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{social.name}</p>
                <p className="text-xs opacity-60 truncate">{social.description}</p>
              </div>
            </motion.a>
          );
        })}
      </div>
    </motion.div>
  );
};

export default SocialLinks;