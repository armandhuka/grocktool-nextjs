'use client';

import React from 'react';
import { Grid, List } from 'lucide-react';

interface ViewModeToggleProps {
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
}

const ViewModeToggle: React.FC<ViewModeToggleProps> = ({ viewMode, setViewMode }) => {
  return (
    <div className="flex bg-gray-100 rounded-lg p-1">
      <button
        onClick={() => setViewMode('grid')}
        className={`p-2 rounded-md transition-all duration-200 flex items-center gap-2 ${
          viewMode === 'grid' 
            ? 'bg-white text-toolnest-text shadow-sm' 
            : 'text-gray-500 hover:text-toolnest-text'
        }`}
        aria-label="Grid view"
      >
        <Grid size={18} />
      </button>
      <button
        onClick={() => setViewMode('list')}
        className={`p-2 rounded-md transition-all duration-200 flex items-center gap-2 ${
          viewMode === 'list' 
            ? 'bg-white text-toolnest-text shadow-sm' 
            : 'text-gray-500 hover:text-toolnest-text'
        }`}
        aria-label="List view"
      >
        <List size={18} />
      </button>
    </div>
  );
};

export default ViewModeToggle;