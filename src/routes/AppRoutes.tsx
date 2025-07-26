import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePageWrapper from '@/components/wrappers/HomePageWrapper';
import CategoryManagementPageWrapper from '@/components/wrappers/CategoryManagementPageWrapper';
import TransactionHistoryPageWrapper from '@/components/wrappers/TransactionHistoryPageWrapper';
import AnalyticsPageWrapper from '@/components/wrappers/AnalyticsPageWrapper';

/**
 * Application Routes Configuration
 * 
 * This component defines all the routes for the application.
 * Each route is wrapped with its respective wrapper component
 * that handles state management and layout integration.
 */
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Main Dashboard Route */}
      <Route 
        path="/" 
        element={<HomePageWrapper />} 
      />
      
      {/* Analytics Page */}
      <Route 
        path="/analytics" 
        element={<AnalyticsPageWrapper />} 
      />
      
      {/* Transaction History */}
      <Route 
        path="/transactions" 
        element={<TransactionHistoryPageWrapper />} 
      />
      
      {/* Category Management */}
      <Route 
        path="/categories" 
        element={<CategoryManagementPageWrapper />} 
      />
      
      {/* Fallback route - redirect to dashboard */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes; 