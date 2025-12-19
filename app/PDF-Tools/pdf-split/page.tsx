'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Download, Upload, FileText, Trash2, 
  Share2, CheckCheck, Scissors, Eye, EyeOff,
  Plus, Minus, Settings, Zap, Copy, Split,
  ChevronUp, ChevronDown, Lock, Shield, Sparkles, Clock,
  FileDown, Scissors as ScissorsIcon, Layers
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

interface SplitRange {
  id: string;
  start: number;
  end: number;
  name: string;
}

interface SplitResult {
  url: string;
  name: string;
  size: number;
  pages: number;
}

export default function PDFSplit() {
  const [pdfFile, setPdfFile] = useState<PDFFile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [splitResults, setSplitResults] = useState<SplitResult[]>([]);
  const [copied, setCopied] = useState(false);
  const [splitMode, setSplitMode] = useState<'range' | 'single' | 'even'>('range');
  const [splitRanges, setSplitRanges] = useState<SplitRange[]>([
    { id: '1', start: 1, end: 1, name: 'Part 1' }
  ]);
  const [totalPages, setTotalPages] = useState(0);
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
    { name: 'PDF Merge', path: '/PDF-Tools/pdf-merge' },
    { name: 'PDF Compressor', path: '/PDF-Tools/pdf-compressor' },
    { name: 'PDF Rotate', path: '/PDF-Tools/pdf-rotate' },
    { name: 'PDF Watermark', path: '/PDF-Tools/pdf-watermark' },
    { name: 'PDF Page Reorder', path: '/PDF-Tools/pdf-reorder' }
  ];

  const faqData = [
    {
      question: "Is my PDF secure when splitting?",
      answer: "100% secure. All splitting happens in your browser—your PDF never leaves your device. We use advanced browser-based PDF processing that keeps your sensitive documents completely private. No uploads to any server means maximum security."
    },
    {
      question: "How fast is PDF splitting?",
      answer: "Instant processing with no upload wait times. Most PDFs split in under 10 seconds. The process is 3x faster than online tools because everything processes locally on your computer without uploading files to external servers."
    },
    {
      question: "Are there watermarks on split PDFs?",
      answer: "No watermarks ever. Your split PDFs are completely clean with no branding, watermarks, or limitations. Unlike many free tools, we never add any marks to your documents—you get professional, clean output files."
    },
    {
      question: "Do I need to create an account?",
      answer: "No signup required. Use the tool immediately without registration. No email collection, no login, no personal information required. Start splitting PDFs instantly as a completely anonymous user."
    },
    {
      question: "What's the maximum PDF size I can split?",
      answer: "Unlimited splitting with no artificial size limits. While we recommend files under 100MB for optimal performance, you can split larger files as your device can handle. No restrictions on file size or page count."
    }
  ];

  const fileInputRef = useRef<HTMLInputElement>(null);

  const splitPDF = async (file: File, ranges: SplitRange[]): Promise<SplitResult[]> => {
    const arrayBuffer = await file.arrayBuffer();
    const originalPdf = await PDFDocument.load(arrayBuffer);
    const results: SplitResult[] = [];

    for (const range of ranges) {
      const newPdf = await PDFDocument.create();
      
      // Copy pages from original PDF
      for (let pageNum = range.start; pageNum <= range.end; pageNum++) {
        if (pageNum <= originalPdf.getPageCount()) {
          const [copiedPage] = await newPdf.copyPages(originalPdf, [pageNum - 1]);
          newPdf.addPage(copiedPage);
        }
      }

      const pdfBytes = await newPdf.save();
      
      const arrayBufferFromBytes = new ArrayBuffer(pdfBytes.length);
      const view = new Uint8Array(arrayBufferFromBytes);
      for (let i = 0; i < pdfBytes.length; i++) {
        view[i] = pdfBytes[i];
      }
      
      const blob = new Blob([arrayBufferFromBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      results.push({
        url,
        name: range.name,
        size: blob.size,
        pages: range.end - range.start + 1
      });
    }

    return results;
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (file.type === 'application/pdf') {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        const actualPageCount = pdfDoc.getPageCount();

        const newFile: PDFFile = {
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          size: file.size,
          pages: actualPageCount,
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

        setTotalPages(actualPageCount);
        setSplitRanges([{ 
          id: '1', 
          start: 1, 
          end: Math.min(1, actualPageCount), 
          name: 'Part 1' 
        }]);
        
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
    splitResults.forEach(result => {
      URL.revokeObjectURL(result.url);
    });
    
    setPdfFile(null);
    setSplitResults([]);
    setSplitRanges([{ id: '1', start: 1, end: 1, name: 'Part 1' }]);
  };

  const addSplitRange = () => {
    const lastRange = splitRanges[splitRanges.length - 1];
    const newStart = lastRange ? lastRange.end + 1 : 1;
    const newEnd = Math.min(newStart, totalPages);
    
    if (newStart <= totalPages) {
      setSplitRanges(prev => [
        ...prev,
        {
          id: Math.random().toString(36).substr(2, 9),
          start: newStart,
          end: newEnd,
          name: `Part ${prev.length + 1}`
        }
      ]);
    }
  };

  const removeSplitRange = (id: string) => {
    if (splitRanges.length > 1) {
      setSplitRanges(prev => prev.filter(range => range.id !== id));
    }
  };

  const updateSplitRange = (id: string, field: keyof SplitRange, value: any) => {
    setSplitRanges(prev => prev.map(range => {
      if (range.id === id) {
        const updated = { ...range, [field]: value };
        
        if (field === 'start') {
          updated.start = Math.max(1, Math.min(value, totalPages));
          if (updated.end < updated.start) {
            updated.end = updated.start;
          }
        } else if (field === 'end') {
          updated.end = Math.max(updated.start, Math.min(value, totalPages));
        }
        
        return updated;
      }
      return range;
    }));
  };

  const generateSinglePages = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push({
        id: `page-${i}`,
        start: i,
        end: i,
        name: `Page ${i}`
      });
    }
    setSplitRanges(pages);
    setSplitMode('single');
  };

  const generateEvenSplit = (parts: number) => {
    const ranges = [];
    const pagesPerPart = Math.ceil(totalPages / parts);
    
    for (let i = 0; i < parts; i++) {
      const start = i * pagesPerPart + 1;
      const end = Math.min((i + 1) * pagesPerPart, totalPages);
      
      if (start <= totalPages) {
        ranges.push({
          id: `part-${i + 1}`,
          start,
          end,
          name: `Part ${i + 1}`
        });
      }
    }
    
    setSplitRanges(ranges);
    setSplitMode('even');
  };

  const togglePageSelection = (page: number) => {
    setSelectedPages(prev => 
      prev.includes(page) 
        ? prev.filter(p => p !== page)
        : [...prev, page]
    );
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleSplit = async () => {
    if (!pdfFile) {
      alert('Please select a PDF file to split');
      return;
    }

    for (const range of splitRanges) {
      if (range.start < 1 || range.end > totalPages || range.start > range.end) {
        alert(`Invalid page range: ${range.start}-${range.end}. Please check your page numbers.`);
        return;
      }
    }

    setIsLoading(true);
    
    try {
      splitResults.forEach(result => {
        URL.revokeObjectURL(result.url);
      });

      const results = await splitPDF(pdfFile.file, splitRanges);
      setSplitResults(results);
    } catch (error) {
      console.error('Error splitting PDF:', error);
      alert('Error splitting PDF file. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const downloadSplitPDF = (index: number) => {
    if (!splitResults[index]) return;

    try {
      const result = splitResults[index];
      const link = document.createElement('a');
      link.href = result.url;
      link.download = `${pdfFile?.name.replace('.pdf', '')}-${result.name}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download error:', error);
      alert('Error downloading file. Please try again.');
    }
  };

  const downloadAll = () => {
    splitResults.forEach((result, index) => {
      setTimeout(() => {
        downloadSplitPDF(index);
      }, index * 100);
    });
  };

  const shareSplitPDF = async (index: number) => {
    if (!splitResults[index]) return;

    try {
      const result = splitResults[index];
      const message = `Check out this PDF: ${result.name} (${result.pages} pages, ${formatFileSize(result.size)})`;
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      alert('Unable to copy. Please download the PDF instead.');
    }
  };

  const handleClear = () => {
    splitResults.forEach(result => {
      URL.revokeObjectURL(result.url);
    });
    
    setPdfFile(null);
    setSplitResults([]);
    setSplitRanges([{ id: '1', start: 1, end: 1, name: 'Part 1' }]);
    setSelectedPages([]);
  };

  const estimatedSizePerPart = pdfFile ? pdfFile.size / splitRanges.length : 0;

  return (
    <>
      <Head>
        <title>PDF Split | Split PDF Instantly - 100% Private & Free | GrockTool.com</title>
        <meta name="description" content="Split PDFs instantly in your browser. 100% private - no uploads, no watermarks, no signup required. Extract pages or split into multiple PDFs securely." />
        <meta name="keywords" content="PDF split, split PDF instantly, private PDF splitter, extract PDF pages, split PDF offline, secure PDF splitter, free PDF splitter" />
        <meta property="og:title" content="PDF Split | Split PDF Instantly - 100% Private & Free" />
        <meta property="og:description" content="Split PDFs securely in your browser. No uploads, no watermarks, completely private. Extract specific pages or split into multiple files." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PDF Split - 100% Private & Instant" />
        <meta name="twitter:description" content="Split PDFs in your browser. No uploads, no watermarks, completely secure." />
        <link rel="canonical" href="https://grocktool.com/PDF-Tools/pdf-split" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "PDF Split Tool - Private & Instant",
            "applicationCategory": "PDFApplication",
            "operatingSystem": "Any",
            "description": "Split PDFs instantly in your browser with 100% privacy. Extract pages, split by ranges, or divide evenly. No uploads, no watermarks.",
            "url": "https://grocktool.com/PDF-Tools/pdf-split",
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
              "Multiple split modes",
              "Custom page ranges",
              "Batch download"
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
                  Split PDFs Instantly
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
                      <p className="text-foreground font-medium mb-2">Select PDF file to split</p>
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
                      <div className="relative">
                        <FileText size={24} className="text-red-500" />
                        <div className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full p-0.5">
                          <Lock size={10} />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-foreground">{pdfFile.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {formatFileSize(pdfFile.size)} • {pdfFile.pages} pages
                        </div>
                      </div>
                      <button
                        onClick={removeFile}
                        className="p-2 rounded hover:bg-red-500/10 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
                        title="Remove file"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Split Options */}
                {pdfFile && (
                  <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                      <Settings size={18} className="text-foreground" />
                      <label className="block text-sm font-medium text-foreground">
                        Split Configuration
                      </label>
                    </div>

                    <div className="space-y-4">
                      {/* Split Mode Selection */}
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Split Method
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          <button
                            onClick={() => setSplitMode('range')}
                            className={`p-3 rounded-lg border text-center transition-all ${
                              splitMode === 'range'
                                ? 'border-accent bg-accent text-accent-foreground shadow-sm'
                                : 'border-border bg-secondary/20 text-foreground hover:border-accent/50 hover:shadow-sm'
                            }`}
                          >
                            <div className="text-xs font-medium">Custom Range</div>
                          </button>
                          <button
                            onClick={() => {
                              setSplitMode('single');
                              generateSinglePages();
                            }}
                            className={`p-3 rounded-lg border text-center transition-all ${
                              splitMode === 'single'
                                ? 'border-accent bg-accent text-accent-foreground shadow-sm'
                                : 'border-border bg-secondary/20 text-foreground hover:border-accent/50 hover:shadow-sm'
                            }`}
                          >
                            <div className="text-xs font-medium">Single Pages</div>
                          </button>
                          <button
                            onClick={() => setSplitMode('even')}
                            className={`p-3 rounded-lg border text-center transition-all ${
                              splitMode === 'even'
                                ? 'border-accent bg-accent text-accent-foreground shadow-sm'
                                : 'border-border bg-secondary/20 text-foreground hover:border-accent/50 hover:shadow-sm'
                            }`}
                          >
                            <div className="text-xs font-medium">Even Split</div>
                          </button>
                        </div>
                      </div>

                      {/* Even Split Options */}
                      {splitMode === 'even' && (
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Split Into Equal Parts
                          </label>
                          <div className="grid grid-cols-4 gap-2">
                            {[2, 3, 4, 5].map(parts => (
                              <button
                                key={parts}
                                onClick={() => generateEvenSplit(parts)}
                                className="p-3 rounded-lg border border-border bg-secondary/20 text-foreground hover:border-accent/50 hover:bg-secondary/30 transition-all text-sm shadow-sm hover:shadow"
                              >
                                {parts} Parts
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Page Range Inputs */}
                      {splitMode === 'range' && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <label className="block text-sm font-medium text-foreground">
                              Custom Page Ranges
                            </label>
                            <button
                              onClick={addSplitRange}
                              disabled={splitRanges.length >= totalPages}
                              className="flex items-center gap-1 px-3 py-1 bg-secondary text-secondary-foreground rounded-lg text-sm hover:bg-secondary/80 transition-colors disabled:opacity-50 shadow-sm"
                            >
                              <Plus size={14} />
                              Add Range
                            </button>
                          </div>

                          <div className="space-y-2 max-h-60 overflow-y-auto">
                            {splitRanges.map((range, index) => (
                              <div key={range.id} className="flex items-center gap-2 p-3 bg-secondary/20 rounded-lg border border-border">
                                <div className="flex-1 grid grid-cols-2 gap-2">
                                  <div>
                                    <label className="block text-xs text-foreground mb-1">Start Page</label>
                                    <input
                                      type="number"
                                      min="1"
                                      max={totalPages}
                                      value={range.start}
                                      onChange={(e) => updateSplitRange(range.id, 'start', parseInt(e.target.value) || 1)}
                                      className="w-full p-2 bg-input border border-border rounded text-sm focus:ring-1 focus:ring-ring focus:border-ring"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-xs text-foreground mb-1">End Page</label>
                                    <input
                                      type="number"
                                      min="1"
                                      max={totalPages}
                                      value={range.end}
                                      onChange={(e) => updateSplitRange(range.id, 'end', parseInt(e.target.value) || 1)}
                                      className="w-full p-2 bg-input border border-border rounded text-sm focus:ring-1 focus:ring-ring focus:border-ring"
                                    />
                                  </div>
                                </div>
                                <div className="flex items-center gap-1">
                                  <input
                                    type="text"
                                    value={range.name}
                                    onChange={(e) => updateSplitRange(range.id, 'name', e.target.value)}
                                    className="w-20 p-2 bg-input border border-border rounded text-sm focus:ring-1 focus:ring-ring focus:border-ring"
                                    placeholder="Name"
                                  />
                                  {splitRanges.length > 1 && (
                                    <button
                                      onClick={() => removeSplitRange(range.id)}
                                      className="p-2 rounded hover:bg-red-500/10 hover:text-red-600 transition-colors"
                                    >
                                      <Minus size={14} />
                                    </button>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Page Selection Grid */}
                      {(splitMode === 'single' || splitMode === 'range') && totalPages > 0 && (
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-medium text-foreground">
                              Page Preview (1-{totalPages})
                            </label>
                            <div className="text-xs text-muted-foreground">
                              {selectedPages.length} pages selected
                            </div>
                          </div>
                          <div className="grid grid-cols-5 sm:grid-cols-8 gap-2 max-h-40 overflow-y-auto p-1">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                              <button
                                key={page}
                                onClick={() => togglePageSelection(page)}
                                className={`p-2 rounded border text-xs transition-all ${
                                  selectedPages.includes(page)
                                    ? 'border-accent bg-accent text-accent-foreground shadow-sm'
                                    : 'border-border bg-secondary/20 text-foreground hover:border-accent/50 hover:shadow-sm'
                                }`}
                              >
                                {page}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Quick Stats */}
                {pdfFile && (
                  <div className="bg-card rounded-xl border border-border p-4 shadow-sm">
                    <div className="grid grid-cols-4 gap-2 text-center">
                      <div className="p-2">
                        <div className="text-lg font-bold text-foreground">{splitRanges.length}</div>
                        <div className="text-xs text-muted-foreground">Outputs</div>
                      </div>
                      <div className="p-2">
                        <div className="text-lg font-bold text-foreground">{totalPages}</div>
                        <div className="text-xs text-muted-foreground">Pages</div>
                      </div>
                      <div className="p-2">
                        <div className="text-lg font-bold text-foreground">{formatFileSize(pdfFile.size)}</div>
                        <div className="text-xs text-muted-foreground">Size</div>
                      </div>
                      <div className="p-2">
                        <div className="text-lg font-bold text-foreground">
                          {formatFileSize(estimatedSizePerPart)}
                        </div>
                        <div className="text-xs text-muted-foreground">Avg/Part</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons - Improved CTAs */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleSplit}
                    disabled={isLoading || !pdfFile || splitRanges.length === 0}
                    className="flex items-center justify-center gap-2 flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                        Splitting Securely...
                      </>
                    ) : (
                      <>
                        <Scissors size={18} />
                        {`Split into ${splitRanges.length} Parts`}
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleClear}
                    className="flex-1 sm:flex-none px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-sm font-medium shadow-sm"
                  >
                    Clear All
                  </button>
                </div>
              </div>

              {/* Right Panel - Preview & Results */}
              <div className="space-y-6">
                {/* Benefits Card - New Addition */}
                <div className="rounded-xl border border-blue-200 dark:border-blue-800 p-6 shadow-sm">
                  <h3 className="text-sm font-medium text-foreground mb-4 flex items-center gap-2">
                    <Sparkles size={16} className="text-blue-600" />
                    Why Split With Us?
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
                        <div className="text-xs text-muted-foreground">No upload wait time. Split instantly in browser.</div>
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
                      {splitResults.length > 0 ? 'Split Results Ready' : 'Preview & Results'}
                    </label>
                    {splitResults.length > 0 && (
                      <button
                        onClick={downloadAll}
                        className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg text-sm hover:from-green-700 hover:to-emerald-700 transition-all shadow-sm hover:shadow"
                      >
                        <Download size={14} />
                        Download All
                      </button>
                    )}
                  </div>

                  <div className="flex-1 min-h-[300px]">
                    {splitResults.length > 0 ? (
                      <div className="space-y-4">
                        <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                          <div className="flex items-center justify-center gap-2 text-green-600 mb-2">
                            <CheckCheck size={20} />
                            <span className="font-semibold">Split Successful!</span>
                          </div>
                          <p className="text-sm text-green-600 text-center">
                            PDF has been split into {splitResults.length} parts securely
                          </p>
                          <div className="text-xs text-green-600/80 mt-2 flex items-center justify-center gap-2">
                            <Lock size={10} />
                            <span>100% private • No watermarks added</span>
                          </div>
                        </div>

                        <div className="space-y-3 max-h-60 overflow-y-auto">
                          {splitResults.map((result, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg border border-border hover:bg-secondary/30 transition-colors">
                              <div className="flex items-center gap-3">
                                <div className="relative">
                                  <FileText size={20} className="text-blue-500" />
                                  <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-0.5">
                                    <Lock size={8} />
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-foreground">
                                    {result.name}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {result.pages} pages • {formatFileSize(result.size)}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => downloadSplitPDF(index)}
                                  className="p-2 rounded hover:bg-accent hover:text-accent-foreground transition-colors shadow-sm hover:shadow"
                                  title="Download Clean PDF"
                                >
                                  <Download size={16} />
                                </button>
                                <button
                                  onClick={() => shareSplitPDF(index)}
                                  className="p-2 rounded hover:bg-secondary transition-colors shadow-sm hover:shadow"
                                  title="Share Securely"
                                >
                                  {copied ? <CheckCheck size={16} /> : <Share2 size={16} />}
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : pdfFile ? (
                      <div className="flex flex-col items-center justify-center h-full text-center py-8">
                        <div className="relative mb-4">
                          <Split className="w-12 h-12 text-muted-foreground" />
                          <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-1">
                            <Lock size={10} />
                          </div>
                        </div>
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <Zap size={20} className="text-muted-foreground" />
                          <p className="text-foreground font-medium">Ready to Split Securely</p>
                        </div>
                        <p className="text-muted-foreground text-sm mb-4">
                          Configure split options and click "Split into {splitRanges.length} Parts"
                        </p>
                        {splitRanges.length > 0 && (
                          <div className="mt-4 p-3 bg-secondary/20 rounded-lg border border-border w-full">
                            <div className="text-xs text-foreground font-medium mb-2 flex items-center gap-2">
                              <Eye size={12} />
                              Split Preview:
                            </div>
                            <div className="space-y-1 text-xs text-muted-foreground">
                              {splitRanges.map((range, index) => (
                                <div key={range.id} className="flex items-center gap-2">
                                  <div className="bg-blue-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                                    {index + 1}
                                  </div>
                                  {range.name}: Pages {range.start} - {range.end}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-center py-8">
                        <div className="relative mb-4">
                          <FileText className="w-12 h-12 text-muted-foreground" />
                          <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-1">
                            <Lock size={10} />
                          </div>
                        </div>
                        <p className="text-foreground font-medium mb-2">Upload PDF File Securely</p>
                        <p className="text-muted-foreground text-sm mb-4">
                          Select a PDF file to split with 100% privacy
                        </p>
                        <div className="text-xs text-green-600 flex items-center justify-center gap-1">
                          <Shield size={10} />
                          <span>All processing happens in your browser</span>
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
                      <span className="text-foreground">Instant Split</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-purple-500/10 rounded">
                      <Shield size={14} className="text-purple-600" />
                      <span className="text-foreground">No Watermarks</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-orange-500/10 rounded">
                      <Layers size={14} className="text-orange-600" />
                      <span className="text-foreground">Multiple Modes</span>
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
                      <ScissorsIcon size={20} className="text-blue-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Secure PDF Splitting - How It Works</h2>
                  </div>
                  {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.whatItDoes && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      This PDF split tool divides large documents into smaller files while keeping everything 100% private in your browser. Extract specific pages, split by custom ranges, or divide evenly into parts—all without ever uploading your sensitive documents to external servers.
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
                        <p className="text-sm text-muted-foreground">3x faster than traditional tools. No upload wait times—split PDFs instantly.</p>
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
                    <h2 className="text-xl font-bold text-foreground">When to Use PDF Split</h2>
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
                            <span className="text-accent mt-0.5">•</span>
                            <span>Split large reports into chapters for different departments</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-accent mt-0.5">•</span>
                            <span>Extract specific pages from contracts for legal review</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-accent mt-0.5">•</span>
                            <span>Divide financial statements into monthly/quarterly sections</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">🎓 Academic & Personal</h3>
                        <ul className="space-y-1 text-muted-foreground text-sm">
                          <li className="flex items-start gap-2">
                            <span className="text-accent mt-0.5">•</span>
                            <span>Extract specific chapters from e-books or research papers</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-accent mt-0.5">•</span>
                            <span>Split scanned documents into individual pages for organization</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-accent mt-0.5">•</span>
                            <span>Divide large manuals into manageable sections for training</span>
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
                              <div className="font-medium text-foreground">Upload Securely</div>
                              <div className="text-sm text-muted-foreground">Select PDF. Files stay on your device.</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                            <div>
                              <div className="font-medium text-foreground">Configure Split</div>
                              <div className="text-sm text-muted-foreground">Choose method, set ranges, preview.</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                            <div>
                              <div className="font-medium text-foreground">Download Clean Files</div>
                              <div className="text-sm text-muted-foreground">Get split PDFs with no watermarks.</div>
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
                            <span>Use "Single Pages" mode to extract individual pages</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-accent/20 p-1 rounded mt-0.5">
                              <Eye size={12} className="text-accent" />
                            </div>
                            <span>Preview page selection before splitting</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-accent/20 p-1 rounded mt-0.5">
                              <FileDown size={12} className="text-accent" />
                            </div>
                            <span>Use "Download All" for batch downloading multiple files</span>
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