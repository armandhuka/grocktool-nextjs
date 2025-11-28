'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Download, Upload, FileText, Trash2, 
  Share2, CheckCheck, Settings, Zap, CheckCircle,
  Sparkles, Grid3X3, Move, GripVertical, ArrowUp, ArrowDown,
  ListOrdered, Shuffle, RotateCcw, Eye
} from 'lucide-react';
import { PDFDocument } from 'pdf-lib';

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

  // Fixed reorderPDF function
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
    
    // FIX: Convert Uint8Array to ArrayBuffer safely
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
                PDF Page Reorder
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
                Rearrange PDF pages in desired order
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
                      Select a PDF file to rearrange pages
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
                                : 'border-border bg-secondary/20 text-foreground hover:border-accent/50 hover:shadow-md'
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
                          className="flex items-center justify-center gap-2 p-3 rounded-lg border border-border bg-secondary/20 text-foreground hover:border-accent/50 transition-colors text-sm"
                        >
                          <Shuffle size={14} />
                          Reverse All Pages
                        </button>
                        <button
                          onClick={resetToOriginal}
                          className="flex items-center justify-center gap-2 p-3 rounded-lg border border-border bg-secondary/20 text-foreground hover:border-accent/50 transition-colors text-sm"
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
                          className="flex items-center justify-center gap-2 p-3 rounded-lg border border-border bg-secondary/20 text-foreground hover:border-accent/50 transition-colors text-sm"
                        >
                          <Eye size={14} />
                          Select All Pages
                        </button>
                        <button
                          onClick={clearSelection}
                          className="flex items-center justify-center gap-2 p-3 rounded-lg border border-border bg-secondary/20 text-foreground hover:border-accent/50 transition-colors text-sm"
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
                            className="p-2 rounded-lg border border-border bg-secondary/20 text-foreground hover:border-accent/50 transition-colors text-xs"
                          >
                            To Top
                          </button>
                          <button
                            onClick={() => moveSelectedPages('up')}
                            className="p-2 rounded-lg border border-border bg-secondary/20 text-foreground hover:border-accent/50 transition-colors text-xs"
                          >
                            Move Up
                          </button>
                          <button
                            onClick={() => moveSelectedPages('down')}
                            className="p-2 rounded-lg border border-border bg-secondary/20 text-foreground hover:border-accent/50 transition-colors text-xs"
                          >
                            Move Down
                          </button>
                          <button
                            onClick={() => moveSelectedPages('bottom')}
                            className="p-2 rounded-lg border border-border bg-secondary/20 text-foreground hover:border-accent/50 transition-colors text-xs"
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

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleReorder}
                  disabled={isLoading || !pdfFile || pageOrders.length === 0}
                  className="flex items-center justify-center gap-2 flex-1 px-4 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/80 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
                  ) : (
                    <Move size={18} />
                  )}
                  {isLoading ? 'Reordering...' : 'Reorder PDF'}
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
                  <h3 className="text-sm font-medium text-foreground mb-4">Reorder Summary</h3>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-blue-500/10 p-3 rounded-lg">
                      <div className="text-2xl font-bold text-foreground">{pdfFile.pages}</div>
                      <div className="text-xs text-muted-foreground">Total Pages</div>
                    </div>
                    <div className="bg-green-500/10 p-3 rounded-lg">
                      <div className="text-2xl font-bold text-foreground">
                        {pageOrders.filter((order, index) => order.currentIndex !== index).length}
                      </div>
                      <div className="text-xs text-muted-foreground">Pages Moved</div>
                    </div>
                    <div className="bg-purple-500/10 p-3 rounded-lg">
                      <div className="text-lg font-bold text-foreground">
                        {reorderMode.charAt(0).toUpperCase() + reorderMode.slice(1)}
                      </div>
                      <div className="text-xs text-muted-foreground">Mode</div>
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
                        className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-move ${
                          selectedPages.includes(order.pageNumber)
                            ? 'border-accent bg-accent/10'
                            : 'border-border bg-secondary/20 hover:border-accent/50'
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

                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              movePageUp(index);
                            }}
                            disabled={index === 0}
                            className="p-1 rounded hover:bg-secondary disabled:opacity-30"
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
                            className="p-1 rounded hover:bg-secondary disabled:opacity-30"
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

                      <div className="flex gap-3 justify-center">
                        <button
                          onClick={downloadReorderedPDF}
                          className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/80 transition-colors text-sm font-medium"
                        >
                          <Download size={16} />
                          Download PDF
                        </button>
                        <button
                          onClick={shareReorderedPDF}
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
                        <Move className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <Sparkles size={20} className="text-muted-foreground" />
                          <p className="text-foreground font-medium">Ready to Reorder</p>
                        </div>
                        <p className="text-muted-foreground text-sm">
                          Drag pages to rearrange or use quick actions
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 w-full">
                      <div className="bg-card border border-border rounded-xl p-8 max-w-sm mx-auto">
                        <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-foreground font-medium mb-2">Upload PDF File</p>
                        <p className="text-muted-foreground text-sm">
                          Select a PDF file to rearrange pages
                        </p>
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
        </div>
      </div>
    </div>
  );
}