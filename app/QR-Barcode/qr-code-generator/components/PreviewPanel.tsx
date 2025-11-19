'use client';

import React from 'react';
import { Download, Share2, Scan, Zap } from 'lucide-react';

interface PreviewPanelProps {
  qrCodeUrl: string;
  values: any;
  isLoading: boolean;
  onDownload: () => void;
  onShare: () => void;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({
  qrCodeUrl,
  values,
  isLoading,
  onDownload,
  onShare
}) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <label className="text-sm font-medium text-foreground">Preview</label>
        <div className="flex gap-2">
          <button
            onClick={onShare}
            disabled={!qrCodeUrl}
            className="p-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Share QR Code"
          >
            <Share2 size={16} />
          </button>
          <button
            onClick={onDownload}
            disabled={!qrCodeUrl}
            className="p-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Download QR Code"
          >
            <Download size={16} />
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center bg-secondary/20 rounded-xl p-4 sm:p-6 min-h-[300px]">
        {qrCodeUrl ? (
          <div className="text-center w-full">
            <div
              className="bg-card p-4 sm:p-6 rounded-xl border border-border inline-block shadow-lg mx-auto"
              style={{
                filter: values.addShadow ? 'drop-shadow(0 8px 24px rgba(0,0,0,0.15))' : 'none',
                maxWidth: '100%'
              }}
            >
              <div className="relative inline-block">
                <img
                  src={qrCodeUrl}
                  alt="Generated QR Code"
                  className="rounded-lg mx-auto"
                  style={{
                    width: '100%',
                    maxWidth: `${Math.min(values.size, 400)}px`,
                    height: 'auto'
                  }}
                />
                {values.logo && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div 
                      className="bg-white rounded-lg p-1 shadow-lg"
                      style={{
                        width: `${values.logoSize}%`,
                        height: `${values.logoSize}%`
                      }}
                    >
                      <img
                        src={values.logoPreview}
                        alt="Logo"
                        className="w-full h-full object-contain rounded"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 sm:mt-6 space-y-3 max-w-sm mx-auto">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Scan size={16} />
                <span>Scan to test your QR code</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Right-click to save or use download button
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 w-full">
            <div className="bg-card border border-border rounded-xl p-6 sm:p-8 max-w-sm mx-auto">
              <div className="text-muted-foreground text-4xl sm:text-6xl mb-3 sm:mb-4">📱</div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <Zap size={20} className="text-muted-foreground" />
                <p className="text-foreground font-medium">
                  {isLoading ? 'Generating QR Code...' : 'Ready to Generate'}
                </p>
              </div>
              <p className="text-muted-foreground text-sm">
                {isLoading ? 'Creating your custom QR code...' : 'Configure settings and generate your QR code'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* QR Code Stats */}
      {qrCodeUrl && (
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
          <div className="bg-blue-500/10 text-blue-600 p-2 rounded text-center">
            <div className="font-medium">{values.size}px</div>
            <div>Size</div>
          </div>
          <div className="bg-green-500/10 text-green-600 p-2 rounded text-center">
            <div className="font-medium">{values.errorCorrection}</div>
            <div>Error Level</div>
          </div>
          <div className="bg-purple-500/10 text-purple-600 p-2 rounded text-center">
            <div className="font-medium">{values.logo ? 'With Logo' : 'No Logo'}</div>
            <div>Logo</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviewPanel;