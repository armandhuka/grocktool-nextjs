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
          <div className="space-y-3">
            <label className="text-toolnest-text font-medium">Text Content</label>
            <textarea
              value={values.text}
              onChange={(e) => handleInputChange('text', e.target.value)}
              placeholder="Enter any text content..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={4}
            />
          </div>
        );
      
      case 'url':
        return (
          <div className="space-y-3">
            <label className="text-toolnest-text font-medium">Website URL</label>
            <input
              type="url"
              value={values.url}
              onChange={(e) => handleInputChange('url', e.target.value)}
              placeholder="https://example.com"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-sm text-gray-500">Include http:// or https:// for best results</p>
          </div>
        );
      
      case 'phone':
        return (
          <div className="space-y-3">
            <label className="text-toolnest-text font-medium">Phone Number</label>
            <input
              type="tel"
              value={values.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="+1 234 567 8900"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        );
      
      case 'email':
        return (
          <div className="space-y-3">
            <label className="text-toolnest-text font-medium">Email Details</label>
            <input
              type="email"
              value={values.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="recipient@example.com"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              value={values.emailSubject}
              onChange={(e) => handleInputChange('emailSubject', e.target.value)}
              placeholder="Email subject (optional)"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <textarea
              value={values.emailBody}
              onChange={(e) => handleInputChange('emailBody', e.target.value)}
              placeholder="Email body (optional)"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={3}
            />
          </div>
        );
      
      case 'sms':
        return (
          <div className="space-y-3">
            <label className="text-toolnest-text font-medium">SMS Details</label>
            <input
              value={values.smsNumber}
              onChange={(e) => handleInputChange('smsNumber', e.target.value)}
              placeholder="Phone number"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <textarea
              value={values.sms}
              onChange={(e) => handleInputChange('sms', e.target.value)}
              placeholder="Your SMS message..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={3}
            />
          </div>
        );
      
      case 'wifi':
        return (
          <div className="space-y-3">
            <label className="text-toolnest-text font-medium">WiFi Details</label>
            <input
              value={values.wifiSsid}
              onChange={(e) => handleInputChange('wifiSsid', e.target.value)}
              placeholder="WiFi Network Name (SSID)"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="password"
              value={values.wifiPassword}
              onChange={(e) => handleInputChange('wifiPassword', e.target.value)}
              placeholder="WiFi Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        );
      
      case 'event':
        return (
          <div className="space-y-3">
            <label className="text-toolnest-text font-medium">Event Details</label>
            <input
              value={values.eventTitle}
              onChange={(e) => handleInputChange('eventTitle', e.target.value)}
              placeholder="Event Title"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="datetime-local"
              value={values.eventDate}
              onChange={(e) => handleInputChange('eventDate', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              value={values.eventLocation}
              onChange={(e) => handleInputChange('eventLocation', e.target.value)}
              placeholder="Event Location"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        );
      
      case 'contact':
        return (
          <div className="space-y-3">
            <label className="text-toolnest-text font-medium">Contact Details</label>
            <input
              value={values.contactName}
              onChange={(e) => handleInputChange('contactName', e.target.value)}
              placeholder="Full Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              value={values.contactPhone}
              onChange={(e) => handleInputChange('contactPhone', e.target.value)}
              placeholder="Phone Number"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="email"
              value={values.contactEmail}
              onChange={(e) => handleInputChange('contactEmail', e.target.value)}
              placeholder="Email Address"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              value={values.contactCompany}
              onChange={(e) => handleInputChange('contactCompany', e.target.value)}
              placeholder="Company (optional)"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        );
      
      case 'payment':
        return (
          <div className="space-y-3">
            <label className="text-toolnest-text font-medium">Payment Details</label>
            <input
              type="number"
              value={values.paymentAmount}
              onChange={(e) => handleInputChange('paymentAmount', e.target.value)}
              placeholder="Amount"
              step="0.01"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <select
              value={values.paymentCurrency}
              onChange={(e) => handleInputChange('paymentCurrency', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              value={values.contactEmail}
              onChange={(e) => handleInputChange('contactEmail', e.target.value)}
              placeholder="UPI ID / Payment Address"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        );
      
      case 'image':
        return (
          <div className="space-y-3">
            <label className="text-toolnest-text font-medium">Create QR from an Image</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <input
                ref={imageInputRef as React.RefObject<HTMLInputElement>}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              {!values.imagePreview ? (
                <div onClick={() => imageInputRef?.current?.click()} className="cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Click to upload image to embed in QR</p>
                  <p className="text-xs text-gray-500 mt-1">Small images recommended</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-center">
                    <img src={values.imagePreview} alt="uploaded" className="w-28 h-28 object-contain rounded" />
                  </div>
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => imageInputRef?.current?.click()}
                      className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50"
                    >
                      Replace
                    </button>
                    <button
                      onClick={() => {
                        handleInputChange('imageFile', null);
                        handleInputChange('imagePreview', '');
                        if (imageInputRef?.current) imageInputRef.current.value = '';
                      }}
                      className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-2">Embedding full images may exceed QR capacity — if so, host the image and use the image URL instead.</p>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <>
      {!showSelectorOnly && (
        <div className="grid grid-cols-3 md:grid-cols-5 gap-1 md:gap-2 mb-6">
          {contentTypes.map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => setContentType?.(key)}
              className={`h-10 md:h-12 text-xs p-1 md:p-2 rounded-lg border transition-colors ${
                contentType === key
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon size={14} className="mr-1 hidden xs:inline" />
              <span className="truncate">{label}</span>
            </button>
          ))}
        </div>
      )}

      {showSelectorOnly && (
        <div className="grid grid-cols-3 md:grid-cols-5 gap-1 md:gap-2">
          {contentTypes.map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => setContentType?.(key)}
              className={`h-10 md:h-12 text-xs p-1 md:p-2 rounded-lg border transition-colors ${
                contentType === key
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon size={14} className="mr-1 hidden xs:inline" />
              <span className="truncate">{label}</span>
            </button>
          ))}
        </div>
      )}

      {renderContentInputs()}
    </>
  );
};

export default ContentTab;