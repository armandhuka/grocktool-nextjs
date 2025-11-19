'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const ContactInfo = () => {
  const contactItems = [
    {
      icon: Mail,
      title: 'Email',
      content: 'support@grocktool.com',
      href: 'mailto:support@grocktool.com',
      description: 'We reply within 24 hours'
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+91-XXXXXXXXXX',
      href: 'tel:+91XXXXXXXXXX',
      description: 'Mon-Fri from 9am to 6pm'
    },
    {
      icon: MapPin,
      title: 'Location',
      content: 'India',
      description: 'Serving users worldwide'
    },
    {
      icon: Clock,
      title: 'Response Time',
      content: 'Within 24 hours',
      description: 'For all inquiries'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
      className=" rounded-2xl p-6 shadow-lg "
    >
      <h3 className="text-xl font-bold text-toolnest-text mb-6">Contact Information</h3>

      <div className="space-y-4">
        {contactItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div key={index} className="flex items-start space-x-3 p-3 rounded-lg transition-colors">
              <div className="flex-shrink-0 w-10 h-10 bg-toolnest-text/10 rounded-lg flex items-center justify-center">
                <IconComponent className="w-5 h-5 text-toolnest-text" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-toolnest-text text-sm">{item.title}</p>
                {item.href ? (
                  <a 
                    href={item.href} 
                    className="text-toolnest-text/70 hover:text-toolnest-text transition-colors text-sm block truncate"
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
    </motion.div>
  );
};

export default ContactInfo;