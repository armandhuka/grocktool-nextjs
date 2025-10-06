'use client';

import { Suspense } from 'react';
import ToolContent from '../components/tool/ToolContent';
import LoadingSpinner from '../components/shared/LoadingSpinner';

const ToolPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ToolContent />
    </Suspense>
  );
};

export default ToolPage;