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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
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

  // ✅ REAL FORM SUBMISSION (EMAIL SEND)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch(
        'https://formsubmit.co/ajax/grocktool@gmail.com',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            subject: formData.subject || 'New Contact Message',
            message: formData.message,

            _template: 'table',
            _captcha: 'false',
            _replyto: formData.email,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Form submission failed');
      }

      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });

      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="rounded-2xl p-6 md:p-8 shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
      aria-labelledby="form-heading"
    >
      {isSubmitted && (
        <SuccessMessage
          title="Message sent successfully!"
          message="Thank you for reaching out. We'll get back to you within 24 hours."
        />
      )}

      <div className="mb-6">
        <h2
          id="form-heading"
          className="text-2xl md:text-3xl font-bold text-toolnest-text mb-2"
        >
          Send Your Message or Feedback
        </h2>
        <p className="text-toolnest-text/60">
          Fill out the form below for support, bug reports, or tool suggestions. We read every message and respond within 24 hours.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              name="name"
              placeholder='Enter your full name'
              value={formData.name}
              onChange={handleInputChange}
              disabled={isLoading}
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder='your.email@example.com'
              value={formData.email}
              onChange={handleInputChange}
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input
            id="subject"
            name="subject"
            placeholder='Brief description of your inquiry'
            value={formData.subject}
            onChange={handleInputChange}
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Message *</Label>
          <Textarea
            id="message"
            name="message"
            placeholder='Describe your issue, suggestion, or question in detail...'
            rows={5}
            value={formData.message}
            onChange={handleInputChange}
            disabled={isLoading}
          />
          {errors.message && (
            <p className="text-red-500 text-xs">{errors.message}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12"
        >
          {isLoading ? 'Sending...' : 'Send Message'}
        </Button>
        <p className="text-xs text-toolnest-text/50 text-center"> By submitting this form, you agree to our{' '} <a href="/privacy" className="text-toolnest-accent hover:underline"> Privacy Policy </a> . We never share your personal information. </p>
      </form>
    </motion.article>
  );
};

export default ContactForm;
