/**
 * Main Application Component
 * 
 * This component serves as the root of the HGS Budget Tracker application.
 * It handles routing, global state management, and provides the main layout structure.
 * 
 * Features:
 * - Responsive layout with sidebar navigation
 * - Global state management with Redux Toolkit
 * - Error boundaries for better error handling
 * - Loading states and user feedback
 * - Lazy loading for better performance
 */

import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// Import extracted components
import ErrorBoundary from '@/components/ErrorBoundary';
import PageLoader from '@/components/PageLoader';
import AppRoutes from '@/routes/AppRoutes';

// Import custom hook for app initialization
import { useAppInitialization } from '@/hooks/useAppInitialization';

// Import global styles
import './index.css';

/**
 * Main App Component
 * 
 * Provides the root structure for the application including:
 * - Error boundary for catching and handling errors
 * - Router for navigation
 * - Suspense for lazy loading
 * - App initialization
 */
const App: React.FC = () => {
  // Initialize application on mount
  useAppInitialization();

  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Suspense fallback={<PageLoader />}>
            <AppRoutes />
          </Suspense>
        </div>
      </Router>
    </ErrorBoundary>
  );
};

export default App; 