'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, HelpCircle, Bug, Lightbulb } from 'lucide-react';

const ContactInfo = () => {
  const contactItems = [
    {
      icon: Mail,
      title: 'Support Email',
      content: 'grocktool@gmail.com',
      href: 'mailto:grocktool@gmail.com',
      description: 'General inquiries & support',
      badge: '24h response'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      content: '+91 92653 50594',
      href: 'tel:+919265350594',
      description: 'Mon-Fri, 9 AM - 6 PM IST',
      badge: 'Business'
    },
    {
      icon: MapPin,
      title: 'Based in',
      content: 'India',
      description: 'Serving users worldwide',
      badge: 'Global'
    },
    {
      icon: Clock,
      title: 'Response Time',
      content: '24 hours',
      description: 'For all email inquiries',
      badge: 'Guaranteed'
    }
  ];

  return (
    <motion.aside
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
      className="rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
      aria-labelledby="contact-info-heading"
    >
      <h3 
        id="contact-info-heading"
        className="text-xl font-bold text-toolnest-text mb-6"
      >
        Contact Information & Support Hours
      </h3>

      <div className="space-y-3">
        {contactItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div 
              key={index} 
              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <div className="flex-shrink-0 w-10 h-10 bg-toolnest-accent/10 rounded-lg flex items-center justify-center">
                <IconComponent className="w-5 h-5 text-toolnest-accent" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-semibold text-toolnest-text text-sm">{item.title}</p>
                  <span className="text-xs bg-toolnest-accent/10 text-toolnest-accent px-2 py-0.5 rounded">
                    {item.badge}
                  </span>
                </div>
                {item.href ? (
                  <a 
                    href={item.href} 
                    className="text-toolnest-text/70 hover:text-toolnest-accent transition-colors text-sm block truncate"
                    aria-label={`Contact via ${item.title}: ${item.content}`}
                  >
                    {item.content}
                  </a>
                ) : (
                  <p className="text-toolnest-text/70 text-sm">{item.content}</p>
                )}
                <p className="text-toolnest-text/50 text-xs mt-1">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h4 className="text-sm font-semibold text-toolnest-text mb-2">Support Hours (IST)</h4>
        <ul className="text-xs text-toolnest-text/70 space-y-1">
          <li className="flex justify-between">
            <span>Monday - Friday:</span>
            <span className="font-medium">9:00 AM - 6:00 PM</span>
          </li>
          <li className="flex justify-between">
            <span>Saturday - Sunday:</span>
            <span className="font-medium">Limited support</span>
          </li>
          <li className="flex justify-between">
            <span>Emergency issues:</span>
            <span className="font-medium text-green-600">Always monitored</span>
          </li>
        </ul>
      </div>
    </motion.aside>
  );
};

export default ContactInfo;