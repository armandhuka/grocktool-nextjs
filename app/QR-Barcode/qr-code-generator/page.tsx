'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft, RefreshCw, QrCode, Scan, Palette, Download, Share2,
  Text, Link as LinkIcon, Phone, Mail, MessageSquare, Wifi, Calendar,
  User, CreditCard, Image as ImageIcon, Upload, X, Zap, ChevronDown, ChevronUp,
  Database, BarChart, Hash, Camera, Smartphone, ShoppingBag, Ticket,
  Globe, FileText, CreditCard as CreditCardIcon, Wifi as WifiIcon
} from 'lucide-react';
import Link from 'next/link';
import { useToast } from '../../components/ui/use-toast';
import QRCode from 'qrcode';

// Main Component
export default function QRGenerator() {
  const [contentType, setContentType] = useState('text');
  const [values, setValues] = useState({
    text: '',
    url: '',
    phone: '',
    email: '',
    emailSubject: '',
    emailBody: '',
    smsNumber: '',
    sms: '',
    wifiSsid: '',
    wifiPassword: '',
    eventTitle: '',
    eventDate: '',
    eventLocation: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    contactCompany: '',
    paymentAmount: '',
    paymentCurrency: 'USD',
    paymentNote: '',
    paymentAddress: '',
    size: 300,
    color: '#000000',
    bgColor: '#FFFFFF',
    useGradient: false,
    gradientStart: '#FF0000',
    gradientEnd: '#0000FF',
    errorCorrection: 'M',
    addShadow: false,
    logo: null as File | null,
    logoPreview: '',
    logoSize: 20,
    imageFile: null as File | null,
    imagePreview: '',
  });
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('content');
  const [openSections, setOpenSections] = useState({
    whatItDoes: false,
    useCases: false,
    howToUse: false,
    examples: false,
    faqs: false,
    relatedTools: false
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Related tools
  const relatedTools = [
    { name: 'Barcode Generator', path: '/QR-Barcode/barcode-generator', icon: BarChart },
  ];

  // FAQ Data
  const faqData = [
    {
      question: "What's the difference between QR codes and barcodes?",
      answer: "QR codes can store significantly more data than traditional barcodes (up to 7,089 numeric characters vs 20-25). QR codes are 2D and can be scanned from any angle, while barcodes are 1D and require specific orientation. QR codes also support error correction, allowing them to work even when partially damaged."
    },
    {
      question: "How much data can a QR code store?",
      answer: "QR codes can store up to 7,089 numeric characters, 4,296 alphanumeric characters, 2,953 binary bytes (8-bit), or 1,817 Kanji characters. The actual capacity depends on the QR code version (size), error correction level, and data type. Higher error correction reduces storage capacity but improves scan reliability."
    },
    {
      question: "What error correction level should I use?",
      answer: "Use L (7%) for simple URLs in clean environments, M (15%) for general use (recommended), Q (25%) for printed materials or outdoor use, and H (30%) for critical applications or when the code might get damaged. Higher error correction increases code size but improves scan reliability."
    },
    {
      question: "Can QR codes with logos still be scanned?",
      answer: "Yes, QR codes with logos can be scanned if the logo is properly placed and sized. Keep logos small (10-30% of QR code size), centered, and use higher error correction (Q or H). Avoid covering the finder patterns (three corner squares) and ensure good contrast between logo and QR code colors."
    },
    {
      question: "Are colored QR codes less scannable than black and white ones?",
      answer: "Colored QR codes scan well if there's sufficient contrast between dark and light modules. Dark colors (blue, green, red) work better than light colors on light backgrounds. Avoid red on red or similar low-contrast combinations. Always test colored QR codes with multiple scanners before distribution."
    }
  ];

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

  const handleInputChange = (field: string, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }));
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image under 2MB",
          variant: "destructive"
        });
        return;
      }
      handleInputChange('logo', file);
      const reader = new FileReader();
      reader.onload = (e) => {
        handleInputChange('logoPreview', e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleInputChange('imageFile', file);
      const reader = new FileReader();
      reader.onload = (e) => {
        handleInputChange('imagePreview', e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    handleInputChange('logo', null);
    handleInputChange('logoPreview', '');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const getQRData = () => {
    switch (contentType) {
      case 'text':
        return values.text || '';
      
      case 'url':
        return values.url || '';
      
      case 'phone':
        return `tel:${values.phone || ''}`;
      
      case 'email': {
        let emailData = `mailto:${values.email || ''}`;
        const params = [];
        if (values.emailSubject) params.push(`subject=${encodeURIComponent(values.emailSubject)}`);
        if (values.emailBody) params.push(`body=${encodeURIComponent(values.emailBody)}`);
        if (params.length > 0) emailData += `?${params.join('&')}`;
        return emailData;
      }
      
      case 'sms':
        return `smsto:${values.smsNumber || ''}:${values.sms || ''}`;
      
      case 'wifi':
        return `WIFI:S:${values.wifiSsid || ''};T:WPA;P:${values.wifiPassword || ''};;`;
      
      case 'event': {
        const startDate = values.eventDate ? new Date(values.eventDate).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z' : '';
        return `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${values.eventTitle || ''}
DTSTART:${startDate}
LOCATION:${values.eventLocation || ''}
END:VEVENT
END:VCALENDAR`.replace(/\n/g, '\\n');
      }
      
      case 'contact':
        return `BEGIN:VCARD
VERSION:3.0
FN:${values.contactName || ''}
TEL:${values.contactPhone || ''}
EMAIL:${values.contactEmail || ''}
ORG:${values.contactCompany || ''}
END:VCARD`.replace(/\n/g, '\\n');
      
      case 'payment': {
        const params = [];
        if (values.paymentAddress) params.push(`pa=${encodeURIComponent(values.paymentAddress)}`);
        if (values.paymentAmount) params.push(`am=${values.paymentAmount}`);
        if (values.paymentCurrency) params.push(`cu=${values.paymentCurrency}`);
        if (values.paymentNote) params.push(`tn=${encodeURIComponent(values.paymentNote)}`);
        return `upi://pay?${params.join('&')}`;
      }
      
      case 'image':
        return values.imagePreview || '';
      
      default:
        return '';
    }
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const qrData = getQRData();
      
      if (!qrData.trim()) {
        toast({
          title: "Input Required",
          description: "Please enter content for the QR code",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }

      // Create canvas
      const canvas = document.createElement('canvas');
      canvas.width = values.size;
      canvas.height = values.size;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        throw new Error('Could not create canvas context');
      }

      // Generate QR code with proper error correction
      const errorCorrectionMap: Record<string, 'L' | 'M' | 'Q' | 'H'> = {
        'L': 'L',
        'M': 'M',
        'Q': 'Q',
        'H': 'H'
      };

      // Generate basic QR code
      await QRCode.toCanvas(canvas, qrData, {
        width: values.size,
        margin: 2,
        color: {
          dark: values.color,
          light: values.bgColor
        },
        errorCorrectionLevel: errorCorrectionMap[values.errorCorrection] || 'M'
      });

      // Handle gradient effect
      if (values.useGradient) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        // Parse gradient colors
        const hexToRgb = (hex: string) => {
          const r = parseInt(hex.slice(1, 3), 16);
          const g = parseInt(hex.slice(3, 5), 16);
          const b = parseInt(hex.slice(5, 7), 16);
          return { r, g, b };
        };
        
        const startColor = hexToRgb(values.gradientStart);
        const endColor = hexToRgb(values.gradientEnd);
        
        for (let i = 0; i < data.length; i += 4) {
          // Only apply gradient to dark pixels (QR code)
          if (data[i] < 128 && data[i + 1] < 128 && data[i + 2] < 128) {
            const x = (i / 4) % canvas.width;
            const progress = x / canvas.width;
            
            // Interpolate between start and end colors
            data[i] = startColor.r + (endColor.r - startColor.r) * progress;
            data[i + 1] = startColor.g + (endColor.g - startColor.g) * progress;
            data[i + 2] = startColor.b + (endColor.b - startColor.b) * progress;
          }
        }
        ctx.putImageData(imageData, 0, 0);
      }

      // Handle logo overlay
      if (values.logoPreview) {
        return new Promise<void>((resolve) => {
          const logoImg = new Image();
          logoImg.onload = () => {
            const logoSize = (canvas.width * values.logoSize) / 100;
            const logoX = (canvas.width - logoSize) / 2;
            const logoY = (canvas.height - logoSize) / 2;
            
            // Draw white background for logo
            ctx.fillStyle = values.bgColor;
            ctx.fillRect(logoX - 4, logoY - 4, logoSize + 8, logoSize + 8);
            
            // Draw logo
            ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);
            
            setQrCodeUrl(canvas.toDataURL('image/png'));
            setIsLoading(false);
            resolve();
          };
          
          logoImg.onerror = () => {
            setQrCodeUrl(canvas.toDataURL('image/png'));
            setIsLoading(false);
            resolve();
          };
          
          logoImg.src = values.logoPreview;
        });
      }

      setQrCodeUrl(canvas.toDataURL('image/png'));
      
      toast({
        title: "QR Code Generated",
        description: "Your QR code has been created successfully",
      });
      
    } catch (error) {
      console.error('QR Code generation error:', error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate QR code. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!qrCodeUrl) {
      toast({
        title: "No QR Code",
        description: "Please generate a QR code first",
        variant: "destructive"
      });
      return;
    }
    
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `qr-code-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Download Started",
      description: "QR code downloaded successfully",
    });
  };

  const handleShare = async () => {
    if (!qrCodeUrl) {
      toast({
        title: "No QR Code",
        description: "Please generate a QR code first",
        variant: "destructive"
      });
      return;
    }
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My QR Code',
          text: 'Check out this QR code I created',
          url: qrCodeUrl,
        });
      } catch (error) {
        // Sharing cancelled
      }
    } else {
      await navigator.clipboard.writeText(qrCodeUrl);
      toast({
        title: "Copied to Clipboard",
        description: "QR code URL copied to clipboard",
      });
    }
  };

  const handleClear = () => {
    setValues({
      text: '',
      url: '',
      phone: '',
      email: '',
      emailSubject: '',
      emailBody: '',
      smsNumber: '',
      sms: '',
      wifiSsid: '',
      wifiPassword: '',
      eventTitle: '',
      eventDate: '',
      eventLocation: '',
      contactName: '',
      contactPhone: '',
      contactEmail: '',
      contactCompany: '',
      paymentAmount: '',
      paymentCurrency: 'USD',
      paymentNote: '',
      paymentAddress: '',
      size: 300,
      color: '#000000',
      bgColor: '#FFFFFF',
      useGradient: false,
      gradientStart: '#FF0000',
      gradientEnd: '#0000FF',
      errorCorrection: 'M',
      addShadow: false,
      logo: null,
      logoPreview: '',
      logoSize: 20,
      imageFile: null,
      imagePreview: '',
    });
    setQrCodeUrl('');
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (imageInputRef.current) imageInputRef.current.value = '';
    
    toast({
      title: "Cleared",
      description: "All fields have been cleared",
    });
  };

  const tabs = [
    { key: 'content', label: 'Content', icon: Scan },
    { key: 'design', label: 'Design', icon: Palette },
    { key: 'logo', label: 'Logo', icon: QrCode },
  ];

  const features = [
    {
      icon: Zap,
      title: '10 Content Types',
      description: 'Text, URL, Email, SMS, WiFi, Image',
      bgColor: 'bg-blue-500/10',
      textColor: 'text-blue-900',
      descColor: 'text-blue-700',
      iconColor: 'text-blue-600'
    },
    {
      icon: Palette,
      title: 'Custom Design',
      description: 'Colors, Gradients, Effects',
      bgColor: 'bg-green-500/10',
      textColor: 'text-green-900',
      descColor: 'text-green-700',
      iconColor: 'text-green-600'
    },
    {
      icon: ImageIcon,
      title: 'Logo Support',
      description: 'Embedded logos included',
      bgColor: 'bg-purple-500/10',
      textColor: 'text-purple-900',
      descColor: 'text-purple-700',
      iconColor: 'text-purple-600'
    },
    {
      icon: Scan,
      title: 'Error Correction',
      description: 'L, M, Q, H Levels',
      bgColor: 'bg-orange-500/10',
      textColor: 'text-orange-900',
      descColor: 'text-orange-700',
      iconColor: 'text-orange-600'
    },
  ];

  const presetThemes = [
    { name: 'Classic', color: '#000000', bgColor: '#FFFFFF' },
    { name: 'Dark', color: '#FFFFFF', bgColor: '#000000' },
    { name: 'Blue', color: '#2563EB', bgColor: '#F0F9FF' },
    { name: 'Green', color: '#059669', bgColor: '#F0FDF4' },
    { name: 'Purple', color: '#7C3AED', bgColor: '#FAF5FF' },
  ];

  const renderContentInputs = () => {
    const inputClassName = "w-full p-4 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground";
    const textareaClassName = `${inputClassName} resize-none min-h-[120px]`;
    const labelClassName = "block text-lg font-semibold text-foreground mb-2";

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
            <p className="text-sm text-muted-foreground">Max 7,089 characters for optimal QR code performance</p>
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
      
      case 'phone':
        return (
          <div className="space-y-4">
            <label className={labelClassName}>Phone Number</label>
            <input
              type="tel"
              value={values.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="+1 234 567 8900"
              className={inputClassName}
            />
          </div>
        );
      
      case 'email':
        return (
          <div className="space-y-4">
            <label className={labelClassName}>Email Details</label>
            <input
              type="email"
              value={values.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="recipient@example.com"
              className={`${inputClassName} mb-3`}
            />
            <input
              value={values.emailSubject}
              onChange={(e) => handleInputChange('emailSubject', e.target.value)}
              placeholder="Email subject (optional)"
              className={`${inputClassName} mb-3`}
            />
            <textarea
              value={values.emailBody}
              onChange={(e) => handleInputChange('emailBody', e.target.value)}
              placeholder="Email body (optional)"
              className={textareaClassName}
              rows={3}
            />
          </div>
        );
      
      case 'sms':
        return (
          <div className="space-y-4">
            <label className={labelClassName}>SMS Details</label>
            <input
              value={values.smsNumber}
              onChange={(e) => handleInputChange('smsNumber', e.target.value)}
              placeholder="Phone number"
              className={`${inputClassName} mb-3`}
            />
            <textarea
              value={values.sms}
              onChange={(e) => handleInputChange('sms', e.target.value)}
              placeholder="Your SMS message..."
              className={textareaClassName}
              rows={3}
            />
          </div>
        );
      
      case 'wifi':
        return (
          <div className="space-y-4">
            <label className={labelClassName}>WiFi Details</label>
            <input
              value={values.wifiSsid}
              onChange={(e) => handleInputChange('wifiSsid', e.target.value)}
              placeholder="WiFi Network Name (SSID)"
              className={`${inputClassName} mb-3`}
            />
            <input
              type="password"
              value={values.wifiPassword}
              onChange={(e) => handleInputChange('wifiPassword', e.target.value)}
              placeholder="WiFi Password"
              className={inputClassName}
            />
            <p className="text-sm text-muted-foreground">Users can scan to automatically connect to WiFi</p>
          </div>
        );
      
      case 'event':
        return (
          <div className="space-y-4">
            <label className={labelClassName}>Event Details</label>
            <input
              value={values.eventTitle}
              onChange={(e) => handleInputChange('eventTitle', e.target.value)}
              placeholder="Event Title"
              className={`${inputClassName} mb-3`}
            />
            <input
              type="datetime-local"
              value={values.eventDate}
              onChange={(e) => handleInputChange('eventDate', e.target.value)}
              className={`${inputClassName} mb-3`}
            />
            <input
              value={values.eventLocation}
              onChange={(e) => handleInputChange('eventLocation', e.target.value)}
              placeholder="Event Location"
              className={inputClassName}
            />
          </div>
        );
      
      case 'contact':
        return (
          <div className="space-y-4">
            <label className={labelClassName}>Contact Details</label>
            <input
              value={values.contactName}
              onChange={(e) => handleInputChange('contactName', e.target.value)}
              placeholder="Full Name"
              className={`${inputClassName} mb-3`}
            />
            <input
              value={values.contactPhone}
              onChange={(e) => handleInputChange('contactPhone', e.target.value)}
              placeholder="Phone Number"
              className={`${inputClassName} mb-3`}
            />
            <input
              type="email"
              value={values.contactEmail}
              onChange={(e) => handleInputChange('contactEmail', e.target.value)}
              placeholder="Email Address"
              className={`${inputClassName} mb-3`}
            />
            <input
              value={values.contactCompany}
              onChange={(e) => handleInputChange('contactCompany', e.target.value)}
              placeholder="Company (optional)"
              className={inputClassName}
            />
          </div>
        );
      
      case 'payment':
        return (
          <div className="space-y-4">
            <label className={labelClassName}>Payment Details</label>
            <input
              type="number"
              value={values.paymentAmount}
              onChange={(e) => handleInputChange('paymentAmount', e.target.value)}
              placeholder="Amount"
              step="0.01"
              className={`${inputClassName} mb-3`}
            />
            <select
              value={values.paymentCurrency}
              onChange={(e) => handleInputChange('paymentCurrency', e.target.value)}
              className={inputClassName}
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="INR">INR (₹)</option>
              <option value="JPY">JPY (¥)</option>
              <option value="CAD">CAD (C$)</option>
            </select>
            <input
              value={values.paymentNote}
              onChange={(e) => handleInputChange('paymentNote', e.target.value)}
              placeholder="Payment Note (optional)"
              className={`${inputClassName} mb-3`}
            />
            <input
              value={values.paymentAddress}
              onChange={(e) => handleInputChange('paymentAddress', e.target.value)}
              placeholder="UPI ID / Payment Address"
              className={inputClassName}
            />
          </div>
        );
      
      case 'image':
        return (
          <div className="space-y-4">
            <label className={labelClassName}>Create QR from an Image</label>
            <div 
              className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer transition-all duration-300 hover:border-primary/50 bg-card/50"
              onClick={() => imageInputRef.current?.click()}
            >
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              {!values.imagePreview ? (
                <div className="space-y-3">
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto" />
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
                        imageInputRef.current?.click();
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
                        if (imageInputRef.current) imageInputRef.current.value = '';
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
              Note: Large images may need to be compressed before encoding in QR code
            </p>
          </div>
        );
      
      default:
        return (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Select a content type to get started</p>
          </div>
        );
    }
  };

  const renderDesignTab = () => {
    const inputClassName = "w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground";
    const labelClassName = "block text-sm font-medium text-foreground";

    return (
      <div className="space-y-6">
        <div>
          <label className={labelClassName}>
            QR Code Size: {values.size}px
          </label>
          <input
            type="range"
            min="100"
            max="1000"
            value={values.size}
            onChange={(e) => handleInputChange('size', Number(e.target.value))}
            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>100px</span>
            <span>550px</span>
            <span>1000px</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Recommended: 300px for digital, 2cm minimum for print</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClassName}>QR Color</label>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="color"
                value={values.color}
                onChange={(e) => handleInputChange('color', e.target.value)}
                className="w-10 h-10 cursor-pointer rounded-lg border border-border"
              />
              <input
                value={values.color}
                onChange={(e) => handleInputChange('color', e.target.value)}
                className={inputClassName}
                placeholder="#000000"
              />
            </div>
          </div>
          <div>
            <label className={labelClassName}>Background</label>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="color"
                value={values.bgColor}
                onChange={(e) => handleInputChange('bgColor', e.target.value)}
                className="w-10 h-10 cursor-pointer rounded-lg border border-border"
              />
              <input
                value={values.bgColor}
                onChange={(e) => handleInputChange('bgColor', e.target.value)}
                className={inputClassName}
                placeholder="#FFFFFF"
              />
            </div>
          </div>
        </div>

        <div>
          <label className={labelClassName}>Quick Themes</label>
          <div className="grid grid-cols-5 gap-2 mt-2">
            {presetThemes.map((theme, index) => (
              <button
                key={index}
                onClick={() => {
                  handleInputChange('color', theme.color);
                  handleInputChange('bgColor', theme.bgColor);
                }}
                className="flex flex-col items-center p-2 rounded-lg border border-border hover:border-accent transition-colors"
                title={theme.name}
              >
                <div 
                  className="w-6 h-6 rounded border"
                  style={{ 
                    backgroundColor: theme.bgColor,
                    borderColor: theme.color 
                  }}
                />
                <span className="text-xs mt-1 text-foreground">{theme.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Zap size={16} className="text-foreground" />
            <label className={labelClassName}>Advanced Options</label>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="useGradient"
                checked={values.useGradient}
                onChange={(e) => handleInputChange('useGradient', e.target.checked)}
                className="rounded border-border"
              />
              <label htmlFor="useGradient" className="text-sm text-foreground">
                Use Gradient Colors
              </label>
            </div>
            
            {values.useGradient && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-foreground">Start Color</label>
                  <input
                    type="color"
                    value={values.gradientStart}
                    onChange={(e) => handleInputChange('gradientStart', e.target.value)}
                    className="w-full h-8 cursor-pointer rounded-lg border border-border"
                  />
                </div>
                <div>
                  <label className="text-xs text-foreground">End Color</label>
                  <input
                    type="color"
                    value={values.gradientEnd}
                    onChange={(e) => handleInputChange('gradientEnd', e.target.value)}
                    className="w-full h-8 cursor-pointer rounded-lg border border-border"
                  />
                </div>
              </div>
            )}
          </div>

          <div>
            <label className={labelClassName}>Error Correction</label>
            <select
              value={values.errorCorrection}
              onChange={(e) => handleInputChange('errorCorrection', e.target.value)}
              className={inputClassName}
            >
              <option value="L">Low (7%) - Smallest size, clean environments</option>
              <option value="M">Medium (15%) - Recommended for general use</option>
              <option value="Q">Quartile (25%) - Better, for printed materials</option>
              <option value="H">High (30%) - Best, for damaged codes</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="addShadow"
              checked={values.addShadow}
              onChange={(e) => handleInputChange('addShadow', e.target.checked)}
              className="rounded border-border"
            />
            <label htmlFor="addShadow" className="text-sm text-foreground">
              Add Shadow Effect
            </label>
          </div>
        </div>
      </div>
    );
  };

  const renderLogoTab = () => {
    return (
      <div className="space-y-4">
        <label className="text-foreground font-medium block">Add Center Logo</label>

        <div className="border-2 border-dashed border-border rounded-lg p-4 text-center bg-card/50">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="hidden"
          />

          {!values.logo ? (
            <div onClick={() => fileInputRef.current?.click()} className="cursor-pointer">
              <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-foreground">Click to upload logo</p>
              <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 2MB</p>
              <p className="text-xs text-muted-foreground">Square images work best</p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-center">
                <img src={values.logoPreview} alt="Logo preview" className="w-16 h-16 object-contain rounded" />
              </div>
              <p className="text-sm text-foreground truncate">{values.logo.name}</p>
              <button
                onClick={removeLogo}
                className="flex items-center gap-1 px-3 py-1 border border-border rounded text-sm hover:bg-secondary/50 mx-auto"
              >
                <X size={14} />
                Remove Logo
              </button>
            </div>
          )}
        </div>

        {values.logo && (
          <div>
            <label className="text-foreground font-medium block mb-2 text-sm">
              Logo Size: {values.logoSize}%
            </label>
            <input
              type="range"
              min="10"
              max="40"
              value={values.logoSize}
              onChange={(e) => handleInputChange('logoSize', Number(e.target.value))}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>10%</span>
              <span>25%</span>
              <span>40%</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Keep logo small (10–30%) for better scanning. Use higher error correction with logos.
            </p>
          </div>
        )}
      </div>
    );
  };

  const renderPreviewPanel = () => {
    return (
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center mb-4">
          <label className="text-sm font-medium text-foreground">Preview</label>
          <div className="flex gap-2">
            <button
              onClick={handleShare}
              disabled={!qrCodeUrl || isLoading}
              className="p-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Share QR Code"
            >
              <Share2 size={16} />
            </button>
            <button
              onClick={handleDownload}
              disabled={!qrCodeUrl || isLoading}
              className="p-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Download QR Code"
            >
              <Download size={16} />
            </button>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center bg-secondary/20 rounded-xl p-4 sm:p-6 min-h-[300px]">
          {qrCodeUrl ? (
            <div className="text-center w-full">
              <div
                className="bg-card p-4 sm:p-6 rounded-xl border border-border inline-block mx-auto"
                style={{
                  filter: values.addShadow ? 'drop-shadow(0 8px 24px rgba(0,0,0,0.15))' : 'none',
                  maxWidth: '100%'
                }}
              >
                <img
                  src={qrCodeUrl}
                  alt="Generated QR Code"
                  className="rounded-lg mx-auto"
                  style={{
                    width: '100%',
                    maxWidth: `${Math.min(values.size, 400)}px`,
                    height: 'auto'
                  }}
                />
              </div>

              <div className="mt-4 sm:mt-6 space-y-3 max-w-sm mx-auto">
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Scan size={16} />
                  <span>Scan to test your QR code</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Right-click to save or use download button
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 w-full">
              <div className="bg-card border border-border rounded-xl p-6 sm:p-8 max-w-sm mx-auto">
                <div className="text-muted-foreground text-4xl sm:text-6xl mb-3 sm:mb-4">📱</div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Zap size={20} className="text-muted-foreground" />
                  <p className="text-foreground font-medium">
                    {isLoading ? 'Generating QR Code...' : 'Ready to Generate'}
                  </p>
                </div>
                <p className="text-muted-foreground text-sm">
                  {isLoading ? 'Creating your custom QR code...' : 'Configure settings and generate your QR code'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* QR Code Stats */}
        {qrCodeUrl && (
          <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
            <div className="bg-blue-500/10 text-blue-600 p-2 rounded text-center">
              <div className="font-medium">{values.size}px</div>
              <div>Size</div>
            </div>
            <div className="bg-green-500/10 text-green-600 p-2 rounded text-center">
              <div className="font-medium">{values.errorCorrection}</div>
              <div>Error Level</div>
            </div>
            <div className="bg-purple-500/10 text-purple-600 p-2 rounded text-center">
              <div className="font-medium">{values.logo ? 'With Logo' : 'No Logo'}</div>
              <div>Logo</div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background font-inter">
      <title>QR Code Generator | Custom QR Codes with Logo, Colors, 10+ Content Types | GrockTool.com</title>
      <meta name="description" content="Free online QR Code Generator. Create custom QR codes with logos, colors, gradients, and multiple content types. Generate QR codes for URLs, text, WiFi, contacts, payments, and more. Professional quality with error correction." />
      <meta name="keywords" content="QR code generator, create QR code, custom QR code, QR code with logo, QR code maker, QR code generator online, QR code design, QR code creator, free QR code generator, business QR code, marketing QR code" />
      <meta property="og:title" content="QR Code Generator | Custom QR Codes with Logo, Colors, 10+ Content Types" />
      <meta property="og:description" content="Free online QR Code Generator. Create custom QR codes with logos, colors, gradients, and multiple content types. Professional quality with error correction." />
      <link rel="canonical" href="https://grocktool.com/tools/qr-generator" />
      
      <div className="pt-20 pb-8 px-4 sm:pt-24 sm:pb-12 sm:px-6 lg:pt-28">
        <div className="max-w-6xl mx-auto">
          {/* Enhanced Header */}
          <div className="mb-8 sm:mb-12">
            <Link
              href="/tool"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors group text-sm sm:text-base"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to Tools
            </Link>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 px-4 py-2 rounded-full mb-4 border border-blue-500/20">
                <QrCode size={16} className="text-blue-600" />
                <span className="text-sm font-medium text-blue-600">Digital Marketing • Business Cards • Contactless Sharing • Smart Technology</span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                QR Code Generator
                <span className="block text-lg sm:text-xl lg:text-2xl font-normal text-muted-foreground mt-2">
                  Create Custom QR Codes with Logo • Colors • Gradients • 10+ Content Types
                </span>
              </h1>
              
              <div className="flex flex-wrap justify-center gap-4 mt-6 mb-8">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 rounded-lg">
                  <QrCode size={14} className="text-blue-600" />
                  <span className="text-xs sm:text-sm text-foreground">10+ Content Types</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 rounded-lg">
                  <Palette size={14} className="text-green-600" />
                  <span className="text-xs sm:text-sm text-foreground">Custom Design</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 rounded-lg">
                  <ImageIcon size={14} className="text-purple-600" />
                  <span className="text-xs sm:text-sm text-foreground">Logo Support</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 rounded-lg">
                  <Scan size={14} className="text-amber-600" />
                  <span className="text-xs sm:text-sm text-foreground">Error Correction</span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Generator */}
            <div className="lg:col-span-2 space-y-6">
              {/* Main Generator Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                {/* Content Type Selector */}
                <div className="mb-6 sm:mb-8">
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Content Type
                  </label>
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                    {contentTypes.map(({ key, icon: Icon, label }) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setContentType(key)}
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
                </div>

                {/* Tab Navigation */}
                <div className="flex border-b border-border mb-4 sm:mb-6 overflow-x-auto">
                  {tabs.map(({ key, label, icon: Icon }) => (
                    <button
                      key={key}
                      onClick={() => setActiveTab(key as any)}
                      className={`flex items-center gap-2 flex-shrink-0 px-3 sm:px-4 py-2 font-medium border-b-2 transition-colors whitespace-nowrap ${
                        activeTab === key 
                          ? 'border-accent text-accent' 
                          : 'border-transparent text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Icon size={16} />
                      {label}
                    </button>
                  ))}
                </div>

                <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
                  {/* Left Panel - Controls */}
                  <div className="space-y-4 sm:space-y-6">
                    {activeTab === 'content' && (
                      <div className="p-6 rounded-xl bg-card/50 border border-border">
                        {renderContentInputs()}
                      </div>
                    )}

                    {activeTab === 'design' && renderDesignTab()}

                    {activeTab === 'logo' && renderLogoTab()}

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                      <button
                        onClick={handleGenerate}
                        disabled={isLoading}
                        className="flex items-center justify-center gap-2 flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all text-sm sm:text-base font-medium shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <RefreshCw size={16} className="animate-spin" />
                        ) : (
                          <QrCode size={16} />
                        )}
                        {isLoading ? 'Generating...' : 'Generate QR Code'}
                      </button>

                      <button
                        onClick={handleClear}
                        className="flex-1 sm:flex-none px-6 py-3 bg-secondary text-secondary-foreground rounded-lg sm:rounded-xl hover:bg-secondary/80 transition-colors text-sm sm:text-base font-medium"
                      >
                        Clear All
                      </button>
                    </div>
                  </div>

                  {/* Right Panel - Preview */}
                  {renderPreviewPanel()}
                </div>

                {/* Features Grid */}
                <div className="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                  {features.map((feature, index) => (
                    <div key={index} className={`${feature.bgColor} rounded-lg md:rounded-xl p-3 md:p-4 text-center`}>
                      <feature.icon className={`w-6 h-6 md:w-8 md:h-8 ${feature.iconColor} mx-auto mb-1 md:mb-2`} />
                      <h4 className={`font-semibold ${feature.textColor} text-sm md:text-base`}>
                        {feature.title}
                      </h4>
                      <p className={`${feature.descColor} text-xs md:text-sm`}>
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* QR Code Guide Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <QrCode size={18} className="text-blue-600" />
                  QR Code Generation Complete Guide
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  {/* Content Types */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-blue-500/10 p-2 rounded-lg">
                        <Text size={16} className="text-blue-600" />
                      </div>
                      <h4 className="text-sm font-medium text-foreground">Content Types</h4>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Text:</strong> Plain text messages, notes, or information</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>URL:</strong> Website links, social media profiles, landing pages</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Contact:</strong> Business cards with name, phone, email, company</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>WiFi:</strong> Network credentials for easy connection sharing</span>
                      </div>
                    </div>
                  </div>

                  {/* Design Options */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-green-500/10 p-2 rounded-lg">
                        <Palette size={16} className="text-green-600" />
                      </div>
                      <h4 className="text-sm font-medium text-foreground">Design Options</h4>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Colors:</strong> Custom QR code and background colors</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Gradients:</strong> Multi-color gradient effects for visual appeal</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Logo Support:</strong> Add center logos for branding</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Error Correction:</strong> L, M, Q, H levels for reliability</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-lg border border-blue-500/20">
                  <h4 className="text-sm font-medium text-foreground mb-2">QR Code Best Practices</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-muted-foreground">
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-semibold text-foreground">Minimum Size</span>
                      <span className="font-mono">2x2 cm print</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-semibold text-foreground">Logo Size</span>
                      <span className="font-mono">10-30% of QR code</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-semibold text-foreground">Error Correction</span>
                      <span className="font-mono">M (15%) recommended</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-semibold text-foreground">Contrast Ratio</span>
                      <span className="font-mono">70%+ for reliability</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Info Section */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">QR Code Technology Explained</h3>
                <div className="space-y-2 text-muted-foreground text-sm">
                  <p>
                    QR (Quick Response) codes are 2D barcodes that can store various types of data 
                    and be scanned by smartphone cameras. They revolutionized information sharing 
                    and digital connectivity.
                  </p>
                  <div className="text-xs sm:text-sm space-y-1 pt-2">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                      <span>Select content type (text, URL, contact, WiFi, etc.)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                      <span>Customize design with colors, gradients, and effects</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                      <span>Add logo for branding (keep 10-30% size)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                      <span>Set appropriate error correction level</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                      <span>Generate and download high-quality QR code</span>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm space-y-2 pt-3">
                    <div className="font-medium text-foreground">QR Code Structure:</div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span><strong>Finder Patterns:</strong> Three squares for orientation detection</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span><strong>Alignment Patterns:</strong> Help with distortion correction</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span><strong>Timing Patterns:</strong> Coordinate grid for module positioning</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span><strong>Quiet Zone:</strong> Empty border around QR code</span>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm space-y-2 pt-3">
                    <div className="font-medium text-foreground">Error Correction Levels:</div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <span><strong>L (7%):</strong> Smallest codes, clean environments only</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <span><strong>M (15%):</strong> General use, recommended default</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <span><strong>Q (25%):</strong> Printed materials, outdoor use</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <span><strong>H (30%):</strong> Critical applications, damaged codes</span>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm space-y-2 pt-3">
                    <div className="font-medium text-foreground">Data Capacity:</div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                      <span><strong>Numeric:</strong> Up to 7,089 characters</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                      <span><strong>Alphanumeric:</strong> Up to 4,296 characters</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                      <span><strong>Binary:</strong> Up to 2,953 bytes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                      <span><strong>Kanji:</strong> Up to 1,817 characters</span>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm space-y-2 pt-3">
                    <div className="font-medium text-foreground">Common Applications:</div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-amber-500 rounded-full"></div>
                      <span><strong>Marketing:</strong> Product info, promotions, landing pages</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-amber-500 rounded-full"></div>
                      <span><strong>Business:</strong> Business cards, WiFi access, payments</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-amber-500 rounded-full"></div>
                      <span><strong>Education:</strong> Library books, class materials, links</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-amber-500 rounded-full"></div>
                      <span><strong>Healthcare:</strong> Patient records, medication info, appointments</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* SEO Content Section with Dropdowns */}
          <section className="space-y-4 mt-12">
            {/* What This Tool Does - Dropdown */}
            <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('whatItDoes')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500/10 p-2 rounded-lg">
                    <QrCode size={20} className="text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">QR Code Generator - Features & Technology</h2>
                </div>
                {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.whatItDoes && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground mb-4">
                    This advanced QR Code Generator provides comprehensive capabilities for creating professional, customizable QR codes for diverse applications. The tool supports 10+ content types including URLs, text messages, contact information, WiFi credentials, payment links, calendar events, and email compositions. With extensive design customization options, users can modify colors, add gradients, incorporate logos, adjust error correction levels, and apply visual effects. The generator produces high-quality QR codes suitable for print materials, digital marketing, business cards, product packaging, and contactless sharing. Real-time preview, instant downloading, and multiple format support make this an essential tool for businesses, marketers, educators, and individuals needing reliable QR code generation.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Text size={18} className="text-blue-600" />
                        <h3 className="font-semibold text-foreground">Multiple Content Types</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Generate QR codes for URLs, text, contacts, WiFi networks, payments, events, SMS, emails, and images. Comprehensive support for all major QR code applications in business and personal use.</p>
                    </div>
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Palette size={18} className="text-green-600" />
                        <h3 className="font-semibold text-foreground">Advanced Design Options</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Customize QR codes with colors, gradients, logos, shadows, and effects. Adjust error correction levels (L, M, Q, H) and size for optimal performance in various environments.</p>
                    </div>
                    <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <ImageIcon size={18} className="text-purple-600" />
                        <h3 className="font-semibold text-foreground">Logo Integration</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Add branded logos to QR codes while maintaining scannability. Adjust logo size and position with intelligent placement that preserves error correction capabilities.</p>
                    </div>
                    <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Scan size={18} className="text-amber-600" />
                        <h3 className="font-semibold text-foreground">Professional Output</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Generate high-resolution QR codes suitable for printing and digital use. Download in PNG format with various sizes and quality settings for different applications.</p>
                    </div>
                  </div>
                </div>
              )}
            </article>

            {/* Use Cases Section - Dropdown */}
            <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('useCases')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-green-500/10 p-2 rounded-lg">
                    <QrCode size={20} className="text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">QR Code Applications & Use Cases</h2>
                </div>
                {openSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.useCases && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">🏢 Business & Marketing Applications</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Business Cards:</strong> Create digital business cards with QR codes linking to professional profiles, portfolios, contact information, and company websites for enhanced networking</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Product Packaging:</strong> Generate QR codes for product information, user manuals, authenticity verification, promotional content, and customer feedback collection on physical products</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Marketing Materials:</strong> Create QR codes for brochures, flyers, posters, and advertisements linking to landing pages, special offers, video content, and social media campaigns</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Restaurant & Hospitality:</strong> Generate QR codes for digital menus, online ordering, contactless payments, WiFi access, customer reviews, and loyalty program signups</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">🎓 Education & Events Applications</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-blue-500 rounded-full mt=2 flex-shrink-0"></div>
                          <span><strong>Educational Materials:</strong> Create QR codes for textbooks, worksheets, and classroom resources linking to supplementary content, video explanations, interactive exercises, and online references</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Event Management:</strong> Generate QR codes for event tickets, registration confirmation, session schedules, speaker information, presentation slides, and networking connections</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Conference & Trade Shows:</strong> Create QR codes for exhibitor information, product demonstrations, lead capture, session feedback, and digital business card exchange</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Museum & Cultural Sites:</strong> Generate QR codes for exhibit information, audio guides, historical context, multimedia content, and visitor feedback at cultural institutions</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">📱 Personal & Smart Living Applications</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Home Organization:</strong> Create QR codes for household items, storage boxes, equipment manuals, warranty information, and maintenance schedules for efficient home management</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Personal Contact Sharing:</strong> Generate QR codes containing personal contact information, social media profiles, portfolio links, and important documents for quick sharing</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Health & Wellness:</strong> Create QR codes for medical information, emergency contacts, medication schedules, fitness tracking, and health resource access for personal wellness</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Smart Home Integration:</strong> Generate QR codes for WiFi network sharing, smart device setup instructions, home automation controls, and maintenance information</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </article>

            {/* How to Use - Dropdown */}
            <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('howToUse')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-amber-500/10 p-2 rounded-lg">
                    <QrCode size={20} className="text-amber-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">How to Use QR Code Generator - Complete Guide</h2>
                </div>
                {openSections.howToUse ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.howToUse && (
                <div className="px-6 pb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">Step-by-Step Instructions</h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
                          <div>
                            <div className="font-medium text-foreground">Select Content Type</div>
                            <div className="text-sm text-muted-foreground">Choose from 10+ content types including URL, text, contact, WiFi, payment, event, SMS, email, or image-based QR codes.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                          <div>
                            <div className="font-medium text-foreground">Enter Content Details</div>
                            <div className="text-sm text-muted-foreground">Fill in the specific information for your chosen content type (URL, contact details, WiFi credentials, etc.) in the provided fields.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                          <div>
                            <div className="font-medium text-foreground">Customize Design</div>
                            <div className="text-sm text-muted-foreground">Navigate to design tab to adjust colors, add gradients, set error correction level, add shadow effects, and customize visual appearance.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">4</div>
                          <div>
                            <div className="font-medium text-foreground">Add Logo & Generate</div>
                            <div className="text-sm text-muted-foreground">Upload logo (optional), adjust size, preview real-time changes, then click generate to create your custom QR code.</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">Professional QR Code Tips</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <div className="bg-blue-500/20 p-1 rounded mt-0.5">
                            <Scan size={12} className="text-blue-500" />
                          </div>
                          <span><strong>Test Before Use:</strong> Always scan generated QR codes with multiple devices and scanner apps to ensure compatibility and functionality</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-green-500/20 p-1 rounded mt-0.5">
                            <Palette size={12} className="text-green-500" />
                          </div>
                          <span><strong>Contrast is Key:</strong> Ensure high contrast between QR code color and background for optimal scannability in various lighting conditions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-purple-500/20 p-1 rounded mt-0.5">
                            <ImageIcon size={12} className="text-purple-500" />
                          </div>
                          <span><strong>Logo Placement:</strong> Keep logos small (10-30% of QR size) and centered, using higher error correction (Q or H) when adding logos</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-amber-500/20 p-1 rounded mt-0.5">
                            <Zap size={12} className="text-amber-500" />
                          </div>
                          <span><strong>Size Considerations:</strong> Minimum 2x2 cm for print materials, larger for distance scanning or when using higher error correction</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-red-500/20 p-1 rounded mt-0.5">
                            <Download size={12} className="text-red-500" />
                          </div>
                          <span><strong>High-Resolution Output:</strong> Download QR codes at 300 DPI or higher for printing to ensure sharp edges and clean scanning</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </article>

            {/* Example Input and Output Section */}
            <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('examples')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-purple-500/10 p-2 rounded-lg">
                    <QrCode size={20} className="text-purple-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">QR Code Generation Examples</h2>
                </div>
                {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.examples && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-3">Common QR Code Generation Examples</h3>
                      <div className="overflow-x-auto">
                        <div className="min-w-full inline-block align-middle">
                          <div className="overflow-hidden border border-border rounded-lg">
                            <table className="min-w-full divide-y divide-border">
                              <thead className="bg-secondary/20">
                                <tr>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Content Type</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Example Input</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">QR Code Size</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Error Level</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Use Case</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-border">
                                <tr>
                                  <td className="px-4 py-3 text-sm font-mono text-blue-600">Website URL</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">https://example.com</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">300px</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">M (15%)</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Business Card</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm font-mono text-blue-600">Contact Information</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">John Doe<br />+1-555-0123<br />john@example.com</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">350px</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">Q (25%)</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Networking Event</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm font-mono text-blue-600">WiFi Credentials</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">SSID: OfficeWiFi<br />Password: SecurePass123</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">250px</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">H (30%)</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Office Reception</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm font-mono text-blue-600">Payment Link</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">UPI: john@bank<br />Amount: $50.00</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">400px</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">Q (25%)</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Invoice Payment</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm font-mono text-blue-600">Event Details</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">Conference 2024<br />2024-06-15 09:00<br />Convention Center</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">450px</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">M (15%)</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Event Ticket</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Detailed Example: Business Card QR Code Implementation</h3>
                      <div className="bg-secondary/20 p-4 rounded-lg border border-border overflow-x-auto">
                        <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
{`Example: Creating professional business card QR code for marketing executive

Step 1: Content Selection
• Content Type: URL
• URL: https://yourcompany.com/connect/john-doe

Step 2: Design Customization
• QR Size: 350px
• QR Color: #1A56DB (Company blue)
• Background: #FFFFFF
• Error Correction: Q (25% for logo)
• Add Shadow: Yes

Step 3: Logo Integration
• Upload company logo
• Logo Size: 25%
• Position: Centered

Step 4: Generate & Test
• Click "Generate QR Code"
• Test with multiple scanner apps
• Verify all data is correct
• Download high-resolution PNG

Step 5: Business Card Integration
• Print size: 1" × 1" on card
• Position: Bottom right corner
• Ensure quiet zone (empty space) around QR code
• Include "Scan to connect" text nearby

Result: Professional QR code that scans instantly and links to digital profile.`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </article>

            {/* Frequently Asked Questions (FAQs) */}
            <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('faqs')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500/10 p-2 rounded-lg">
                    <QrCode size={20} className="text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Frequently Asked Questions</h2>
                </div>
                {openSections.faqs ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.faqs && (
                <div className="px-6 pb-6">
                  <div className="space-y-6">
                    {faqData.map((faq, index) => (
                      <div key={index} className="pb-4 border-b border-border/50 last:border-0">
                        <h3 className="text-lg font-semibold text-foreground mb-2">{faq.question}</h3>
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </article>

            {/* Related Tools Section */}
            <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('relatedTools')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <h2 className="text-xl font-bold text-foreground">More Useful Tools</h2>
                {openSections.relatedTools ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.relatedTools && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground mb-4">
                    Explore other useful digital tools from our collection:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {relatedTools.map((tool, index) => {
                      const Icon = tool.icon;
                      return (
                        <Link
                          key={index}
                          href={tool.path}
                          className="flex items-center gap-3 p-4 bg-secondary/30 rounded-lg border border-border hover:bg-secondary/50 transition-colors group"
                        >
                          <div className="bg-accent/10 p-2 rounded-lg group-hover:bg-accent/20 transition-colors">
                            <Icon size={18} className="text-accent" />
                          </div>
                          <div>
                            <div className="font-medium text-foreground group-hover:text-accent transition-colors">{tool.name}</div>
                            <div className="text-xs text-muted-foreground">Visit tool →</div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </article>
          </section>
        </div>
      </div>
    </div>
  );
}