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
    if (showSelectorOnly || !values || !handleInputChange) return null;

    const inputClassName = "w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground";
    const textareaClassName = `${inputClassName} resize-none`;
    const labelClassName = "block text-sm font-medium text-foreground";

    switch (contentType) {
      case 'text':
        return (
          <div className="space-y-4">
            <label className={labelClassName}>Text Content</label>
            <textarea
              value={values.text}
              onChange={(e) => handleInputChange('text', e.target.value)}
              placeholder="Enter any text content..."
              className={textareaClassName}
              rows={4}
            />
          </div>
        );
      
      case 'url':
        return (
          <div className="space-y-4">
            <label className={labelClassName}>Website URL</label>
            <input
              type="url"
              value={values.url}
              onChange={(e) => handleInputChange('url', e.target.value)}
              placeholder="https://example.com"
              className={inputClassName}
            />
            <p className="text-sm text-muted-foreground">Include http:// or https:// for best results</p>
          </div>
        );
      
      // ... (other cases remain similar with updated classNames)
      
      case 'image':
        return (
          <div className="space-y-4">
            <label className={labelClassName}>Create QR from an Image</label>
            <div 
              className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-accent/50 transition-colors bg-secondary/20"
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
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto" />
                  <p className="text-foreground font-medium">Click to upload image</p>
                  <p className="text-sm text-muted-foreground">Small images recommended for better QR code quality</p>
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
                      className="px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:bg-accent/80 transition-colors"
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
                      className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors"
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
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Content Type Selector */}
      <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 ${!showSelectorOnly ? 'mb-8' : ''}`}>
        {contentTypes.map(({ key, icon: Icon, label, description }) => (
          <button
            key={key}
            onClick={() => setContentType?.(key)}
            className={`
              flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all duration-200 text-center
              ${contentType === key
                ? 'border-accent bg-accent text-accent-foreground shadow-lg scale-105'
                : 'border-border bg-card text-foreground hover:border-accent/50 hover:shadow-md'
              }
            `}
          >
            <Icon size={20} className="mb-2" />
            <span className="text-xs font-medium mb-1">{label}</span>
            <span className="text-xs opacity-80">{description}</span>
          </button>
        ))}
      </div>

      {/* Content Inputs */}
      {!showSelectorOnly && renderContentInputs()}
    </div>
  );
};

export default ContentTab;