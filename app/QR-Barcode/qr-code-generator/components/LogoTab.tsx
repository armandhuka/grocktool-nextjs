'use client';

import React from 'react';
import { Upload, X } from 'lucide-react';

interface LogoTabProps {
  values: any;
  logoPreview: string;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleLogoUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removeLogo: () => void;
  handleInputChange: (field: string, value: any) => void;
}

const LogoTab: React.FC<LogoTabProps> = ({
  values,
  logoPreview,
  fileInputRef,
  handleLogoUpload,
  removeLogo,
  handleInputChange
}) => {
  return (
    <div className="space-y-4">
      <label className="text-toolnest-text font-medium block">Add Center Logo</label>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
        <input
          ref={fileInputRef as React.RefObject<HTMLInputElement>}
          type="file"
          accept="image/*"
          onChange={handleLogoUpload}
          className="hidden"
        />

        {!values.logo ? (
          <div onClick={() => fileInputRef.current?.click()} className="cursor-pointer">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Click to upload logo</p>
            <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 2MB</p>
            <p className="text-xs text-gray-500">Square images work best</p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-center">
              <img src={logoPreview} alt="Logo preview" className="w-16 h-16 object-contain rounded" />
            </div>
            <p className="text-sm text-gray-600 truncate">{values.logo.name}</p>
            <button
              onClick={removeLogo}
              className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 mx-auto"
            >
              <X size={14} />
              Remove Logo
            </button>
          </div>
        )}
      </div>

      {values.logo && (
        <div>
          <label className="text-toolnest-text font-medium block mb-2 text-sm">
            Logo Size: {values.logoSize}%
          </label>
          <input
            type="range"
            min="10"
            max="40"
            value={values.logoSize}
            onChange={(e) => handleInputChange('logoSize', Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <p className="text-xs text-gray-500 mt-1">
            Keep logo <strong>small</strong> (10–30%) depending on error correction level
          </p>
        </div>
      )}
    </div>
  );
};

export default LogoTab;