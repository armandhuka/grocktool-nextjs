'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, RefreshCw, QrCode, Scan, Palette, Download, Share2 } from 'lucide-react';
import { useQRGenerator } from '../hooks/useQRGenerator';
import ContentTab from './ContentTab';
import DesignTab from './DesignTab';
import LogoTab from './LogoTab';
import PreviewPanel from './PreviewPanel';
import FeaturesGrid from './FeaturesGrid';
import { generateQRCode, downloadQRCode, shareQRCode } from '../utils/qrGenerator';

export default function QRGenerator() {
  const {
    contentType,
    setContentType,
    values,
    handleInputChange,
    qrCodeUrl,
    setQrCodeUrl,
    isLoading,
    setIsLoading,
    activeTab,
    setActiveTab,
    logoPreview,
    fileInputRef,
    imageInputRef,
    qrCanvasRef,
    handleLogoUpload,
    removeLogo,
    handleImageUpload,
    handleClear,
  } = useQRGenerator();

  const handleGenerate = async () => {
    await generateQRCode(
      contentType,
      values,
      setIsLoading,
      qrCanvasRef,
      setQrCodeUrl
    );
  };

  const handleDownload = () => {
    downloadQRCode(qrCanvasRef, qrCodeUrl);
  };

  const handleShare = async () => {
    await shareQRCode(qrCodeUrl);
  };

  const tabs = [
    { key: 'content', label: 'Content', icon: Scan },
    { key: 'design', label: 'Design', icon: Palette },
    { key: 'logo', label: 'Logo', icon: QrCode },
  ];

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
                QR Code Generator
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
                Create professional QR codes with logos, custom designs, and multiple content types
              </p>
            </motion.div>
          </div>

          {/* Main Generator Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
          >
            {/* Content Type Selector */}
            <div className="mb-6 sm:mb-8">
              <label className="block text-sm font-medium text-foreground mb-3">
                Content Type
              </label>
              <ContentTab
                contentType={contentType}
                setContentType={setContentType}
                showSelectorOnly
              />
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-border mb-4 sm:mb-6 overflow-x-auto">
              {tabs.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key as any)}
                  className={`flex items-center gap-2 flex-shrink-0 px-3 sm:px-4 py-2 font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === key 
                      ? 'border-accent text-accent' 
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon size={16} />
                  {label}
                </button>
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Left Panel - Controls */}
              <div className="space-y-4 sm:space-y-6">
                {activeTab === 'content' && (
                  <ContentTab
                    contentType={contentType}
                    values={values}
                    handleInputChange={handleInputChange}
                    imageInputRef={imageInputRef}
                    handleImageUpload={handleImageUpload}
                  />
                )}

                {activeTab === 'design' && (
                  <DesignTab values={values} handleInputChange={handleInputChange} />
                )}

                {activeTab === 'logo' && (
                  <LogoTab
                    values={values}
                    logoPreview={logoPreview}
                    fileInputRef={fileInputRef}
                    handleLogoUpload={handleLogoUpload}
                    removeLogo={removeLogo}
                    handleInputChange={handleInputChange}
                  />
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    onClick={handleGenerate}
                    disabled={isLoading}
                    className="flex items-center justify-center gap-2 flex-1 px-4 py-3 bg-accent text-accent-foreground rounded-lg sm:rounded-xl hover:bg-accent/80 transition-colors text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <RefreshCw size={16} className="animate-spin" />
                    ) : (
                      <QrCode size={16} />
                    )}
                    {isLoading ? 'Generating...' : 'Generate QR Code'}
                  </button>

                  <button
                    onClick={handleClear}
                    className="flex-1 sm:flex-none px-6 py-3 bg-secondary text-secondary-foreground rounded-lg sm:rounded-xl hover:bg-secondary/80 transition-colors text-sm sm:text-base"
                  >
                    Clear All
                  </button>
                </div>
              </div>

              {/* Right Panel - Preview */}
              <PreviewPanel
                qrCodeUrl={qrCodeUrl}
                values={values}
                isLoading={isLoading}
                onDownload={handleDownload}
                onShare={handleShare}
              />
            </div>

            {/* Features Grid */}
            <FeaturesGrid />
          </motion.div>

          {/* Additional Information Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 sm:mt-8 grid gap-6 sm:gap-8"
          >
            {/* QR Code Tips */}
            <div className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-foreground mb-4">QR Code Best Practices</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-medium text-foreground">Size & Scaling</div>
                      <div className="text-muted-foreground">Minimum 2x2 cm for print, higher error correction for small codes</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-medium text-foreground">Color Contrast</div>
                      <div className="text-muted-foreground">Ensure high contrast between QR code and background</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-medium text-foreground">Logo Placement</div>
                      <div className="text-muted-foreground">Keep logos small and centered, use high error correction</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-medium text-foreground">Testing</div>
                      <div className="text-muted-foreground">Always test your QR code with multiple devices and scanners</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Use Cases */}
            <div className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-foreground mb-4">Popular QR Code Use Cases</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                {[
                  { icon: '📱', label: 'Website Links', color: 'bg-blue-500/10 text-blue-600' },
                  { icon: '📧', label: 'Email', color: 'bg-green-500/10 text-green-600' },
                  { icon: '💼', label: 'Business Cards', color: 'bg-purple-500/10 text-purple-600' },
                  { icon: '🛍️', label: 'Product Packaging', color: 'bg-orange-500/10 text-orange-600' },
                  { icon: '📋', label: 'Event Tickets', color: 'bg-red-500/10 text-red-600' },
                  { icon: '🏢', label: 'Office WiFi', color: 'bg-cyan-500/10 text-cyan-600' },
                  { icon: '💳', label: 'Payments', color: 'bg-emerald-500/10 text-emerald-600' },
                  { icon: '📊', label: 'Marketing', color: 'bg-indigo-500/10 text-indigo-600' },
                ].map((useCase, index) => (
                  <div key={index} className={`p-3 rounded-lg border ${useCase.color} border-current/20`}>
                    <div className="text-lg mb-1">{useCase.icon}</div>
                    <div className="text-xs font-medium">{useCase.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}