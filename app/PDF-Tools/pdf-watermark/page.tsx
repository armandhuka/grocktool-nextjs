'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Download, Upload, FileText, Trash2, 
  Share2, CheckCheck, Image, Type, Settings, 
  CheckCircle, Sparkles, Palette, Droplets, Layers,
  Zap, Eye, EyeOff, FileImage
} from 'lucide-react';
import { PDFDocument, rgb, degrees } from 'pdf-lib';

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

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setPdfFile({
          ...newFile,
          previewUrl: e.target?.result as string
        });
      };
      reader.readAsDataURL(file);
      
      // Reset input
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

  // Real PDF watermarking using pdf-lib - FIXED VERSION
  const addWatermarkToPDF = async (file: File): Promise<WatermarkResult> => {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const pages = pdfDoc.getPages();

    // Parse custom pages if needed
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

    // Load image if image watermark
    let imageEmbed: any = null;
    if (watermarkSettings.type === 'image' && watermarkSettings.imageFile) {
      const imageArrayBuffer = await watermarkSettings.imageFile.arrayBuffer();
      if (watermarkSettings.imageFile.type === 'image/png') {
        imageEmbed = await pdfDoc.embedPng(imageArrayBuffer);
      } else {
        imageEmbed = await pdfDoc.embedJpg(imageArrayBuffer);
      }
    }

    // Apply watermark to target pages
    targetPages.forEach(pageIndex => {
      const page = pages[pageIndex];
      const { width, height } = page.getSize();

      if (watermarkSettings.type === 'text') {
        // Text watermark
        page.drawText(watermarkSettings.text, {
          x: getTextPositionX(width, watermarkSettings.position),
          y: getTextPositionY(height, watermarkSettings.position),
          size: watermarkSettings.fontSize,
          color: hexToRgb(watermarkSettings.color, watermarkSettings.opacity),
          rotate: degrees(watermarkSettings.rotation),
          opacity: watermarkSettings.opacity
        });
      } else if (watermarkSettings.type === 'image' && imageEmbed) {
        // Image watermark
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
    
    // FIX: Convert Uint8Array to ArrayBuffer safely
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

  // Helper functions for positioning
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
      // Clean up previous result
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
                PDF Watermark
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
              Add text or image watermarks to PDF documents
              </p>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Left Panel - Controls */}
            <div className="space-y-6">
              {/* File Upload */}
              <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <label className="block text-sm font-medium text-foreground mb-4">
                  Upload PDF File
                </label>
                
                {!pdfFile ? (
                  <div 
                    className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-accent/50 transition-colors bg-secondary/20"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-foreground font-medium mb-2">Click to upload PDF file</p>
                    <p className="text-sm text-muted-foreground">
                      Select a PDF file to add watermark
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 p-4 bg-secondary/20 rounded-lg border border-border">
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
                                className={`p-2 rounded border text-xs transition-colors ${
                                  watermarkSettings.text === text
                                    ? 'border-accent bg-accent text-accent-foreground'
                                    : 'border-border bg-secondary/20 text-foreground hover:border-accent/50'
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
                                : 'border-border bg-secondary/20 text-foreground hover:border-blue-500/50 hover:shadow-md'
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
                                : 'border-border bg-secondary/20 text-foreground hover:border-green-500/50 hover:shadow-md'
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

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddWatermark}
                  disabled={isLoading || !pdfFile}
                  className="flex items-center justify-center gap-2 flex-1 px-4 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/80 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
                  ) : (
                    <Droplets size={18} />
                  )}
                  {isLoading ? 'Adding Watermark...' : 'Add Watermark'}
                </button>

                <button
                  onClick={handleClear}
                  className="flex-1 sm:flex-none px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-sm font-medium"
                >
                  Clear All
                </button>
              </div>
            </div>

            {/* Right Panel - Preview & Results */}
            <div className="space-y-6">
              {/* Stats Card */}
              {pdfFile && (
                <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                  <h3 className="text-sm font-medium text-foreground mb-4">Watermark Summary</h3>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-blue-500/10 p-3 rounded-lg">
                      <div className="text-2xl font-bold text-foreground">{pdfFile.pages}</div>
                      <div className="text-xs text-muted-foreground">Total Pages</div>
                    </div>
                    <div className="bg-green-500/10 p-3 rounded-lg">
                      <div className="text-2xl font-bold text-foreground">
                        {watermarkSettings.pages === 'all' ? pdfFile.pages : 
                         watermarkSettings.pages === 'first' ? 1 :
                         watermarkSettings.pages === 'last' ? 1 :
                         watermarkSettings.pages === 'custom' ? 'Custom' : 0}
                      </div>
                      <div className="text-xs text-muted-foreground">Pages to Mark</div>
                    </div>
                    <div className="bg-purple-500/10 p-3 rounded-lg">
                      <div className="text-lg font-bold text-foreground">
                        {watermarkSettings.type === 'text' ? 'Text' : 'Image'}
                      </div>
                      <div className="text-xs text-muted-foreground">Type</div>
                    </div>
                    <div className="bg-orange-500/10 p-3 rounded-lg">
                      <div className="text-lg font-bold text-foreground">
                        {formatFileSize(estimatedSize)}
                      </div>
                      <div className="text-xs text-muted-foreground">File Size</div>
                    </div>
                  </div>
                </div>
              )}

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

                      <div className="flex gap-3 justify-center">
                        <button
                          onClick={downloadWatermarkedPDF}
                          className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/80 transition-colors text-sm font-medium"
                        >
                          <Download size={16} />
                          Download PDF
                        </button>
                        <button
                          onClick={shareWatermarkedPDF}
                          className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-sm font-medium"
                        >
                          {copied ? <CheckCheck size={16} /> : <Share2 size={16} />}
                          {copied ? 'Copied!' : 'Share'}
                        </button>
                      </div>
                    </div>
                  ) : pdfFile ? (
                    <div className="text-center py-8 w-full">
                      <div className="bg-card border border-border rounded-xl p-8 max-w-sm mx-auto">
                        <Droplets className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <Sparkles size={20} className="text-muted-foreground" />
                          <p className="text-foreground font-medium">Ready to Watermark</p>
                        </div>
                        <p className="text-muted-foreground text-sm mb-4">
                          {watermarkSettings.type === 'text' 
                            ? `"${watermarkSettings.text}" will be added as watermark`
                            : 'Your image will be added as watermark'
                          }
                        </p>
                        <div className="text-xs text-muted-foreground">
                          Position: {positionOptions.find(p => p.value === watermarkSettings.position)?.label}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 w-full">
                      <div className="bg-card border border-border rounded-xl p-8 max-w-sm mx-auto">
                        <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-foreground font-medium mb-2">Upload PDF File</p>
                        <p className="text-muted-foreground text-sm">
                          Select a PDF file to add watermark
                        </p>
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
    </div>
  );
}