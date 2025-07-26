import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/templates/Layout';
import HomePage from '@/components/pages/HomePage';

/**
 * Wrapper component for HomePage
 * 
 * Handles the transaction form state and layout integration
 * for the main dashboard page.
 */
const HomePageWrapper: React.FC = () => {
  const navigate = useNavigate();
  const [isTransactionFormOpen, setIsTransactionFormOpen] = React.useState(false);
  const [isCategoryFormOpen, setIsCategoryFormOpen] = React.useState(false);
  
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
      <HomePage 
        isTransactionFormOpen={isTransactionFormOpen}
        onCloseTransactionForm={() => setIsTransactionFormOpen(false)}
      />
    </Layout>
  );
};

export default HomePageWrapper; 