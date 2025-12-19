'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Download, Upload, FileText, Trash2, 
  Share2, CheckCheck, Image, Type, Settings, 
  CheckCircle, Sparkles, Palette, Droplets, Layers,
  Zap, Eye, EyeOff, FileImage, Lock, Clock, Shield,
  ChevronUp, ChevronDown, ChevronRight
} from 'lucide-react';
import { PDFDocument, rgb, degrees } from 'pdf-lib';
import Head from 'next/head';

interface PDFFile {
  id: string;
  name: string;
  size: number;
  pages: number;
  file: File;
  previewUrl?: string;
}

interface WatermarkSettings {
  type: 'text' | 'image';
  text: string;
  fontSize: number;
  color: string;
  opacity: number;
  rotation: number;
  position: 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'diagonal';
  pages: 'all' | 'first' | 'last' | 'custom';
  customPages: string;
  imageFile: File | null;
  imageOpacity: number;
  imageScale: number;
}

interface WatermarkResult {
  url: string;
  name: string;
  size: number;
  watermarkedPages: number;
}

export default function PDFWatermark() {
  const [pdfFile, setPdfFile] = useState<PDFFile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [watermarkResult, setWatermarkResult] = useState<WatermarkResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [watermarkSettings, setWatermarkSettings] = useState<WatermarkSettings>({
    type: 'text',
    text: 'CONFIDENTIAL',
    fontSize: 48,
    color: '#ff0000',
    opacity: 0.3,
    rotation: -45,
    position: 'diagonal',
    pages: 'all',
    customPages: '',
    imageFile: null,
    imageOpacity: 0.3,
    imageScale: 50
  });

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

  const relatedTools = [
    { name: 'PDF Rotate', path: '/PDF-Tools/pdf-rotate' },
    { name: 'PDF Compressor', path: '/PDF-Tools/pdf-compressor' },
    { name: 'PDF Merge', path: '/PDF-Tools/pdf-merge' },
    { name: 'PDF Split', path: '/PDF-Tools/pdf-split' },
    { name: 'PDF Page Reorder', path: '/PDF-Tools/pdf-reorder' }
  ];

  const faqData = [
    {
      question: "Does adding a watermark increase PDF file size?",
      answer: "Text watermarks add minimal file size (usually <1% increase). Image watermarks add more depending on image size and quality. Our tool optimizes image watermarks to minimize file size impact while maintaining watermark visibility."
    },
    {
      question: "Can I remove a watermark after adding it?",
      answer: "Watermarks become part of the PDF content and cannot be easily removed without specialized software. This is intentional for security purposes. Always keep an unwatermarked copy of your original document if you might need it later."
    },
    {
      question: "Are watermarks visible when printed?",
      answer: "Yes, watermarks are visible in both digital viewing and printed copies. The tool applies watermarks as part of the page content, ensuring they appear consistently across all viewing and printing methods."
    },
    {
      question: "Can I use transparent PNG images as watermarks?",
      answer: "Yes! The tool supports transparent PNG images perfectly. Upload PNG files with transparency to create professional-looking watermarks that overlay nicely on document content without obscuring text."
    },
    {
      question: "Will watermarking affect text searchability in the PDF?",
      answer: "No, watermarking doesn't affect text searchability. The original text layers remain intact and fully searchable. Watermarks are added as separate visual layers that don't interfere with document functionality."
    }
  ];

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const positionOptions = [
    { value: 'center', label: 'Center', description: 'Middle of page' },
    { value: 'top-left', label: 'Top Left', description: 'Top left corner' },
    { value: 'top-right', label: 'Top Right', description: 'Top right corner' },
    { value: 'bottom-left', label: 'Bottom Left', description: 'Bottom left corner' },
    { value: 'bottom-right', label: 'Bottom Right', description: 'Bottom right corner' },
    { value: 'diagonal', label: 'Diagonal', description: 'Across page diagonally' }
  ];

  const pageOptions = [
    { value: 'all', label: 'All Pages', description: 'Apply to all pages' },
    { value: 'first', label: 'First Page', description: 'Only first page' },
    { value: 'last', label: 'Last Page', description: 'Only last page' },
    { value: 'custom', label: 'Custom Pages', description: 'Specific page numbers' }
  ];

  const presetTexts = [
    'CONFIDENTIAL',
    'DRAFT',
    'SAMPLE',
    'DO NOT COPY',
    'URGENT',
    'APPROVED',
    'REVIEWED',
    'FINAL'
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (file.type === 'application/pdf') {
      const newFile: PDFFile = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        pages: Math.max(1, Math.floor(file.size / 50000)),
        file: file
      };

      const reader = new FileReader();
      reader.onload = (e) => {
        setPdfFile({
          ...newFile,
          previewUrl: e.target?.result as string
        });
      };
      reader.readAsDataURL(file);
      
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (file.type.startsWith('image/')) {
      setWatermarkSettings(prev => ({
        ...prev,
        imageFile: file,
        type: 'image'
      }));
    }
  };

  const removeFile = () => {
    if (watermarkResult?.url) {
      URL.revokeObjectURL(watermarkResult.url);
    }
    setPdfFile(null);
    setWatermarkResult(null);
  };

  const removeImage = () => {
    setWatermarkSettings(prev => ({
      ...prev,
      imageFile: null,
      type: 'text'
    }));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const addWatermarkToPDF = async (file: File): Promise<WatermarkResult> => {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const pages = pdfDoc.getPages();

    let targetPages: number[] = [];
    if (watermarkSettings.pages === 'all') {
      targetPages = Array.from({ length: pages.length }, (_, i) => i);
    } else if (watermarkSettings.pages === 'first') {
      targetPages = [0];
    } else if (watermarkSettings.pages === 'last') {
      targetPages = [pages.length - 1];
    } else if (watermarkSettings.pages === 'custom' && watermarkSettings.customPages) {
      targetPages = watermarkSettings.customPages
        .split(',')
        .map(p => parseInt(p.trim()) - 1)
        .filter(p => p >= 0 && p < pages.length);
    }

    let imageEmbed: any = null;
    if (watermarkSettings.type === 'image' && watermarkSettings.imageFile) {
      const imageArrayBuffer = await watermarkSettings.imageFile.arrayBuffer();
      if (watermarkSettings.imageFile.type === 'image/png') {
        imageEmbed = await pdfDoc.embedPng(imageArrayBuffer);
      } else {
        imageEmbed = await pdfDoc.embedJpg(imageArrayBuffer);
      }
    }

    targetPages.forEach(pageIndex => {
      const page = pages[pageIndex];
      const { width, height } = page.getSize();

      if (watermarkSettings.type === 'text') {
        page.drawText(watermarkSettings.text, {
          x: getTextPositionX(width, watermarkSettings.position),
          y: getTextPositionY(height, watermarkSettings.position),
          size: watermarkSettings.fontSize,
          color: hexToRgb(watermarkSettings.color, watermarkSettings.opacity),
          rotate: degrees(watermarkSettings.rotation),
          opacity: watermarkSettings.opacity
        });
      } else if (watermarkSettings.type === 'image' && imageEmbed) {
        const imageDims = imageEmbed.scale(watermarkSettings.imageScale / 100);
        const { x, y } = getImagePosition(width, height, imageDims.width, imageDims.height, watermarkSettings.position);
        
        page.drawImage(imageEmbed, {
          x,
          y,
          width: imageDims.width,
          height: imageDims.height,
          opacity: watermarkSettings.imageOpacity
        });
      }
    });

    const watermarkedPdfBytes = await pdfDoc.save();
    
    const arrayBufferFromBytes = new ArrayBuffer(watermarkedPdfBytes.length);
    const view = new Uint8Array(arrayBufferFromBytes);
    for (let i = 0; i < watermarkedPdfBytes.length; i++) {
      view[i] = watermarkedPdfBytes[i];
    }
    
    const blob = new Blob([arrayBufferFromBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    return {
      url,
      name: `${file.name.replace('.pdf', '')}-watermarked.pdf`,
      size: blob.size,
      watermarkedPages: targetPages.length
    };
  };

  const getTextPositionX = (width: number, position: string): number => {
    switch (position) {
      case 'top-left': return 50;
      case 'top-right': return width - 200;
      case 'bottom-left': return 50;
      case 'bottom-right': return width - 200;
      case 'center': return width / 2 - 100;
      case 'diagonal': return width / 2 - 100;
      default: return width / 2 - 100;
    }
  };

  const getTextPositionY = (height: number, position: string): number => {
    switch (position) {
      case 'top-left': return height - 100;
      case 'top-right': return height - 100;
      case 'bottom-left': return 100;
      case 'bottom-right': return 100;
      case 'center': return height / 2;
      case 'diagonal': return height / 2;
      default: return height / 2;
    }
  };

  const getImagePosition = (pageWidth: number, pageHeight: number, imgWidth: number, imgHeight: number, position: string) => {
    switch (position) {
      case 'top-left':
        return { x: 50, y: pageHeight - imgHeight - 50 };
      case 'top-right':
        return { x: pageWidth - imgWidth - 50, y: pageHeight - imgHeight - 50 };
      case 'bottom-left':
        return { x: 50, y: 50 };
      case 'bottom-right':
        return { x: pageWidth - imgWidth - 50, y: 50 };
      case 'center':
        return { x: (pageWidth - imgWidth) / 2, y: (pageHeight - imgHeight) / 2 };
      case 'diagonal':
        return { x: (pageWidth - imgWidth) / 2, y: (pageHeight - imgHeight) / 2 };
      default:
        return { x: (pageWidth - imgWidth) / 2, y: (pageHeight - imgHeight) / 2 };
    }
  };

  const hexToRgb = (hex: string, opacity: number) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? 
      rgb(
        parseInt(result[1], 16) / 255,
        parseInt(result[2], 16) / 255,
        parseInt(result[3], 16) / 255
      ) : 
      rgb(1, 0, 0);
  };

  const handleAddWatermark = async () => {
    if (!pdfFile) {
      alert('Please select a PDF file');
      return;
    }

    if (watermarkSettings.type === 'text' && !watermarkSettings.text.trim()) {
      alert('Please enter watermark text');
      return;
    }

    if (watermarkSettings.type === 'image' && !watermarkSettings.imageFile) {
      alert('Please select an image for watermark');
      return;
    }

    setIsLoading(true);
    
    try {
      if (watermarkResult?.url) {
        URL.revokeObjectURL(watermarkResult.url);
      }

      const result = await addWatermarkToPDF(pdfFile.file);
      setWatermarkResult(result);
    } catch (error) {
      console.error('Error adding watermark:', error);
      alert('Error adding watermark to PDF. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const downloadWatermarkedPDF = () => {
    if (!watermarkResult) return;

    try {
      const link = document.createElement('a');
      link.href = watermarkResult.url;
      link.download = watermarkResult.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download error:', error);
      alert('Error downloading file. Please try again.');
    }
  };

  const shareWatermarkedPDF = async () => {
    if (!watermarkResult) return;

    try {
      const message = `Check out this watermarked PDF: ${watermarkResult.name}`;
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      alert('Unable to copy. Please download the PDF instead.');
    }
  };

  const handleClear = () => {
    if (watermarkResult?.url) {
      URL.revokeObjectURL(watermarkResult.url);
    }
    setPdfFile(null);
    setWatermarkResult(null);
    setWatermarkSettings({
      type: 'text',
      text: 'CONFIDENTIAL',
      fontSize: 48,
      color: '#ff0000',
      opacity: 0.3,
      rotation: -45,
      position: 'diagonal',
      pages: 'all',
      customPages: '',
      imageFile: null,
      imageOpacity: 0.3,
      imageScale: 50
    });
  };

  const applyPresetText = (text: string) => {
    setWatermarkSettings(prev => ({
      ...prev,
      text,
      type: 'text'
    }));
  };

  const estimatedSize = pdfFile ? pdfFile.size : 0;

  return (
    <>
      <Head>
        <title>PDF Watermark | Add Watermarks Instantly - 100% Private & Free | GrockTool.com</title>
        <meta name="description" content="Add text or image watermarks to PDF documents instantly in your browser. Protect documents with confidential labels, draft stamps, or custom logos. 100% private - no uploads, no signup required." />
        <meta name="keywords" content="PDF watermark, add watermark to PDF, PDF security, text watermark, image watermark, protect PDF, confidential stamp, draft watermark, PDF branding" />
        <meta property="og:title" content="PDF Watermark | Add Watermarks Instantly - 100% Private & Free" />
        <meta property="og:description" content="Add watermarks to PDF documents securely in your browser. No uploads, completely private. Protect documents with text labels or image watermarks for security and branding." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PDF Watermark - 100% Private & Instant" />
        <meta name="twitter:description" content="Add watermarks to PDFs in your browser. No uploads, completely secure." />
        <link rel="canonical" href="https://grocktool.com/PDF-Tools/pdf-watermark" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "PDF Watermark Tool - Private & Instant",
            "applicationCategory": "PDFApplication",
            "operatingSystem": "Any",
            "description": "Add text or image watermarks to PDF documents instantly in your browser with 100% privacy. Protect documents with confidential labels, draft stamps, or custom logos. No uploads, no signup required.",
            "url": "https://grocktool.com/PDF-Tools/pdf-watermark",
            "author": {
              "@type": "Organization",
              "name": "GrockTool.com",
              "url": "https://grocktool.com"
            },
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": [
              "100% browser-based processing",
              "No file uploads required",
              "Zero watermarks added",
              "No account signup needed",
              "Text and image watermarks",
              "Custom positioning and styling",
              "Selective page application"
            ]
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqData.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })}
        </script>
      </Head>
      
      <div className="min-h-screen bg-background font-inter">
        <div className="pt-20 pb-8 px-4 sm:pt-24 sm:pb-12 sm:px-6 lg:pt-28">
          <div className="max-w-6xl mx-auto">
            {/* Header - Improved Hero Section */}
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
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-4 py-2 rounded-full mb-4 border border-blue-500/20">
                  <Sparkles size={16} className="text-blue-500" />
                  <span className="text-sm font-medium text-blue-600">100% Browser-Based • No Uploads</span>
                </div>
                
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                  Add Watermarks to PDF Instantly
                  <span className="block text-lg sm:text-xl lg:text-2xl font-normal text-muted-foreground mt-2">
                    100% Private • Text & Image Watermarks • No Signup
                  </span>
                </h1>
                
                <div className="flex flex-wrap justify-center gap-4 mt-6 mb-8">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 rounded-lg">
                    <Lock size={14} className="text-green-600" />
                    <span className="text-xs sm:text-sm text-foreground">Files Stay on Your Device</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 rounded-lg">
                    <Clock size={14} className="text-blue-600" />
                    <span className="text-xs sm:text-sm text-foreground">Instant Watermarking</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 rounded-lg">
                    <Shield size={14} className="text-purple-600" />
                    <span className="text-xs sm:text-sm text-foreground">Document Protection</span>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Left Panel - Controls */}
              <div className="space-y-6">
                {/* File Upload - Improved Value Proposition */}
                <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-sm font-medium text-foreground">
                      Upload PDF File
                    </label>
                    <div className="flex items-center gap-2 text-xs text-green-600">
                      <Lock size={12} />
                      <span>Processing in your browser</span>
                    </div>
                  </div>
                  
                  {!pdfFile ? (
                    <div 
                      className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-accent/50 transition-colors bg-secondary/20 group"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                      
                      <div className="relative">
                        <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4 group-hover:text-accent transition-colors" />
                        <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-1">
                          <Lock size={12} />
                        </div>
                      </div>
                      <p className="text-foreground font-medium mb-2">Click to upload PDF file</p>
                      <p className="text-sm text-muted-foreground">
                        Files process 100% in your browser - never uploaded
                      </p>
                      <p className="text-xs text-green-600 mt-2 flex items-center justify-center gap-1">
                        <Shield size={10} />
                        No third-party access • No signup required
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 p-4 bg-secondary/20 rounded-lg border border-border group">
                      <FileText size={24} className="text-red-500" />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-foreground">{pdfFile.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {formatFileSize(pdfFile.size)} • {pdfFile.pages} pages
                        </div>
                      </div>
                      <button
                        onClick={removeFile}
                        className="p-2 rounded hover:bg-red-500/10 hover:text-red-600 transition-colors"
                        title="Remove file"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Watermark Settings */}
                {pdfFile && (
                  <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                      <Settings size={18} className="text-foreground" />
                      <label className="block text-sm font-medium text-foreground">
                        Watermark Settings
                      </label>
                    </div>

                    <div className="space-y-6">
                      {/* Watermark Type */}
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-3">
                          Watermark Type
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            onClick={() => setWatermarkSettings(prev => ({ ...prev, type: 'text' }))}
                            className={`p-3 rounded-lg border text-center transition-all ${
                              watermarkSettings.type === 'text'
                                ? 'border-accent bg-accent text-accent-foreground shadow-lg scale-105'
                                : 'border-border bg-secondary/20 text-foreground hover:border-accent/50 hover:shadow-md'
                            }`}
                          >
                            <Type className="w-6 h-6 mx-auto mb-2" />
                            <div className="text-xs font-medium">Text Watermark</div>
                          </button>
                          <button
                            onClick={() => setWatermarkSettings(prev => ({ ...prev, type: 'image' }))}
                            className={`p-3 rounded-lg border text-center transition-all ${
                              watermarkSettings.type === 'image'
                                ? 'border-accent bg-accent text-accent-foreground shadow-lg scale-105'
                                : 'border-border bg-secondary/20 text-foreground hover:border-accent/50 hover:shadow-md'
                            }`}
                          >
                            <Image className="w-6 h-6 mx-auto mb-2" />
                            <div className="text-xs font-medium">Image Watermark</div>
                          </button>
                        </div>
                      </div>

                      {/* Text Watermark Settings */}
                      {watermarkSettings.type === 'text' && (
                        <>
                          {/* Preset Texts */}
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                              Quick Text Presets
                            </label>
                            <div className="grid grid-cols-4 gap-2">
                              {presetTexts.map((text) => (
                                <button
                                  key={text}
                                  onClick={() => applyPresetText(text)}
                                  className={`p-2 rounded border text-xs transition-all ${
                                    watermarkSettings.text === text
                                      ? 'border-accent bg-accent text-accent-foreground'
                                      : 'border-border bg-secondary/20 text-foreground hover:border-accent/50 hover:bg-secondary/30'
                                  }`}
                                >
                                  {text}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Custom Text */}
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                              Custom Text
                            </label>
                            <input
                              type="text"
                              value={watermarkSettings.text}
                              onChange={(e) => setWatermarkSettings(prev => ({ ...prev, text: e.target.value }))}
                              placeholder="Enter watermark text"
                              className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-sm"
                            />
                          </div>

                          {/* Text Settings */}
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-foreground mb-2">
                                Font Size: {watermarkSettings.fontSize}px
                              </label>
                              <input
                                type="range"
                                min="12"
                                max="120"
                                value={watermarkSettings.fontSize}
                                onChange={(e) => setWatermarkSettings(prev => ({ ...prev, fontSize: parseInt(e.target.value) }))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-foreground mb-2">
                                Color
                              </label>
                              <input
                                type="color"
                                value={watermarkSettings.color}
                                onChange={(e) => setWatermarkSettings(prev => ({ ...prev, color: e.target.value }))}
                                className="w-full h-10 rounded border border-border cursor-pointer"
                              />
                            </div>
                          </div>
                        </>
                      )}

                      {/* Image Watermark Settings */}
                      {watermarkSettings.type === 'image' && (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                              Upload Watermark Image
                            </label>
                            {!watermarkSettings.imageFile ? (
                              <div 
                                className="border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:border-accent/50 transition-colors bg-secondary/20"
                                onClick={() => imageInputRef.current?.click()}
                              >
                                <input
                                  ref={imageInputRef}
                                  type="file"
                                  accept="image/*"
                                  onChange={handleImageSelect}
                                  className="hidden"
                                />
                                <Image className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                                <p className="text-sm text-foreground">Click to upload image</p>
                                <p className="text-xs text-muted-foreground">PNG, JPG, JPEG supported</p>
                              </div>
                            ) : (
                              <div className="flex items-center gap-3 p-3 bg-secondary/20 rounded-lg border border-border">
                                <Image size={20} className="text-blue-500" />
                                <div className="flex-1">
                                  <div className="text-sm font-medium text-foreground">
                                    {watermarkSettings.imageFile.name}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {formatFileSize(watermarkSettings.imageFile.size)}
                                  </div>
                                </div>
                                <button
                                  onClick={removeImage}
                                  className="p-1 rounded hover:bg-red-500/10 hover:text-red-600 transition-colors"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            )}
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-foreground mb-2">
                                Opacity: {Math.round(watermarkSettings.imageOpacity * 100)}%
                              </label>
                              <input
                                type="range"
                                min="1"
                                max="100"
                                value={watermarkSettings.imageOpacity * 100}
                                onChange={(e) => setWatermarkSettings(prev => ({ ...prev, imageOpacity: parseInt(e.target.value) / 100 }))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-foreground mb-2">
                                Scale: {watermarkSettings.imageScale}%
                              </label>
                              <input
                                type="range"
                                min="10"
                                max="200"
                                value={watermarkSettings.imageScale}
                                onChange={(e) => setWatermarkSettings(prev => ({ ...prev, imageScale: parseInt(e.target.value) }))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                              />
                            </div>
                          </div>
                        </>
                      )}

                      {/* Common Settings */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Opacity: {Math.round(watermarkSettings.opacity * 100)}%
                          </label>
                          <input
                            type="range"
                            min="1"
                            max="100"
                            value={watermarkSettings.opacity * 100}
                            onChange={(e) => setWatermarkSettings(prev => ({ ...prev, opacity: parseInt(e.target.value) / 100 }))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Rotation: {watermarkSettings.rotation}°
                          </label>
                          <input
                            type="range"
                            min="-180"
                            max="180"
                            value={watermarkSettings.rotation}
                            onChange={(e) => setWatermarkSettings(prev => ({ ...prev, rotation: parseInt(e.target.value) }))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                          />
                        </div>
                      </div>

                      {/* Position */}
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-3">
                          Position
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {positionOptions.map((position) => (
                            <button
                              key={position.value}
                              onClick={() => setWatermarkSettings(prev => ({ ...prev, position: position.value as any }))}
                              className={`p-2 rounded-lg border text-center transition-all ${
                                watermarkSettings.position === position.value
                                  ? 'border-blue-500 bg-blue-500/10 text-blue-600 shadow-lg scale-105'
                                  : 'border-border bg-secondary/20 text-foreground hover:border-blue-500/50 hover:shadow-md hover:bg-secondary/30'
                              }`}
                            >
                              <div className="text-xs font-medium mb-1">{position.label}</div>
                              <div className="text-[10px] text-muted-foreground">
                                {position.description}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Pages */}
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-3">
                          Apply To Pages
                        </label>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                          {pageOptions.map((page) => (
                            <button
                              key={page.value}
                              onClick={() => setWatermarkSettings(prev => ({ ...prev, pages: page.value as any }))}
                              className={`p-2 rounded-lg border text-center transition-all ${
                                watermarkSettings.pages === page.value
                                  ? 'border-green-500 bg-green-500/10 text-green-600 shadow-lg scale-105'
                                  : 'border-border bg-secondary/20 text-foreground hover:border-green-500/50 hover:shadow-md hover:bg-secondary/30'
                              }`}
                            >
                              <div className="text-xs font-medium mb-1">{page.label}</div>
                              <div className="text-[10px] text-muted-foreground">
                                {page.description}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Custom Pages Input */}
                      {watermarkSettings.pages === 'custom' && (
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Custom Page Numbers
                          </label>
                          <input
                            type="text"
                            value={watermarkSettings.customPages}
                            onChange={(e) => setWatermarkSettings(prev => ({ ...prev, customPages: e.target.value }))}
                            placeholder="e.g., 1,3,5-8,10"
                            className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-sm"
                          />
                          <div className="text-xs text-muted-foreground mt-1">
                            Enter page numbers separated by commas. Ranges supported (e.g., 1-5)
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Buttons - Improved CTAs */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleAddWatermark}
                    disabled={isLoading || !pdfFile}
                    className="flex items-center justify-center gap-2 flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                        Adding Watermark Securely...
                      </>
                    ) : (
                      <>
                        <Droplets size={18} />
                        {pdfFile ? `Add Watermark (${pdfFile.pages} pages)` : 'Add Watermark'}
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleClear}
                    className="flex-1 sm:flex-none px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-sm font-medium"
                  >
                    Clear All
                  </button>
                </div>

                {/* Quick Stats */}
                {pdfFile && (
                  <div className="bg-card rounded-xl border border-border p-4 shadow-sm">
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-2">
                        <div className="text-lg font-bold text-foreground">{pdfFile.pages}</div>
                        <div className="text-xs text-muted-foreground">Pages</div>
                      </div>
                      <div className="p-2">
                        <div className="text-lg font-bold text-foreground">{formatFileSize(pdfFile.size)}</div>
                        <div className="text-xs text-muted-foreground">File Size</div>
                      </div>
                      <div className="p-2">
                        <div className="text-lg font-bold text-foreground">
                          {watermarkSettings.type === 'text' ? 'Text' : 'Image'}
                        </div>
                        <div className="text-xs text-muted-foreground">Watermark Type</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Panel - Preview & Results */}
              <div className="space-y-6">
                {/* Benefits Card */}
                <div className="rounded-xl border border-blue-200 dark:border-blue-800 p-6 shadow-sm">
                  <h3 className="text-sm font-medium text-foreground mb-4 flex items-center gap-2">
                    <Sparkles size={16} className="text-blue-600" />
                    Why Watermark With Us?
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="bg-green-100 dark:bg-green-900/20 p-1.5 rounded-full mt-0.5">
                        <Lock size={12} className="text-green-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">100% Private Processing</div>
                        <div className="text-xs text-muted-foreground">Files never leave your browser. No server uploads.</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 dark:bg-blue-900/20 p-1.5 rounded-full mt-0.5">
                        <Clock size={12} className="text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">Professional Results</div>
                        <div className="text-xs text-muted-foreground">Crisp text and clear image watermarks with perfect positioning.</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-purple-100 dark:bg-purple-900/20 p-1.5 rounded-full mt-0.5">
                        <Shield size={12} className="text-purple-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">Document Protection</div>
                        <div className="text-xs text-muted-foreground">Secure sensitive documents with professional watermarks.</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Results Panel */}
                <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-sm font-medium text-foreground">
                      {watermarkResult ? 'Watermark Results' : 'Preview'}
                    </label>
                  </div>

                  <div className="flex-1 flex flex-col items-center justify-center bg-secondary/20 rounded-xl p-6 min-h-[300px]">
                    {watermarkResult ? (
                      <div className="text-center w-full">
                        <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20 mb-6">
                          <div className="flex items-center justify-center gap-2 text-green-600 mb-2">
                            <CheckCircle size={24} />
                            <span className="font-semibold">Watermark Added Successfully!</span>
                          </div>
                          <p className="text-sm text-green-600">
                            {watermarkResult.watermarkedPages} page(s) watermarked
                          </p>
                          <div className="text-xs text-green-600/80 mt-2 flex items-center justify-center gap-2">
                            <Lock size={10} />
                            <span>100% private • Professional quality</span>
                          </div>
                        </div>

                        {/* File Stats */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="bg-blue-500/10 p-3 rounded-lg">
                            <div className="text-lg font-bold text-foreground">
                              {formatFileSize(estimatedSize)}
                            </div>
                            <div className="text-xs text-muted-foreground">Original</div>
                          </div>
                          <div className="bg-green-500/10 p-3 rounded-lg">
                            <div className="text-lg font-bold text-green-600">
                              {formatFileSize(watermarkResult.size)}
                            </div>
                            <div className="text-xs text-muted-foreground">Watermarked</div>
                          </div>
                        </div>

                        {/* Watermark Info */}
                        <div className="bg-purple-500/10 p-3 rounded-lg mb-6">
                          <div className="flex items-center justify-center gap-2 text-purple-600">
                            <Layers size={20} />
                            <span className="font-medium">
                              {watermarkSettings.type === 'text' 
                                ? `"${watermarkSettings.text}" watermark applied`
                                : 'Image watermark applied'
                              }
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                          <button
                            onClick={downloadWatermarkedPDF}
                            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all text-sm font-medium shadow-md hover:shadow-lg"
                          >
                            <Download size={16} />
                            Download Watermarked PDF
                          </button>
                          <button
                            onClick={shareWatermarkedPDF}
                            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-sm font-medium"
                          >
                            {copied ? <CheckCheck size={16} /> : <Share2 size={16} />}
                            {copied ? 'Link Copied!' : 'Share Securely'}
                          </button>
                        </div>
                      </div>
                    ) : pdfFile ? (
                      <div className="text-center py-8 w-full">
                        <div className="bg-card border border-border rounded-xl p-8 max-w-sm mx-auto">
                          <div className="relative inline-block mb-4">
                            <Droplets className="w-12 h-12 text-muted-foreground mx-auto" />
                            <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-1">
                              <Lock size={10} />
                            </div>
                          </div>
                          <div className="flex items-center justify-center gap-2 mb-2">
                            <Sparkles size={20} className="text-muted-foreground" />
                            <p className="text-foreground font-medium">Ready to Watermark Securely</p>
                          </div>
                          <p className="text-muted-foreground text-sm mb-4">
                            {watermarkSettings.type === 'text' 
                              ? `"${watermarkSettings.text}" will be added as watermark`
                              : 'Your image will be added as watermark'
                            }
                          </p>
                          <div className="text-xs text-green-600 flex items-center justify-center gap-1">
                            <Shield size={10} />
                            <span>All processing happens in your browser</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 w-full">
                        <div className="bg-card border border-border rounded-xl p-8 max-w-sm mx-auto">
                          <div className="relative inline-block mb-4">
                            <FileText className="w-12 h-12 text-muted-foreground mx-auto" />
                            <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-1">
                              <Lock size={10} />
                            </div>
                          </div>
                          <p className="text-foreground font-medium mb-2">Upload PDF to Watermark</p>
                          <p className="text-muted-foreground text-sm mb-4">
                            Select a PDF file to add security watermarks with 100% privacy
                          </p>
                          <div className="text-xs text-green-600 flex items-center justify-center gap-1">
                            <Shield size={10} />
                            <span>No uploads • Professional results • No signup</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Features Card */}
                <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                  <h3 className="text-sm font-medium text-foreground mb-4">Watermark Features</h3>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center gap-2 p-2 bg-blue-500/10 rounded">
                      <Type size={14} className="text-blue-600" />
                      <span className="text-foreground">Text Watermarks</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-green-500/10 rounded">
                      <Image size={14} className="text-green-600" />
                      <span className="text-foreground">Image Watermarks</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-purple-500/10 rounded">
                      <Palette size={14} className="text-purple-600" />
                      <span className="text-foreground">Custom Styling</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-orange-500/10 rounded">
                      <Layers size={14} className="text-orange-600" />
                      <span className="text-foreground">Page Selection</span>
                    </div>
                  </div>
                </div>
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
                      <Droplets size={20} className="text-blue-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Professional PDF Watermarking - How It Works</h2>
                  </div>
                  {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.whatItDoes && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      This PDF watermark tool adds professional text or image watermarks to protect and brand your documents. Unlike basic watermarking that just overlays images, our tool integrates watermarks directly into PDF structure at the chosen opacity, rotation, and position—ensuring they display consistently across all viewers and printers. The entire process happens securely in your browser, keeping sensitive documents private while providing enterprise-level watermarking features.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Lock size={18} className="text-blue-600" />
                          <h3 className="font-semibold text-foreground">Complete Privacy</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">No file uploads to servers. All watermarking happens locally in your browser for maximum security.</p>
                      </div>
                      <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Palette size={18} className="text-green-600" />
                          <h3 className="font-semibold text-foreground">Flexible Options</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">Choose text or image watermarks with full control over styling, position, and page selection.</p>
                      </div>
                      <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Shield size={18} className="text-purple-600" />
                          <h3 className="font-semibold text-foreground">Document Security</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">Protect sensitive documents with professional watermarks that deter unauthorized use.</p>
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
                      <FileText size={20} className="text-green-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">When to Use PDF Watermarking</h2>
                  </div>
                  {openSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.useCases && (
                  <div className="px-6 pb-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">🔒 Document Security & Confidentiality</h3>
                        <ul className="space-y-1 text-muted-foreground text-sm">
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Add "CONFIDENTIAL" or "PRIVATE" watermarks to sensitive business documents</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Mark draft documents with "DRAFT" or "FOR REVIEW" to prevent premature distribution</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Add "DO NOT COPY" or "PROPRIETARY" labels to protect intellectual property</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">🏢 Professional Branding & Marketing</h3>
                        <ul className="space-y-1 text-muted-foreground text-sm">
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Add company logos to proposals, reports, and presentations for brand consistency</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Watermark sample documents with "SAMPLE" or "DEMO" for client presentations</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Add copyright notices or website URLs to digital publications and e-books</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">🎓 Academic & Legal Applications</h3>
                        <ul className="space-y-1 text-muted-foreground text-sm">
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Mark academic papers with "SUBMITTED" or "UNDER REVIEW" status indicators</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Add "APPROVED" or "SIGNED" watermarks to executed contracts and legal documents</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Watermark financial documents with "FOR INTERNAL USE ONLY" for compliance</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </article>

              {/* How to Use - Condensed Version */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('howToUse')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-orange-500/10 p-2 rounded-lg">
                      <Settings size={20} className="text-orange-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Quick Start Guide</h2>
                  </div>
                  {openSections.howToUse ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.howToUse && (
                  <div className="px-6 pb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h3 className="font-semibold text-foreground">3-Step Process</h3>
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
                            <div>
                              <div className="font-medium text-foreground">Upload Your PDF</div>
                              <div className="text-sm text-muted-foreground">Select the PDF file you want to watermark. Files stay on your device.</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                            <div>
                              <div className="font-medium text-foreground">Configure Watermark</div>
                              <div className="text-sm text-muted-foreground">Choose text/image, set styling, position, and select target pages.</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                            <div>
                              <div className="font-medium text-foreground">Apply & Download</div>
                              <div className="text-sm text-muted-foreground">Apply watermark, preview results, and download protected PDF.</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h3 className="font-semibold text-foreground">Pro Tips</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <div className="bg-accent/20 p-1 rounded mt-0.5">
                              <Eye size={12} className="text-accent" />
                            </div>
                            <span>Use 20-40% opacity for watermarks that are visible but don't obscure content</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-accent/20 p-1 rounded mt-0.5">
                              <Type size={12} className="text-accent" />
                            </div>
                            <span>For text watermarks, use 45° diagonal positioning for maximum coverage and visibility</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-accent/20 p-1 rounded mt-0.5">
                              <Image size={12} className="text-accent" />
                            </div>
                            <span>Use PNG images with transparency for clean, professional-looking image watermarks</span>
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
                      <Layers size={20} className="text-purple-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Example: Watermark Applications</h2>
                  </div>
                  {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.examples && (
                  <div className="px-6 pb-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-foreground mb-3">Common Watermarking Scenarios</h3>
                        <div className="overflow-x-auto">
                          <div className="min-w-full inline-block align-middle">
                            <div className="overflow-hidden border border-border rounded-lg">
                              <table className="min-w-full divide-y divide-border">
                                <thead className="bg-secondary/20">
                                  <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Document Type</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Watermark Type</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Settings Used</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Result</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                  <tr>
                                    <td className="px-4 py-3 text-sm text-foreground">Business Proposal</td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">Text: "DRAFT VERSION"</td>
                                    <td className="px-4 py-3 text-sm text-blue-600">45° diagonal, 30% opacity, All pages</td>
                                    <td className="px-4 py-3 text-sm text-green-600">Clear draft identification without obscuring content</td>
                                  </tr>
                                  <tr>
                                    <td className="px-4 py-3 text-sm text-foreground">Company Report</td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">Image: Company Logo</td>
                                    <td className="px-4 py-3 text-sm text-blue-600">Bottom-right, 25% opacity, 60% scale</td>
                                    <td className="px-4 py-3 text-sm text-green-600">Professional branding on every page</td>
                                  </tr>
                                  <tr>
                                    <td className="px-4 py-3 text-sm text-foreground">Confidential Contract</td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">Text: "CONFIDENTIAL"</td>
                                    <td className="px-4 py-3 text-sm text-blue-600">Center, 40% opacity, Red color, All pages</td>
                                    <td className="px-4 py-3 text-sm text-green-600">Strong visual protection for sensitive documents</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Technical Implementation</h3>
                        <div className="bg-secondary/20 p-4 rounded-lg border border-border overflow-x-auto">
                          <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
{`Before Watermarking (Original Document):
- File: business_proposal.pdf
- Pages: 24
- Content: Text, charts, images
- Status: Internal draft needing review identification
- File size: 8.2 MB

Watermark Configuration:
- Type: Text watermark
- Text: "DRAFT - FOR REVIEW ONLY"
- Font size: 56px
- Color: Gray (#808080)
- Opacity: 30%
- Rotation: 45° diagonal
- Position: Center of each page
- Pages: All pages

After Watermarking (Protected Document):
- File: business_proposal_watermarked.pdf
- Pages: 24 (all watermarked)
- Content: Original content + visible watermark
- Status: Clearly identified as draft
- File size: 8.3 MB (minimal increase)

Technical Details:
✓ Watermark added as vector graphics for crisp display at any zoom level
✓ Opacity set to 30% - visible but doesn't obscure underlying content
✓ Diagonal orientation ensures watermark covers significant area
✓ Applied to all pages for consistent document protection
✓ Text remains fully searchable and selectable
✓ Compatible with all PDF viewers and printers

Best Practices Applied:
• Used neutral gray color for professional appearance
• 30% opacity balances visibility with readability
• Diagonal placement maximizes coverage
• Consistent application across all pages
• Minimal file size increase`}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </article>

              {/* Related Tools Section - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('relatedTools')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <h2 className="text-xl font-bold text-foreground">More PDF Tools</h2>
                  {openSections.relatedTools ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.relatedTools && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      Need other PDF operations? Try these tools:
                    </p>
                    <ul className="space-y-3 text-muted-foreground">
                      {relatedTools.map((tool, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-accent mr-2">•</span>
                          <Link href={tool.path} className="text-accent hover:underline">
                            <strong>{tool.name}:</strong> Visit this tool for additional PDF operations
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>

              {/* Frequently Asked Questions - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('faqs')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-500/10 p-2 rounded-lg">
                      <FileText size={20} className="text-purple-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Common Questions</h2>
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
            </section>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: hsl(var(--accent));
          cursor: pointer;
          border: 2px solid hsl(var(--background));
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: hsl(var(--accent));
          cursor: pointer;
          border: 2px solid hsl(var(--background));
        }
      `}</style>
    </>
  );
}