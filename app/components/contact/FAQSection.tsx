'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, HelpCircle, Clock, Mail, Bug, Shield, Zap } from 'lucide-react';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First one open by default

  const faqs = [
    {
      question: 'How long does it take to get a response?',
      answer: 'We respond to all inquiries within 24 hours. For urgent technical issues, we typically reply within 4-6 hours during business hours (9 AM - 6 PM IST, Monday to Friday).',
      icon: Clock,
      category: 'support'
    },
    {
      question: 'Do I need to pay for support?',
      answer: 'No, all GrockTool support is completely free, just like our 150+ tools. We provide technical assistance, bug fixes, and handle suggestions at no cost. Our platform is supported through non-intrusive ads.',
      icon: HelpCircle,
      category: 'pricing'
    },
    {
      question: 'What should I include in a bug report?',
      answer: 'For faster resolution, include: 1) Specific tool name, 2) Browser and device information, 3) Exact steps to reproduce the issue, 4) Screenshots if possible, 5) Any error messages displayed. Detailed reports help us fix issues within 48 hours.',
      icon: Bug,
      category: 'technical'
    },
    {
      question: 'How are tool suggestions prioritized?',
      answer: 'Suggestions are evaluated based on: 1) User demand (number of similar requests), 2) Technical feasibility, 3) Alignment with our platform vision, 4) Development complexity. Tools requested by multiple users get higher priority and are usually implemented within 2-4 weeks.',
      icon: Mail,
      category: 'suggestions'
    },
    {
      question: 'Is my data safe when using your tools?',
      answer: 'Yes! All GrockTool tools run locally in your browser. We never store your data on our servers. For tools that require processing, files are processed temporarily in memory and deleted immediately after. Read our Privacy Policy for more details.',
      icon: Shield,
      category: 'privacy'
    },
    {
      question: 'Can I request custom tools for my business?',
      answer: 'Yes, we offer custom tool development for businesses. Contact us at business@grocktool.com with your requirements. We provide custom solutions, white-label options, and API access for enterprise needs.',
      icon: Zap,
      category: 'business'
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8" aria-labelledby="faq-heading">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h2 
            id="faq-heading"
            className="text-3xl md:text-4xl font-bold text-toolnest-text mb-4"
          >
            Frequently Asked Questions
          </h2>
          <p className="text-toolnest-text/80 text-lg max-w-2xl mx-auto">
            Quick answers to common questions about our support, tools, and contact process.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const Icon = faq.icon;
            const isOpen = openIndex === index;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden 
                  bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-800 dark:to-gray-900/50
                  hover:shadow-lg transition-shadow duration-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-5 sm:px-6 py-4 text-left flex items-center justify-between 
                    hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-all duration-200"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl 
                      bg-gradient-to-r from-toolnest-accent/10 to-toolnest-accent/5 
                      flex items-center justify-center">
                      <Icon className="w-5 h-5 text-toolnest-accent" aria-hidden="true" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-toolnest-text text-lg md:text-xl">
                        {faq.question}
                      </h3>
                      <span className="text-xs text-toolnest-text/50 mt-1 inline-block">
                        {faq.category.charAt(0).toUpperCase() + faq.category.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-6 h-6 rounded-full bg-toolnest-accent/10 
                        flex items-center justify-center"
                    >
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-toolnest-accent" aria-hidden="true" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-toolnest-accent" aria-hidden="true" />
                      )}
                    </motion.div>
                  </div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ 
                        height: "auto", 
                        opacity: 1,
                        transition: {
                          height: { duration: 0.3 },
                          opacity: { duration: 0.2, delay: 0.1 }
                        }
                      }}
                      exit={{ 
                        height: 0, 
                        opacity: 0,
                        transition: {
                          height: { duration: 0.3 },
                          opacity: { duration: 0.2 }
                        }
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-4 pt-2 border-t border-gray-100 dark:border-gray-700">
                        <div className="pl-12 md:pl-14">
                          <p className="text-toolnest-text/70 leading-relaxed text-base">
                            {faq.answer}
                          </p>
                          {index === 4 && (
                            <div className="mt-3">
                              <a 
                                href="/privacy" 
                                className="inline-flex items-center gap-1 text-sm text-toolnest-accent hover:text-toolnest-text transition-colors"
                              >
                                Read Privacy Policy
                                <ChevronDown className="w-3 h-3 rotate-270" aria-hidden="true" />
                              </a>
                            </div>
                          )}
                          {index === 5 && (
                            <div className="mt-3">
                              <a 
                                href="mailto:business@grocktool.com"
                                className="inline-flex items-center gap-1 text-sm text-toolnest-accent hover:text-toolnest-text transition-colors"
                              >
                                Contact Business Team
                                <ChevronDown className="w-3 h-3 rotate-270" aria-hidden="true" />
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <div className="inline-block p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-toolnest-accent/5 to-toolnest-text/5 border border-toolnest-accent/20">
            <p className="text-toolnest-text/80 text-base mb-3">
              Still have questions?
            </p>
            <a 
              href="#form-heading" 
              className="inline-flex items-center gap-2 px-5 py-2.5 
                bg-toolnest-accent text-white font-semibold rounded-lg 
                hover:bg-toolnest-accent/90 transition-colors 
                focus:outline-none focus:ring-2 focus:ring-toolnest-accent focus:ring-offset-2"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('form-heading')?.scrollIntoView({ 
                  behavior: 'smooth' 
                });
              }}
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              Ask us directly in the form above
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;