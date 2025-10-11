'use client';

import React from 'react';

interface DesignTabProps {
  values: any;
  handleInputChange: (field: string, value: any) => void;
}

const DesignTab: React.FC<DesignTabProps> = ({ values, handleInputChange }) => {
  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <label className="text-toolnest-text font-medium block mb-2">
          QR Code Size: {values.size}px
        </label>
        <input
          type="range"
          min="100"
          max="1000"
          value={values.size}
          onChange={(e) => handleInputChange('size', Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs md:text-sm text-toolnest-text/70 mt-1">
          <span>100px</span>
          <span>550px</span>
          <span>1000px</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:gap-4">
        <div>
          <label className="text-toolnest-text font-medium block mb-2 text-sm">
            QR Color
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={values.color}
              onChange={(e) => handleInputChange('color', e.target.value)}
              className="w-10 h-10 md:w-12 md:h-12 cursor-pointer rounded-lg border border-gray-300"
            />
            <input
              value={values.color}
              onChange={(e) => handleInputChange('color', e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-lg text-sm"
              placeholder="#000000"
            />
          </div>
        </div>
        <div>
          <label className="text-toolnest-text font-medium block mb-2 text-sm">
            Background
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={values.bgColor}
              onChange={(e) => handleInputChange('bgColor', e.target.value)}
              className="w-10 h-10 md:w-12 md:h-12 cursor-pointer rounded-lg border border-gray-300"
            />
            <input
              value={values.bgColor}
              onChange={(e) => handleInputChange('bgColor', e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-lg text-sm"
              placeholder="#FFFFFF"
            />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="useGradient"
            checked={values.useGradient}
            onChange={(e) => handleInputChange('useGradient', e.target.checked)}
            className="rounded border-gray-300"
          />
          <label htmlFor="useGradient" className="text-toolnest-text font-medium text-sm">
            Use Gradient Colors
          </label>
        </div>
        
        {values.useGradient && (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-toolnest-text font-medium block mb-2 text-xs">
                Start Color
              </label>
              <input
                type="color"
                value={values.gradientStart}
                onChange={(e) => handleInputChange('gradientStart', e.target.value)}
                className="w-full h-8 cursor-pointer rounded-lg border border-gray-300"
              />
            </div>
            <div>
              <label className="text-toolnest-text font-medium block mb-2 text-xs">
                End Color
              </label>
              <input
                type="color"
                value={values.gradientEnd}
                onChange={(e) => handleInputChange('gradientEnd', e.target.value)}
                className="w-full h-8 cursor-pointer rounded-lg border border-gray-300"
              />
            </div>
          </div>
        )}
      </div>

      <div>
        <label className="text-toolnest-text font-medium block mb-2 text-sm">
          Error Correction
        </label>
        <select
          value={values.errorCorrection}
          onChange={(e) => handleInputChange('errorCorrection', e.target.value)}
          className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
        >
          <option value="L">Low (7%) - Smallest size</option>
          <option value="M">Medium (15%) - Recommended</option>
          <option value="Q">Quartile (25%) - Better</option>
          <option value="H">High (30%) - Best</option>
        </select>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="addShadow"
            checked={values.addShadow}
            onChange={(e) => handleInputChange('addShadow', e.target.checked)}
            className="rounded border-gray-300"
          />
          <label htmlFor="addShadow" className="text-toolnest-text font-medium text-sm">
            Add Shadow Effect (visual)
          </label>
        </div>
      </div>
    </div>
  );
};

export default DesignTab;