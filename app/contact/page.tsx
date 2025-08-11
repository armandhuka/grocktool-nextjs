'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Twitter, Linkedin } from 'lucide-react';
import Head from 'next/head';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';

const page = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });

      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-toolnest-bg font-inter">
      <Head>
        <title>Contact GrockTool - Get in Touch</title>
        <meta
          name="description"
          content="Contact GrockTool for questions, suggestions, or feedback. We'd love to hear from you and help with your tool needs."
        />
        <link rel="canonical" href="https://grocktool.com/contact" />
      </Head>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-5xl md:text-6xl font-bold text-toolnest-text mb-6">Get in Touch</h1>
            <p className="text-xl md:text-2xl text-toolnest-text/80 max-w-3xl mx-auto">
              We'd love to hear from you—whether it's feedback, a question, or a tool suggestion.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form - Takes 2/3 width on large screens */}
            <div className="lg:col-span-2">
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg mb-8 text-center"
                >
                  <h3 className="font-semibold">Message sent successfully!</h3>
                  <p>Thank you for reaching out. We'll get back to you soon.</p>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <h2 className="text-2xl font-semibold text-toolnest-text mb-6">Send us a Message</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-toolnest-text font-medium">
                        Name *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`border-2 focus:border-toolnest-text ${errors.name ? 'border-red-500' : 'border-toolnest-accent'}`}
                        placeholder="Your full name"
                      />
                      {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-toolnest-text font-medium">
                        Email *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`border-2 focus:border-toolnest-text ${errors.email ? 'border-red-500' : 'border-toolnest-accent'}`}
                        placeholder="your.email@example.com"
                      />
                      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-toolnest-text font-medium">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="border-2 focus:border-toolnest-text border-toolnest-accent"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-toolnest-text font-medium">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`border-2 focus:border-toolnest-text min-h-[120px] ${errors.message ? 'border-red-500' : 'border-toolnest-accent'}`}
                      placeholder="Tell us more about your inquiry..."
                    />
                    {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button type="submit" className="w-full bg-toolnest-text hover:bg-toolnest-text/90 text-white py-3 text-lg font-semibold">
                      Send Message
                    </Button>
                  </motion.div>
                </form>
              </motion.div>
            </div>

            {/* Contact Info Sidebar */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <h3 className="text-xl font-semibold text-toolnest-text mb-6">Contact Info</h3>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-toolnest-text" />
                    <div>
                      <p className="font-medium text-toolnest-text">Email</p>
                      <a href="mailto:support@grocktool.com" className="text-toolnest-text/70 hover:text-toolnest-text">
                        support@grocktool.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-toolnest-text" />
                    <div>
                      <p className="font-medium text-toolnest-text">Phone</p>
                      <p className="text-toolnest-text/70">+91-XXXXXXXXXX</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-toolnest-text" />
                    <div>
                      <p className="font-medium text-toolnest-text">Location</p>
                      <p className="text-toolnest-text/70">India</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Follow Us */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <h3 className="text-xl font-semibold text-toolnest-text mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <motion.a
                    href="#"
                    className="p-2 bg-toolnest-accent rounded-lg hover:bg-toolnest-text hover:text-white transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Twitter className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    href="#"
                    className="p-2 bg-toolnest-accent rounded-lg hover:bg-toolnest-text hover:text-white transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Linkedin className="w-5 h-5" />
                  </motion.a>
                </div>
              </motion.div>

              {/* Tool Suggestions */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="bg-toolnest-accent/30 rounded-2xl p-6"
              >
                <h3 className="text-lg font-semibold text-toolnest-text mb-2">💡 Got Tool Ideas?</h3>
                <p className="text-toolnest-text/80 text-sm">
                  For tool suggestions or feature requests, feel free to drop us a message anytime. We love hearing from our community!
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
