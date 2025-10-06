'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import SuccessMessage from '../shared/SuccessMessage';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

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

  const validateForm = (): boolean => {
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
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message should be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
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
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100"
    >
      {isSubmitted && (
        <SuccessMessage 
          title="Message sent successfully!" 
          message="Thank you for reaching out. We'll get back to you within 24 hours." 
        />
      )}

      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-toolnest-text mb-2">
          Send us a Message
        </h2>
        <p className="text-toolnest-text/60">
          Fill out the form below and we'll get back to you as soon as possible.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-toolnest-text font-medium text-sm">
              Full Name *
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              className={`h-12 ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-toolnest-text'}`}
              placeholder="Enter your full name"
              disabled={isLoading}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-toolnest-text font-medium text-sm">
              Email Address *
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`h-12 ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-toolnest-text'}`}
              placeholder="your.email@example.com"
              disabled={isLoading}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject" className="text-toolnest-text font-medium text-sm">
            Subject
          </Label>
          <Input
            id="subject"
            name="subject"
            type="text"
            value={formData.subject}
            onChange={handleInputChange}
            className="h-12 border-gray-200 focus:border-toolnest-text"
            placeholder="What's this about?"
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message" className="text-toolnest-text font-medium text-sm">
            Message *
          </Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            className={`min-h-[140px] resize-none ${errors.message ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-toolnest-text'}`}
            placeholder="Tell us more about your inquiry, suggestion, or question..."
            disabled={isLoading}
          />
          {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
        </div>

        <motion.div whileHover={{ scale: isLoading ? 1 : 1.02 }} whileTap={{ scale: isLoading ? 1 : 0.98 }}>
          <Button 
            type="submit" 
            className="w-full h-12 bg-toolnest-text hover:bg-toolnest-text/90 text-white text-base font-semibold transition-all duration-200"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Sending...
              </div>
            ) : (
              'Send Message'
            )}
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default ContactForm;