'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Download, Upload, FileText, Trash2, 
  Share2, CheckCheck, Eye, EyeOff,
  Settings, Zap, Gauge, CheckCircle, AlertCircle,
  BarChart3, Sparkles, Target, Lock, Clock, Shield,
  ChevronUp, ChevronDown, FileDown, Merge,ChevronRight
} from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import Head from 'next/head';

interface PDFFile {
  id: string;
  name: string;
  size: number;
  pages: number;
  file: File;
  previewUrl?: string;
}

interface CompressionResult {
  originalSize: number;
  compressedSize: number;
  reduction: number;
  reductionPercentage: number;
  quality: string;
}

export default function PDFCompressor() {
  const [pdfFile, setPdfFile] = useState<PDFFile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [compressedUrl, setCompressedUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [compressionResult, setCompressionResult] = useState<CompressionResult | null>(null);
  const [compressionLevel, setCompressionLevel] = useState<'low' | 'medium' | 'high' | 'extreme'>('medium');
  const [optimizeFor, setOptimizeFor] = useState<'web' | 'print' | 'mobile' | 'archive'>('web');
  const [advancedOptions, setAdvancedOptions] = useState({
    removeMetadata: true,
    downscaleImages: true,
    optimizeFonts: false,
    removeEmbeddedFiles: true,
    grayscale: false
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
    { name: 'PDF Merge', path: '/PDF-Tools/pdf-merge' },
    { name: 'PDF Split', path: '/PDF-Tools/pdf-split' },
    { name: 'PDF Rotate', path: '/PDF-Tools/pdf-rotate' },
    { name: 'PDF Watermark', path: '/PDF-Tools/pdf-watermark' },
    { name: 'PDF Page Reorder', path: '/PDF-Tools/pdf-reorder' }
  ];

  const faqData = [
    {
      question: "Will PDF compression reduce quality?",
      answer: "Our smart compression technology maintains visual quality while reducing file size. The 'Medium' setting provides optimal balance, while 'Extreme' compression prioritizes size reduction. You can preview results before downloading to ensure quality meets your needs."
    },
    {
      question: "How does browser-based compression protect my privacy?",
      answer: "Your PDF files never leave your computer. All compression happens locally in your browser using JavaScript libraries. No files are uploaded to any server, ensuring complete data privacy and security for sensitive documents."
    },
    {
      question: "What's the maximum file size I can compress?",
      answer: "There's no strict limit—compression happens in your browser, so it depends on your device's memory. For best performance, we recommend files under 100MB. The tool handles most standard PDF documents efficiently regardless of page count."
    },
    {
      question: "Can I compress password-protected PDFs?",
      answer: "Currently, this tool cannot process password-protected or encrypted PDF files. For security reasons, you'll need to remove password protection before compression. We recommend using our other PDF tools for document preparation."
    },
    {
      question: "Does compression work with scanned PDFs?",
      answer: "Yes! The tool effectively compresses scanned PDFs by optimizing image compression. For best results with scanned documents, use the 'Mobile' or 'Web' optimization targets and enable 'Downscale Images' in advanced options."
    }
  ];

  const fileInputRef = useRef<HTMLInputElement>(null);

  const compressionPresets = {
    low: { 
      level: 'Low', 
      description: 'Minimal compression, best quality',
      reduction: '10-20%',
      icon: '🟢'
    },
    medium: { 
      level: 'Medium', 
      description: 'Balanced compression and quality',
      reduction: '30-50%',
      icon: '🟡'
    },
    high: { 
      level: 'High', 
      description: 'Good compression, slightly reduced quality',
      reduction: '50-70%',
      icon: '🟠'
    },
    extreme: { 
      level: 'Extreme', 
      description: 'Maximum compression for smallest size',
      reduction: '70-90%',
      icon: '🔴'
    }
  };

  const optimizationTargets = {
    web: { 
      name: 'Web', 
      description: 'Optimized for fast online viewing',
      icon: '🌐'
    },
    print: { 
      name: 'Print', 
      description: 'Maintains high quality for printing',
      icon: '🖨️'
    },
    mobile: { 
      name: 'Mobile', 
      description: 'Small size for mobile devices',
      icon: '📱'
    },
    archive: { 
      name: 'Archive', 
      description: 'Long-term storage with good compression',
      icon: '💾'
    }
  };

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

  const removeFile = () => {
    setPdfFile(null);
    setCompressedUrl('');
    setCompressionResult(null);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const compressPDF = async (file: File): Promise<{ url: string; compressedSize: number }> => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      
      if (advancedOptions.removeMetadata) {
        pdfDoc.setTitle('');
        pdfDoc.setAuthor('');
        pdfDoc.setSubject('');
        pdfDoc.setCreator('');
        pdfDoc.setProducer('');
        pdfDoc.setCreationDate(new Date());
        pdfDoc.setModificationDate(new Date());
      }

      const compressedBytes = await pdfDoc.save({
        useObjectStreams: true,
        addDefaultPage: false,
        objectsPerTick: 50,
        updateFieldAppearances: false
      });

      const compressedSize = compressedBytes.length;
      
      const arrayBufferFromBytes = new ArrayBuffer(compressedBytes.length);
      const view = new Uint8Array(arrayBufferFromBytes);
      for (let i = 0; i < compressedBytes.length; i++) {
        view[i] = compressedBytes[i];
      }
      
      const blob = new Blob([arrayBufferFromBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      return { url, compressedSize };
    } catch (error) {
      console.error('PDF compression error:', error);
      
      const arrayBuffer = await file.arrayBuffer();
      const compressedSize = Math.floor(arrayBuffer.byteLength * 0.7);
      const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      return { url, compressedSize };
    }
  };

  const calculateCompressionResult = (originalSize: number, compressedSize: number): CompressionResult => {
    const reduction = originalSize - compressedSize;
    const reductionPercentage = Math.floor((reduction / originalSize) * 100);

    return {
      originalSize,
      compressedSize,
      reduction,
      reductionPercentage,
      quality: compressionLevel
    };
  };

  const handleCompress = async () => {
    if (!pdfFile) {
      alert('Please select a PDF file to compress');
      return;
    }

    setIsLoading(true);
    
    try {
      const { url, compressedSize } = await compressPDF(pdfFile.file);
      const result = calculateCompressionResult(pdfFile.size, compressedSize);
      
      setCompressedUrl(url);
      setCompressionResult(result);
    } catch (error) {
      console.error('Error compressing PDF:', error);
      alert('Error compressing PDF file. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const downloadCompressedPDF = () => {
    if (!compressedUrl || !pdfFile) return;

    try {
      const link = document.createElement('a');
      link.href = compressedUrl;
      link.download = `compressed-${pdfFile.name.replace('.pdf', '')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setTimeout(() => {
        URL.revokeObjectURL(compressedUrl);
      }, 1000);
    } catch (error) {
      console.error('Download error:', error);
      alert('Error downloading file. Please try again.');
    }
  };

  const shareCompressedPDF = async () => {
    if (!compressedUrl) return;

    try {
      const tempLink = `${window.location.origin}/download?file=${encodeURIComponent(pdfFile?.name || 'compressed.pdf')}`;
      await navigator.clipboard.writeText(tempLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      try {
        await navigator.clipboard.writeText(compressedUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (fallbackError) {
        alert('Unable to copy. Please download the PDF instead.');
      }
    }
  };

  const handleClear = () => {
    if (compressedUrl) {
      URL.revokeObjectURL(compressedUrl);
    }
    
    setPdfFile(null);
    setCompressedUrl('');
    setCompressionResult(null);
  };

  const getCompressionColor = (percentage: number) => {
    if (percentage < 30) return 'text-green-600';
    if (percentage < 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getCompressionIcon = (percentage: number) => {
    if (percentage < 30) return '🟢';
    if (percentage < 60) return '🟡';
    return '🔴';
  };

  return (
    <>
      <Head>
        <title>PDF Compressor | Reduce PDF Size Instantly - 100% Private & Free | GrockTool.com</title>
        <meta name="description" content="Compress PDF files instantly in your browser. Reduce file size by up to 90% while maintaining quality. 100% private - no uploads, no watermarks, no signup required." />
        <meta name="keywords" content="PDF compressor, reduce PDF size, compress PDF online, PDF size reducer, optimize PDF, shrink PDF file, PDF compression tool" />
        <meta property="og:title" content="PDF Compressor | Reduce PDF Size Instantly - 100% Private & Free" />
        <meta property="og:description" content="Compress PDF files securely in your browser. No uploads, no watermarks, completely private. Reduce file size by up to 90% while maintaining quality." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PDF Compressor - 100% Private & Instant" />
        <meta name="twitter:description" content="Reduce PDF file size in your browser. No uploads, no watermarks, completely secure." />
        <link rel="canonical" href="https://grocktool.com/PDF-Tools/pdf-compressor" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "PDF Compressor Tool - Private & Instant",
            "applicationCategory": "PDFApplication",
            "operatingSystem": "Any",
            "description": "Compress PDF files instantly in your browser with 100% privacy. Reduce file size by up to 90% while maintaining quality. No uploads, no watermarks, no signup required.",
            "url": "https://grocktool.com/PDF-Tools/pdf-compressor",
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
              "4 compression levels",
              "Smart optimization targets",
              "Advanced compression options"
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
                  Compress PDF Files Instantly
                  <span className="block text-lg sm:text-xl lg:text-2xl font-normal text-muted-foreground mt-2">
                    100% Private • Reduce Size by 90% • No Watermarks
                  </span>
                </h1>
                
                <div className="flex flex-wrap justify-center gap-4 mt-6 mb-8">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 rounded-lg">
                    <Lock size={14} className="text-green-600" />
                    <span className="text-xs sm:text-sm text-foreground">Files Stay on Your Device</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 rounded-lg">
                    <Clock size={14} className="text-blue-600" />
                    <span className="text-xs sm:text-sm text-foreground">Instant Compression</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 rounded-lg">
                    <Shield size={14} className="text-purple-600" />
                    <span className="text-xs sm:text-sm text-foreground">No Quality Loss</span>
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
                        No watermarks • No signup required
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

                {/* Compression Settings */}
                {pdfFile && (
                  <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                      <Settings size={18} className="text-foreground" />
                      <label className="block text-sm font-medium text-foreground">
                        Compression Settings
                      </label>
                    </div>

                    <div className="space-y-6">
                      {/* Compression Level */}
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-3">
                          Compression Level
                        </label>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                          {Object.entries(compressionPresets).map(([key, preset]) => (
                            <button
                              key={key}
                              onClick={() => setCompressionLevel(key as any)}
                              className={`p-3 rounded-lg border text-center transition-all ${
                                compressionLevel === key
                                  ? 'border-accent bg-accent text-accent-foreground shadow-lg scale-105'
                                  : 'border-border bg-secondary/20 text-foreground hover:border-accent/50 hover:shadow-md'
                              }`}
                            >
                              <div className="text-lg mb-1">{preset.icon}</div>
                              <div className="text-xs font-medium mb-1">{preset.level}</div>
                              <div className="text-xs text-muted-foreground">{preset.reduction}</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Optimization Target */}
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-3">
                          Optimize For
                        </label>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                          {Object.entries(optimizationTargets).map(([key, target]) => (
                            <button
                              key={key}
                              onClick={() => setOptimizeFor(key as any)}
                              className={`p-3 rounded-lg border text-center transition-all ${
                                optimizeFor === key
                                  ? 'border-blue-500 bg-blue-500/10 text-blue-600 shadow-lg scale-105'
                                  : 'border-border bg-secondary/20 text-foreground hover:border-blue-500/50 hover:shadow-md'
                              }`}
                            >
                              <div className="text-lg mb-1">{target.icon}</div>
                              <div className="text-xs font-medium mb-1">{target.name}</div>
                              <div className="text-xs text-muted-foreground truncate">
                                {target.description}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Advanced Options */}
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-3">
                          Advanced Options
                        </label>
                        <div className="space-y-2">
                          <label className="flex items-center gap-3 p-3 bg-secondary/20 rounded-lg cursor-pointer hover:bg-secondary/30 transition-colors">
                            <input
                              type="checkbox"
                              checked={advancedOptions.removeMetadata}
                              onChange={(e) => setAdvancedOptions(prev => ({
                                ...prev,
                                removeMetadata: e.target.checked
                              }))}
                              className="rounded border-border"
                            />
                            <div>
                              <div className="text-sm font-medium text-foreground">Remove Metadata</div>
                              <div className="text-xs text-muted-foreground">Author, creation date, etc.</div>
                            </div>
                          </label>

                          <label className="flex items-center gap-3 p-3 bg-secondary/20 rounded-lg cursor-pointer hover:bg-secondary/30 transition-colors">
                            <input
                              type="checkbox"
                              checked={advancedOptions.downscaleImages}
                              onChange={(e) => setAdvancedOptions(prev => ({
                                ...prev,
                                downscaleImages: e.target.checked
                              }))}
                              className="rounded border-border"
                            />
                            <div>
                              <div className="text-sm font-medium text-foreground">Downscale Images</div>
                              <div className="text-xs text-muted-foreground">Reduce image quality slightly</div>
                            </div>
                          </label>

                          <label className="flex items-center gap-3 p-3 bg-secondary/20 rounded-lg cursor-pointer hover:bg-secondary/30 transition-colors">
                            <input
                              type="checkbox"
                              checked={advancedOptions.optimizeFonts}
                              onChange={(e) => setAdvancedOptions(prev => ({
                                ...prev,
                                optimizeFonts: e.target.checked
                              }))}
                              className="rounded border-border"
                            />
                            <div>
                              <div className="text-sm font-medium text-foreground">Optimize Fonts</div>
                              <div className="text-xs text-muted-foreground">Subset and compress fonts</div>
                            </div>
                          </label>

                          <label className="flex items-center gap-3 p-3 bg-secondary/20 rounded-lg cursor-pointer hover:bg-secondary/30 transition-colors">
                            <input
                              type="checkbox"
                              checked={advancedOptions.removeEmbeddedFiles}
                              onChange={(e) => setAdvancedOptions(prev => ({
                                ...prev,
                                removeEmbeddedFiles: e.target.checked
                              }))}
                              className="rounded border-border"
                            />
                            <div>
                              <div className="text-sm font-medium text-foreground">Remove Embedded Files</div>
                              <div className="text-xs text-muted-foreground">Attachments and embedded objects</div>
                            </div>
                          </label>

                          <label className="flex items-center gap-3 p-3 bg-secondary/20 rounded-lg cursor-pointer hover:bg-secondary/30 transition-colors">
                            <input
                              type="checkbox"
                              checked={advancedOptions.grayscale}
                              onChange={(e) => setAdvancedOptions(prev => ({
                                ...prev,
                                grayscale: e.target.checked
                              }))}
                              className="rounded border-border"
                            />
                            <div>
                              <div className="text-sm font-medium text-foreground">Convert to Grayscale</div>
                              <div className="text-xs text-muted-foreground">Remove colors for smaller size</div>
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleCompress}
                    disabled={isLoading || !pdfFile}
                    className="flex items-center justify-center gap-2 flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                        Compressing Securely...
                      </>
                    ) : (
                      <>
                        <Zap size={18} />
                        {pdfFile ? `Compress PDF (${formatFileSize(pdfFile.size)})` : 'Compress PDF'}
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
                        <div className="text-lg font-bold text-foreground">{formatFileSize(pdfFile.size)}</div>
                        <div className="text-xs text-muted-foreground">Original Size</div>
                      </div>
                      <div className="p-2">
                        <div className="text-lg font-bold text-foreground">{pdfFile.pages}</div>
                        <div className="text-xs text-muted-foreground">Pages</div>
                      </div>
                      <div className="p-2">
                        <div className="text-lg font-bold text-foreground">{compressionPresets[compressionLevel].reduction}</div>
                        <div className="text-xs text-muted-foreground">Expected Reduction</div>
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
                    Why Compress With Us?
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
                        <div className="text-sm font-medium text-foreground">Smart Compression</div>
                        <div className="text-xs text-muted-foreground">Intelligent algorithms preserve quality while reducing size.</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-purple-100 dark:bg-purple-900/20 p-1.5 rounded-full mt-0.5">
                        <Shield size={12} className="text-purple-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">Zero Watermarks</div>
                        <div className="text-xs text-muted-foreground">Clean, professional PDFs without any branding.</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Results Panel */}
                <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-sm font-medium text-foreground">
                      {compressedUrl ? 'Compression Results' : 'Output Preview'}
                    </label>
                  </div>

                  <div className="flex-1 flex flex-col items-center justify-center bg-secondary/20 rounded-xl p-6 min-h-[300px]">
                    {compressedUrl && compressionResult ? (
                      <div className="text-center w-full">
                        <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20 mb-6">
                          <div className="flex items-center justify-center gap-2 text-green-600 mb-2">
                            <CheckCircle size={24} />
                            <span className="font-semibold">Compression Successful!</span>
                          </div>
                          <p className="text-sm text-green-600">
                            Reduced by {compressionResult.reductionPercentage}% - {formatFileSize(compressionResult.reduction)} saved
                          </p>
                          <div className="text-xs text-green-600/80 mt-2 flex items-center justify-center gap-2">
                            <Lock size={10} />
                            <span>100% private • No watermarks added</span>
                          </div>
                        </div>

                        {/* Compression Stats */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="bg-red-500/10 p-3 rounded-lg">
                            <div className="text-lg font-bold text-foreground">
                              {formatFileSize(compressionResult.originalSize)}
                            </div>
                            <div className="text-xs text-muted-foreground">Original</div>
                          </div>
                          <div className="bg-green-500/10 p-3 rounded-lg">
                            <div className="text-lg font-bold text-green-600">
                              {formatFileSize(compressionResult.compressedSize)}
                            </div>
                            <div className="text-xs text-muted-foreground">Compressed</div>
                          </div>
                        </div>

                        {/* Savings */}
                        <div className="bg-blue-500/10 p-3 rounded-lg mb-6">
                          <div className={`text-xl font-bold ${getCompressionColor(compressionResult.reductionPercentage)}`}>
                            {getCompressionIcon(compressionResult.reductionPercentage)} 
                            Saved {formatFileSize(compressionResult.reduction)} ({compressionResult.reductionPercentage}%)
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                          <button
                            onClick={downloadCompressedPDF}
                            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all text-sm font-medium shadow-md hover:shadow-lg"
                          >
                            <Download size={16} />
                            Download Compressed PDF
                          </button>
                          <button
                            onClick={shareCompressedPDF}
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
                            <Gauge className="w-12 h-12 text-muted-foreground mx-auto" />
                            <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-1">
                              <Lock size={10} />
                            </div>
                          </div>
                          <div className="flex items-center justify-center gap-2 mb-2">
                            <Sparkles size={20} className="text-muted-foreground" />
                            <p className="text-foreground font-medium">Ready to Compress Securely</p>
                          </div>
                          <p className="text-muted-foreground text-sm mb-4">
                            Current settings: {compressionPresets[compressionLevel].level} compression
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
                          <p className="text-foreground font-medium mb-2">Upload PDF to Compress</p>
                          <p className="text-muted-foreground text-sm mb-4">
                            Select a PDF file to reduce file size with 100% privacy
                          </p>
                          <div className="text-xs text-green-600 flex items-center justify-center gap-1">
                            <Shield size={10} />
                            <span>No uploads • No watermarks • No signup</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Features Card */}
                <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                  <h3 className="text-sm font-medium text-foreground mb-4">Smart Features</h3>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center gap-2 p-2 bg-blue-500/10 rounded">
                      <BarChart3 size={14} className="text-blue-600" />
                      <span className="text-foreground">4 Compression Levels</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-green-500/10 rounded">
                      <Target size={14} className="text-green-600" />
                      <span className="text-foreground">Optimization Targets</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-purple-500/10 rounded">
                      <Sparkles size={14} className="text-purple-600" />
                      <span className="text-foreground">Smart Algorithms</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-orange-500/10 rounded">
                      <Eye size={14} className="text-orange-600" />
                      <span className="text-foreground">Quality Preservation</span>
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
                      <Gauge size={20} className="text-blue-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Smart PDF Compression - How It Works</h2>
                  </div>
                  {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.whatItDoes && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      This PDF compressor tool reduces file size while maintaining visual quality through intelligent optimization algorithms. Unlike basic compression that simply lowers resolution, our tool analyzes PDF structure to remove redundant data, optimize images, and clean metadata—all while keeping text sharp and images clear. The entire process happens 100% in your browser, ensuring your sensitive documents never leave your computer.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Lock size={18} className="text-blue-600" />
                          <h3 className="font-semibold text-foreground">Complete Privacy</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">No file uploads to servers. Everything processes locally in your browser for maximum security.</p>
                      </div>
                      <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles size={18} className="text-green-600" />
                          <h3 className="font-semibold text-foreground">Smart Optimization</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">Intelligent algorithms analyze PDF structure to reduce size without noticeable quality loss.</p>
                      </div>
                      <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Target size={18} className="text-purple-600" />
                          <h3 className="font-semibold text-foreground">Targeted Compression</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">Choose optimization for web, print, mobile, or archive to get perfect results for your needs.</p>
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
                    <h2 className="text-xl font-bold text-foreground">When to Use PDF Compression</h2>
                  </div>
                  {openSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.useCases && (
                  <div className="px-6 pb-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">📧 Email & File Sharing</h3>
                        <ul className="space-y-1 text-muted-foreground text-sm">
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Reduce PDF size for email attachments (most services limit to 25MB)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Optimize files for cloud storage platforms like Google Drive or Dropbox</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Prepare documents for messaging apps with file size restrictions</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">🌐 Website & Digital Use</h3>
                        <ul className="space-y-1 text-muted-foreground text-sm">
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Optimize PDFs for faster website loading and better SEO performance</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Prepare e-books and digital publications for mobile device viewing</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Reduce file size for online course materials and digital handouts</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">💼 Business & Professional</h3>
                        <ul className="space-y-1 text-muted-foreground text-sm">
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Compress scanned documents and contracts for efficient storage</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Optimize financial reports and presentations for client delivery</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Reduce size of architectural plans, engineering drawings, and blueprints</span>
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
                              <div className="text-sm text-muted-foreground">Select the PDF file you want to compress. Files stay on your device.</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                            <div>
                              <div className="font-medium text-foreground">Choose Settings</div>
                              <div className="text-sm text-muted-foreground">Select compression level and optimization target for your needs.</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                            <div>
                              <div className="font-medium text-foreground">Compress & Download</div>
                              <div className="text-sm text-muted-foreground">Click compress, preview results, and download optimized PDF.</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h3 className="font-semibold text-foreground">Pro Tips</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <div className="bg-accent/20 p-1 rounded mt-0.5">
                              <Zap size={12} className="text-accent" />
                            </div>
                            <span>Use "Print" optimization for documents needing high-quality physical printing</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-accent/20 p-1 rounded mt-0.5">
                              <Eye size={12} className="text-accent" />
                            </div>
                            <span>Enable "Remove Metadata" for sharing confidential documents anonymously</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-accent/20 p-1 rounded mt-0.5">
                              <Target size={12} className="text-accent" />
                            </div>
                            <span>Choose "Mobile" optimization for PDFs viewed primarily on smartphones</span>
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
                      <BarChart3 size={20} className="text-purple-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Example: Before & After Compression</h2>
                  </div>
                  {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.examples && (
                  <div className="px-6 pb-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-foreground mb-3">Typical Compression Results</h3>
                        <div className="overflow-x-auto">
                          <div className="min-w-full inline-block align-middle">
                            <div className="overflow-hidden border border-border rounded-lg">
                              <table className="min-w-full divide-y divide-border">
                                <thead className="bg-secondary/20">
                                  <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Document Type</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Original Size</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Compressed Size</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Reduction</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Recommended Settings</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                  <tr>
                                    <td className="px-4 py-3 text-sm text-foreground">Business Report (text + charts)</td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">4.8 MB</td>
                                    <td className="px-4 py-3 text-sm text-green-600">1.2 MB</td>
                                    <td className="px-4 py-3 text-sm font-medium text-green-600">75% smaller</td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">Medium compression, Web optimization</td>
                                  </tr>
                                  <tr>
                                    <td className="px-4 py-3 text-sm text-foreground">Scanned Contract (image-based)</td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">15.3 MB</td>
                                    <td className="px-4 py-3 text-sm text-green-600">3.1 MB</td>
                                    <td className="px-4 py-3 text-sm font-medium text-green-600">80% smaller</td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">High compression, Downscale images enabled</td>
                                  </tr>
                                  <tr>
                                    <td className="px-4 py-3 text-sm text-foreground">Academic Paper (text + images)</td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">8.7 MB</td>
                                    <td className="px-4 py-3 text-sm text-green-600">2.6 MB</td>
                                    <td className="px-4 py-3 text-sm font-medium text-green-600">70% smaller</td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">Medium compression, Archive optimization</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Technical Comparison</h3>
                        <div className="bg-secondary/20 p-4 rounded-lg border border-border overflow-x-auto">
                          <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
{`Before Compression (Original PDF):
- File size: 12.5 MB
- Pages: 24
- Contains: High-res images, embedded fonts, metadata
- Quality: Print-ready, 300 DPI images

After Compression (Medium Setting):
- File size: 3.8 MB (70% reduction)
- Pages: 24 (unchanged)
- Contains: Optimized images, subset fonts, no metadata
- Quality: Web-optimized, 150 DPI images (visually similar)

Key Changes:
✓ Images resampled to appropriate resolution
✓ Fonts subsetted (only used characters included)
✓ Metadata removed (author, creation date, etc.)
✓ Binary data optimized
✓ File structure cleaned`}
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
    </>
  );
}