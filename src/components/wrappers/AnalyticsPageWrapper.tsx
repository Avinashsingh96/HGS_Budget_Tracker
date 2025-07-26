import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import Layout from '@/components/templates/Layout';
import AnalyticsPage from '@/components/pages/AnalyticsPage';

/**
 * Wrapper component for AnalyticsPage
 * 
 * Handles navigation, transaction form state, and layout integration
 * for the analytics page.
 */
const AnalyticsPageWrapper: React.FC = () => {
  const navigate = useNavigate();
  const { categories, transactions } = useAppSelector(state => state.budget);
  const [isTransactionFormOpen, setIsTransactionFormOpen] = React.useState(false);
  
  const handleBack = () => navigate('/');
  
  const handleAddTransaction = () => {
    setIsTransactionFormOpen(true);
  };

  const handleAddCategory = () => {
    // Navigate to categories page with add action
    navigate('/categories?action=add');
  };
  
  return (
    <Layout 
      onAddTransaction={handleAddTransaction}
      onAddCategory={handleAddCategory}
    >
      <AnalyticsPage
        transactions={transactions}
        categories={categories}
        onBack={handleBack}
        isTransactionFormOpen={isTransactionFormOpen}
        onCloseTransactionForm={() => setIsTransactionFormOpen(false)}
      />
    </Layout>
  );
};

export default AnalyticsPageWrapper; 