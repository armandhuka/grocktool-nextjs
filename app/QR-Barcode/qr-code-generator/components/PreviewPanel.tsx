'use client';

import React from 'react';
import { Download, Share2 } from 'lucide-react';

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
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <label className="text-toolnest-text font-medium text-lg">Preview</label>
        <div className="flex gap-2">
          <button
            onClick={onShare}
            disabled={!qrCodeUrl}
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Share2 size={16} />
          </button>
          <button
            onClick={onDownload}
            disabled={!qrCodeUrl}
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download size={16} />
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 rounded-xl p-4 md:p-6 min-h-[300px] md:min-h-[400px]">
        {qrCodeUrl ? (
          <div className="text-center w-full">
            <div
              className="bg-white p-4 md:p-6 rounded-xl border-2 border-gray-200 inline-block shadow-lg mx-auto"
              style={{
                filter: values.addShadow ? `drop-shadow(0 8px 16px ${values.shadowColor})` : 'none',
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
                    maxWidth: `${Math.min(values.size, 450)}px`,
                    height: 'auto'
                  }}
                />
              </div>
            </div>

            <div className="mt-4 md:mt-6 space-y-3 max-w-sm mx-auto">
              <p className="text-xs md:text-sm text-toolnest-text/70">
                Right-click to save or use download button
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 w-full">
            <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-6 md:p-8 max-w-sm mx-auto">
              <div className="text-gray-400 text-4xl md:text-6xl mb-3 md:mb-4">📱</div>
              <p className="text-gray-500 text-sm md:text-base">
                {isLoading ? 'Generating QR Code...' : 'Configure settings and generate your QR code'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewPanel;