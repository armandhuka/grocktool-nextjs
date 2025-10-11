'use client';

import { useState, useRef } from 'react';

export type ContentType = 'text' | 'url' | 'phone' | 'wifi' | 'email' | 'sms' | 'event' | 'contact' | 'payment' | 'image';

export interface QRValues {
  text: string;
  url: string;
  phone: string;
  email: string;
  emailSubject: string;
  emailBody: string;
  sms: string;
  smsNumber: string;
  wifiSsid: string;
  wifiPassword: string;
  eventTitle: string;
  eventDate: string;
  eventLocation: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  contactCompany: string;
  paymentAmount: string;
  paymentCurrency: string;
  paymentNote: string;
  imageFile: File | null;
  imagePreview: string;
  size: number;
  color: string;
  bgColor: string;
  margin: number;
  errorCorrection: string;
  logo: File | null;
  logoUrl: string;
  logoSize: number;
  useGradient: boolean;
  gradientStart: string;
  gradientEnd: string;
  addShadow: boolean;
  shadowColor: string;
}

export const useQRGenerator = () => {
  const [contentType, setContentType] = useState<ContentType>('text');
  const [values, setValues] = useState<QRValues>({
    text: '',
    url: '',
    phone: '',
    email: '',
    emailSubject: '',
    emailBody: '',
    sms: '',
    smsNumber: '',
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
    imageFile: null,
    imagePreview: '',
    size: 300,
    color: '#000000',
    bgColor: '#ffffff',
    margin: 4,
    errorCorrection: 'M',
    logo: null,
    logoUrl: '',
    logoSize: 20,
    useGradient: false,
    gradientStart: '#000000',
    gradientEnd: '#000000',
    addShadow: false,
    shadowColor: '#00000040',
  });
  
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'design' | 'logo'>('content');
  const [logoPreview, setLogoPreview] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const qrCanvasRef = useRef<HTMLCanvasElement>(null);

  // Change the type to accept string for field
  const handleInputChange = (field: string, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }));
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file for the logo.');
      return;
    }
    
    if (file.size > 2 * 1024 * 1024) {
      alert('Please select an image smaller than 2MB');
      return;
    }

    const url = URL.createObjectURL(file);
    setValues(prev => ({ ...prev, logo: file }));
    setLogoPreview(url);
  };

  const removeLogo = () => {
    setValues(prev => ({ ...prev, logo: null, logoUrl: '' }));
    setLogoPreview('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file.');
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      const proceed = confirm('Image is larger than 3MB — embedding it into a QR may fail. Continue?');
      if (!proceed) return;
    }

    const url = URL.createObjectURL(file);
    setValues(prev => ({ ...prev, imageFile: file, imagePreview: url }));
  };

  const handleClear = () => {
    setValues({
      text: '',
      url: '',
      phone: '',
      email: '',
      emailSubject: '',
      emailBody: '',
      sms: '',
      smsNumber: '',
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
      imageFile: null,
      imagePreview: '',
      size: 300,
      color: '#000000',
      bgColor: '#ffffff',
      margin: 4,
      errorCorrection: 'M',
      logo: null,
      logoUrl: '',
      logoSize: 20,
      useGradient: false,
      gradientStart: '#000000',
      gradientEnd: '#000000',
      addShadow: false,
      shadowColor: '#00000040',
    });
    setQrCodeUrl('');
    setLogoPreview('');
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (imageInputRef.current) imageInputRef.current.value = '';
  };

  return {
    contentType,
    setContentType,
    values,
    handleInputChange,
    qrCodeUrl,
    setQrCodeUrl,
    isLoading,
    setIsLoading,
    activeTab,
    setActiveTab,
    logoPreview,
    fileInputRef,
    imageInputRef,
    qrCanvasRef,
    handleLogoUpload,
    removeLogo,
    handleImageUpload,
    handleClear,
  };
};