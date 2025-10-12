'use client';

import React from 'react';
import {
  Text, Link as LinkIcon, Phone, Mail, MessageSquare,
  Wifi, Calendar, User, CreditCard, Image as ImageIcon, Upload
} from 'lucide-react';

interface ContentTabProps {
  contentType: string;
  setContentType?: (type: any) => void;
  values?: any;
  handleInputChange?: (field: string, value: any) => void;
  imageInputRef?: React.RefObject<HTMLInputElement | null>;
  handleImageUpload?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  showSelectorOnly?: boolean;
}

const ContentTab: React.FC<ContentTabProps> = ({
  contentType,
  setContentType,
  values,
  handleInputChange,
  imageInputRef,
  handleImageUpload,
  showSelectorOnly = false
}) => {
  const contentTypes = [
    { key: 'text', icon: Text, label: 'Text' },
    { key: 'url', icon: LinkIcon, label: 'URL' },
    { key: 'phone', icon: Phone, label: 'Phone' },
    { key: 'email', icon: Mail, label: 'Email' },
    { key: 'sms', icon: MessageSquare, label: 'SMS' },
    { key: 'wifi', icon: Wifi, label: 'WiFi' },
    { key: 'event', icon: Calendar, label: 'Event' },
    { key: 'contact', icon: User, label: 'Contact' },
    { key: 'payment', icon: CreditCard, label: 'Payment' },
    { key: 'image', icon: ImageIcon, label: 'Image' },
  ];

  const renderContentInputs = () => {
    if (showSelectorOnly || !values || !handleInputChange) return null;

    switch (contentType) {
      case 'text':
        return (
          <div className="space-y-4">
            <label className="block text-lg font-semibold text-toolnest-text">Text Content</label>
            <textarea
              value={values.text}
              onChange={(e) => handleInputChange('text', e.target.value)}
              placeholder="Enter any text content..."
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-toolnest-text focus:border-transparent resize-none bg-white text-toolnest-text"
              rows={4}
            />
          </div>
        );
      
      case 'url':
        return (
          <div className="space-y-4">
            <label className="block text-lg font-semibold text-toolnest-text">Website URL</label>
            <input
              type="url"
              value={values.url}
              onChange={(e) => handleInputChange('url', e.target.value)}
              placeholder="https://example.com"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-toolnest-text focus:border-transparent bg-white text-toolnest-text"
            />
            <p className="text-sm text-toolnest-text/60">Include http:// or https:// for best results</p>
          </div>
        );
      
      case 'phone':
        return (
          <div className="space-y-4">
            <label className="block text-lg font-semibold text-toolnest-text">Phone Number</label>
            <input
              type="tel"
              value={values.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="+1 234 567 8900"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-toolnest-text focus:border-transparent bg-white text-toolnest-text"
            />
          </div>
        );
      
      case 'email':
        return (
          <div className="space-y-4">
            <label className="block text-lg font-semibold text-toolnest-text">Email Details</label>
            <input
              type="email"
              value={values.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="recipient@example.com"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-toolnest-text focus:border-transparent bg-white text-toolnest-text mb-3"
            />
            <input
              value={values.emailSubject}
              onChange={(e) => handleInputChange('emailSubject', e.target.value)}
              placeholder="Email subject (optional)"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-toolnest-text focus:border-transparent bg-white text-toolnest-text mb-3"
            />
            <textarea
              value={values.emailBody}
              onChange={(e) => handleInputChange('emailBody', e.target.value)}
              placeholder="Email body (optional)"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-toolnest-text focus:border-transparent resize-none bg-white text-toolnest-text"
              rows={3}
            />
          </div>
        );
      
      case 'sms':
        return (
          <div className="space-y-4">
            <label className="block text-lg font-semibold text-toolnest-text">SMS Details</label>
            <input
              value={values.smsNumber}
              onChange={(e) => handleInputChange('smsNumber', e.target.value)}
              placeholder="Phone number"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-toolnest-text focus:border-transparent bg-white text-toolnest-text mb-3"
            />
            <textarea
              value={values.sms}
              onChange={(e) => handleInputChange('sms', e.target.value)}
              placeholder="Your SMS message..."
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-toolnest-text focus:border-transparent resize-none bg-white text-toolnest-text"
              rows={3}
            />
          </div>
        );
      
      case 'wifi':
        return (
          <div className="space-y-4">
            <label className="block text-lg font-semibold text-toolnest-text">WiFi Details</label>
            <input
              value={values.wifiSsid}
              onChange={(e) => handleInputChange('wifiSsid', e.target.value)}
              placeholder="WiFi Network Name (SSID)"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-toolnest-text focus:border-transparent bg-white text-toolnest-text mb-3"
            />
            <input
              type="password"
              value={values.wifiPassword}
              onChange={(e) => handleInputChange('wifiPassword', e.target.value)}
              placeholder="WiFi Password"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-toolnest-text focus:border-transparent bg-white text-toolnest-text"
            />
          </div>
        );
      
      case 'event':
        return (
          <div className="space-y-4">
            <label className="block text-lg font-semibold text-toolnest-text">Event Details</label>
            <input
              value={values.eventTitle}
              onChange={(e) => handleInputChange('eventTitle', e.target.value)}
              placeholder="Event Title"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-toolnest-text focus:border-transparent bg-white text-toolnest-text mb-3"
            />
            <input
              type="datetime-local"
              value={values.eventDate}
              onChange={(e) => handleInputChange('eventDate', e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-toolnest-text focus:border-transparent bg-white text-toolnest-text mb-3"
            />
            <input
              value={values.eventLocation}
              onChange={(e) => handleInputChange('eventLocation', e.target.value)}
              placeholder="Event Location"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-toolnest-text focus:border-transparent bg-white text-toolnest-text"
            />
          </div>
        );
      
      case 'contact':
        return (
          <div className="space-y-4">
            <label className="block text-lg font-semibold text-toolnest-text">Contact Details</label>
            <input
              value={values.contactName}
              onChange={(e) => handleInputChange('contactName', e.target.value)}
              placeholder="Full Name"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-toolnest-text focus:border-transparent bg-white text-toolnest-text mb-3"
            />
            <input
              value={values.contactPhone}
              onChange={(e) => handleInputChange('contactPhone', e.target.value)}
              placeholder="Phone Number"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-toolnest-text focus:border-transparent bg-white text-toolnest-text mb-3"
            />
            <input
              type="email"
              value={values.contactEmail}
              onChange={(e) => handleInputChange('contactEmail', e.target.value)}
              placeholder="Email Address"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-toolnest-text focus:border-transparent bg-white text-toolnest-text mb-3"
            />
            <input
              value={values.contactCompany}
              onChange={(e) => handleInputChange('contactCompany', e.target.value)}
              placeholder="Company (optional)"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-toolnest-text focus:border-transparent bg-white text-toolnest-text"
            />
          </div>
        );
      
      case 'payment':
        return (
          <div className="space-y-4">
            <label className="block text-lg font-semibold text-toolnest-text">Payment Details</label>
            <input
              type="number"
              value={values.paymentAmount}
              onChange={(e) => handleInputChange('paymentAmount', e.target.value)}
              placeholder="Amount"
              step="0.01"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-toolnest-text focus:border-transparent bg-white text-toolnest-text mb-3"
            />
            <select
              value={values.paymentCurrency}
              onChange={(e) => handleInputChange('paymentCurrency', e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-toolnest-text focus:border-transparent bg-white text-toolnest-text mb-3"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="INR">INR (₹)</option>
            </select>
            <input
              value={values.paymentNote}
              onChange={(e) => handleInputChange('paymentNote', e.target.value)}
              placeholder="Payment Note (optional)"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-toolnest-text focus:border-transparent bg-white text-toolnest-text mb-3"
            />
            <input
              value={values.contactEmail}
              onChange={(e) => handleInputChange('contactEmail', e.target.value)}
              placeholder="UPI ID / Payment Address"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-toolnest-text focus:border-transparent bg-white text-toolnest-text"
            />
          </div>
        );
      
      case 'image':
        return (
          <div className="space-y-4">
            <label className="block text-lg font-semibold text-toolnest-text">Create QR from an Image</label>
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-toolnest-text/50 transition-colors bg-white"
              onClick={() => imageInputRef?.current?.click()}
            >
              <input
                ref={imageInputRef as React.RefObject<HTMLInputElement>}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              {!values.imagePreview ? (
                <div className="space-y-3">
                  <Upload className="w-12 h-12 text-toolnest-text/60 mx-auto" />
                  <p className="text-lg text-toolnest-text font-medium">Click to upload image</p>
                  <p className="text-sm text-toolnest-text/60">Small images recommended for better QR code quality</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-center">
                    <img 
                      src={values.imagePreview} 
                      alt="uploaded" 
                      className="w-32 h-32 object-contain rounded-lg border" 
                    />
                  </div>
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        imageInputRef?.current?.click();
                      }}
                      className="px-4 py-2 bg-toolnest-text text-white rounded-lg text-sm font-medium hover:bg-toolnest-text/90 transition-colors"
                    >
                      Replace Image
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleInputChange('imageFile', null);
                        handleInputChange('imagePreview', '');
                        if (imageInputRef?.current) imageInputRef.current.value = '';
                      }}
                      className="px-4 py-2 border border-gray-300 text-toolnest-text rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </div>
            <p className="text-sm text-toolnest-text/60 text-center">
              Embedding full images may exceed QR capacity — if so, host the image and use the image URL instead.
            </p>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Content Type Selector */}
      <div className={`grid grid-cols-3 md:grid-cols-5 gap-3 ${!showSelectorOnly ? 'mb-8' : ''}`}>
        {contentTypes.map(({ key, icon: Icon, label }) => (
          <button
            key={key}
            onClick={() => setContentType?.(key)}
            className={`
              flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all duration-200
              ${contentType === key
                ? 'border-toolnest-text bg-toolnest-text text-white shadow-lg scale-105'
                : 'border-gray-300 bg-white text-toolnest-text hover:border-toolnest-text/50 hover:shadow-md'
              }
            `}
          >
            <Icon size={20} className="mb-2" />
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </div>

      {/* Content Inputs */}
      {!showSelectorOnly && renderContentInputs()}
    </div>
  );
};

export default ContentTab;