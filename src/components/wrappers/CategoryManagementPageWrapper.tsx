import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/templates/Layout';
import CategoryManagementPage from '@/components/pages/CategoryManagementPage';

/**
 * Wrapper component for CategoryManagementPage
 * 
 * Handles navigation, transaction form state, and layout integration
 * for the category management page.
 */
const CategoryManagementPageWrapper: React.FC = () => {
  const navigate = useNavigate();
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
      <CategoryManagementPage
        onBack={handleBack}
        isTransactionFormOpen={isTransactionFormOpen}
        onCloseTransactionForm={() => setIsTransactionFormOpen(false)}
      />
    </Layout>
  );
};

export default CategoryManagementPageWrapper; 