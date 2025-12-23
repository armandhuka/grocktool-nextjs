'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Download, Barcode, RefreshCw, Share2, 
  Palette, Scan, Zap, CheckCheck, Type, Hash,
  ChevronDown, ChevronUp, ShoppingBag, Package, Truck,
  Building, Book, Home, Database, Image as ImageIcon,
  Smartphone, Printer, FileText
} from 'lucide-react';

// Dynamic import for JsBarcode to avoid SSR issues
let JsBarcode: any;

if (typeof window !== 'undefined') {
  import('jsbarcode').then((module) => {
    JsBarcode = module.default;
  });
}

export default function BarcodeGenerator() {
  const [values, setValues] = useState({
    text: '',
    format: 'CODE128' as 'CODE128' | 'EAN13' | 'UPC' | 'CODE39' | 'ITF14' | 'MSI' | 'pharmacode' | 'CODABAR',
    width: 2,
    height: 100,
    displayValue: true,
    fontSize: 16,
    lineColor: '#000000',
    background: '#ffffff',
    margin: 10,
    textAlign: 'center' as 'left' | 'center' | 'right',
  });

  const [barcodeUrl, setBarcodeUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'design'>('content');
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

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Related tools
  const relatedTools = [
    { name: 'QR Code Generator', path: '/QR-Barcode/qr-code-generator', icon: Barcode },
  ];

  // FAQ Data
  const faqData = [
    {
      question: "What's the difference between QR codes and barcodes?",
      answer: "Barcodes are 1D (linear) codes that store data horizontally and typically contain 20-25 characters, while QR codes are 2D (matrix) codes that store data both horizontally and vertically and can contain up to 7,089 characters. Barcodes require line-of-sight scanning, while QR codes can be scanned from any angle."
    },
    {
      question: "Which barcode format should I use for my business?",
      answer: "Use CODE128 for general product identification, EAN-13/UPC for retail products, CODE39 for logistics and inventory, ITF-14 for shipping cartons, Pharmacode for pharmaceutical products, and CODABAR for libraries and blood banks. CODE128 is recommended for most applications as it supports all ASCII characters."
    },
    {
      question: "Can colored barcodes still be scanned?",
      answer: "Yes, colored barcodes can be scanned if there's sufficient contrast between the bars and background. Dark colors on light backgrounds work best. Avoid red on red or similar low-contrast combinations. Always test colored barcodes with multiple scanners before deployment."
    },
    {
      question: "What are the size requirements for printed barcodes?",
      answer: "Minimum recommended size is 1.5 inches (3.81 cm) wide × 0.5 inches (1.27 cm) tall for standard scanning. Maintain a quiet zone (blank space) of at least 0.125 inches (0.3175 cm) on each side. Higher density formats may require larger sizes for reliable scanning."
    },
    {
      question: "How do I ensure my barcode will scan properly?",
      answer: "Test with multiple scanners, ensure proper contrast, maintain quiet zones, use correct format for your data type, verify data accuracy, print at appropriate resolution (300 DPI minimum), and test in different lighting conditions. Always validate with the scanning systems you'll be using."
    }
  ];

  const handleInputChange = (field: string, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }));
  };

  const formatInfo = {
    CODE128: {
      description: 'Most common, supports all ASCII characters',
      requirements: 'Supports all ASCII characters',
      example: 'PROD-2024-001',
      capacity: 'Unlimited within practical limits',
      applications: 'General product ID, logistics, inventory'
    },
    EAN13: {
      description: '13-digit product barcodes (numbers only)',
      requirements: 'Exactly 13 digits (0-9)',
      example: '1234567890123',
      capacity: '13 digits',
      applications: 'Retail products worldwide'
    },
    UPC: {
      description: '12-digit Universal Product Code',
      requirements: 'Exactly 12 digits (0-9)',
      example: '123456789012',
      capacity: '12 digits',
      applications: 'Retail products in North America'
    },
    CODE39: {
      description: 'Alphanumeric, used in logistics',
      requirements: 'A-Z, 0-9, space, - . $ / + %',
      example: 'ABC-123',
      capacity: 'Unlimited within practical limits',
      applications: 'Logistics, inventory, automotive'
    },
    ITF14: {
      description: '14-digit shipping cartons',
      requirements: 'Exactly 14 digits (0-9)',
      example: '12345678901234',
      capacity: '14 digits',
      applications: 'Shipping cartons, logistics'
    },
    MSI: {
      description: 'Inventory management',
      requirements: 'Numbers only',
      example: '123456',
      capacity: 'Variable length',
      applications: 'Warehouse management, inventory'
    },
    pharmacode: {
      description: 'Pharmaceutical packaging',
      requirements: 'Numbers only (3-131070)',
      example: '12345',
      capacity: '3-131070',
      applications: 'Pharmaceutical products, medicine'
    },
    CODABAR: {
      description: 'Library, blood banks',
      requirements: 'Numbers and A-D, $:/.+-',
      example: 'A12345B',
      capacity: 'Variable length',
      applications: 'Libraries, blood banks, logistics'
    }
  };

  const validateInput = (): string | null => {
    const info = formatInfo[values.format];
    
    if (!values.text.trim()) {
      return 'Please enter some text to generate barcode';
    }

    // EAN13 validation
    if (values.format === 'EAN13' && !/^\d{13}$/.test(values.text)) {
      return 'EAN-13 requires exactly 13 digits';
    }

    // UPC validation
    if (values.format === 'UPC' && !/^\d{12}$/.test(values.text)) {
      return 'UPC requires exactly 12 digits';
    }

    // CODE39 validation
    if (values.format === 'CODE39' && !/^[A-Z0-9\s\-\.\$\/\+\%]+$/i.test(values.text)) {
      return 'CODE39 supports only A-Z, 0-9, space, - . $ / + %';
    }

    // ITF14 validation
    if (values.format === 'ITF14' && !/^\d{14}$/.test(values.text)) {
      return 'ITF-14 requires exactly 14 digits';
    }

    // Pharmacode validation
    if (values.format === 'pharmacode') {
      const num = parseInt(values.text);
      if (isNaN(num) || num < 3 || num > 131070) {
        return 'Pharmacode must be between 3 and 131070';
      }
    }

    // CODABAR validation
    if (values.format === 'CODABAR' && !/^[A-D].*[A-D]$/.test(values.text)) {
      return 'CODABAR must start and end with A, B, C, or D';
    }

    return null;
  };

  const generateBarcode = async () => {
    const error = validateInput();
    if (error) {
      alert(error);
      return;
    }

    setIsLoading(true);

    try {
      if (!JsBarcode && typeof window !== 'undefined') {
        const module = await import('jsbarcode');
        JsBarcode = module.default;
      }

      if (canvasRef.current && JsBarcode) {
        const options: any = {
          format: values.format,
          width: values.width,
          height: values.height,
          displayValue: values.displayValue,
          fontSize: values.fontSize,
          lineColor: values.lineColor,
          background: values.background,
          margin: values.margin,
          textAlign: values.textAlign,
        };

        JsBarcode(canvasRef.current, values.text, options);
        const dataUrl = canvasRef.current.toDataURL('image/png');
        setBarcodeUrl(dataUrl);
      }
    } catch (error) {
      console.error('Error generating barcode:', error);
      alert('Error generating barcode. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const downloadBarcode = () => {
    if (!barcodeUrl) return;

    const link = document.createElement('a');
    link.href = barcodeUrl;
    link.download = `barcode-${values.format}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const shareBarcode = async () => {
    if (!barcodeUrl) return;

    try {
      await navigator.clipboard.writeText(barcodeUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      alert('Unable to copy. Please download the barcode instead.');
    }
  };

  const handleClear = () => {
    setValues({
      text: '',
      format: 'CODE128',
      width: 2,
      height: 100,
      displayValue: true,
      fontSize: 16,
      lineColor: '#000000',
      background: '#ffffff',
      margin: 10,
      textAlign: 'center',
    });
    setBarcodeUrl('');
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    }
  };

  const presetThemes = [
    { name: 'Classic', color: '#000000', bgColor: '#FFFFFF' },
    { name: 'Dark', color: '#FFFFFF', bgColor: '#000000' },
    { name: 'Blue', color: '#2563EB', bgColor: '#F0F9FF' },
    { name: 'Green', color: '#059669', bgColor: '#F0FDF4' },
    { name: 'Red', color: '#DC2626', bgColor: '#FEF2F2' },
  ];

  const applyTheme = (theme: any) => {
    handleInputChange('lineColor', theme.color);
    handleInputChange('background', theme.bgColor);
  };

  const generateSampleData = () => {
    const samples: any = {
      CODE128: 'PROD-2024-001',
      EAN13: '1234567890123',
      UPC: '123456789012',
      CODE39: 'ITEM-ABC-123',
      ITF14: '12345678901234',
      MSI: '123456789',
      pharmacode: '12345',
      CODABAR: 'A123456789B'
    };

    setValues(prev => ({
      ...prev,
      text: samples[values.format]
    }));
  };

  const tabs = [
    { key: 'content', label: 'Content', icon: Barcode },
    { key: 'design', label: 'Design', icon: Palette },
  ];

  return (
    <div className="min-h-screen bg-background font-inter">
      <title>Barcode Generator | Create EAN-13, UPC, CODE128, CODE39 Barcodes Online | GrockTool.com</title>
      <meta name="description" content="Free online Barcode Generator. Create professional barcodes in EAN-13, UPC, CODE128, CODE39, ITF-14, Pharmacode, and CODABAR formats. Customize colors, size, and download high-quality barcode images for business use." />
      <meta name="keywords" content="barcode generator, create barcode, EAN-13 generator, UPC barcode, CODE128, CODE39, barcode maker, free barcode generator, retail barcode, product barcode, inventory barcode, logistics barcode" />
      <meta property="og:title" content="Barcode Generator | Create EAN-13, UPC, CODE128, CODE39 Barcodes Online" />
      <meta property="og:description" content="Free online Barcode Generator. Create professional barcodes in EAN-13, UPC, CODE128, CODE39, ITF-14, Pharmacode, and CODABAR formats." />
      <link rel="canonical" href="https://grocktool.com/tools/barcode-generator" />
      
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
                <Barcode size={16} className="text-blue-600" />
                <span className="text-sm font-medium text-blue-600">Retail • Inventory • Logistics • Product Management • Business Solutions</span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                Barcode Generator
                <span className="block text-lg sm:text-xl lg:text-2xl font-normal text-muted-foreground mt-2">
                  Create Professional Barcodes in EAN-13 • UPC • CODE128 • CODE39 • ITF-14 • Pharmacode • CODABAR
                </span>
              </h1>
              
              <div className="flex flex-wrap justify-center gap-4 mt-6 mb-8">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 rounded-lg">
                  <Barcode size={14} className="text-blue-600" />
                  <span className="text-xs sm:text-sm text-foreground">8+ Barcode Formats</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 rounded-lg">
                  <Palette size={14} className="text-green-600" />
                  <span className="text-xs sm:text-sm text-foreground">Custom Design</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 rounded-lg">
                  <ShoppingBag size={14} className="text-purple-600" />
                  <span className="text-xs sm:text-sm text-foreground">Retail Ready</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 rounded-lg">
                  <Scan size={14} className="text-amber-600" />
                  <span className="text-xs sm:text-sm text-foreground">Scanner Tested</span>
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
                <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
                  {/* Left Panel - Controls */}
                  <div className="space-y-6">
                    {/* Tab Navigation */}
                    <div className="flex border-b border-border mb-6 overflow-x-auto">
                      {tabs.map(({ key, label, icon: Icon }) => (
                        <button
                          key={key}
                          onClick={() => setActiveTab(key as any)}
                          className={`flex items-center gap-2 flex-shrink-0 px-4 py-3 font-medium border-b-2 transition-colors whitespace-nowrap ${
                            activeTab === key 
                              ? 'border-accent text-accent' 
                              : 'border-transparent text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          <Icon size={18} />
                          {label}
                        </button>
                      ))}
                    </div>

                    {/* Content Tab */}
                    {activeTab === 'content' && (
                      <div className="space-y-6">
                        {/* Format Selection */}
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-3">
                            Barcode Format
                          </label>
                          <select
                            value={values.format}
                            onChange={(e) => handleInputChange('format', e.target.value)}
                            className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                          >
                            <option value="CODE128">CODE128 (Recommended - All ASCII)</option>
                            <option value="EAN13">EAN-13 (Retail - 13 digits)</option>
                            <option value="UPC">UPC (Retail - 12 digits)</option>
                            <option value="CODE39">CODE39 (Logistics - Alphanumeric)</option>
                            <option value="ITF14">ITF-14 (Shipping - 14 digits)</option>
                            <option value="MSI">MSI (Inventory - Numbers)</option>
                            <option value="pharmacode">Pharmacode (Pharmaceutical)</option>
                            <option value="CODABAR">CODABAR (Libraries)</option>
                          </select>
                          <p className="text-sm text-muted-foreground mt-2">
                            {formatInfo[values.format].description}
                          </p>
                        </div>

                        {/* Text Input */}
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-3">
                            Barcode Content
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={values.text}
                              onChange={(e) => handleInputChange('text', e.target.value)}
                              placeholder={`Enter ${values.format} data...`}
                              className="flex-1 p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                            />
                            <button
                              onClick={generateSampleData}
                              className="px-4 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-sm font-medium"
                              title="Generate sample data"
                            >
                              <Type size={16} />
                            </button>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            Example: {formatInfo[values.format].example} • Capacity: {formatInfo[values.format].capacity}
                          </p>
                        </div>

                        {/* Format Requirements */}
                        <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                          <div className="text-sm font-medium text-foreground mb-2">Format Requirements:</div>
                          <div className="text-sm text-muted-foreground">
                            {formatInfo[values.format].requirements}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Design Tab */}
                    {activeTab === 'design' && (
                      <div className="space-y-6">
                        {/* Theme Presets */}
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-3">
                            Quick Themes
                          </label>
                          <div className="grid grid-cols-5 gap-2">
                            {presetThemes.map((theme, index) => (
                              <button
                                key={index}
                                onClick={() => applyTheme(theme)}
                                className="flex flex-col items-center p-2 rounded-lg border border-border hover:border-accent transition-colors"
                                title={theme.name}
                              >
                                <div 
                                  className="w-8 h-8 rounded border mb-1"
                                  style={{ 
                                    backgroundColor: theme.bgColor,
                                    borderColor: theme.color 
                                  }}
                                />
                                <span className="text-xs text-foreground">{theme.name}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Size Controls */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                              Line Width: {values.width}px
                            </label>
                            <input
                              type="range"
                              min="1"
                              max="4"
                              step="0.1"
                              value={values.width}
                              onChange={(e) => handleInputChange('width', parseFloat(e.target.value))}
                              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="flex justify-between text-xs text-muted-foreground mt-1">
                              <span>1px</span>
                              <span>2.5px</span>
                              <span>4px</span>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                              Height: {values.height}px
                            </label>
                            <input
                              type="range"
                              min="50"
                              max="200"
                              value={values.height}
                              onChange={(e) => handleInputChange('height', parseInt(e.target.value))}
                              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="flex justify-between text-xs text-muted-foreground mt-1">
                              <span>50px</span>
                              <span>125px</span>
                              <span>200px</span>
                            </div>
                          </div>
                        </div>

                        {/* Color Controls */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                              Barcode Color
                            </label>
                            <div className="flex items-center gap-2">
                              <input
                                type="color"
                                value={values.lineColor}
                                onChange={(e) => handleInputChange('lineColor', e.target.value)}
                                className="w-10 h-10 cursor-pointer rounded-lg border border-border"
                              />
                              <input
                                value={values.lineColor}
                                onChange={(e) => handleInputChange('lineColor', e.target.value)}
                                className="flex-1 p-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                              Background
                            </label>
                            <div className="flex items-center gap-2">
                              <input
                                type="color"
                                value={values.background}
                                onChange={(e) => handleInputChange('background', e.target.value)}
                                className="w-10 h-10 cursor-pointer rounded-lg border border-border"
                              />
                              <input
                                value={values.background}
                                onChange={(e) => handleInputChange('background', e.target.value)}
                                className="flex-1 p-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Display Options */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-3 p-3 bg-secondary/20 rounded-lg">
                            <input
                              type="checkbox"
                              id="displayValue"
                              checked={values.displayValue}
                              onChange={(e) => handleInputChange('displayValue', e.target.checked)}
                              className="rounded border-border"
                            />
                            <label htmlFor="displayValue" className="text-sm font-medium text-foreground">
                              Show Text Below Barcode
                            </label>
                          </div>
                          
                          {values.displayValue && (
                            <div>
                              <label className="block text-sm font-medium text-foreground mb-2">
                                Font Size: {values.fontSize}px
                              </label>
                              <input
                                type="range"
                                min="12"
                                max="24"
                                value={values.fontSize}
                                onChange={(e) => handleInputChange('fontSize', parseInt(e.target.value))}
                                className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
                              />
                              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                <span>12px</span>
                                <span>18px</span>
                                <span>24px</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-border">
                      <button
                        onClick={generateBarcode}
                        disabled={isLoading || !values.text}
                        className="flex items-center justify-center gap-2 flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all text-sm sm:text-base font-medium shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <RefreshCw size={18} className="animate-spin" />
                        ) : (
                          <Barcode size={18} />
                        )}
                        {isLoading ? 'Generating...' : 'Generate Barcode'}
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
                  <div className="flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                      <label className="text-sm font-medium text-foreground">Preview</label>
                      <div className="flex gap-2">
                        <button
                          onClick={shareBarcode}
                          disabled={!barcodeUrl}
                          className="p-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Share Barcode"
                        >
                          {copied ? <CheckCheck size={16} /> : <Share2 size={16} />}
                        </button>
                        <button
                          onClick={downloadBarcode}
                          disabled={!barcodeUrl}
                          className="p-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Download Barcode"
                        >
                          <Download size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col items-center justify-center bg-secondary/20 rounded-xl p-4 sm:p-6 min-h-[300px]">
                      {barcodeUrl ? (
                        <div className="text-center w-full">
                          <div className="bg-card p-4 sm:p-6 rounded-xl border border-border inline-block shadow-lg mx-auto">
                            <img
                              src={barcodeUrl}
                              alt="Generated Barcode"
                              className="max-w-full h-auto mx-auto"
                              style={{ 
                                maxWidth: 'min(100%, 400px)',
                                background: values.background
                              }}
                            />
                          </div>
                          
                          <div className="mt-4 sm:mt-6 space-y-2 max-w-sm mx-auto">
                            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                              <Scan size={16} />
                              <span>Scan to test your barcode</span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Format: {values.format} | Size: {values.width}px × {values.height}px
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8 w-full">
                          <div className="bg-card border border-border rounded-xl p-6 sm:p-8 max-w-sm mx-auto">
                            <div className="text-muted-foreground text-4xl sm:text-6xl mb-3 sm:mb-4">📊</div>
                            <div className="flex items-center justify-center gap-2 mb-2">
                              <Zap size={20} className="text-muted-foreground" />
                              <p className="text-foreground font-medium">
                                {isLoading ? 'Generating Barcode...' : 'Ready to Generate'}
                              </p>
                            </div>
                            <p className="text-muted-foreground text-sm">
                              {isLoading ? 'Creating your barcode...' : 'Configure settings and click "Generate Barcode"'}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Barcode Stats */}
                    {barcodeUrl && (
                      <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                        <div className="bg-blue-500/10 text-blue-600 p-2 rounded text-center">
                          <div className="font-medium">{values.format}</div>
                          <div>Format</div>
                        </div>
                        <div className="bg-green-500/10 text-green-600 p-2 rounded text-center">
                          <div className="font-medium">{values.width}×{values.height}</div>
                          <div>Size</div>
                        </div>
                        <div className="bg-purple-500/10 text-purple-600 p-2 rounded text-center">
                          <div className="font-medium">{values.text.length}</div>
                          <div>Length</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Features Grid */}
                <div className="mt-6 md:mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-card rounded-xl border border-border p-4 text-center">
                    <Barcode className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-foreground text-sm">8+ Formats</h4>
                    <p className="text-muted-foreground text-xs">Professional standards</p>
                  </div>
                  <div className="bg-card rounded-xl border border-border p-4 text-center">
                    <Palette className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-foreground text-sm">Custom Design</h4>
                    <p className="text-muted-foreground text-xs">Colors & themes</p>
                  </div>
                  <div className="bg-card rounded-xl border border-border p-4 text-center">
                    <Download className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-foreground text-sm">High Quality</h4>
                    <p className="text-muted-foreground text-xs">PNG format</p>
                  </div>
                  <div className="bg-card rounded-xl border border-border p-4 text-center">
                    <Zap className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-foreground text-sm">Easy to Use</h4>
                    <p className="text-muted-foreground text-xs">Simple interface</p>
                  </div>
                </div>
              </motion.div>

              {/* Barcode Guide Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Barcode size={18} className="text-blue-600" />
                  Barcode Generation Complete Guide
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  {/* Commercial Formats */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-blue-500/10 p-2 rounded-lg">
                        <ShoppingBag size={16} className="text-blue-600" />
                      </div>
                      <h4 className="text-sm font-medium text-foreground">Retail & Commercial</h4>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>EAN-13:</strong> International standard for retail products (13 digits)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>UPC:</strong> North American retail standard (12 digits, compatible with EAN-13)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>CODE128:</strong> General purpose, supports all ASCII characters</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>ITF-14:</strong> Shipping cartons, outer packaging (14 digits)</span>
                      </div>
                    </div>
                  </div>

                  {/* Specialized Formats */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-green-500/10 p-2 rounded-lg">
                        <Package size={16} className="text-green-600" />
                      </div>
                      <h4 className="text-sm font-medium text-foreground">Industrial & Specialized</h4>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>CODE39:</strong> Logistics, inventory, automotive (alphanumeric)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>MSI:</strong> Warehouse management, inventory control</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Pharmacode:</strong> Pharmaceutical packaging, medicine verification</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>CODABAR:</strong> Libraries, blood banks, photo labs</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-lg border border-blue-500/20">
                  <h4 className="text-sm font-medium text-foreground mb-2">Barcode Printing Best Practices</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-muted-foreground">
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-semibold text-foreground">Minimum Width</span>
                      <span className="font-mono">1.5 inches</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-semibold text-foreground">Height</span>
                      <span className="font-mono">0.5 inches</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-semibold text-foreground">Quiet Zone</span>
                      <span className="font-mono">0.125 inches</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-semibold text-foreground">Print Resolution</span>
                      <span className="font-mono">300+ DPI</span>
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
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">Barcode Technology Explained</h3>
                <div className="space-y-2 text-muted-foreground text-sm">
                  <p>
                    Barcodes are optical machine-readable representations of data that revolutionized 
                    inventory management, retail, and logistics worldwide through automated data capture.
                  </p>
                  <div className="text-xs sm:text-sm space-y-1 pt-2">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                      <span>Select barcode format based on your application requirements</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                      <span>Enter the data you want to encode in the barcode</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                      <span>Customize appearance with colors, size, and design options</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                      <span>Generate and download high-quality barcode image</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                      <span>Test with scanners before final deployment</span>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm space-y-2 pt-3">
                    <div className="font-medium text-foreground">Key Barcode Components:</div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span><strong>Bars:</strong> Dark lines representing encoded data</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span><strong>Spaces:</strong> Light areas between bars for contrast</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span><strong>Quiet Zone:</strong> Empty space before and after barcode</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span><strong>Human Readable:</strong> Text below barcode for verification</span>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm space-y-2 pt-3">
                    <div className="font-medium text-foreground">Scanning Technology:</div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <span><strong>Laser Scanners:</strong> Traditional red laser beam technology</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <span><strong>CCD Scanners:</strong> LED array for close-range scanning</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <span><strong>Imager Scanners:</strong> Camera-based, works like smartphone cameras</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <span><strong>Smartphone Cameras:</strong> Modern apps can scan most barcodes</span>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm space-y-2 pt-3">
                    <div className="font-medium text-foreground">Industry Standards:</div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                      <span><strong>GS1 Standards:</strong> Global standards for EAN/UPC barcodes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                      <span><strong>ISO Standards:</strong> International Organization for Standardization</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                      <span><strong>AIM Standards:</strong> Automatic Identification Manufacturers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                      <span><strong>Industry Specific:</strong> Healthcare (HIBC), Automotive (AIAG)</span>
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
                    <Barcode size={20} className="text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Barcode Generator - Features & Industry Standards</h2>
                </div>
                {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.whatItDoes && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground mb-4">
                    This professional Barcode Generator provides comprehensive capabilities for creating industry-standard barcodes across multiple formats including EAN-13, UPC, CODE128, CODE39, ITF-14, Pharmacode, and CODABAR. The tool supports both retail and industrial applications with proper data validation, customizable design options, and high-quality output generation. Businesses can generate barcodes for product labeling, inventory management, shipping logistics, pharmaceutical packaging, and library systems. With support for all major barcode standards and compatibility testing features, this generator ensures barcodes will work reliably with standard scanning equipment and systems.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <ShoppingBag size={18} className="text-blue-600" />
                        <h3 className="font-semibold text-foreground">Retail Barcodes</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Generate EAN-13 and UPC barcodes for retail products with proper digit validation and industry-standard formatting for global compatibility.</p>
                    </div>
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Truck size={18} className="text-green-600" />
                        <h3 className="font-semibold text-foreground">Logistics & Inventory</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Create CODE128, CODE39, and ITF-14 barcodes for inventory management, warehouse operations, and shipping logistics with alphanumeric support.</p>
                    </div>
                    <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Building size={18} className="text-purple-600" />
                        <h3 className="font-semibold text-foreground">Specialized Applications</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Generate Pharmacode for pharmaceutical products and CODABAR for libraries, blood banks, and specialized industrial applications.</p>
                    </div>
                    <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Palette size={18} className="text-amber-600" />
                        <h3 className="font-semibold text-foreground">Design Customization</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Customize barcode colors, dimensions, text display, and themes while maintaining scan reliability and industry compliance standards.</p>
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
                    <Barcode size={20} className="text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Barcode Applications & Industry Use Cases</h2>
                </div>
                {openSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.useCases && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">🏪 Retail & E-commerce Applications</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Product Labeling:</strong> Generate EAN-13 and UPC barcodes for retail products, ensuring global compatibility and POS system integration for supermarkets, department stores, and online retailers</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Inventory Management:</strong> Create CODE128 barcodes for SKU tracking, stock control, and warehouse management systems in retail chains, e-commerce warehouses, and distribution centers</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Pricing & Promotions:</strong> Generate barcodes for price tags, promotional items, and discount codes with integrated pricing information for retail operations and marketing campaigns</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Loyalty Programs:</strong> Create barcodes for customer loyalty cards, membership programs, and reward systems with unique customer identification for retail marketing</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">🏭 Manufacturing & Logistics Applications</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Supply Chain Management:</strong> Generate ITF-14 barcodes for shipping cartons, pallet labels, and logistics tracking in manufacturing, distribution, and transportation industries</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Quality Control:</strong> Create CODE39 barcodes for batch tracking, manufacturing dates, and quality assurance in production lines, automotive manufacturing, and electronics assembly</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Asset Management:</strong> Generate barcodes for equipment tracking, tool management, and facility maintenance in industrial plants, construction sites, and manufacturing facilities</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Shipping & Receiving:</strong> Create barcodes for shipping labels, waybills, and delivery tracking in logistics companies, courier services, and transportation management</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">🏥 Healthcare & Institutional Applications</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Pharmaceutical Tracking:</strong> Generate Pharmacode barcodes for medicine packaging, prescription tracking, and drug inventory management in pharmacies, hospitals, and healthcare facilities</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Medical Equipment:</strong> Create barcodes for medical device tracking, sterilization monitoring, and equipment maintenance in healthcare institutions and medical laboratories</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Library Systems:</strong> Generate CODABAR barcodes for book tracking, membership cards, and inventory management in public libraries, academic institutions, and research centers</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Blood Bank Management:</strong> Create barcodes for blood bag tracking, donor identification, and specimen management in blood banks, hospitals, and medical testing facilities</span>
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
                    <Barcode size={20} className="text-amber-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">How to Use Barcode Generator - Complete Guide</h2>
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
                            <div className="font-medium text-foreground">Select Barcode Format</div>
                            <div className="text-sm text-muted-foreground">Choose the appropriate barcode format based on your application (EAN-13 for retail, CODE128 for general use, CODE39 for logistics, etc.)</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                          <div>
                            <div className="font-medium text-foreground">Enter Barcode Data</div>
                            <div className="text-sm text-muted-foreground">Input the data to be encoded following the format requirements (13 digits for EAN-13, alphanumeric for CODE39, etc.)</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                          <div>
                            <div className="font-medium text-foreground">Customize Design</div>
                            <div className="text-sm text-muted-foreground">Adjust colors, dimensions, text display, and other design elements to match your requirements and branding</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">4</div>
                          <div>
                            <div className="font-medium text-foreground">Generate & Download</div>
                            <div className="text-sm text-muted-foreground">Generate the barcode, test scan functionality, then download in high-quality PNG format for printing or digital use</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">Professional Barcode Tips</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <div className="bg-blue-500/20 p-1 rounded mt-0.5">
                            <Scan size={12} className="text-blue-500" />
                          </div>
                          <span><strong>Always Test Scanning:</strong> Test generated barcodes with multiple scanners and smartphone apps to ensure compatibility and functionality before deployment</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-green-500/20 p-1 rounded mt-0.5">
                            <Printer size={12} className="text-green-500" />
                          </div>
                          <span><strong>Print Quality Matters:</strong> Print barcodes at 300+ DPI resolution with sufficient contrast for reliable scanning. Avoid ink bleeding and low-quality printing</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-purple-500/20 p-1 rounded mt-0.5">
                            <ShoppingBag size={12} className="text-purple-500" />
                          </div>
                          <span><strong>Industry Compliance:</strong> Follow GS1 standards for retail barcodes. Ensure proper quiet zones, dimensions, and data formatting for your specific industry</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-amber-500/20 p-1 rounded mt-0.5">
                            <Palette size={12} className="text-amber-500" />
                          </div>
                          <span><strong>Color Selection:</strong> Use dark colors on light backgrounds. Black on white provides best contrast. Avoid red on red or similar low-contrast combinations</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-red-500/20 p-1 rounded mt-0.5">
                            <Download size={12} className="text-red-500" />
                          </div>
                          <span><strong>Quality Verification:</strong> Download barcodes in high-resolution PNG format. Verify size requirements for your specific application (retail, shipping, etc.)</span>
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
                    <Barcode size={20} className="text-purple-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Barcode Generation Examples</h2>
                </div>
                {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.examples && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-3">Common Barcode Format Examples</h3>
                      <div className="overflow-x-auto">
                        <div className="min-w-full inline-block align-middle">
                          <div className="overflow-hidden border border-border rounded-lg">
                            <table className="min-w-full divide-y divide-border">
                              <thead className="bg-secondary/20">
                                <tr>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Format</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Example Data</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Requirements</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Applications</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-border">
                                <tr>
                                  <td className="px-4 py-3 text-sm font-mono text-blue-600">EAN-13</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">1234567890123</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Exactly 13 digits</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Retail products worldwide</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm font-mono text-blue-600">UPC</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">123456789012</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Exactly 12 digits</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">North American retail</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm font-mono text-blue-600">CODE128</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">PROD-2024-001</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">All ASCII characters</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">General purpose, logistics</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm font-mono text-blue-600">CODE39</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">ITEM-ABC-123</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">A-Z, 0-9, special chars</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Automotive, logistics</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm font-mono text-blue-600">ITF-14</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">12345678901234</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Exactly 14 digits</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Shipping cartons</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Detailed Example: Retail Product Barcode Implementation</h3>
                      <div className="bg-secondary/20 p-4 rounded-lg border border-border overflow-x-auto">
                        <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
{`Example: Creating EAN-13 barcode for new retail product

Step 1: Format Selection
• Choose: EAN-13 (Global retail standard)
• Requirements: 13 digits exactly

Step 2: Data Preparation
• Company Prefix: 123456 (first 6 digits)
• Product Number: 789012 (next 6 digits)
• Check Digit Calculation:
  Sum of digits at odd positions: 1+3+5+7+9+1 = 26
  Sum of digits at even positions: (2+4+6+8+0+2)×3 = 22×3 = 66
  Total: 26 + 66 = 92
  Check digit: 10 - (92 mod 10) = 10 - 2 = 8
• Complete EAN-13: 1234567890128

Step 3: Design Customization
• Width: 2px (standard for retail)
• Height: 100px (optimized for scanning)
• Color: Black (#000000)
• Background: White (#FFFFFF)
• Display Value: Yes (for manual verification)
• Font Size: 16px (readable)
• Margin: 10px (quiet zone)

Step 4: Generation Settings
• Input Data: 1234567890128
• Format: EAN-13
• Options: Include human readable text
• Validation: Verify 13-digit requirement met

Step 5: Quality Testing
• Test with laser scanner: PASS
• Test with CCD scanner: PASS
• Test with smartphone app: PASS
• Verify check digit calculation: PASS
• Test at various distances: 2-12 inches optimal

Step 6: Printing Specifications
• Print size: 1.5" × 0.5"
• Resolution: 300 DPI minimum
• Substrate: White matte label paper
• Ink: Black laser/inkjet compatible
• Quiet zone: 0.125" minimum on all sides
• Contrast ratio: 70%+ (black on white)

Step 7: Label Placement
• Product packaging: Bottom right corner
• Distance from edges: 0.25" minimum
• Avoid curved surfaces
• Ensure flat, unobstructed area
• Avoid folds, seams, or wrinkles

Step 8: Compliance Verification
• GS1 standards: Compliant
• Retail POS compatibility: Verified
• International recognition: Yes
• Check digit algorithm: Correct
• Quiet zones: Adequate

Step 9: Production Scaling
• Batch generation capability: Yes
• Consistent quality: Verified
• File format: PNG (lossless)
• Color consistency: Black (#000000)
• Size consistency: 1.5" × 0.5"

Step 10: Maintenance & Updates
• Database integration: Product SKU system
• Change management: Version control
• Quality monitoring: Regular testing
• Scanner compatibility: Ongoing verification
• Industry updates: GS1 standard compliance`}
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
                    <Barcode size={20} className="text-blue-600" />
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

      {/* Hidden canvas for barcode generation */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}