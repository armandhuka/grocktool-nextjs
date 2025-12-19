'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Download, Upload, FileText, Trash2, 
  Share2, CheckCheck, RotateCw, RotateCcw, RefreshCw,
  Settings, Zap, CheckCircle, Lock, Clock, Shield,
  Sparkles, Grid3X3, Eye, ChevronUp, ChevronDown, ChevronRight
} from 'lucide-react';
import { PDFDocument, degrees } from 'pdf-lib';
import Head from 'next/head';

interface PDFFile {
  id: string;
  name: string;
  size: number;
  pages: number;
  file: File;
  previewUrl?: string;
}

interface PageRotation {
  pageNumber: number;
  rotation: number;
}

interface RotationResult {
  url: string;
  name: string;
  size: number;
  rotatedPages: number;
}

export default function PDFRotate() {
  const [pdfFile, setPdfFile] = useState<PDFFile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rotationResult, setRotationResult] = useState<RotationResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [rotationMode, setRotationMode] = useState<'all' | 'custom'>('all');
  const [globalRotation, setGlobalRotation] = useState<number>(0);
  const [pageRotations, setPageRotations] = useState<PageRotation[]>([]);
  const [selectedPages, setSelectedPages] = useState<number[]>([]);

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
    { name: 'PDF Compressor', path: '/PDF-Tools/pdf-compressor' },
    { name: 'PDF Merge', path: '/PDF-Tools/pdf-merge' },
    { name: 'PDF Split', path: '/PDF-Tools/pdf-split' },
    { name: 'PDF Watermark', path: '/PDF-Tools/pdf-watermark' },
    { name: 'PDF Page Reorder', path: '/PDF-Tools/pdf-reorder' }
  ];

  const faqData = [
    {
      question: "Does rotating PDF pages affect the quality?",
      answer: "No quality loss occurs. PDF rotation is a metadata operation that changes orientation without altering image resolution or text clarity. The tool preserves all original content while adjusting page display orientation for better viewing."
    },
    {
      question: "Can I rotate specific pages while keeping others unchanged?",
      answer: "Yes! Use the 'Custom Rotate' mode to select individual pages and apply different rotations to each. This is perfect for correcting mixed-orientation documents where some pages are portrait and others landscape."
    },
    {
      question: "Is there a limit to the number of pages I can rotate?",
      answer: "No limits. You can rotate PDFs with any number of pages. The browser-based processing handles documents efficiently regardless of page count. All processing happens locally on your device."
    },
    {
      question: "Will rotating affect PDF text searchability?",
      answer: "Text search and selection remain fully functional after rotation. The tool performs proper PDF rotation that maintains all text layers, metadata, and interactive elements. Rotated pages remain fully accessible and searchable."
    },
    {
      question: "Can I rotate scanned PDFs or image-based documents?",
      answer: "Yes, the tool works perfectly with scanned PDFs and image-based documents. Rotation applies to all PDF content types including scanned images, maintaining image quality while correcting orientation for proper viewing."
    }
  ];

  const fileInputRef = useRef<HTMLInputElement>(null);

  const rotationOptions = [
    { degrees: 0, label: '0°', description: 'No rotation', icon: '🔄' },
    { degrees: 90, label: '90°', description: 'Quarter clockwise', icon: '↪️' },
    { degrees: 180, label: '180°', description: 'Upside down', icon: '↩️' },
    { degrees: 270, label: '270°', description: 'Quarter counter-clockwise', icon: '↩️' }
  ];

  const rotationPresets = {
    all: { 
      name: 'Rotate All', 
      description: 'Apply same rotation to all pages',
      icon: '🔄'
    },
    custom: { 
      name: 'Custom Rotate', 
      description: 'Rotate individual pages differently',
      icon: '🎛️'
    }
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (file.type === 'application/pdf') {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        const pageCount = pdfDoc.getPages().length;

        const newFile: PDFFile = {
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          size: file.size,
          pages: pageCount,
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

        const initialRotations: PageRotation[] = [];
        for (let i = 1; i <= pageCount; i++) {
          initialRotations.push({ pageNumber: i, rotation: 0 });
        }
        setPageRotations(initialRotations);
        
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } catch (error) {
        console.error('Error loading PDF:', error);
        alert('Error reading PDF file. Please try another file.');
      }
    }
  };

  const removeFile = () => {
    if (rotationResult?.url) {
      URL.revokeObjectURL(rotationResult.url);
    }
    setPdfFile(null);
    setRotationResult(null);
    setPageRotations([]);
    setSelectedPages([]);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const rotatePDF = async (file: File): Promise<RotationResult> => {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const pages = pdfDoc.getPages();
    
    let rotatedPagesCount = 0;

    pages.forEach((page, index) => {
      const pageNumber = index + 1;
      let rotation = 0;
      
      if (rotationMode === 'all') {
        rotation = globalRotation;
      } else {
        const pageRotation = pageRotations.find(pr => pr.pageNumber === pageNumber);
        rotation = pageRotation ? pageRotation.rotation : 0;
      }
      
      if (rotation !== 0) {
        page.setRotation(degrees(rotation));
        rotatedPagesCount++;
      }
    });

    const rotatedPdfBytes = await pdfDoc.save();
    
    const arrayBufferFromBytes = new ArrayBuffer(rotatedPdfBytes.length);
    const view = new Uint8Array(arrayBufferFromBytes);
    for (let i = 0; i < rotatedPdfBytes.length; i++) {
      view[i] = rotatedPdfBytes[i];
    }
    
    const blob = new Blob([arrayBufferFromBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    return {
      url,
      name: `${file.name.replace('.pdf', '')}-rotated.pdf`,
      size: blob.size,
      rotatedPages: rotatedPagesCount
    };
  };

  const handleRotate = async () => {
    if (!pdfFile) {
      alert('Please select a PDF file to rotate');
      return;
    }

    if (rotationMode === 'all' && globalRotation === 0) {
      alert('Please select a rotation angle');
      return;
    }

    if (rotationMode === 'custom') {
      const hasRotation = pageRotations.some(pr => pr.rotation !== 0);
      if (!hasRotation) {
        alert('Please apply rotations to at least one page');
        return;
      }
    }

    setIsLoading(true);
    
    try {
      if (rotationResult?.url) {
        URL.revokeObjectURL(rotationResult.url);
      }

      const result = await rotatePDF(pdfFile.file);
      setRotationResult(result);
    } catch (error) {
      console.error('Error rotating PDF:', error);
      alert('Error rotating PDF file. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const updatePageRotation = (pageNumber: number, rotation: number) => {
    setPageRotations(prev => 
      prev.map(pr => 
        pr.pageNumber === pageNumber ? { ...pr, rotation } : pr
      )
    );
  };

  const applyToSelectedPages = (rotation: number) => {
    if (selectedPages.length === 0) {
      alert('Please select pages first');
      return;
    }

    setPageRotations(prev => 
      prev.map(pr => 
        selectedPages.includes(pr.pageNumber) ? { ...pr, rotation } : pr
      )
    );
  };

  const applyToAllPages = (rotation: number) => {
    setPageRotations(prev => 
      prev.map(pr => ({ ...pr, rotation }))
    );
  };

  const togglePageSelection = (pageNumber: number) => {
    setSelectedPages(prev => 
      prev.includes(pageNumber) 
        ? prev.filter(p => p !== pageNumber)
        : [...prev, pageNumber]
    );
  };

  const selectAllPages = () => {
    if (pdfFile) {
      setSelectedPages(Array.from({ length: pdfFile.pages }, (_, i) => i + 1));
    }
  };

  const clearSelection = () => {
    setSelectedPages([]);
  };

  const downloadRotatedPDF = () => {
    if (!rotationResult) return;

    try {
      const link = document.createElement('a');
      link.href = rotationResult.url;
      link.download = rotationResult.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download error:', error);
      alert('Error downloading file. Please try again.');
    }
  };

  const shareRotatedPDF = async () => {
    if (!rotationResult) return;

    try {
      const message = `Check out this rotated PDF: ${rotationResult.name}`;
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      alert('Unable to copy. Please download the PDF instead.');
    }
  };

  const handleClear = () => {
    if (rotationResult?.url) {
      URL.revokeObjectURL(rotationResult.url);
    }
    setPdfFile(null);
    setRotationResult(null);
    setPageRotations([]);
    setSelectedPages([]);
    setGlobalRotation(0);
  };

  const getRotationIcon = (rotation: number) => {
    switch (rotation) {
      case 90: return '↪️';
      case 180: return '↩️';
      case 270: return '↩️';
      default: return '🔄';
    }
  };

  const estimatedSize = pdfFile ? pdfFile.size : 0;

  return (
    <>
      <Head>
        <title>PDF Rotate | Rotate PDF Pages Instantly - 100% Private & Free | GrockTool.com</title>
        <meta name="description" content="Rotate PDF pages instantly in your browser. Fix orientation issues, rotate specific pages or entire documents. 100% private - no uploads, no watermarks, no signup required." />
        <meta name="keywords" content="PDF rotate, rotate PDF pages, fix PDF orientation, rotate PDF online, PDF page rotation, correct PDF orientation, PDF rotation tool" />
        <meta property="og:title" content="PDF Rotate | Rotate PDF Pages Instantly - 100% Private & Free" />
        <meta property="og:description" content="Rotate PDF pages securely in your browser. No uploads, no watermarks, completely private. Fix orientation issues for entire documents or individual pages." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PDF Rotate - 100% Private & Instant" />
        <meta name="twitter:description" content="Rotate PDF pages in your browser. No uploads, no watermarks, completely secure." />
        <link rel="canonical" href="https://grocktool.com/PDF-Tools/pdf-rotate" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "PDF Rotate Tool - Private & Instant",
            "applicationCategory": "PDFApplication",
            "operatingSystem": "Any",
            "description": "Rotate PDF pages instantly in your browser with 100% privacy. Fix orientation issues, rotate specific pages or entire documents. No uploads, no watermarks, no signup required.",
            "url": "https://grocktool.com/PDF-Tools/pdf-rotate",
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
              "Rotate all pages or individual pages",
              "Multiple rotation angles (90°, 180°, 270°)",
              "Preserves PDF quality and text layers"
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
                  Rotate PDF Pages Instantly
                  <span className="block text-lg sm:text-xl lg:text-2xl font-normal text-muted-foreground mt-2">
                    100% Private • Fix Orientation • No Watermarks
                  </span>
                </h1>
                
                <div className="flex flex-wrap justify-center gap-4 mt-6 mb-8">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 rounded-lg">
                    <Lock size={14} className="text-green-600" />
                    <span className="text-xs sm:text-sm text-foreground">Files Stay on Your Device</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 rounded-lg">
                    <Clock size={14} className="text-blue-600" />
                    <span className="text-xs sm:text-sm text-foreground">Instant Rotation</span>
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

                {/* Rotation Settings */}
                {pdfFile && (
                  <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                      <Settings size={18} className="text-foreground" />
                      <label className="block text-sm font-medium text-foreground">
                        Rotation Settings
                      </label>
                    </div>

                    <div className="space-y-6">
                      {/* Rotation Mode */}
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-3">
                          Rotation Mode
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {Object.entries(rotationPresets).map(([key, preset]) => (
                            <button
                              key={key}
                              onClick={() => setRotationMode(key as 'all' | 'custom')}
                              className={`p-3 rounded-lg border text-center transition-all ${
                                rotationMode === key
                                  ? 'border-accent bg-accent text-accent-foreground shadow-lg scale-105'
                                  : 'border-border bg-secondary/20 text-foreground hover:border-accent/50 hover:shadow-md'
                              }`}
                            >
                              <div className="text-lg mb-1">{preset.icon}</div>
                              <div className="text-xs font-medium mb-1">{preset.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {preset.description}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Rotation Options */}
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-3">
                          Rotation Angle
                        </label>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                          {rotationOptions.map((option) => (
                            <button
                              key={option.degrees}
                              onClick={() => {
                                if (rotationMode === 'all') {
                                  setGlobalRotation(option.degrees);
                                } else if (selectedPages.length > 0) {
                                  applyToSelectedPages(option.degrees);
                                } else {
                                  applyToAllPages(option.degrees);
                                }
                              }}
                              className={`p-3 rounded-lg border text-center transition-all ${
                                (rotationMode === 'all' ? globalRotation === option.degrees : false)
                                  ? 'border-blue-500 bg-blue-500/10 text-blue-600 shadow-lg scale-105'
                                  : 'border-border bg-secondary/20 text-foreground hover:border-blue-500/50 hover:shadow-md'
                              }`}
                            >
                              <div className="text-lg mb-1">{option.icon}</div>
                              <div className="text-xs font-medium mb-1">{option.label}</div>
                              <div className="text-xs text-muted-foreground">
                                {option.description}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Quick Actions */}
                      {rotationMode === 'custom' && (
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-3">
                            Quick Actions
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            <button
                              onClick={selectAllPages}
                              className="flex items-center justify-center gap-2 p-3 rounded-lg border border-border bg-secondary/20 text-foreground hover:border-accent/50 hover:bg-secondary/30 transition-colors text-sm"
                            >
                              <Eye size={14} />
                              Select All Pages
                            </button>
                            <button
                              onClick={clearSelection}
                              className="flex items-center justify-center gap-2 p-3 rounded-lg border border-border bg-secondary/20 text-foreground hover:border-accent/50 hover:bg-secondary/30 transition-colors text-sm"
                            >
                              <RefreshCw size={14} />
                              Clear Selection
                            </button>
                          </div>
                          {selectedPages.length > 0 && (
                            <div className="mt-2 text-xs text-muted-foreground">
                              {selectedPages.length} page(s) selected
                            </div>
                          )}
                        </div>
                      )}

                      {/* Page Grid for Custom Rotation */}
                      {rotationMode === 'custom' && pdfFile.pages > 0 && (
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-3">
                            Page Rotation ({pdfFile.pages} pages)
                          </label>
                          <div className="grid grid-cols-5 gap-2 max-h-40 overflow-y-auto p-2 bg-secondary/20 rounded-lg border border-border">
                            {pageRotations.map((pageRotation) => (
                              <div key={pageRotation.pageNumber} className="relative">
                                <button
                                  onClick={() => togglePageSelection(pageRotation.pageNumber)}
                                  className={`w-full p-2 rounded border text-xs transition-all ${
                                    selectedPages.includes(pageRotation.pageNumber)
                                      ? 'border-accent bg-accent text-accent-foreground'
                                      : pageRotation.rotation !== 0
                                      ? 'border-blue-500 bg-blue-500/10 text-blue-600'
                                      : 'border-border bg-background text-foreground'
                                  }`}
                                >
                                  <div>Pg {pageRotation.pageNumber}</div>
                                  {pageRotation.rotation !== 0 && (
                                    <div className="text-[10px]">{pageRotation.rotation}°</div>
                                  )}
                                </button>
                                
                                <div className="absolute -top-1 -right-1 flex gap-1 opacity-0 hover:opacity-100 transition-opacity">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      const newRotation = (pageRotation.rotation + 90) % 360;
                                      updatePageRotation(pageRotation.pageNumber, newRotation);
                                    }}
                                    className="w-4 h-4 bg-blue-500 text-white rounded text-[8px] flex items-center justify-center"
                                    title="Rotate 90°"
                                  >
                                    ⟳
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Rotation Summary */}
                      <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                        <div className="flex items-center gap-2 text-blue-600 mb-1">
                          <RotateCw size={14} />
                          <span className="text-sm font-medium">Rotation Summary</span>
                        </div>
                        <div className="text-xs text-blue-600">
                          {rotationMode === 'all' ? (
                            globalRotation === 0 
                              ? 'No rotation applied to pages'
                              : `All pages will be rotated ${globalRotation}°`
                          ) : (
                            (() => {
                              const rotatedPages = pageRotations.filter(pr => pr.rotation !== 0);
                              return rotatedPages.length === 0
                                ? 'No rotation applied to pages'
                                : `${rotatedPages.length} page(s) will be rotated`;
                            })()
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons - Improved CTAs */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleRotate}
                    disabled={isLoading || !pdfFile}
                    className="flex items-center justify-center gap-2 flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                        Rotating Securely...
                      </>
                    ) : (
                      <>
                        <RotateCw size={18} />
                        {pdfFile ? `Rotate PDF (${pdfFile.pages} pages)` : 'Rotate PDF'}
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
                          {rotationMode === 'all' 
                            ? (globalRotation === 0 ? '0°' : `${globalRotation}°`)
                            : `${pageRotations.filter(pr => pr.rotation !== 0).length} pages`
                          }
                        </div>
                        <div className="text-xs text-muted-foreground">Rotation Applied</div>
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
                    Why Rotate With Us?
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
                        <div className="text-sm font-medium text-foreground">Precise Rotation</div>
                        <div className="text-xs text-muted-foreground">Multiple angle options with perfect accuracy.</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-purple-100 dark:bg-purple-900/20 p-1.5 rounded-full mt-0.5">
                        <Shield size={12} className="text-purple-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">Zero Quality Loss</div>
                        <div className="text-xs text-muted-foreground">Metadata-based rotation preserves all content quality.</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Results Panel */}
                <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-sm font-medium text-foreground">
                      {rotationResult ? 'Rotation Results' : 'Preview'}
                    </label>
                  </div>

                  <div className="flex-1 flex flex-col items-center justify-center bg-secondary/20 rounded-xl p-6 min-h-[300px]">
                    {rotationResult ? (
                      <div className="text-center w-full">
                        <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20 mb-6">
                          <div className="flex items-center justify-center gap-2 text-green-600 mb-2">
                            <CheckCircle size={24} />
                            <span className="font-semibold">Rotation Successful!</span>
                          </div>
                          <p className="text-sm text-green-600">
                            {rotationResult.rotatedPages} page(s) rotated successfully
                          </p>
                          <div className="text-xs text-green-600/80 mt-2 flex items-center justify-center gap-2">
                            <Lock size={10} />
                            <span>100% private • No quality loss</span>
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
                              {formatFileSize(rotationResult.size)}
                            </div>
                            <div className="text-xs text-muted-foreground">Rotated</div>
                          </div>
                        </div>

                        {/* Rotation Info */}
                        <div className="bg-purple-500/10 p-3 rounded-lg mb-6">
                          <div className="flex items-center justify-center gap-2 text-purple-600">
                            <RotateCw size={20} />
                            <span className="font-medium">
                              Document orientation corrected
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                          <button
                            onClick={downloadRotatedPDF}
                            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all text-sm font-medium shadow-md hover:shadow-lg"
                          >
                            <Download size={16} />
                            Download Rotated PDF
                          </button>
                          <button
                            onClick={shareRotatedPDF}
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
                            <RotateCw className="w-12 h-12 text-muted-foreground mx-auto" />
                            <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-1">
                              <Lock size={10} />
                            </div>
                          </div>
                          <div className="flex items-center justify-center gap-2 mb-2">
                            <Sparkles size={20} className="text-muted-foreground" />
                            <p className="text-foreground font-medium">Ready to Rotate Securely</p>
                          </div>
                          <p className="text-muted-foreground text-sm mb-4">
                            {rotationMode === 'all' 
                              ? 'All pages will be rotated together'
                              : 'Select pages and apply individual rotations'
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
                          <p className="text-foreground font-medium mb-2">Upload PDF to Rotate</p>
                          <p className="text-muted-foreground text-sm mb-4">
                            Select a PDF file to fix page orientation with 100% privacy
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
                  <h3 className="text-sm font-medium text-foreground mb-4">Rotation Features</h3>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center gap-2 p-2 bg-blue-500/10 rounded">
                      <RotateCw size={14} className="text-blue-600" />
                      <span className="text-foreground">Multiple Angles</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-green-500/10 rounded">
                      <Grid3X3 size={14} className="text-green-600" />
                      <span className="text-foreground">Individual Pages</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-purple-500/10 rounded">
                      <RefreshCw size={14} className="text-purple-600" />
                      <span className="text-foreground">Bulk Operations</span>
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
                      <RotateCw size={20} className="text-blue-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Smart PDF Rotation - How It Works</h2>
                  </div>
                  {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.whatItDoes && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      This PDF rotation tool corrects page orientation issues quickly and securely. Whether you need to rotate scanned documents, fix mixed-orientation PDFs, or adjust landscape/portrait pages, our tool handles everything in your browser. Unlike simple image rotation, our PDF rotation preserves text layers, searchability, and metadata while adjusting page display properties—all without quality loss or file size increase.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Lock size={18} className="text-blue-600" />
                          <h3 className="font-semibold text-foreground">Complete Privacy</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">No file uploads to servers. All rotation happens locally in your browser for maximum security.</p>
                      </div>
                      <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <RefreshCw size={18} className="text-green-600" />
                          <h3 className="font-semibold text-foreground">Flexible Rotation</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">Rotate all pages together or customize individual page orientations for mixed documents.</p>
                      </div>
                      <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Shield size={18} className="text-purple-600" />
                          <h3 className="font-semibold text-foreground">Quality Preservation</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">Metadata-based rotation ensures no quality loss—text remains sharp, images stay clear.</p>
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
                    <h2 className="text-xl font-bold text-foreground">When to Use PDF Rotation</h2>
                  </div>
                  {openSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.useCases && (
                  <div className="px-6 pb-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">🖨️ Scanned Documents & Digital Archives</h3>
                        <ul className="space-y-1 text-muted-foreground text-sm">
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Fix orientation of scanned documents where pages were scanned upside down or sideways</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Correct mixed-orientation PDFs from multi-page scanners that handle pages differently</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Adjust archival documents for proper digital viewing and printing</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">💼 Professional & Business Documents</h3>
                        <ul className="space-y-1 text-muted-foreground text-sm">
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Rotate landscape-oriented charts, tables, or blueprints for better viewing in portrait reports</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Fix contract pages that were saved with incorrect orientation during digital signing</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Adjust presentation slides or financial reports for standardized document formatting</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">🎓 Academic & Personal Use</h3>
                        <ul className="space-y-1 text-muted-foreground text-sm">
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Correct textbook or research paper pages that were digitized with mixed orientations</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Rotate photographs or illustrations within PDF portfolios for proper display</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Fix e-book pages for comfortable reading on tablets and e-readers</span>
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
                              <div className="text-sm text-muted-foreground">Select the PDF file with orientation issues. Files stay on your device.</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                            <div>
                              <div className="font-medium text-foreground">Set Rotation Options</div>
                              <div className="text-sm text-muted-foreground">Choose rotation mode and angles for all pages or individual pages.</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                            <div>
                              <div className="font-medium text-foreground">Rotate & Download</div>
                              <div className="text-sm text-muted-foreground">Apply rotation, preview results, and download correctly oriented PDF.</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h3 className="font-semibold text-foreground">Pro Tips</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <div className="bg-accent/20 p-1 rounded mt-0.5">
                              <RotateCw size={12} className="text-accent" />
                            </div>
                            <span>Use "Custom Rotate" mode for documents with mixed portrait and landscape pages</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-accent/20 p-1 rounded mt-0.5">
                              <Eye size={12} className="text-accent" />
                            </div>
                            <span>Select multiple pages at once to apply the same rotation to several pages simultaneously</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-accent/20 p-1 rounded mt-0.5">
                              <RefreshCw size={12} className="text-accent" />
                            </div>
                            <span>Rotate in 90° increments for best compatibility with PDF viewers and printers</span>
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
                      <Grid3X3 size={20} className="text-purple-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Example: Before & After Rotation</h2>
                  </div>
                  {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.examples && (
                  <div className="px-6 pb-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-foreground mb-3">Common Rotation Scenarios</h3>
                        <div className="overflow-x-auto">
                          <div className="min-w-full inline-block align-middle">
                            <div className="overflow-hidden border border-border rounded-lg">
                              <table className="min-w-full divide-y divide-border">
                                <thead className="bg-secondary/20">
                                  <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Document Type</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Original Issue</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Rotation Applied</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Result</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                  <tr>
                                    <td className="px-4 py-3 text-sm text-foreground">Scanned Contract</td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">Pages 3-5 scanned upside down (180°)</td>
                                    <td className="px-4 py-3 text-sm text-blue-600">Custom: Pages 3-5 rotated 180°</td>
                                    <td className="px-4 py-3 text-sm text-green-600">All pages now properly oriented</td>
                                  </tr>
                                  <tr>
                                    <td className="px-4 py-3 text-sm text-foreground">Financial Report</td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">Landscape charts in portrait document</td>
                                    <td className="px-4 py-3 text-sm text-blue-600">Custom: Chart pages rotated 90°</td>
                                    <td className="px-4 py-3 text-sm text-green-600">Charts readable without tilting head</td>
                                  </tr>
                                  <tr>
                                    <td className="px-4 py-3 text-sm text-foreground">Archival Photos</td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">All photos sideways (90° rotation needed)</td>
                                    <td className="px-4 py-3 text-sm text-blue-600">All: Entire PDF rotated 90°</td>
                                    <td className="px-4 py-3 text-sm text-green-600">Photos display correctly in viewers</td>
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
{`Before Rotation (Problem Document):
- Total pages: 24
- Issue: Pages 7-12 scanned sideways (90° off)
- Issue: Page 18 upside down (180° off)
- Problem: Difficult to read, requires manual rotation in viewer
- File size: 8.4 MB

Rotation Applied:
- Mode: Custom rotation
- Pages 7-12: Rotated 90° clockwise
- Page 18: Rotated 180°
- Other pages: No change (0°)

After Rotation (Corrected Document):
- Total pages: 24 (unchanged)
- All pages: Properly oriented for viewing
- Quality: No loss, text remains searchable
- File size: 8.4 MB (unchanged)
- Result: Professional, readable document

Key Benefits:
✓ All pages now display correctly in PDF viewers
✓ Text layers preserved - document remains fully searchable
✓ No quality degradation from rotation
✓ File size unchanged - efficient metadata operation
✓ Compatible with all PDF software and printers`}
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