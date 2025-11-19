'use client';

import React from 'react';
import { Palette, Contrast, Zap } from 'lucide-react';

interface DesignTabProps {
  values: any;
  handleInputChange: (field: string, value: any) => void;
}

const DesignTab: React.FC<DesignTabProps> = ({ values, handleInputChange }) => {
  const inputClassName = "w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground";
  const labelClassName = "block text-sm font-medium text-foreground";

  const presetThemes = [
    { name: 'Classic', color: '#000000', bgColor: '#FFFFFF' },
    { name: 'Dark', color: '#FFFFFF', bgColor: '#000000' },
    { name: 'Blue', color: '#2563EB', bgColor: '#F0F9FF' },
    { name: 'Green', color: '#059669', bgColor: '#F0FDF4' },
    { name: 'Purple', color: '#7C3AED', bgColor: '#FAF5FF' },
  ];

  return (
    <div className="space-y-6">
      {/* Size Control */}
      <div>
        <label className={labelClassName}>
          QR Code Size: {values.size}px
        </label>
        <input
          type="range"
          min="100"
          max="1000"
          value={values.size}
          onChange={(e) => handleInputChange('size', Number(e.target.value))}
          className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>100px</span>
          <span>550px</span>
          <span>1000px</span>
        </div>
      </div>

      {/* Color Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClassName}>
            QR Color
          </label>
          <div className="flex items-center gap-2 mt-1">
            <input
              type="color"
              value={values.color}
              onChange={(e) => handleInputChange('color', e.target.value)}
              className="w-10 h-10 cursor-pointer rounded-lg border border-border"
            />
            <input
              value={values.color}
              onChange={(e) => handleInputChange('color', e.target.value)}
              className={inputClassName}
              placeholder="#000000"
            />
          </div>
        </div>
        <div>
          <label className={labelClassName}>
            Background
          </label>
          <div className="flex items-center gap-2 mt-1">
            <input
              type="color"
              value={values.bgColor}
              onChange={(e) => handleInputChange('bgColor', e.target.value)}
              className="w-10 h-10 cursor-pointer rounded-lg border border-border"
            />
            <input
              value={values.bgColor}
              onChange={(e) => handleInputChange('bgColor', e.target.value)}
              className={inputClassName}
              placeholder="#FFFFFF"
            />
          </div>
        </div>
      </div>

      {/* Preset Themes */}
      <div>
        <label className={labelClassName}>Quick Themes</label>
        <div className="grid grid-cols-5 gap-2 mt-2">
          {presetThemes.map((theme, index) => (
            <button
              key={index}
              onClick={() => {
                handleInputChange('color', theme.color);
                handleInputChange('bgColor', theme.bgColor);
              }}
              className="flex flex-col items-center p-2 rounded-lg border border-border hover:border-accent transition-colors"
              title={theme.name}
            >
              <div 
                className="w-6 h-6 rounded border"
                style={{ 
                  backgroundColor: theme.bgColor,
                  borderColor: theme.color 
                }}
              />
              <span className="text-xs mt-1 text-foreground">{theme.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Advanced Options */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Zap size={16} className="text-foreground" />
          <label className={labelClassName}>Advanced Options</label>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="useGradient"
              checked={values.useGradient}
              onChange={(e) => handleInputChange('useGradient', e.target.checked)}
              className="rounded border-border"
            />
            <label htmlFor="useGradient" className="text-sm text-foreground">
              Use Gradient Colors
            </label>
          </div>
          
          {values.useGradient && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-foreground">Start Color</label>
                <input
                  type="color"
                  value={values.gradientStart}
                  onChange={(e) => handleInputChange('gradientStart', e.target.value)}
                  className="w-full h-8 cursor-pointer rounded-lg border border-border"
                />
              </div>
              <div>
                <label className="text-xs text-foreground">End Color</label>
                <input
                  type="color"
                  value={values.gradientEnd}
                  onChange={(e) => handleInputChange('gradientEnd', e.target.value)}
                  className="w-full h-8 cursor-pointer rounded-lg border border-border"
                />
              </div>
            </div>
          )}
        </div>

        <div>
          <label className={labelClassName}>
            Error Correction
          </label>
          <select
            value={values.errorCorrection}
            onChange={(e) => handleInputChange('errorCorrection', e.target.value)}
            className={inputClassName}
          >
            <option value="L">Low (7%) - Smallest size</option>
            <option value="M">Medium (15%) - Recommended</option>
            <option value="Q">Quartile (25%) - Better</option>
            <option value="H">High (30%) - Best</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="addShadow"
            checked={values.addShadow}
            onChange={(e) => handleInputChange('addShadow', e.target.checked)}
            className="rounded border-border"
          />
          <label htmlFor="addShadow" className="text-sm text-foreground">
            Add Shadow Effect
          </label>
        </div>
      </div>
    </div>
  );
};

export default DesignTab;