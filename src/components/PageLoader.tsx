import React from 'react';

/**
 * Loading component for lazy-loaded routes
 * 
 * This component provides a consistent loading experience
 * while components are being lazy-loaded.
 */
const PageLoader: React.FC = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

export default PageLoader; 