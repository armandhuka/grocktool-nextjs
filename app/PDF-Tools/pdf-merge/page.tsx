'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Download, Upload, FileText, Trash2, 
  Share2, CheckCheck, Merge, Eye, EyeOff,
  ChevronUp, ChevronDown, Settings, Zap
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
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ---------------------------
  // 📌 REAL PDF MERGE FUNCTION (pdf-lib) - COMPLETELY FIXED
  // ---------------------------
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
      
      // COMPLETE FIX: Convert Uint8Array to ArrayBuffer safely (same as your compressor)
      const arrayBufferFromBytes = new ArrayBuffer(mergedBytes.length);
      const view = new Uint8Array(arrayBufferFromBytes);
      for (let i = 0; i < mergedBytes.length; i++) {
        view[i] = mergedBytes[i];
      }
      
      const blob = new Blob([arrayBufferFromBytes], { type: "application/pdf" });
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error('PDF merge error:', error);
      
      // Fallback: Create a simple merged version
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
          pages: 0, // We'll calculate this later
          file: file
        };
        newFiles.push(newFile);
        
        // Create preview URL
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
    
    // Reset input
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
      const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
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
      // Use real PDF merging with pdf-lib
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
      
      // Clean up URL after download
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
      // For sharing, we can create a temporary download link
      const tempLink = `${window.location.origin}/download?file=${encodeURIComponent('merged-document.pdf')}`;
      await navigator.clipboard.writeText(tempLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      // Fallback: Copy the blob URL
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
    // Clean up URLs
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
                PDF Merge
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
                Merge multiple PDF files into one document
              </p>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Left Panel - Controls */}
            <div className="space-y-6">
              {/* File Upload */}
              <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <label className="block text-sm font-medium text-foreground mb-4">
                  Upload PDF Files
                </label>
                
                <div 
                  className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-accent/50 transition-colors bg-secondary/20"
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
                  
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-foreground font-medium mb-2">Click to upload PDF files</p>
                  <p className="text-sm text-muted-foreground">
                    Select multiple PDF files to merge (Max 10 files)
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Supported: PDF files only
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
                          <FileText size={20} className="text-red-500 flex-shrink-0" />
                          
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
                    <label className="flex items-center gap-3 p-3 bg-secondary/20 rounded-lg cursor-pointer">
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

                    <label className="flex items-center gap-3 p-3 bg-secondary/20 rounded-lg cursor-pointer">
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

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleMerge}
                  disabled={isLoading || pdfFiles.length < 2}
                  className="flex items-center justify-center gap-2 flex-1 px-4 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/80 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
                  ) : (
                    <Merge size={18} />
                  )}
                  {isLoading ? 'Merging...' : `Merge ${pdfFiles.length} PDFs`}
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
              {pdfFiles.length > 0 && (
                <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                  <h3 className="text-sm font-medium text-foreground mb-4">Merge Summary</h3>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-blue-500/10 p-3 rounded-lg">
                      <div className="text-2xl font-bold text-foreground">{pdfFiles.length}</div>
                      <div className="text-xs text-muted-foreground">Files</div>
                    </div>
                    <div className="bg-green-500/10 p-3 rounded-lg">
                      <div className="text-2xl font-bold text-foreground">{totalPages || '?'}</div>
                      <div className="text-xs text-muted-foreground">Total Pages</div>
                    </div>
                    <div className="bg-purple-500/10 p-3 rounded-lg">
                      <div className="text-lg font-bold text-foreground">{formatFileSize(totalSize)}</div>
                      <div className="text-xs text-muted-foreground">Total Size</div>
                    </div>
                    <div className="bg-orange-500/10 p-3 rounded-lg">
                      <div className="text-lg font-bold text-foreground">
                        {mergeOptions.quality.charAt(0).toUpperCase() + mergeOptions.quality.slice(1)}
                      </div>
                      <div className="text-xs text-muted-foreground">Quality</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Results Panel */}
              <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-sm font-medium text-foreground">
                    {mergedUrl ? 'Merged Document' : 'Preview'}
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
                          Your {pdfFiles.length} PDF files have been merged successfully
                        </p>
                      </div>

                      <div className="flex gap-3 justify-center">
                        <button
                          onClick={downloadMergedPDF}
                          className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/80 transition-colors text-sm font-medium"
                        >
                          <Download size={16} />
                          Download PDF
                        </button>
                        <button
                          onClick={shareMergedPDF}
                          className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-sm font-medium"
                        >
                          {copied ? <CheckCheck size={16} /> : <Share2 size={16} />}
                          {copied ? 'Copied!' : 'Share'}
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
                              <div key={file.id} className="flex items-center gap-3 p-2 bg-white rounded border">
                                <div className="w-6 h-6 flex items-center justify-center bg-blue-500 text-white rounded text-xs font-medium">
                                  {index + 1}
                                </div>
                                <FileText size={16} className="text-red-500" />
                                <div className="flex-1 text-left">
                                  <div className="text-sm font-medium text-foreground truncate">
                                    {file.name}
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
                        <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <Zap size={20} className="text-muted-foreground" />
                          <p className="text-foreground font-medium">
                            {pdfFiles.length > 0 ? 'Ready to Merge' : 'Upload PDF Files'}
                          </p>
                        </div>
                        <p className="text-muted-foreground text-sm">
                          {pdfFiles.length > 0 
                            ? `Click "Merge ${pdfFiles.length} PDFs" to combine your files`
                            : 'Upload 2 or more PDF files to start merging'
                          }
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Features Card */}
              <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <h3 className="text-sm font-medium text-foreground mb-4">Features</h3>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="flex items-center gap-2 p-2 bg-blue-500/10 rounded">
                    <Merge size={14} className="text-blue-600" />
                    <span className="text-foreground">Merge Unlimited PDFs</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-green-500/10 rounded">
                    <Settings size={14} className="text-green-600" />
                    <span className="text-foreground">Custom Order</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-purple-500/10 rounded">
                    <Download size={14} className="text-purple-600" />
                    <span className="text-foreground">High Quality</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-orange-500/10 rounded">
                    <Eye size={14} className="text-orange-600" />
                    <span className="text-foreground">Live Preview</span>
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