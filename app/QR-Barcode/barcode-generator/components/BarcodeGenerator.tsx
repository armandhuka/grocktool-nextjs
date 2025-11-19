'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Download, Barcode, RefreshCw, Share2, 
  Palette, Scan, Zap, CheckCheck, Type, Hash
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
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleInputChange = (field: string, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }));
  };

  const formatInfo = {
    CODE128: {
      description: 'Most common, supports all ASCII characters',
      requirements: 'Supports all ASCII characters',
      example: 'PROD-2024-001'
    },
    EAN13: {
      description: '13-digit product barcodes (numbers only)',
      requirements: 'Exactly 13 digits (0-9)',
      example: '1234567890123'
    },
    UPC: {
      description: '12-digit Universal Product Code',
      requirements: 'Exactly 12 digits (0-9)',
      example: '123456789012'
    },
    CODE39: {
      description: 'Alphanumeric, used in logistics',
      requirements: 'A-Z, 0-9, space, - . $ / + %',
      example: 'ABC-123'
    },
    ITF14: {
      description: '14-digit shipping cartons',
      requirements: 'Exactly 14 digits (0-9)',
      example: '12345678901234'
    },
    MSI: {
      description: 'Inventory management',
      requirements: 'Numbers only',
      example: '123456'
    },
    pharmacode: {
      description: 'Pharmaceutical packaging',
      requirements: 'Numbers only (3-131070)',
      example: '12345'
    },
    CODABAR: {
      description: 'Library, blood banks',
      requirements: 'Numbers and A-D, $:/.+-',
      example: 'A12345B'
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
      <div className="pt-20 pb-8 px-4 sm:pt-24 sm:pb-12 sm:px-6 lg:pt-28">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
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
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                Barcode Generator
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
                Create professional barcodes in multiple formats for products, inventory, and business use
              </p>
            </motion.div>
          </div>

          {/* Main Generator Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 mb-6 shadow-sm"
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
                        className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground"
                      >
                        <option value="CODE128">CODE128 (Recommended)</option>
                        <option value="EAN13">EAN-13 (13 digits)</option>
                        <option value="UPC">UPC (12 digits)</option>
                        <option value="CODE39">CODE39</option>
                        <option value="ITF14">ITF-14</option>
                        <option value="MSI">MSI</option>
                        <option value="pharmacode">Pharmacode</option>
                        <option value="CODABAR">CODABAR</option>
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
                          className="flex-1 p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground"
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
                        Example: {formatInfo[values.format].example}
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
                            className="flex-1 p-2 bg-input border border-border rounded-lg text-sm"
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
                            className="flex-1 p-2 bg-input border border-border rounded-lg text-sm"
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
                    className="flex items-center justify-center gap-2 flex-1 px-4 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/80 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
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
                    className="flex-1 sm:flex-none px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-sm font-medium"
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

                <div className="flex-1 flex flex-col items-center justify-center bg-secondary/20 rounded-xl p-6 min-h-[300px]">
                  {barcodeUrl ? (
                    <div className="text-center w-full">
                      <div className="bg-card p-6 rounded-xl border border-border inline-block shadow-lg mx-auto">
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
                      
                      <div className="mt-6 space-y-2 max-w-sm mx-auto">
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
                      <div className="bg-card border border-border rounded-xl p-8 max-w-sm mx-auto">
                        <div className="text-muted-foreground text-4xl mb-4">📊</div>
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
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
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
          </motion.div>

          {/* Information Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-card rounded-xl border border-border p-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-foreground mb-4">Barcode Formats Guide</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Hash size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-foreground">CODE128</div>
                    <div className="text-muted-foreground">Universal format for all ASCII characters</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Hash size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-foreground">EAN-13 & UPC</div>
                    <div className="text-muted-foreground">Retail product barcodes</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Hash size={16} className="text-purple-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-foreground">CODE39</div>
                    <div className="text-muted-foreground">Logistics and inventory</div>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Hash size={16} className="text-orange-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-foreground">ITF-14</div>
                    <div className="text-muted-foreground">Shipping cartons</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Hash size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-foreground">Pharmacode</div>
                    <div className="text-muted-foreground">Pharmaceutical products</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Hash size={16} className="text-cyan-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-foreground">CODABAR</div>
                    <div className="text-muted-foreground">Libraries and blood banks</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Hidden canvas for barcode generation */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}