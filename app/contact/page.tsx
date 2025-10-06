'use client';

import React from 'react';
import ContactHero from '../components/contact/ContactHero';
import ContactForm from '../components/contact/ContactForm';
import ContactInfo from '../components/contact/ContactInfo';
import SocialLinks from '../components/contact/SocialLinks';
import ToolSuggestions from '../components/contact/ToolSuggestions';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-toolnest-bg font-inter">
      <ContactHero />
      
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Contact Form - Takes 2/3 width on large screens */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>

            {/* Sidebar */}
            <div className="space-y-6 lg:space-y-8">
              <ContactInfo />
              <SocialLinks />
              <ToolSuggestions />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;