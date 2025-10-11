'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, RefreshCw, QrCode } from 'lucide-react';
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

  return (
    <div className="min-h-screen bg-toolnest-bg font-inter">
      <section className="pt-24 md:pt-32 pb-12 md:pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link href="/tool" className="inline-flex items-center gap-2 text-toolnest-text/70 hover:text-toolnest-text mb-6 transition-colors text-sm md:text-base">
              <ArrowLeft size={18} />
              Back to Tools
            </Link>

            <div className="text-center mb-8 md:mb-12">
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-toolnest-text mb-3 md:mb-4">QR Code Generator</h1>
              <p className="text-base md:text-xl text-toolnest-text/80 max-w-2xl mx-auto px-4">Create professional QR codes with logos, custom designs, and multiple content types</p>
            </div>

            <div className="bg-white rounded-2xl md:rounded-3xl shadow-lg p-4 md:p-6 lg:p-8">
              <div className="mb-6 md:mb-8">
                <label className="text-toolnest-text font-medium block mb-3">Content Type</label>
                <ContentTab
                  contentType={contentType}
                  setContentType={setContentType}
                  showSelectorOnly
                />
              </div>

              <div className="flex border-b border-gray-200 mb-4 md:mb-6 overflow-x-auto">
                {[
                  { key: 'content', label: 'Content' },
                  { key: 'design', label: 'Design' },
                  { key: 'logo', label: 'Logo' },
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key as any)}
                    className={`flex-shrink-0 px-3 md:px-4 py-2 font-medium border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === key ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-4 md:space-y-6">
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

                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <button
                      onClick={handleGenerate}
                      disabled={isLoading}
                      className="flex items-center gap-2 flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <RefreshCw size={18} className="animate-spin" />
                      ) : (
                        <QrCode size={18} />
                      )}
                      {isLoading ? 'Generating...' : 'Generate QR Code'}
                    </button>

                    <button
                      onClick={handleClear}
                      className="flex-1 sm:flex-none px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                    >
                      Clear All
                    </button>
                  </div>
                </div>

                <PreviewPanel
                  qrCodeUrl={qrCodeUrl}
                  values={values}
                  isLoading={isLoading}
                  onDownload={handleDownload}
                  onShare={handleShare}
                />
              </div>

              <FeaturesGrid />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}