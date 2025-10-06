'use client';

import React from 'react';

interface ToolResultsCountProps {
  filteredTools: any[];
  toolsData: any[];
  selectedCategory: string;
}

const ToolResultsCount: React.FC<ToolResultsCountProps> = ({
  filteredTools,
  toolsData,
  selectedCategory
}) => {
  return (
    <div className="text-center mb-8 px-6">
      <p className="text-toolnest-text/70">
        Showing {filteredTools.length} of {toolsData.length} tools
        {selectedCategory !== 'All' && (
          <span className="ml-2 px-3 py-1 bg-toolnest-accent rounded-full text-sm font-medium">
            {selectedCategory}
          </span>
        )}
      </p>
    </div>
  );
};

export default ToolResultsCount;