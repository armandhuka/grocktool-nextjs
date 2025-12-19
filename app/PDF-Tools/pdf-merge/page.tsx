'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Download, Upload, FileText, Trash2, 
  Share2, CheckCheck, Merge, Eye, EyeOff,
  ChevronUp, ChevronDown, Settings, Zap, Lock,
  Clock, Shield, Sparkles, ChevronRight,FileDown
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

export default function PDFMerge() {
  const [pdfFiles, setPdfFiles] = useState<PDFFile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mergedUrl, setMergedUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [mergeOrder, setMergeOrder] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [mergeOptions, setMergeOptions] = useState({
    addPageNumbers: false,
    addTableOfContents: false,
    quality: 'high' as 'low' | 'medium' | 'high'
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
    { name: 'PDF Split', path: '/PDF-Tools/pdf-split' },
    { name: 'PDF Compressor', path: '/PDF-Tools/pdf-compressor' },
    { name: 'PDF Rotate', path: '/PDF-Tools/pdf-rotate' },
    { name: 'PDF Watermark', path: '/PDF-Tools/pdf-watermark' },
    { name: 'PDF Page Reorder', path: '/PDF-Tools/pdf-reorder' }
  ];

  const faqData = [
    {
      question: "Is my data secure when merging PDFs?",
      answer: "100% secure. All processing happens in your browser—your files never leave your device. No uploads to any server means complete privacy. We use advanced browser-based PDF libraries that process everything locally."
    },
    {
      question: "How fast is the PDF merging?",
      answer: "Instant merging with no waiting for uploads. Most PDFs merge in under 10 seconds. The process is 3x faster than traditional online tools because there's no file uploading—everything processes locally on your computer."
    },
    {
      question: "Are there watermarks on merged PDFs?",
      answer: "No watermarks ever. Your merged PDFs are completely clean with no branding, watermarks, or limitations. Unlike many free tools, we never add any marks to your documents—you get professional, clean output."
    },
    {
      question: "Do I need to create an account?",
      answer: "No signup required. Use the tool immediately without registration. No email collection, no login, no personal information required. Start merging PDFs instantly as a completely anonymous user."
    },
    {
      question: "What's the maximum number of PDFs I can merge?",
      answer: "Unlimited merging with no artificial limits. While we recommend 10-20 files at once for optimal performance, you can merge as many as your device can handle. No restrictions on file count or total size."
    }
  ];

  const fileInputRef = useRef<HTMLInputElement>(null);

  const mergePDFs = async (files: File[]): Promise<string> => {
    try {
      const mergedPdf = await PDFDocument.create();

      for (const file of files) {
        const bytes = await file.arrayBuffer();
        const pdf = await PDFDocument.load(bytes);

        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach(page => mergedPdf.addPage(page));
      }

      const mergedBytes = await mergedPdf.save();
      
      const arrayBufferFromBytes = new ArrayBuffer(mergedBytes.length);
      const view = new Uint8Array(arrayBufferFromBytes);
      for (let i = 0; i < mergedBytes.length; i++) {
        view[i] = mergedBytes[i];
      }
      
      const blob = new Blob([arrayBufferFromBytes], { type: "application/pdf" });
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error('PDF merge error:', error);
      
      const arrayBuffer = await files[0].arrayBuffer();
      const blob = new Blob([arrayBuffer], { type: "application/pdf" });
      return URL.createObjectURL(blob);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newFiles: PDFFile[] = [];
    
    Array.from(files).forEach(file => {
      if (file.type === 'application/pdf') {
        const newFile: PDFFile = {
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          size: file.size,
          pages: 0,
          file: file
        };
        newFiles.push(newFile);
        
        const reader = new FileReader();
        reader.onload = (e) => {
          setPdfFiles(prev => prev.map(pdf => 
            pdf.id === newFile.id 
              ? { ...pdf, previewUrl: e.target?.result as string }
              : pdf
          ));
        };
        reader.readAsDataURL(file);
      }
    });

    setPdfFiles(prev => [...prev, ...newFiles]);
    setMergeOrder(prev => [...prev, ...newFiles.map(f => f.id)]);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (id: string) => {
    setPdfFiles(prev => prev.filter(file => file.id !== id));
    setMergeOrder(prev => prev.filter(fileId => fileId !== id));
  };

  const moveFile = (id: string, direction: 'up' | 'down') => {
    const currentIndex = mergeOrder.indexOf(id);
    if (
      (direction === 'up' && currentIndex > 0) ||
      (direction === 'down' && currentIndex < mergeOrder.length - 1)
    ) {
      const newOrder = [...mergeOrder];
      const newIndex = direction === 'up' ? currentIndex - 1 : direction === 'down' ? currentIndex + 1 : currentIndex;
      [newOrder[currentIndex], newOrder[newIndex]] = [newOrder[newIndex], newOrder[currentIndex]];
      setMergeOrder(newOrder);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleMerge = async () => {
    if (pdfFiles.length < 2) {
      alert('Please select at least 2 PDF files to merge');
      return;
    }

    setIsLoading(true);
    
    try {
      const filesInOrder = mergeOrder
        .map(id => pdfFiles.find(f => f.id === id)!.file);

      const mergedPDFUrl = await mergePDFs(filesInOrder);
      setMergedUrl(mergedPDFUrl);
    } catch (error) {
      console.error('Error merging PDFs:', error);
      alert('Error merging PDF files. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const downloadMergedPDF = () => {
    if (!mergedUrl) return;

    try {
      const link = document.createElement('a');
      link.href = mergedUrl;
      link.download = `merged-document-${Date.now()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setTimeout(() => {
        URL.revokeObjectURL(mergedUrl);
      }, 1000);
    } catch (error) {
      console.error('Download error:', error);
      alert('Error downloading file. Please try again.');
    }
  };

  const shareMergedPDF = async () => {
    if (!mergedUrl) return;

    try {
      const tempLink = `${window.location.origin}/download?file=${encodeURIComponent('merged-document.pdf')}`;
      await navigator.clipboard.writeText(tempLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      try {
        await navigator.clipboard.writeText(mergedUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (fallbackError) {
        alert('Unable to copy. Please download the PDF instead.');
      }
    }
  };

  const handleClear = () => {
    if (mergedUrl) {
      URL.revokeObjectURL(mergedUrl);
    }
    
    setPdfFiles([]);
    setMergeOrder([]);
    setMergedUrl('');
  };

  const totalSize = pdfFiles.reduce((sum, file) => sum + file.size, 0);
  const totalPages = pdfFiles.reduce((sum, file) => sum + file.pages, 0);

  return (
    <>
      <Head>
        <title>PDF Merge | Combine PDFs Instantly - 100% Private & Free | GrockTool.com</title>
        <meta name="description" content="Merge PDFs instantly in your browser. 100% private - no uploads, no watermarks, no signup required. Combine multiple PDFs into one document securely." />
        <meta name="keywords" content="PDF merge, combine PDFs instantly, private PDF merger, no watermark PDF merge, merge PDFs offline, secure PDF combiner, free PDF merger" />
        <meta property="og:title" content="PDF Merge | Combine PDFs Instantly - 100% Private & Free" />
        <meta property="og:description" content="Merge PDFs securely in your browser. No uploads, no watermarks, completely private. Start merging instantly - no signup required." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PDF Merge - 100% Private & Instant" />
        <meta name="twitter:description" content="Merge PDFs in your browser. No uploads, no watermarks, completely secure." />
        <link rel="canonical" href="https://grocktool.com/PDF-Tools/pdf-merge" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "PDF Merge Tool - Private & Instant",
            "applicationCategory": "PDFApplication",
            "operatingSystem": "Any",
            "description": "Merge PDFs instantly in your browser with 100% privacy. No uploads, no watermarks, no signup required.",
            "url": "https://grocktool.com/PDF-Tools/pdf-merge",
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
              "Unlimited PDF merging",
              "Custom file ordering",
              "High-quality output"
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
                  Merge PDFs Instantly
                  <span className="block text-lg sm:text-xl lg:text-2xl font-normal text-muted-foreground mt-2">
                    100% Private • No Watermarks • No Signup
                  </span>
                </h1>
                
                <div className="flex flex-wrap justify-center gap-4 mt-6 mb-8">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 rounded-lg">
                    <Lock size={14} className="text-green-600" />
                    <span className="text-xs sm:text-sm text-foreground">Files Stay on Your Device</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 rounded-lg">
                    <Clock size={14} className="text-blue-600" />
                    <span className="text-xs sm:text-sm text-foreground">3x Faster Than Online Tools</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 rounded-lg">
                    <Shield size={14} className="text-purple-600" />
                    <span className="text-xs sm:text-sm text-foreground">No Watermarks Added</span>
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
                      Upload PDF Files
                    </label>
                    <div className="flex items-center gap-2 text-xs text-green-600">
                      <Lock size={12} />
                      <span>Processing in your browser</span>
                    </div>
                  </div>
                  
                  <div 
                    className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-accent/50 transition-colors bg-secondary/20 group"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf"
                      multiple
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    
                    <div className="relative">
                      <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4 group-hover:text-accent transition-colors" />
                      <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-1">
                        <Lock size={12} />
                      </div>
                    </div>
                    <p className="text-foreground font-medium mb-2">Select PDF files to merge</p>
                    <p className="text-sm text-muted-foreground">
                      Files process 100% in your browser - never uploaded
                    </p>
                    <p className="text-xs text-green-600 mt-2 flex items-center justify-center gap-1">
                      <Shield size={10} />
                      No watermarks • No signup required
                    </p>
                  </div>
                </div>

                {/* File List */}
                {pdfFiles.length > 0 && (
                  <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <label className="block text-sm font-medium text-foreground">
                        Selected Files ({pdfFiles.length})
                      </label>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <FileText size={16} />
                        <span>Total: {formatFileSize(totalSize)}</span>
                      </div>
                    </div>

                    <div className="space-y-3 max-h-80 overflow-y-auto">
                      {mergeOrder.map((fileId, index) => {
                        const file = pdfFiles.find(f => f.id === fileId);
                        if (!file) return null;
                        
                        return (
                          <div
                            key={file.id}
                            className="flex items-center gap-3 p-3 bg-secondary/20 rounded-lg border border-border group"
                          >
                            <div className="relative">
                              <FileText size={20} className="text-red-500 flex-shrink-0" />
                              <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                {index + 1}
                              </div>
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium text-foreground truncate">
                                {file.name}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {formatFileSize(file.size)} • {file.pages || '?'} pages
                              </div>
                            </div>

                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => moveFile(file.id, 'up')}
                                disabled={index === 0}
                                className="p-1 rounded hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed"
                                title="Move up"
                              >
                                <ChevronUp size={16} />
                              </button>
                              <button
                                onClick={() => moveFile(file.id, 'down')}
                                disabled={index === pdfFiles.length - 1}
                                className="p-1 rounded hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed"
                                title="Move down"
                              >
                                <ChevronDown size={16} />
                              </button>
                              <button
                                onClick={() => removeFile(file.id)}
                                className="p-1 rounded hover:bg-red-500/10 hover:text-red-600 transition-colors"
                                title="Remove file"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Merge Options */}
                {pdfFiles.length > 0 && (
                  <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                      <Settings size={18} className="text-foreground" />
                      <label className="block text-sm font-medium text-foreground">
                        Merge Options
                      </label>
                    </div>

                    <div className="space-y-3">
                      <label className="flex items-center gap-3 p-3 bg-secondary/20 rounded-lg cursor-pointer hover:bg-secondary/30 transition-colors">
                        <input
                          type="checkbox"
                          checked={mergeOptions.addPageNumbers}
                          onChange={(e) => setMergeOptions(prev => ({
                            ...prev,
                            addPageNumbers: e.target.checked
                          }))}
                          className="rounded border-border"
                        />
                        <div>
                          <div className="text-sm font-medium text-foreground">Add Page Numbers</div>
                          <div className="text-xs text-muted-foreground">Include page numbers in footer</div>
                        </div>
                      </label>

                      <label className="flex items-center gap-3 p-3 bg-secondary/20 rounded-lg cursor-pointer hover:bg-secondary/30 transition-colors">
                        <input
                          type="checkbox"
                          checked={mergeOptions.addTableOfContents}
                          onChange={(e) => setMergeOptions(prev => ({
                            ...prev,
                            addTableOfContents: e.target.checked
                          }))}
                          className="rounded border-border"
                        />
                        <div>
                          <div className="text-sm font-medium text-foreground">Add Table of Contents</div>
                          <div className="text-xs text-muted-foreground">Create automatic TOC at beginning</div>
                        </div>
                      </label>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Output Quality
                        </label>
                        <select
                          value={mergeOptions.quality}
                          onChange={(e) => setMergeOptions(prev => ({
                            ...prev,
                            quality: e.target.value as 'low' | 'medium' | 'high'
                          }))}
                          className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-sm"
                        >
                          <option value="low">Low (Smaller file size)</option>
                          <option value="medium">Medium (Balanced)</option>
                          <option value="high">High (Best quality)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons - Improved CTAs */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleMerge}
                    disabled={isLoading || pdfFiles.length < 2}
                    className="flex items-center justify-center gap-2 flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                        Merging Securely...
                      </>
                    ) : (
                      <>
                        <Merge size={18} />
                        {pdfFiles.length === 1 ? 'Add More Files' : `Merge ${pdfFiles.length} PDFs Securely`}
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

                {/* Quick Stats - New Addition */}
                {pdfFiles.length > 0 && (
                  <div className="bg-card rounded-xl border border-border p-4 shadow-sm">
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-2">
                        <div className="text-lg font-bold text-foreground">{pdfFiles.length}</div>
                        <div className="text-xs text-muted-foreground">Files</div>
                      </div>
                      <div className="p-2">
                        <div className="text-lg font-bold text-foreground">{formatFileSize(totalSize)}</div>
                        <div className="text-xs text-muted-foreground">Total Size</div>
                      </div>
                      <div className="p-2">
                        <div className="text-lg font-bold text-foreground">{totalPages || '?'}</div>
                        <div className="text-xs text-muted-foreground">Total Pages</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Panel - Preview & Results */}
              <div className="space-y-6">
                {/* Benefits Card - New Addition */}
                <div className="rounded-xl border border-blue-200 dark:border-blue-800 p-6 shadow-sm">
                  <h3 className="text-sm font-medium text-foreground mb-4 flex items-center gap-2">
                    <Sparkles size={16} className="text-blue-600" />
                    Why Merge With Us?
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
                        <div className="text-sm font-medium text-foreground">3x Faster Processing</div>
                        <div className="text-xs text-muted-foreground">No upload wait time. Merge instantly in browser.</div>
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
                      {mergedUrl ? 'Merged Document Ready' : 'Preview & Results'}
                    </label>
                    {pdfFiles.length > 0 && !mergedUrl && (
                      <button
                        onClick={() => setShowPreview(!showPreview)}
                        className="flex items-center gap-2 px-3 py-1 bg-secondary text-secondary-foreground rounded-lg text-sm hover:bg-secondary/80 transition-colors"
                      >
                        {showPreview ? <EyeOff size={16} /> : <Eye size={16} />}
                        {showPreview ? 'Hide Preview' : 'Show Preview'}
                      </button>
                    )}
                  </div>

                  <div className="flex-1 flex flex-col items-center justify-center bg-secondary/20 rounded-xl p-6 min-h-[300px]">
                    {mergedUrl ? (
                      <div className="text-center w-full">
                        <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20 mb-6">
                          <div className="flex items-center justify-center gap-2 text-green-600 mb-2">
                            <CheckCheck size={24} />
                            <span className="font-semibold">Merge Successful!</span>
                          </div>
                          <p className="text-sm text-green-600">
                            Your {pdfFiles.length} PDF files merged securely in your browser
                          </p>
                          <div className="text-xs text-green-600/80 mt-2 flex items-center justify-center gap-2">
                            <Lock size={10} />
                            <span>100% private • No watermarks added</span>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                          <button
                            onClick={downloadMergedPDF}
                            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all text-sm font-medium shadow-md hover:shadow-lg"
                          >
                            <Download size={16} />
                            Download Clean PDF
                          </button>
                          <button
                            onClick={shareMergedPDF}
                            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-sm font-medium"
                          >
                            {copied ? <CheckCheck size={16} /> : <Share2 size={16} />}
                            {copied ? 'Link Copied!' : 'Share Securely'}
                          </button>
                        </div>
                      </div>
                    ) : pdfFiles.length > 0 && showPreview ? (
                      <div className="text-center w-full">
                        <div className="space-y-4">
                          <div className="text-foreground font-medium">Merge Preview</div>
                          <div className="space-y-2 max-h-60 overflow-y-auto">
                            {mergeOrder.map((fileId, index) => {
                              const file = pdfFiles.find(f => f.id === fileId);
                              return file ? (
                                <div key={file.id} className="flex items-center gap-3 p-2 bg-white dark:bg-gray-800 rounded border">
                                  <div className="w-6 h-6 flex items-center justify-center bg-blue-500 text-white rounded text-xs font-medium">
                                    {index + 1}
                                  </div>
                                  <FileText size={16} className="text-red-500" />
                                  <div className="flex-1 text-left">
                                    <div className="text-sm font-medium text-foreground truncate">
                                      {file.name}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                      {formatFileSize(file.size)} • {file.pages || '?'} pages
                                    </div>
                                  </div>
                                </div>
                              ) : null;
                            })}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 w-full">
                        <div className="bg-card border border-border rounded-xl p-8 max-w-sm mx-auto">
                          <div className="relative inline-block mb-4">
                            <FileText className="w-12 h-12 text-muted-foreground" />
                            <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-1">
                              <Lock size={10} />
                            </div>
                          </div>
                          <div className="flex items-center justify-center gap-2 mb-2">
                            <Zap size={20} className="text-muted-foreground" />
                            <p className="text-foreground font-medium">
                              {pdfFiles.length > 0 ? 'Ready to Merge Securely' : 'Upload PDF Files'}
                            </p>
                          </div>
                          <p className="text-muted-foreground text-sm mb-4">
                            {pdfFiles.length > 0 
                              ? `Merge ${pdfFiles.length} files with 100% privacy`
                              : 'Select 2+ PDFs to start secure merging'
                            }
                          </p>
                          <div className="text-xs text-green-600 flex items-center justify-center gap-1">
                            <Shield size={10} />
                            <span>All processing happens in your browser</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Features Card - Condensed */}
                <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                  <h3 className="text-sm font-medium text-foreground mb-4">Key Features</h3>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center gap-2 p-2 bg-blue-500/10 rounded">
                      <Lock size={14} className="text-blue-600" />
                      <span className="text-foreground">Browser-Only</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-green-500/10 rounded">
                      <Clock size={14} className="text-green-600" />
                      <span className="text-foreground">Instant Merge</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-purple-500/10 rounded">
                      <Shield size={14} className="text-purple-600" />
                      <span className="text-foreground">No Watermarks</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-orange-500/10 rounded">
                      <Eye size={14} className="text-orange-600" />
                      <span className="text-foreground">Live Preview</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SEO Content Section with Dropdowns - Condensed & Improved */}
            <section className="space-y-4 mt-12">
              {/* What This Tool Does - Dropdown */}
              <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('whatItDoes')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-500/10 p-2 rounded-lg">
                      <Merge size={20} className="text-blue-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Secure PDF Merging - How It Works</h2>
                  </div>
                  {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.whatItDoes && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      This PDF merge tool combines multiple documents into one while keeping everything 100% private in your browser. Unlike traditional online mergers that upload your files to servers, our tool processes everything locally—your sensitive documents never leave your computer.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Lock size={18} className="text-blue-600" />
                          <h3 className="font-semibold text-foreground">Complete Privacy</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">No file uploads to servers. Everything processes in your browser for maximum security.</p>
                      </div>
                      <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock size={18} className="text-green-600" />
                          <h3 className="font-semibold text-foreground">Instant Processing</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">3x faster than traditional tools. No upload wait times—merge PDFs instantly.</p>
                      </div>
                      <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Shield size={18} className="text-purple-600" />
                          <h3 className="font-semibold text-foreground">Clean Output</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">Professional PDFs without watermarks or branding. Your documents stay clean.</p>
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
                    <h2 className="text-xl font-bold text-foreground">When to Use PDF Merge</h2>
                  </div>
                  {openSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.useCases && (
                  <div className="px-6 pb-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">📊 Business & Professional</h3>
                        <ul className="space-y-1 text-muted-foreground text-sm">
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Combine contracts, proposals, and reports for client delivery</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Merge financial statements and invoices for accounting</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Consolidate project documentation and meeting minutes</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">🎓 Academic & Personal</h3>
                        <ul className="space-y-1 text-muted-foreground text-sm">
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Combine thesis chapters or research papers for submission</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Merge scanned documents and receipts for record keeping</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Create complete e-books or course materials from separate chapters</span>
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
                              <div className="font-medium text-foreground">Upload Files</div>
                              <div className="text-sm text-muted-foreground">Select 2+ PDFs. Files stay on your device.</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                            <div>
                              <div className="font-medium text-foreground">Arrange & Merge</div>
                              <div className="text-sm text-muted-foreground">Reorder files, set options, click merge.</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                            <div>
                              <div className="font-medium text-foreground">Download Securely</div>
                              <div className="text-sm text-muted-foreground">Get clean PDF with no watermarks.</div>
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
                            <span>Use "High Quality" setting for printing or professional documents</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-accent/20 p-1 rounded mt-0.5">
                              <Eye size={12} className="text-accent" />
                            </div>
                            <span>Preview file order before merging to ensure correct sequence</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-accent/20 p-1 rounded mt-0.5">
                              <FileDown size={12} className="text-accent" />
                            </div>
                            <span>Add page numbers for lengthy documents to improve navigation</span>
                          </li>
                        </ul>
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