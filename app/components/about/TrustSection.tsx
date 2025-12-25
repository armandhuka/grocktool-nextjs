'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Globe, Users, Heart } from 'lucide-react';

const TrustSection = () => {
    const trustPoints = [
        {
            icon: Shield,
            title: 'Privacy First',
            description: 'All tools run in your browser. No data stored, no tracking.',
        },
        {
            icon: Globe,
            title: 'Global Access',
            description: 'Available worldwide with multi-language support.',
        },
        {
            icon: Users,
            title: 'Community Driven',
            description: 'Tools built based on user feedback and requests.',
        },
        {
            icon: Heart,
            title: 'Free Forever',
            description: 'No hidden costs, no premium tiers, completely free.',
        },
    ];

    return (
        <section className="py-16 px-6 bg-toolnest-bg/50">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-toolnest-text mb-4">
                        Trust & Transparency
                    </h2>
                    <p className="text-toolnest-text/80 text-lg max-w-2xl mx-auto">
                        We believe in building trust through transparency and clear communication.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {trustPoints.map((point, index) => (
                        <motion.div
                            key={point.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700"
                        >
                            <div className="w-12 h-12 rounded-xl bg-toolnest-accent/10 flex items-center justify-center mb-4">
                                <point.icon className="text-toolnest-accent" size={24} />
                            </div>
                            <h3 className="text-xl font-semibold text-toolnest-text mb-2">
                                {point.title}
                            </h3>
                            <p className="text-toolnest-text/70">
                                {point.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Contact information */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mt-12 text-center"
                >
                    <div className="inline-block p-6 bg-gradient-to-r from-toolnest-accent/5 to-toolnest-bg rounded-2xl">
                        <p className="text-toolnest-text/80 mb-4">
                            Have questions or suggestions?
                        </p>
                        <a
                            href="mailto:grocktool@gmail.com"
                            className="text-toolnest-accent hover:text-toolnest-text font-semibold transition-colors"
                        >
                            grocktool@gmail.com
                        </a>
                        <br />
                        Your time is valuable.
                        We help you protect it.
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default TrustSection;