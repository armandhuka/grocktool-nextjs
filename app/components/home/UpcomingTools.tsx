'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { upcomingToolsData } from '../../data/upcomingToolsData';

const UpcomingTools = () => {
  return (
    <section className="relative py-28 px-6 overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-accent/5"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto">
        {/* Premium Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16 relative"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-accent to-primary px-4 py-2 rounded-full mb-6">
            <span className="text-xs font-semibold text-accent-foreground uppercase tracking-wider">
              Coming Soon
            </span>
            <span className="w-2 h-2 bg-accent-foreground rounded-full animate-pulse"></span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient">
              Premium Tools
            </span>
            <br />
            <span className="text-foreground">Coming Soon</span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Be the first to experience our next-generation tools. These premium utilities are
            currently in development and will revolutionize your workflow.
          </p>

          <div className="flex items-center justify-center gap-4">
            <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-full"></div>
            <span className="text-sm font-medium text-accent">EXCLUSIVE PREVIEW</span>
            <div className="w-16 h-1 bg-gradient-to-r from-accent to-primary rounded-full"></div>
          </div>
        </motion.div>

        {/* Premium Tools Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-20">
          {upcomingToolsData.map((tool, index) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: "backOut"
              }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{
                y: -12,
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              className="group relative"
            >
              {/* Card Glow Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30 rounded-2xl blur opacity-0 group-hover:opacity-70 transition duration-500"></div>

              {/* Main Card */}
              <div className="relative backdrop-blur-xl bg-card/80 border border-border/50 rounded-2xl p-8 h-full
                            group-hover:border-accent/50 group-hover:bg-card
                            theme-transition overflow-hidden">

                {/* Corner Accents */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                  <div className="absolute -top-8 -right-8 w-16 h-16 bg-accent/10 rotate-45"></div>
                </div>

                {/* Tool Header */}
                <div className="flex items-start gap-5 mb-6">
                  <div className={`relative ${tool.color} rounded-xl p-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-2xl">{tool.name[0]}</span>
                    <div className="absolute -inset-2 border-2 border-accent/20 rounded-xl animate-pulse"></div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-foreground group-hover:text-accent theme-transition">
                        {tool.name}
                      </h3>
                      <span className="text-xs font-semibold bg-accent/10 text-accent px-2 py-1 rounded-full">
                        PREMIUM
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground bg-secondary/30 px-3 py-1 rounded-full">
                      {tool.category}
                    </span>
                  </div>
                </div>

                {/* Tool Description */}
                <p className="text-muted-foreground mb-8 line-clamp-3">
                  {tool.description}
                </p>

                {/* Features Preview */}
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                    <span className="text-sm text-foreground/90">Real-time Processing</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                    <span className="text-sm text-foreground/90">Advanced Analytics</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                    <span className="text-sm text-foreground/90">Cloud Integration</span>
                  </div>
                </div>

                {/* Progress Indicator */}
                <div className="mb-8">
                  <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>Development Progress</span>
                    <span className="font-semibold text-accent">75%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-accent"
                      initial={{ width: 0 }}
                      whileInView={{ width: "75%" }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>

                {/* Hover Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary 
                              transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingTools;