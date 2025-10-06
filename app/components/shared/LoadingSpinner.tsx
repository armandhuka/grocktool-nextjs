'use client';

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-toolnest-bg font-inter pt-20 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-toolnest-text mx-auto"></div>
        <p className="mt-4 text-toolnest-text">Loading tools...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;