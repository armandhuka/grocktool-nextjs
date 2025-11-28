'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Download, Upload, FileText, Trash2, 
  Share2, CheckCheck, Scissors, Eye, EyeOff,
  Plus, Minus, Settings, Zap, Copy, Split
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
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ---------------------------
  // 📌 REAL PDF SPLIT FUNCTION - FIXED
  // ---------------------------
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
      
      // FIX: Convert Uint8Array to ArrayBuffer safely
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
        // Get actual page count
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

        // Create preview URL
        const reader = new FileReader();
        reader.onload = (e) => {
          setPdfFile({
            ...newFile,
            previewUrl: e.target?.result as string
          });
        };
        reader.readAsDataURL(file);

        // Reset ranges for new file
        setTotalPages(actualPageCount);
        setSplitRanges([{ 
          id: '1', 
          start: 1, 
          end: Math.min(1, actualPageCount), 
          name: 'Part 1' 
        }]);
        
        // Reset input
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
    // Clean up URLs
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
        
        // Ensure start and end are within valid range
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

    // Validate ranges
    for (const range of splitRanges) {
      if (range.start < 1 || range.end > totalPages || range.start > range.end) {
        alert(`Invalid page range: ${range.start}-${range.end}. Please check your page numbers.`);
        return;
      }
    }

    setIsLoading(true);
    
    try {
      // Clean up previous results
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
      }, index * 100); // Stagger downloads to avoid browser issues
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
    // Clean up URLs
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
                PDF Split
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
              Split PDF into multiple files or extract pages
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
                      Select a PDF file to split into multiple parts
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

              {/* Split Options */}
              {pdfFile && (
                <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <Settings size={18} className="text-foreground" />
                    <label className="block text-sm font-medium text-foreground">
                      Split Options
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
                          className={`p-3 rounded-lg border text-center transition-colors ${
                            splitMode === 'range'
                              ? 'border-accent bg-accent text-accent-foreground'
                              : 'border-border bg-secondary/20 text-foreground hover:border-accent/50'
                          }`}
                        >
                          <div className="text-xs font-medium">Range</div>
                        </button>
                        <button
                          onClick={() => {
                            setSplitMode('single');
                            generateSinglePages();
                          }}
                          className={`p-3 rounded-lg border text-center transition-colors ${
                            splitMode === 'single'
                              ? 'border-accent bg-accent text-accent-foreground'
                              : 'border-border bg-secondary/20 text-foreground hover:border-accent/50'
                          }`}
                        >
                          <div className="text-xs font-medium">Single Pages</div>
                        </button>
                        <button
                          onClick={() => setSplitMode('even')}
                          className={`p-3 rounded-lg border text-center transition-colors ${
                            splitMode === 'even'
                              ? 'border-accent bg-accent text-accent-foreground'
                              : 'border-border bg-secondary/20 text-foreground hover:border-accent/50'
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
                          Split Into Parts
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                          {[2, 3, 4, 5].map(parts => (
                            <button
                              key={parts}
                              onClick={() => generateEvenSplit(parts)}
                              className="p-3 rounded-lg border border-border bg-secondary/20 text-foreground hover:border-accent/50 transition-colors text-sm"
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
                            Page Ranges
                          </label>
                          <button
                            onClick={addSplitRange}
                            disabled={splitRanges.length >= totalPages}
                            className="flex items-center gap-1 px-3 py-1 bg-secondary text-secondary-foreground rounded-lg text-sm hover:bg-secondary/80 transition-colors disabled:opacity-50"
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
                                    className="w-full p-2 bg-input border border-border rounded text-sm"
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
                                    className="w-full p-2 bg-input border border-border rounded text-sm"
                                  />
                                </div>
                              </div>
                              <div className="flex items-center gap-1">
                                <input
                                  type="text"
                                  value={range.name}
                                  onChange={(e) => updateSplitRange(range.id, 'name', e.target.value)}
                                  className="w-20 p-2 bg-input border border-border rounded text-sm"
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
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Page Preview (1-{totalPages})
                        </label>
                        <div className="grid grid-cols-5 gap-2 max-h-40 overflow-y-auto">
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                              key={page}
                              onClick={() => togglePageSelection(page)}
                              className={`p-2 rounded border text-sm transition-colors ${
                                selectedPages.includes(page)
                                  ? 'border-accent bg-accent text-accent-foreground'
                                  : 'border-border bg-secondary/20 text-foreground hover:border-accent/50'
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

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleSplit}
                  disabled={isLoading || !pdfFile || splitRanges.length === 0}
                  className="flex items-center justify-center gap-2 flex-1 px-4 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/80 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
                  ) : (
                    <Scissors size={18} />
                  )}
                  {isLoading ? 'Splitting...' : `Split into ${splitRanges.length} Parts`}
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
                  <h3 className="text-sm font-medium text-foreground mb-4">Split Summary</h3>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-blue-500/10 p-3 rounded-lg">
                      <div className="text-2xl font-bold text-foreground">{splitRanges.length}</div>
                      <div className="text-xs text-muted-foreground">Output Files</div>
                    </div>
                    <div className="bg-green-500/10 p-3 rounded-lg">
                      <div className="text-2xl font-bold text-foreground">{totalPages}</div>
                      <div className="text-xs text-muted-foreground">Total Pages</div>
                    </div>
                    <div className="bg-purple-500/10 p-3 rounded-lg">
                      <div className="text-lg font-bold text-foreground">{formatFileSize(pdfFile.size)}</div>
                      <div className="text-xs text-muted-foreground">Original Size</div>
                    </div>
                    <div className="bg-orange-500/10 p-3 rounded-lg">
                      <div className="text-lg font-bold text-foreground">
                        {formatFileSize(estimatedSizePerPart)}
                      </div>
                      <div className="text-xs text-muted-foreground">Avg/Part</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Results Panel */}
              <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-sm font-medium text-foreground">
                    {splitResults.length > 0 ? 'Split Results' : 'Preview'}
                  </label>
                  {splitResults.length > 0 && (
                    <button
                      onClick={downloadAll}
                      className="flex items-center gap-2 px-3 py-1 bg-accent text-accent-foreground rounded-lg text-sm hover:bg-accent/80 transition-colors"
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
                          PDF has been split into {splitResults.length} parts
                        </p>
                      </div>

                      <div className="space-y-3 max-h-60 overflow-y-auto">
                        {splitResults.map((result, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg border border-border">
                            <div className="flex items-center gap-3">
                              <FileText size={20} className="text-blue-500" />
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
                                className="p-2 rounded hover:bg-accent hover:text-accent-foreground transition-colors"
                                title="Download"
                              >
                                <Download size={16} />
                              </button>
                              <button
                                onClick={() => shareSplitPDF(index)}
                                className="p-2 rounded hover:bg-secondary transition-colors"
                                title="Share"
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
                      <Split className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Zap size={20} className="text-muted-foreground" />
                        <p className="text-foreground font-medium">Ready to Split</p>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        Configure split options and click "Split into {splitRanges.length} Parts"
                      </p>
                      {splitRanges.length > 0 && (
                        <div className="mt-4 p-3 bg-secondary/20 rounded-lg border border-border">
                          <div className="text-xs text-foreground font-medium mb-2">Split Plan:</div>
                          <div className="space-y-1 text-xs text-muted-foreground">
                            {splitRanges.map((range, index) => (
                              <div key={range.id}>
                                {range.name}: Pages {range.start} - {range.end}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center py-8">
                      <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-foreground font-medium mb-2">Upload PDF File</p>
                      <p className="text-muted-foreground text-sm">
                        Select a PDF file to split into multiple parts
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Features Card */}
              <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <h3 className="text-sm font-medium text-foreground mb-4">Features</h3>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="flex items-center gap-2 p-2 bg-blue-500/10 rounded">
                    <Scissors size={14} className="text-blue-600" />
                    <span className="text-foreground">Multiple Split Modes</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-green-500/10 rounded">
                    <Copy size={14} className="text-green-600" />
                    <span className="text-foreground">Extract Single Pages</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-purple-500/10 rounded">
                    <Download size={14} className="text-purple-600" />
                    <span className="text-foreground">Batch Download</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-orange-500/10 rounded">
                    <Eye size={14} className="text-orange-600" />
                    <span className="text-foreground">Page Preview</span>
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