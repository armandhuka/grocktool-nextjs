'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Download, Upload, FileText, Trash2, 
  Share2, CheckCheck, RotateCw, RotateCcw, RefreshCw,
  Settings, Zap, CheckCircle,
  Sparkles, Grid3X3, Eye
} from 'lucide-react';
import { PDFDocument, degrees } from 'pdf-lib';

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
  rotation: number; // 0, 90, 180, 270
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
        // Get actual page count
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

        // Create preview URL
        const reader = new FileReader();
        reader.onload = (e) => {
          setPdfFile({
            ...newFile,
            previewUrl: e.target?.result as string
          });
        };
        reader.readAsDataURL(file);

        // Initialize page rotations
        const initialRotations: PageRotation[] = [];
        for (let i = 1; i <= pageCount; i++) {
          initialRotations.push({ pageNumber: i, rotation: 0 });
        }
        setPageRotations(initialRotations);
        
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

  // Real PDF rotation using pdf-lib - FIXED VERSION
  const rotatePDF = async (file: File): Promise<RotationResult> => {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const pages = pdfDoc.getPages();
    
    let rotatedPagesCount = 0;

    // Apply rotations
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
    
    // FIX: Convert Uint8Array to ArrayBuffer safely
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

    // Check if any rotation is applied
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
      // Clean up previous result
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
                PDF Rotate
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
              Rotate PDF pages to correct orientation
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
                      Select a PDF file to rotate pages
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
                            className="flex items-center justify-center gap-2 p-3 rounded-lg border border-border bg-secondary/20 text-foreground hover:border-accent/50 transition-colors text-sm"
                          >
                            <Eye size={14} />
                            Select All Pages
                          </button>
                          <button
                            onClick={clearSelection}
                            className="flex items-center justify-center gap-2 p-3 rounded-lg border border-border bg-secondary/20 text-foreground hover:border-accent/50 transition-colors text-sm"
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
                              
                              {/* Rotation controls for individual page */}
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

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleRotate}
                  disabled={isLoading || !pdfFile}
                  className="flex items-center justify-center gap-2 flex-1 px-4 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/80 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
                  ) : (
                    <RotateCw size={18} />
                  )}
                  {isLoading ? 'Rotating...' : 'Rotate PDF'}
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
                  <h3 className="text-sm font-medium text-foreground mb-4">Rotation Summary</h3>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-blue-500/10 p-3 rounded-lg">
                      <div className="text-2xl font-bold text-foreground">{pdfFile.pages}</div>
                      <div className="text-xs text-muted-foreground">Total Pages</div>
                    </div>
                    <div className="bg-green-500/10 p-3 rounded-lg">
                      <div className="text-2xl font-bold text-foreground">
                        {rotationMode === 'all' 
                          ? (globalRotation === 0 ? 0 : pdfFile.pages)
                          : pageRotations.filter(pr => pr.rotation !== 0).length
                        }
                      </div>
                      <div className="text-xs text-muted-foreground">Pages to Rotate</div>
                    </div>
                    <div className="bg-purple-500/10 p-3 rounded-lg">
                      <div className="text-lg font-bold text-foreground">
                        {rotationMode === 'all' ? globalRotation + '°' : 'Custom'}
                      </div>
                      <div className="text-xs text-muted-foreground">Rotation</div>
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

                      <div className="flex gap-3 justify-center">
                        <button
                          onClick={downloadRotatedPDF}
                          className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/80 transition-colors text-sm font-medium"
                        >
                          <Download size={16} />
                          Download PDF
                        </button>
                        <button
                          onClick={shareRotatedPDF}
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
                        <RotateCw className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <Sparkles size={20} className="text-muted-foreground" />
                          <p className="text-foreground font-medium">Ready to Rotate</p>
                        </div>
                        <p className="text-muted-foreground text-sm mb-4">
                          {rotationMode === 'all' 
                            ? 'All pages will be rotated together'
                            : 'Select pages and apply individual rotations'
                          }
                        </p>
                        <div className="text-xs text-muted-foreground">
                          {rotationMode === 'all' && globalRotation !== 0 &&
                            `All ${pdfFile.pages} pages will be rotated ${globalRotation}°`
                          }
                          {rotationMode === 'custom' &&
                            `${pageRotations.filter(pr => pr.rotation !== 0).length} pages have rotation applied`
                          }
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 w-full">
                      <div className="bg-card border border-border rounded-xl p-8 max-w-sm mx-auto">
                        <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-foreground font-medium mb-2">Upload PDF File</p>
                        <p className="text-muted-foreground text-sm">
                          Select a PDF file to rotate pages
                        </p>
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