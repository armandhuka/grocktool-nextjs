'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, BookOpen, Search, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const About = () => {
  const router = useRouter();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const features = [
    {
      icon: Check,
      title: 'All Free, No Sign-up',
      description: 'Access all tools without registration or hidden fees'
    },
    {
      icon: Zap,
      title: 'Instant Access',
      description: 'Get results immediately with lightning-fast performance'
    },
    {
      icon: BookOpen,
      title: 'Smartly Categorized',
      description: 'Organized by purpose for quick tool discovery'
    },
    {
      icon: Search,
      title: 'SEO-Optimized & Accurate',
      description: 'Built for performance with precise calculations'
    }
  ];

  const handleStartUsingTools = () => {
    router.push('/tool');
  };

  return (
    <div className="min-h-screen bg-toolnest-bg font-inter">
      {/* Page Header */}
      <section className="pt-32 pb-16 px-6 bg-toolnest-bg">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              className="text-5xl md:text-6xl font-bold text-toolnest-text mb-6"
              variants={itemVariants}
            >
              About GrockTool
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-toolnest-text/80 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Your all-in-one smart tool directory.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 px-6 bg-toolnest-accent">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg">
              <div className="space-y-6 text-lg text-toolnest-text/80 leading-relaxed">
                <p>
                  GrockTool is your go-to platform to access 150+ handy tools for daily development, 
                  productivity, calculations, and more — all in one place. From text manipulation 
                  to health calculators, we've curated the most useful tools you need.
                </p>
                
                <p>
                  Our mission is to provide fast, accessible, and categorized tools to make your 
                  digital life simpler. No downloads, no registrations, no complications — just 
                  the tools you need when you need them.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose ToolNest Section */}
      <section className="py-16 px-6 bg-toolnest-bg">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-toolnest-text mb-4">
              Why Choose GrockTool?
            </h2>
            <p className="text-toolnest-text/80 text-lg">
              Four key reasons that make us different
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <feature.icon 
                  className="text-toolnest-text mx-auto mb-4 group-hover:scale-110 transition-transform" 
                  size={40} 
                />
                <h3 className="text-lg font-semibold text-toolnest-text mb-3">
                  {feature.title}
                </h3>
                <p className="text-toolnest-text/70 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Commitment */}
      <section className="py-16 px-6 bg-toolnest-accent">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg">
              <h2 className="text-3xl md:text-4xl font-bold text-toolnest-text mb-6">
                Our Vision
              </h2>
              <p className="text-toolnest-text/80 text-lg leading-relaxed mb-8">
                We aim to keep expanding, refining, and simplifying your interaction with tools — one click at a time. 
                GrockTool will continue growing to become the ultimate destination for all your digital tool needs.
              </p>
              
              <motion.button
                className="bg-toolnest-text text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl inline-flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStartUsingTools}
              >
                Start Using Tools
                <ArrowRight size={20} />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
