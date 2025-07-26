import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addCustomCategory } from '@/store/slices/budgetSlice';
import { Category } from '@/types';
import CategoryForm from '@/components/organisms/CategoryForm';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
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
  const dispatch = useAppDispatch();
  const { categories, transactions } = useAppSelector(state => state.budget);
  const [isTransactionFormOpen, setIsTransactionFormOpen] = React.useState(false);
  const [isCategoryFormOpen, setIsCategoryFormOpen] = React.useState(false);
  
  const handleBack = () => navigate('/');
  
  const handleAddTransaction = () => {
    setIsTransactionFormOpen(true);
  };

  const handleAddCategory = () => {
    setIsCategoryFormOpen(true);
  };

  const handleCategorySubmit = (category: Omit<Category, 'id'>) => {
    dispatch(addCustomCategory(category));
    setIsCategoryFormOpen(false);
  };

  const handleCategoryCancel = () => {
    setIsCategoryFormOpen(false);
  };
  
  return (
    <>
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
          onAddCategory={handleAddCategory}
        />
      </Layout>

      {/* Category Form Modal */}
      {isCategoryFormOpen && (
        <div 
          className="fixed inset-0 z-[60] bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4"
          onClick={handleCategoryCancel}
        >
          <div 
            className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center space-x-2">
                <Plus className="h-5 w-5 text-green-700" />
                <h2 className="text-lg font-semibold text-green-700">Add New Category</h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCategoryCancel}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <CategoryForm
                key={`category-form-${isCategoryFormOpen}`}
                onSubmit={handleCategorySubmit}
                onCancel={handleCategoryCancel}
                hideHeader={true}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AnalyticsPageWrapper; 