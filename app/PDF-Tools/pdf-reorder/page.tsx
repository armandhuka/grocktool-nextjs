'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Download, Upload, FileText, Trash2, 
  Share2, CheckCheck, Settings, Zap, CheckCircle,
  Sparkles, Grid3X3, Move, GripVertical, ArrowUp, ArrowDown,
  ListOrdered, Shuffle, RotateCcw, Eye, Lock, Clock, Shield,
  ChevronUp, ChevronDown, ChevronRight
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

interface PageOrder {
  originalIndex: number;
  currentIndex: number;
  pageNumber: number;
}

interface ReorderResult {
  url: string;
  name: string;
  size: number;
  reorderedPages: number;
}

export default function PDFReorder() {
  const [pdfFile, setPdfFile] = useState<PDFFile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [reorderResult, setReorderResult] = useState<ReorderResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [pageOrders, setPageOrders] = useState<PageOrder[]>([]);
  const [selectedPages, setSelectedPages] = useState<number[]>([]);
  const [reorderMode, setReorderMode] = useState<'manual' | 'reverse' | 'custom'>('manual');

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
    { name: 'PDF Watermark', path: '/PDF-Tools/pdf-watermark' },
    { name: 'PDF Rotate', path: '/PDF-Tools/pdf-rotate' },
    { name: 'PDF Compressor', path: '/PDF-Tools/pdf-compressor' },
    { name: 'PDF Merge', path: '/PDF-Tools/pdf-merge' },
    { name: 'PDF Split', path: '/PDF-Tools/pdf-split' }
  ];

  const faqData = [
    {
      question: "Does reordering PDF pages affect the document quality?",
      answer: "No quality loss occurs. Page reordering changes only the sequence of pages, not their content. All text, images, and formatting remain exactly as in the original document, just in a different order."
    },
    {
      question: "Can I reorder specific pages while keeping others in place?",
      answer: "Yes! Use drag-and-drop to move individual pages, or select multiple pages and move them together. The tool gives you complete control over which pages move and where they go in the sequence."
    },
    {
      question: "What's the maximum number of pages I can reorder?",
      answer: "There's no practical limit. The tool can handle PDFs with hundreds or even thousands of pages. Performance remains smooth because all processing happens locally in your browser."
    },
    {
      question: "Can I save my page order and come back to it later?",
      answer: "The current page order is maintained while you work, but if you refresh the page or upload a new document, you'll need to start over. For complex reordering tasks, we recommend completing the process in one session."
    },
    {
      question: "Will reordering affect PDF bookmarks or links between pages?",
      answer: "Internal page links may break if you change page order, as they reference specific page numbers. However, the actual content and quality of each page remains intact. Bookmarks are preserved in the new order."
    }
  ];

  const fileInputRef = useRef<HTMLInputElement>(null);
  const customInputRef = useRef<HTMLInputElement>(null);

  let dragging = false;

  const reorderModes = {
    manual: { name: 'Manual Reorder', description: 'Drag and drop pages to rearrange', icon: '👆' },
    reverse: { name: 'Reverse Order', description: 'Reverse all pages automatically', icon: '🔄' },
    custom: { name: 'Custom Sequence', description: 'Enter page numbers in custom order', icon: '🎯' }
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
          setPdfFile({ ...newFile, previewUrl: e.target?.result as string });
        };
        reader.readAsDataURL(file);

        const orders: PageOrder[] = Array.from({ length: pageCount }, (_, i) => ({
          originalIndex: i,
          currentIndex: i,
          pageNumber: i + 1
        }));

        setPageOrders(orders);
        setSelectedPages([]);

        if (fileInputRef.current) fileInputRef.current.value = '';
      } catch {
        alert('Error reading PDF file');
      }
    }
  };

  const removeFile = () => {
    if (reorderResult?.url) URL.revokeObjectURL(reorderResult.url);
    setPdfFile(null);
    setReorderResult(null);
    setPageOrders([]);
    setSelectedPages([]);
  };

  const formatFileSize = (bytes: number) => {
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const reorderPDF = async (file: File): Promise<ReorderResult> => {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const newPdfDoc = await PDFDocument.create();

    let newOrder;

    if (reorderMode === 'reverse') newOrder = [...pageOrders].reverse().map(o => o.originalIndex);
    else newOrder = pageOrders.sort((a, b) => a.currentIndex - b.currentIndex).map(o => o.originalIndex);

    const copiedPages = await newPdfDoc.copyPages(pdfDoc, newOrder);
    copiedPages.forEach(p => newPdfDoc.addPage(p));

    const reorderedPdfBytes = await newPdfDoc.save();
    
    const arrayBufferFromBytes = new ArrayBuffer(reorderedPdfBytes.length);
    const view = new Uint8Array(arrayBufferFromBytes);
    for (let i = 0; i < reorderedPdfBytes.length; i++) {
      view[i] = reorderedPdfBytes[i];
    }
    
    const blob = new Blob([arrayBufferFromBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    return {
      url,
      name: `${file.name.replace('.pdf', '')}-reordered.pdf`,
      size: blob.size,
      reorderedPages: newOrder.length
    };
  };

  const handleReorder = async () => {
    if (!pdfFile) return alert('Select PDF first');
    setIsLoading(true);

    try {
      if (reorderResult?.url) URL.revokeObjectURL(reorderResult.url);
      const result = await reorderPDF(pdfFile.file);
      setReorderResult(result);
    } catch {
      alert('Error reordering PDF');
    } finally {
      setIsLoading(false);
    }
  };

  const movePage = (from: number, to: number) => {
    if (from === to) return;

    setPageOrders(prev => {
      const arr = [...prev];
      const [item] = arr.splice(from, 1);
      arr.splice(to, 0, item);
      return arr.map((o, i) => ({ ...o, currentIndex: i }));
    });
  };

  const movePageUp = (index: number) => {
    if (index > 0) movePage(index, index - 1);
  };

  const movePageDown = (index: number) => {
    if (index < pageOrders.length - 1) movePage(index, index + 1);
  };

  const reverseAllPages = () => {
    setReorderMode('reverse');
    setPageOrders(prev => {
      const reversed = [...prev].reverse();
      return reversed.map((o, i) => ({ ...o, currentIndex: i }));
    });
  };

  const resetToOriginal = () => {
    setPageOrders(prev =>
      [...prev]
        .sort((a, b) => a.originalIndex - b.originalIndex)
        .map((o, i) => ({ ...o, currentIndex: i }))
    );
  };

  const togglePageSelection = (p: number) => {
    if (selectedPages.includes(p)) setSelectedPages(prev => prev.filter(x => x !== p));
    else setSelectedPages(prev => [...prev, p]);
  };

  const selectAllPages = () => pdfFile && setSelectedPages(Array.from({ length: pdfFile.pages }, (_, i) => i + 1));
  const clearSelection = () => setSelectedPages([]);

  const moveSelectedPages = (direction: 'up' | 'down' | 'top' | 'bottom') => {
    if (selectedPages.length === 0) return;

    setPageOrders(prev => {
      let arr = [...prev];
      const selectedItems = arr.filter(o => selectedPages.includes(o.pageNumber));
      const unselectedItems = arr.filter(o => !selectedPages.includes(o.pageNumber));

      if (direction === 'top') arr = [...selectedItems, ...unselectedItems];
      if (direction === 'bottom') arr = [...unselectedItems, ...selectedItems];
      if (direction === 'up') selectedItems.forEach(item => movePage(item.currentIndex, Math.max(0, item.currentIndex - 1)));
      if (direction === 'down') [...selectedItems].reverse().forEach(item => movePage(item.currentIndex, Math.min(arr.length - 1, item.currentIndex + 1)));

      return arr.map((o, i) => ({ ...o, currentIndex: i }));
    });
  };

  const handleCustomSequence = (input: string) => {
    if (!pdfFile) return;
    
    const nums = input
      .split(',')
      .map(n => Number(n.trim()))
      .filter(n => !isNaN(n) && n >= 1 && n <= pdfFile.pages);

    if (nums.length !== pdfFile.pages)
      return alert(`Enter all ${pdfFile.pages} page numbers only once`);

    setReorderMode('custom');
    setPageOrders(prev =>
      nums.map((n, i) => {
        const orig = prev.find(o => o.pageNumber === n)!;
        return { ...orig, currentIndex: i };
      })
    );
  };

  const applyCustomSequence = () => {
    if (!customInputRef.current || !pdfFile) return;
    handleCustomSequence(customInputRef.current.value);
  };

  const downloadReorderedPDF = () => {
    if (!reorderResult) return;
    const link = document.createElement('a');
    link.href = reorderResult.url;
    link.download = reorderResult.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const shareReorderedPDF = async () => {
    if (!reorderResult) return;
    try {
      await navigator.clipboard.writeText(`Reordered PDF: ${reorderResult.name}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert('Copy failed');
    }
  };

  const handleClear = removeFile;

  const estimatedSize = pdfFile ? pdfFile.size : 0;

  const handleDragStart = (e: React.DragEvent, index: number) => {
    dragging = true;
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    dragging = false;
    const sourceIndex = Number(e.dataTransfer.getData('text/plain'));
    if (!isNaN(sourceIndex)) movePage(sourceIndex, targetIndex);
  };

  return (
    <>
      <Head>
        <title>PDF Page Reorder | Rearrange PDF Pages Instantly - 100% Private & Free | GrockTool.com</title>
        <meta name="description" content="Rearrange PDF pages instantly in your browser. Drag and drop pages, reverse order, or create custom sequences. 100% private - no uploads, no watermarks, no signup required." />
        <meta name="keywords" content="PDF page reorder, rearrange PDF pages, reorder PDF pages, change PDF page order, drag and drop PDF, PDF page organizer, PDF page sequence" />
        <meta property="og:title" content="PDF Page Reorder | Rearrange PDF Pages Instantly - 100% Private & Free" />
        <meta property="og:description" content="Rearrange PDF pages securely in your browser. No uploads, no watermarks, completely private. Drag and drop pages to create perfect document sequences." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PDF Page Reorder - 100% Private & Instant" />
        <meta name="twitter:description" content="Rearrange PDF pages in your browser. No uploads, no watermarks, completely secure." />
        <link rel="canonical" href="https://grocktool.com/PDF-Tools/pdf-reorder" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "PDF Page Reorder Tool - Private & Instant",
            "applicationCategory": "PDFApplication",
            "operatingSystem": "Any",
            "description": "Rearrange PDF pages instantly in your browser with 100% privacy. Drag and drop pages, reverse order, or create custom sequences. No uploads, no watermarks, no signup required.",
            "url": "https://grocktool.com/PDF-Tools/pdf-reorder",
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
              "Drag and drop interface",
              "Multiple reorder modes",
              "Custom page sequences"
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
                  Reorder PDF Pages Instantly
                  <span className="block text-lg sm:text-xl lg:text-2xl font-normal text-muted-foreground mt-2">
                    100% Private • Drag & Drop • No Watermarks
                  </span>
                </h1>
                
                <div className="flex flex-wrap justify-center gap-4 mt-6 mb-8">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 rounded-lg">
                    <Lock size={14} className="text-green-600" />
                    <span className="text-xs sm:text-sm text-foreground">Files Stay on Your Device</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 rounded-lg">
                    <Clock size={14} className="text-blue-600" />
                    <span className="text-xs sm:text-sm text-foreground">Instant Reordering</span>
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

                {/* Reorder Settings */}
                {pdfFile && pageOrders.length > 0 && (
                  <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                      <Settings size={18} className="text-foreground" />
                      <label className="block text-sm font-medium text-foreground">
                        Reorder Settings
                      </label>
                    </div>

                    <div className="space-y-6">
                      {/* Reorder Mode */}
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-3">
                          Reorder Mode
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                          {Object.entries(reorderModes).map(([key, mode]) => (
                            <button
                              key={key}
                              onClick={() => setReorderMode(key as any)}
                              className={`p-3 rounded-lg border text-center transition-all ${
                                reorderMode === key
                                  ? 'border-accent bg-accent text-accent-foreground shadow-lg scale-105'
                                  : 'border-border bg-secondary/20 text-foreground hover:border-accent/50 hover:shadow-md hover:bg-secondary/30'
                              }`}
                            >
                              <div className="text-lg mb-1">{mode.icon}</div>
                              <div className="text-xs font-medium mb-1">{mode.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {mode.description}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-3">
                          Quick Actions
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            onClick={reverseAllPages}
                            className="flex items-center justify-center gap-2 p-3 rounded-lg border border-border bg-secondary/20 text-foreground hover:border-accent/50 hover:bg-secondary/30 transition-colors text-sm"
                          >
                            <Shuffle size={14} />
                            Reverse All Pages
                          </button>
                          <button
                            onClick={resetToOriginal}
                            className="flex items-center justify-center gap-2 p-3 rounded-lg border border-border bg-secondary/20 text-foreground hover:border-accent/50 hover:bg-secondary/30 transition-colors text-sm"
                          >
                            <RotateCcw size={14} />
                            Reset to Original
                          </button>
                        </div>
                      </div>

                      {/* Selection Tools */}
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-3">
                          Selection Tools
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
                            <Grid3X3 size={14} />
                            Clear Selection
                          </button>
                        </div>
                        {selectedPages.length > 0 && (
                          <div className="mt-2 text-xs text-muted-foreground">
                            {selectedPages.length} page(s) selected
                          </div>
                        )}
                      </div>

                      {/* Move Selected Pages */}
                      {selectedPages.length > 0 && (
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-3">
                            Move Selected Pages
                          </label>
                          <div className="grid grid-cols-4 gap-2">
                            <button
                              onClick={() => moveSelectedPages('top')}
                              className="p-2 rounded-lg border border-border bg-secondary/20 text-foreground hover:border-accent/50 hover:bg-secondary/30 transition-colors text-xs"
                            >
                              To Top
                            </button>
                            <button
                              onClick={() => moveSelectedPages('up')}
                              className="p-2 rounded-lg border border-border bg-secondary/20 text-foreground hover:border-accent/50 hover:bg-secondary/30 transition-colors text-xs"
                            >
                              Move Up
                            </button>
                            <button
                              onClick={() => moveSelectedPages('down')}
                              className="p-2 rounded-lg border border-border bg-secondary/20 text-foreground hover:border-accent/50 hover:bg-secondary/30 transition-colors text-xs"
                            >
                              Move Down
                            </button>
                            <button
                              onClick={() => moveSelectedPages('bottom')}
                              className="p-2 rounded-lg border border-border bg-secondary/20 text-foreground hover:border-accent/50 hover:bg-secondary/30 transition-colors text-xs"
                            >
                              To Bottom
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Custom Sequence Input */}
                      {reorderMode === 'custom' && (
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Custom Page Sequence
                          </label>
                          <div className="flex gap-2">
                            <input
                              ref={customInputRef}
                              type="text"
                              placeholder={`e.g., 1,2,3,4 or 4,3,2,1`}
                              className="flex-1 p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-sm"
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  applyCustomSequence();
                                }
                              }}
                            />
                            <button
                              onClick={applyCustomSequence}
                              className="px-4 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/80 transition-colors text-sm"
                            >
                              Apply
                            </button>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Enter page numbers in desired order, separated by commas
                          </div>
                        </div>
                      )}

                      {/* Order Summary */}
                      <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                        <div className="flex items-center gap-2 text-blue-600 mb-1">
                          <ListOrdered size={14} />
                          <span className="text-sm font-medium">Current Order</span>
                        </div>
                        <div className="text-xs text-blue-600">
                          {pageOrders.map(order => order.pageNumber).join(' → ')}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons - Improved CTAs */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleReorder}
                    disabled={isLoading || !pdfFile || pageOrders.length === 0}
                    className="flex items-center justify-center gap-2 flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                        Reordering Securely...
                      </>
                    ) : (
                      <>
                        <Move size={18} />
                        {pdfFile ? `Reorder PDF (${pdfFile.pages} pages)` : 'Reorder PDF'}
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
                          {pageOrders.filter((order, index) => order.currentIndex !== index).length}
                        </div>
                        <div className="text-xs text-muted-foreground">Pages Moved</div>
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
                    Why Reorder With Us?
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
                        <div className="text-sm font-medium text-foreground">Intuitive Interface</div>
                        <div className="text-xs text-muted-foreground">Drag and drop makes reordering simple and visual.</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-purple-100 dark:bg-purple-900/20 p-1.5 rounded-full mt-0.5">
                        <Shield size={12} className="text-purple-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">No Quality Loss</div>
                        <div className="text-xs text-muted-foreground">Only page sequence changes - all content stays perfect.</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Page List */}
                {pdfFile && pageOrders.length > 0 && (
                  <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                      <label className="text-sm font-medium text-foreground">
                        Page Order ({pageOrders.length} pages)
                      </label>
                      <div className="text-xs text-muted-foreground">
                        Drag to reorder • Click to select
                      </div>
                    </div>

                    <div className="space-y-2 max-h-80 overflow-y-auto">
                      {pageOrders.map((order, index) => (
                        <div
                          key={order.pageNumber}
                          draggable
                          onDragStart={(e) => handleDragStart(e, index)}
                          onDragOver={handleDragOver}
                          onDrop={(e) => handleDrop(e, index)}
                          className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-move hover:border-accent/50 ${
                            selectedPages.includes(order.pageNumber)
                              ? 'border-accent bg-accent/10'
                              : 'border-border bg-secondary/20'
                          } ${
                            order.currentIndex !== order.originalIndex 
                              ? 'ring-1 ring-blue-500/20' 
                              : ''
                          }`}
                          onClick={() => togglePageSelection(order.pageNumber)}
                        >
                          <GripVertical size={16} className="text-muted-foreground flex-shrink-0" />
                          
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <div className={`w-8 h-8 rounded flex items-center justify-center text-sm font-medium ${
                              selectedPages.includes(order.pageNumber)
                                ? 'bg-accent text-accent-foreground'
                                : 'bg-blue-500 text-white'
                            }`}>
                              {order.currentIndex + 1}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium text-foreground">
                                Page {order.pageNumber}
                              </div>
                              {order.currentIndex !== order.originalIndex && (
                                <div className="text-xs text-muted-foreground">
                                  Originally #{order.originalIndex + 1}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-1 opacity-0 hover:opacity-100 transition-opacity">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                movePageUp(index);
                              }}
                              disabled={index === 0}
                              className="p-1 rounded hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed"
                              title="Move up"
                            >
                              <ArrowUp size={14} />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                movePageDown(index);
                              }}
                              disabled={index === pageOrders.length - 1}
                              className="p-1 rounded hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed"
                              title="Move down"
                            >
                              <ArrowDown size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Results Panel */}
                <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-sm font-medium text-foreground">
                      {reorderResult ? 'Reorder Results' : 'Preview'}
                    </label>
                  </div>

                  <div className="flex-1 flex flex-col items-center justify-center bg-secondary/20 rounded-xl p-6 min-h-[200px]">
                    {reorderResult ? (
                      <div className="text-center w-full">
                        <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20 mb-6">
                          <div className="flex items-center justify-center gap-2 text-green-600 mb-2">
                            <CheckCircle size={24} />
                            <span className="font-semibold">Reorder Successful!</span>
                          </div>
                          <p className="text-sm text-green-600">
                            PDF pages have been rearranged successfully
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
                              {formatFileSize(reorderResult.size)}
                            </div>
                            <div className="text-xs text-muted-foreground">Reordered</div>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                          <button
                            onClick={downloadReorderedPDF}
                            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all text-sm font-medium shadow-md hover:shadow-lg"
                          >
                            <Download size={16} />
                            Download Reordered PDF
                          </button>
                          <button
                            onClick={shareReorderedPDF}
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
                            <Move className="w-12 h-12 text-muted-foreground mx-auto" />
                            <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-1">
                              <Lock size={10} />
                            </div>
                          </div>
                          <div className="flex items-center justify-center gap-2 mb-2">
                            <Sparkles size={20} className="text-muted-foreground" />
                            <p className="text-foreground font-medium">Ready to Reorder Securely</p>
                          </div>
                          <p className="text-muted-foreground text-sm mb-4">
                            Drag pages to rearrange or use quick actions
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
                          <p className="text-foreground font-medium mb-2">Upload PDF to Reorder</p>
                          <p className="text-muted-foreground text-sm mb-4">
                            Select a PDF file to rearrange pages with 100% privacy
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
                  <h3 className="text-sm font-medium text-foreground mb-4">Reorder Features</h3>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center gap-2 p-2 bg-blue-500/10 rounded">
                      <GripVertical size={14} className="text-blue-600" />
                      <span className="text-foreground">Drag & Drop</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-green-500/10 rounded">
                      <Shuffle size={14} className="text-green-600" />
                      <span className="text-foreground">Quick Actions</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-purple-500/10 rounded">
                      <Eye size={14} className="text-purple-600" />
                      <span className="text-foreground">Multi-Select</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-orange-500/10 rounded">
                      <ListOrdered size={14} className="text-orange-600" />
                      <span className="text-foreground">Custom Sequences</span>
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
                      <Move size={20} className="text-blue-600" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Smart PDF Page Reordering - How It Works</h2>
                  </div>
                  {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.whatItDoes && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground mb-4">
                      This PDF page reorder tool gives you complete control over document organization through intuitive drag-and-drop interface and multiple reordering methods. Whether you need to fix scanning errors, reorganize report sections, or create custom document sequences, our tool maintains perfect quality while rearranging pages. All processing happens securely in your browser—your documents never leave your computer, ensuring privacy while providing professional-grade page management.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Lock size={18} className="text-blue-600" />
                          <h3 className="font-semibold text-foreground">Complete Privacy</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">No file uploads to servers. All reordering happens locally in your browser for maximum security.</p>
                      </div>
                      <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <GripVertical size={18} className="text-green-600" />
                          <h3 className="font-semibold text-foreground">Intuitive Control</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">Drag-and-drop interface makes page reordering visual and simple, with multi-page selection support.</p>
                      </div>
                      <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Shield size={18} className="text-purple-600" />
                          <h3 className="font-semibold text-foreground">Quality Preservation</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">Only page sequence changes—all text, images, and formatting remain exactly as in the original.</p>
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
                    <h2 className="text-xl font-bold text-foreground">When to Use PDF Page Reordering</h2>
                  </div>
                  {openSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.useCases && (
                  <div className="px-6 pb-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">📊 Document Preparation & Organization</h3>
                        <ul className="space-y-1 text-muted-foreground text-sm">
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Fix scanning errors where pages were scanned out of sequence</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Reorganize report sections to follow logical flow or presentation order</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Move appendix sections, references, or supporting documents to appropriate locations</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">🎓 Academic & Publishing Workflows</h3>
                        <ul className="space-y-1 text-muted-foreground text-sm">
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Arrange thesis chapters or research paper sections in proper sequence</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Prepare book manuscripts by organizing chapters, front matter, and back matter</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Create custom reading sequences for course materials or study guides</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">💼 Business & Professional Applications</h3>
                        <ul className="space-y-1 text-muted-foreground text-sm">
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Reorder contract pages after amendments or addendum additions</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Organize presentation slides or proposal sections for maximum impact</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>Prepare multi-document submissions by combining and sequencing pages correctly</span>
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
                              <div className="text-sm text-muted-foreground">Select the PDF file you want to reorder. Files stay on your device.</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                            <div>
                              <div className="font-medium text-foreground">Rearrange Pages</div>
                              <div className="text-sm text-muted-foreground">Drag and drop pages, use quick actions, or enter custom sequence.</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                            <div>
                              <div className="font-medium text-foreground">Apply & Download</div>
                              <div className="text-sm text-muted-foreground">Apply reordering and download perfectly organized PDF.</div>
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
                            <span>Select multiple pages by clicking while holding Ctrl/Cmd, then move them together</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-accent/20 p-1 rounded mt-0.5">
                              <Shuffle size={12} className="text-accent" />
                            </div>
                            <span>Use "Reverse Order" for documents scanned back-to-front or upside down</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="bg-accent/20 p-1 rounded mt-0.5">
                              <ListOrdered size={12} className="text-accent" />
                            </div>
                            <span>For complex sequences, write down desired order first, then use custom sequence input</span>
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
                    <h2 className="text-xl font-bold text-foreground">Example: Page Reordering Scenarios</h2>
                  </div>
                  {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {openSections.examples && (
                  <div className="px-6 pb-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-foreground mb-3">Common Reordering Tasks</h3>
                        <div className="overflow-x-auto">
                          <div className="min-w-full inline-block align-middle">
                            <div className="overflow-hidden border border-border rounded-lg">
                              <table className="min-w-full divide-y divide-border">
                                <thead className="bg-secondary/20">
                                  <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Document Type</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Original Issue</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Reorder Action</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Result</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                  <tr>
                                    <td className="px-4 py-3 text-sm text-foreground">Scanned Book</td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">Pages scanned out of sequence (mixed up)</td>
                                    <td className="px-4 py-3 text-sm text-blue-600">Manual drag-and-drop to correct order</td>
                                    <td className="px-4 py-3 text-sm text-green-600">Perfectly sequenced readable book</td>
                                  </tr>
                                  <tr>
                                    <td className="px-4 py-3 text-sm text-foreground">Business Report</td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">Executive summary at end instead of beginning</td>
                                    <td className="px-4 py-3 text-sm text-blue-600">Move pages 15-18 to positions 1-4</td>
                                    <td className="px-4 py-3 text-sm text-green-600">Professional report with proper structure</td>
                                  </tr>
                                  <tr>
                                    <td className="px-4 py-3 text-sm text-foreground">Multi-Document Submission</td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">Multiple documents need specific sequence</td>
                                    <td className="px-4 py-3 text-sm text-blue-600">Custom sequence: 1-5,10-15,6-9,16-20</td>
                                    <td className="px-4 py-3 text-sm text-green-600">Correctly organized submission package</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Technical Implementation Example</h3>
                        <div className="bg-secondary/20 p-4 rounded-lg border border-border overflow-x-auto">
                          <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
{`Before Reordering (Problem Document):
- Document: scanned_contract.pdf
- Pages: 24 total
- Issue: Pages scanned in wrong order (15-24, then 1-14)
- Current sequence: 15,16,17,18,19,20,21,22,23,24,1,2,3,4,5,6,7,8,9,10,11,12,13,14
- Problem: Document starts in middle, unreadable in current order

Reordering Process:
1. Upload document to tool
2. Select "Reverse Order" mode
3. Result: Pages 24-1 (backwards)
4. Manual adjustment needed for correct 1-24 sequence
5. Use drag-and-drop to arrange pages 1 through 24 in order

Alternative Method - Custom Sequence:
Enter custom sequence: 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24

After Reordering (Corrected Document):
- Document: scanned_contract_corrected.pdf
- Pages: 24 total (same as original)
- Sequence: 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24
- Result: Perfectly sequenced, readable document
- File size: Same as original (no quality loss)

Key Benefits:
✓ Visual drag-and-drop interface makes complex reordering simple
✓ Multiple methods (manual, reverse, custom) for different needs
✓ No quality loss - pages maintain original resolution and clarity
✓ Real-time preview shows exact order before applying changes
✓ Browser-based processing ensures complete privacy

Common Use Cases Solved:
• Fixing scanning errors from automatic document feeders
• Reorganizing report sections for better flow
• Creating custom sequences for presentations or submissions
• Preparing multi-document packages in specific order
• Correcting page sequence errors from merged documents`}
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