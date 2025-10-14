'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Download, Barcode, RefreshCw, Share2, 
  Settings, Palette, Scan, Zap, Image as ImageIcon 
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
    format: 'CODE128' as 'CODE128' | 'EAN13' | 'UPC' | 'CODE39' | 'ITF14' | 'MSI' | 'pharmacode',
    width: 2,
    height: 100,
    displayValue: true,
    fontSize: 20,
    lineColor: '#000000',
    background: '#ffffff',
    margin: 10,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  });

  const [barcodeUrl, setBarcodeUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'design'>('content');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleInputChange = (field: string, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }));
  };

  const generateBarcode = async () => {
    if (!values.text.trim()) {
      alert('Please enter some text to generate barcode');
      return;
    }

    // Validate format based on input
    if (values.format === 'EAN13' && !/^\d{13}$/.test(values.text)) {
      alert('EAN-13 requires exactly 13 digits');
      return;
    }

    if (values.format === 'UPC' && !/^\d{12}$/.test(values.text)) {
      alert('UPC requires exactly 12 digits');
      return;
    }

    setIsLoading(true);

    try {
      if (!JsBarcode && typeof window !== 'undefined') {
        const module = await import('jsbarcode');
        JsBarcode = module.default;
      }

      if (canvasRef.current && JsBarcode) {
        JsBarcode(canvasRef.current, values.text, {
          format: values.format,
          width: values.width,
          height: values.height,
          displayValue: values.displayValue,
          fontSize: values.fontSize,
          lineColor: values.lineColor,
          background: values.background,
          margin: values.margin,
          marginTop: values.marginTop,
          marginBottom: values.marginBottom,
          marginLeft: values.marginLeft,
          marginRight: values.marginRight,
        });

        // Convert canvas to data URL
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
    link.download = `barcode-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const shareBarcode = async () => {
    if (!barcodeUrl) return;

    try {
      await navigator.clipboard.writeText(barcodeUrl);
      alert('Barcode URL copied to clipboard!');
    } catch (error) {
      console.error('Share failed:', error);
      alert('Unable to share. Please download the barcode instead.');
    }
  };

  const handleClear = () => {
    setValues({
      text: '',
      format: 'CODE128',
      width: 2,
      height: 100,
      displayValue: true,
      fontSize: 20,
      lineColor: '#000000',
      background: '#ffffff',
      margin: 10,
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 10,
      marginRight: 10,
    });
    setBarcodeUrl('');
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    }
  };

  // Format descriptions
  const formatDescriptions = {
    CODE128: 'Most common, supports all ASCII characters',
    EAN13: '13-digit product barcodes (numbers only)',
    UPC: '12-digit Universal Product Code',
    CODE39: 'Alphanumeric, used in logistics',
    ITF14: '14-digit shipping cartons',
    MSI: 'Inventory management',
    pharmacode: 'Pharmaceutical packaging'
  };

  return (
    <div className="min-h-screen bg-toolnest-bg font-inter">
      <section className="pt-24 md:pt-32 pb-12 md:pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Back Link */}
            <Link
              href="/tool"
              className="inline-flex items-center gap-2 text-toolnest-text/70 hover:text-toolnest-text mb-6 transition-colors text-sm md:text-base"
            >
              <ArrowLeft size={18} />
              Back to Tools
            </Link>

            {/* Header */}
            <div className="text-center mb-8 md:mb-12">
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-toolnest-text mb-3 md:mb-4">
                Barcode Generator
              </h1>
              <p className="text-base md:text-xl text-toolnest-text/80 max-w-2xl mx-auto px-4">
                Create professional barcodes in multiple formats for products, inventory, and business use
              </p>
            </div>

            {/* Main Container */}
            <div className="bg-white rounded-2xl md:rounded-3xl shadow-lg p-4 md:p-6 lg:p-8">
              
              {/* Tab Navigation */}
              <div className="flex border-b border-gray-200 mb-4 md:mb-6 overflow-x-auto">
                {[
                  { key: 'content', label: 'Content', icon: Barcode },
                  { key: 'design', label: 'Design', icon: Palette },
                ].map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key as any)}
                    className={`flex items-center gap-2 flex-shrink-0 px-3 md:px-4 py-2 font-medium border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === key 
                        ? 'border-blue-500 text-blue-600' 
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Icon size={16} />
                    {label}
                  </button>
                ))}
              </div>

              <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
                {/* Settings Panel */}
                <div className="space-y-4 md:space-y-6">
                  {activeTab === 'content' && (
                    <div className="space-y-4">
                      {/* Text Input */}
                      <div>
                        <label className="text-toolnest-text font-medium block mb-2">
                          Barcode Content
                        </label>
                        <input
                          type="text"
                          value={values.text}
                          onChange={(e) => handleInputChange('text', e.target.value)}
                          placeholder="Enter text or numbers for barcode..."
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      {/* Format Selection */}
                      <div>
                        <label className="text-toolnest-text font-medium block mb-2">
                          Barcode Format
                        </label>
                        <select
                          value={values.format}
                          onChange={(e) => handleInputChange('format', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="CODE128">CODE128 (Recommended)</option>
                          <option value="EAN13">EAN-13 (13 digits)</option>
                          <option value="UPC">UPC (12 digits)</option>
                          <option value="CODE39">CODE39</option>
                          <option value="ITF14">ITF-14</option>
                          <option value="MSI">MSI</option>
                          <option value="pharmacode">Pharmacode</option>
                        </select>
                        <p className="text-sm text-gray-500 mt-1">
                          {formatDescriptions[values.format as keyof typeof formatDescriptions]}
                        </p>
                      </div>

                      {/* Format Requirements */}
                      <div className="bg-blue-50 rounded-lg p-3">
                        <h4 className="font-medium text-blue-900 text-sm mb-1">Format Requirements:</h4>
                        <ul className="text-xs text-blue-700 space-y-1">
                          {values.format === 'EAN13' && <li>• Must be exactly 13 digits (0-9)</li>}
                          {values.format === 'UPC' && <li>• Must be exactly 12 digits (0-9)</li>}
                          {values.format === 'CODE39' && <li>• Supports: A-Z, 0-9, space, - . $ / + %</li>}
                          {values.format === 'ITF14' && <li>• Must be exactly 14 digits</li>}
                          {values.format === 'CODE128' && <li>• Supports all ASCII characters</li>}
                        </ul>
                      </div>
                    </div>
                  )}

                  {activeTab === 'design' && (
                    <div className="space-y-4">
                      {/* Size Controls */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-toolnest-text font-medium block mb-2 text-sm">
                            Line Width: {values.width}px
                          </label>
                          <input
                            type="range"
                            min="1"
                            max="5"
                            step="0.1"
                            value={values.width}
                            onChange={(e) => handleInputChange('width', parseFloat(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                          />
                        </div>
                        <div>
                          <label className="text-toolnest-text font-medium block mb-2 text-sm">
                            Height: {values.height}px
                          </label>
                          <input
                            type="range"
                            min="50"
                            max="200"
                            value={values.height}
                            onChange={(e) => handleInputChange('height', parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                          />
                        </div>
                      </div>

                      {/* Colors */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-toolnest-text font-medium block mb-2 text-sm">
                            Barcode Color
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={values.lineColor}
                              onChange={(e) => handleInputChange('lineColor', e.target.value)}
                              className="w-10 h-10 cursor-pointer rounded-lg border border-gray-300"
                            />
                            <input
                              value={values.lineColor}
                              onChange={(e) => handleInputChange('lineColor', e.target.value)}
                              className="flex-1 p-2 border border-gray-300 rounded-lg text-sm"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-toolnest-text font-medium block mb-2 text-sm">
                            Background
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={values.background}
                              onChange={(e) => handleInputChange('background', e.target.value)}
                              className="w-10 h-10 cursor-pointer rounded-lg border border-gray-300"
                            />
                            <input
                              value={values.background}
                              onChange={(e) => handleInputChange('background', e.target.value)}
                              className="flex-1 p-2 border border-gray-300 rounded-lg text-sm"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Text Display */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="displayValue"
                            checked={values.displayValue}
                            onChange={(e) => handleInputChange('displayValue', e.target.checked)}
                            className="rounded border-gray-300"
                          />
                          <label htmlFor="displayValue" className="text-toolnest-text font-medium text-sm">
                            Show Text Below Barcode
                          </label>
                        </div>
                        
                        {values.displayValue && (
                          <div>
                            <label className="text-toolnest-text font-medium block mb-2 text-sm">
                              Font Size: {values.fontSize}px
                            </label>
                            <input
                              type="range"
                              min="12"
                              max="30"
                              value={values.fontSize}
                              onChange={(e) => handleInputChange('fontSize', parseInt(e.target.value))}
                              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
                          </div>
                        )}
                      </div>

                      {/* Margin */}
                      <div>
                        <label className="text-toolnest-text font-medium block mb-2 text-sm">
                          Margin: {values.margin}px
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="30"
                          value={values.margin}
                          onChange={(e) => handleInputChange('margin', parseInt(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <button
                      onClick={generateBarcode}
                      disabled={isLoading}
                      className="flex items-center gap-2 flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                      className="flex-1 sm:flex-none px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                    >
                      Clear All
                    </button>
                  </div>
                </div>

                {/* Preview Panel */}
                <div className="flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-toolnest-text font-medium text-lg">Preview</label>
                    <div className="flex gap-2">
                      <button
                        onClick={shareBarcode}
                        disabled={!barcodeUrl}
                        className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Share2 size={16} />
                      </button>
                      <button
                        onClick={downloadBarcode}
                        disabled={!barcodeUrl}
                        className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Download size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 rounded-xl p-4 md:p-6 min-h-[300px] md:min-h-[400px]">
                    {barcodeUrl ? (
                      <div className="text-center w-full">
                        <div className="bg-white p-4 md:p-6 rounded-xl border-2 border-gray-200 inline-block shadow-lg mx-auto">
                          <img
                            src={barcodeUrl}
                            alt="Generated Barcode"
                            className="max-w-full h-auto"
                            style={{ 
                              maxWidth: '400px',
                              background: values.background
                            }}
                          />
                        </div>
                        
                        <div className="mt-4 md:mt-6 space-y-3 max-w-sm mx-auto">
                          <p className="text-xs md:text-sm text-toolnest-text/70">
                            Right-click to save or use download button
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 w-full">
                        <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-6 md:p-8 max-w-sm mx-auto">
                          <div className="text-gray-400 text-4xl md:text-6xl mb-3 md:mb-4">🧾</div>
                          <p className="text-gray-500 text-sm md:text-base">
                            {isLoading ? 'Generating Barcode...' : 'Enter content and generate your barcode'}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Hidden canvas for barcode generation */}
                  <canvas ref={canvasRef} className="hidden" />
                </div>
              </div>

              {/* Features Grid */}
              <div className="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                <div className="bg-blue-50 rounded-lg md:rounded-xl p-3 md:p-4 text-center">
                  <Barcode className="w-6 h-6 md:w-8 md:h-8 text-blue-600 mx-auto mb-1 md:mb-2" />
                  <h4 className="font-semibold text-blue-900 text-sm md:text-base">7+ Formats</h4>
                  <p className="text-blue-700 text-xs md:text-sm">CODE128, EAN13, UPC, CODE39</p>
                </div>
                <div className="bg-green-50 rounded-lg md:rounded-xl p-3 md:p-4 text-center">
                  <Palette className="w-6 h-6 md:w-8 md:h-8 text-green-600 mx-auto mb-1 md:mb-2" />
                  <h4 className="font-semibold text-green-900 text-sm md:text-base">Custom Design</h4>
                  <p className="text-green-700 text-xs md:text-sm">Colors, Sizes, Margins</p>
                </div>
                <div className="bg-purple-50 rounded-lg md:rounded-xl p-3 md:p-4 text-center">
                  <Download className="w-6 h-6 md:w-8 md:h-8 text-purple-600 mx-auto mb-1 md:mb-2" />
                  <h4 className="font-semibold text-purple-900 text-sm md:text-base">High Quality</h4>
                  <p className="text-purple-700 text-xs md:text-sm">PNG Format, Scalable</p>
                </div>
                <div className="bg-orange-50 rounded-lg md:rounded-xl p-3 md:p-4 text-center">
                  <Zap className="w-6 h-6 md:w-8 md:h-8 text-orange-600 mx-auto mb-1 md:mb-2" />
                  <h4 className="font-semibold text-orange-900 text-sm md:text-base">Instant</h4>
                  <p className="text-orange-700 text-xs md:text-sm">Real-time Generation</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}