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
  values = {},
  handleInputChange,
  imageInputRef,
  handleImageUpload,
  showSelectorOnly = false
}) => {
  const contentTypes = [
    { key: 'text', icon: Text, label: 'Text', description: 'Plain text content' },
    { key: 'url', icon: LinkIcon, label: 'URL', description: 'Website links' },
    { key: 'phone', icon: Phone, label: 'Phone', description: 'Phone numbers' },
    { key: 'email', icon: Mail, label: 'Email', description: 'Email addresses' },
    { key: 'sms', icon: MessageSquare, label: 'SMS', description: 'Text messages' },
    { key: 'wifi', icon: Wifi, label: 'WiFi', description: 'Network credentials' },
    { key: 'event', icon: Calendar, label: 'Event', description: 'Calendar events' },
    { key: 'contact', icon: User, label: 'Contact', description: 'Contact cards' },
    { key: 'payment', icon: CreditCard, label: 'Payment', description: 'Payment links' },
    { key: 'image', icon: ImageIcon, label: 'Image', description: 'Image files' },
  ];

  const renderContentInputs = () => {
    if (showSelectorOnly || !handleInputChange) return null;

    // Updated: Removed bg-white, using design system colors
    const inputClassName = "w-full p-4 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 animate-fade-in";
    const textareaClassName = `${inputClassName} resize-none min-h-[120px]`;
    const labelClassName = "block text-lg font-semibold text-foreground mb-2";

    // Common classes for form elements
    const formElementClass = "bg-card border-border text-foreground placeholder:text-muted-foreground focus:ring-primary focus:border-primary";

    switch (contentType) {
      case 'text':
        return (
          <div className="space-y-4 animate-fade-in">
            <label className={labelClassName}>Text Content</label>
            <textarea
              value={values.text || ''}
              onChange={(e) => handleInputChange('text', e.target.value)}
              placeholder="Enter any text content..."
              className={`${textareaClassName} ${formElementClass}`}
              rows={4}
            />
          </div>
        );
      
      case 'url':
        return (
          <div className="space-y-4 animate-fade-in">
            <label className={labelClassName}>Website URL</label>
            <input
              type="url"
              value={values.url || ''}
              onChange={(e) => handleInputChange('url', e.target.value)}
              placeholder="https://example.com"
              className={`${inputClassName} ${formElementClass}`}
            />
            <p className="text-sm text-muted-foreground">Include http:// or https:// for best results</p>
          </div>
        );
      
      case 'phone':
        return (
          <div className="space-y-4 animate-fade-in">
            <label className={labelClassName}>Phone Number</label>
            <input
              type="tel"
              value={values.phone || ''}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="+1 234 567 8900"
              className={`${inputClassName} ${formElementClass}`}
            />
          </div>
        );
      
      case 'email':
        return (
          <div className="space-y-4 animate-fade-in">
            <label className={labelClassName}>Email Details</label>
            <input
              type="email"
              value={values.email || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="recipient@example.com"
              className={`${inputClassName} ${formElementClass} mb-3`}
            />
            <input
              value={values.emailSubject || ''}
              onChange={(e) => handleInputChange('emailSubject', e.target.value)}
              placeholder="Email subject (optional)"
              className={`${inputClassName} ${formElementClass} mb-3`}
            />
            <textarea
              value={values.emailBody || ''}
              onChange={(e) => handleInputChange('emailBody', e.target.value)}
              placeholder="Email body (optional)"
              className={`${textareaClassName} ${formElementClass}`}
              rows={3}
            />
          </div>
        );
      
      case 'sms':
        return (
          <div className="space-y-4 animate-fade-in">
            <label className={labelClassName}>SMS Details</label>
            <input
              value={values.smsNumber || ''}
              onChange={(e) => handleInputChange('smsNumber', e.target.value)}
              placeholder="Phone number"
              className={`${inputClassName} ${formElementClass} mb-3`}
            />
            <textarea
              value={values.sms || ''}
              onChange={(e) => handleInputChange('sms', e.target.value)}
              placeholder="Your SMS message..."
              className={`${textareaClassName} ${formElementClass}`}
              rows={3}
            />
          </div>
        );
      
      case 'wifi':
        return (
          <div className="space-y-4 animate-fade-in">
            <label className={labelClassName}>WiFi Details</label>
            <input
              value={values.wifiSsid || ''}
              onChange={(e) => handleInputChange('wifiSsid', e.target.value)}
              placeholder="WiFi Network Name (SSID)"
              className={`${inputClassName} ${formElementClass} mb-3`}
            />
            <input
              type="password"
              value={values.wifiPassword || ''}
              onChange={(e) => handleInputChange('wifiPassword', e.target.value)}
              placeholder="WiFi Password"
              className={`${inputClassName} ${formElementClass}`}
            />
          </div>
        );
      
      case 'event':
        return (
          <div className="space-y-4 animate-fade-in">
            <label className={labelClassName}>Event Details</label>
            <input
              value={values.eventTitle || ''}
              onChange={(e) => handleInputChange('eventTitle', e.target.value)}
              placeholder="Event Title"
              className={`${inputClassName} ${formElementClass} mb-3`}
            />
            <input
              type="datetime-local"
              value={values.eventDate || ''}
              onChange={(e) => handleInputChange('eventDate', e.target.value)}
              className={`${inputClassName} ${formElementClass} mb-3`}
            />
            <input
              value={values.eventLocation || ''}
              onChange={(e) => handleInputChange('eventLocation', e.target.value)}
              placeholder="Event Location"
              className={`${inputClassName} ${formElementClass}`}
            />
          </div>
        );
      
      case 'contact':
        return (
          <div className="space-y-4 animate-fade-in">
            <label className={labelClassName}>Contact Details</label>
            <input
              value={values.contactName || ''}
              onChange={(e) => handleInputChange('contactName', e.target.value)}
              placeholder="Full Name"
              className={`${inputClassName} ${formElementClass} mb-3`}
            />
            <input
              value={values.contactPhone || ''}
              onChange={(e) => handleInputChange('contactPhone', e.target.value)}
              placeholder="Phone Number"
              className={`${inputClassName} ${formElementClass} mb-3`}
            />
            <input
              type="email"
              value={values.contactEmail || ''}
              onChange={(e) => handleInputChange('contactEmail', e.target.value)}
              placeholder="Email Address"
              className={`${inputClassName} ${formElementClass} mb-3`}
            />
            <input
              value={values.contactCompany || ''}
              onChange={(e) => handleInputChange('contactCompany', e.target.value)}
              placeholder="Company (optional)"
              className={`${inputClassName} ${formElementClass}`}
            />
          </div>
        );
      
      case 'payment':
        return (
          <div className="space-y-4 animate-fade-in">
            <label className={labelClassName}>Payment Details</label>
            <input
              type="number"
              value={values.paymentAmount || ''}
              onChange={(e) => handleInputChange('paymentAmount', e.target.value)}
              placeholder="Amount"
              step="0.01"
              className={`${inputClassName} ${formElementClass} mb-3`}
            />
            <select
              value={values.paymentCurrency || 'USD'}
              onChange={(e) => handleInputChange('paymentCurrency', e.target.value)}
              className={`${inputClassName} ${formElementClass} mb-3`}
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="INR">INR (₹)</option>
              <option value="JPY">JPY (¥)</option>
              <option value="CAD">CAD (C$)</option>
            </select>
            <input
              value={values.paymentNote || ''}
              onChange={(e) => handleInputChange('paymentNote', e.target.value)}
              placeholder="Payment Note (optional)"
              className={`${inputClassName} ${formElementClass} mb-3`}
            />
            <input
              value={values.paymentAddress || ''}
              onChange={(e) => handleInputChange('paymentAddress', e.target.value)}
              placeholder="UPI ID / Payment Address"
              className={`${inputClassName} ${formElementClass}`}
            />
          </div>
        );
      
      case 'image':
        return (
          <div className="space-y-4 animate-fade-in">
            <label className={labelClassName}>Create QR from an Image</label>
            <div 
              className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer transition-all duration-300 hover:border-primary/50 bg-card/50"
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
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto transition-transform duration-200 group-hover:scale-110" />
                  <p className="text-lg text-foreground font-medium">Click to upload image</p>
                  <p className="text-sm text-muted-foreground">Small images recommended for better QR code quality</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-center">
                    <img 
                      src={values.imagePreview} 
                      alt="uploaded" 
                      className="w-32 h-32 object-contain rounded-lg border border-border" 
                    />
                  </div>
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        imageInputRef?.current?.click();
                      }}
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
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
                      className="px-4 py-2 border border-border text-foreground rounded-lg text-sm font-medium hover:bg-secondary/50 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Embedding full images may exceed QR capacity — if so, host the image and use the image URL instead.
            </p>
          </div>
        );
      
      default:
        return (
          <div className="text-center py-8 animate-fade-in">
            <p className="text-muted-foreground">Select a content type to get started</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Content Type Selector */}
      <div className={`grid grid-cols-3 md:grid-cols-5 gap-3 ${!showSelectorOnly ? 'mb-8' : ''}`}>
        {contentTypes.map(({ key, icon: Icon, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => setContentType?.(key)}
            className={`
              group flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all duration-200
              hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background
              ${contentType === key
                ? 'border-primary bg-primary text-primary-foreground shadow-lg scale-105'
                : 'border-border bg-card text-foreground hover:border-primary/50'
              }
            `}
          >
            <Icon size={20} className="mb-2 transition-transform duration-200 group-hover:scale-110" />
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </div>

      {/* Content Inputs */}
      {!showSelectorOnly && (
        <div className="p-6 rounded-xl bg-card/50 border border-border">
          {renderContentInputs()}
        </div>
      )}
    </div>
  );
};

export default ContentTab;