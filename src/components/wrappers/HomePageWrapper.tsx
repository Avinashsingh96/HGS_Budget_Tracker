import React from 'react';

import { useAppDispatch } from '@/store/hooks';
import { addCustomCategory } from '@/store/slices/budgetSlice';
import { Category } from '@/types';
import Layout from '@/components/templates/Layout';
import HomePage from '@/components/pages/HomePage';
import CategoryForm from '@/components/organisms/CategoryForm';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';

/**
 * Wrapper component for HomePage
 * 
 * Handles the transaction form state and layout integration
 * for the main dashboard page.
 */
const HomePageWrapper: React.FC = () => {
 
  const dispatch = useAppDispatch();
  const [isTransactionFormOpen, setIsTransactionFormOpen] = React.useState(false);
  const [isCategoryFormOpen, setIsCategoryFormOpen] = React.useState(false);
  
  const handleAddTransaction = () => {
    setIsTransactionFormOpen(true);
  };

  const handleAddCategory = () => {
    console.log('🔄 HomePageWrapper handleAddCategory called, opening category modal');
    setIsCategoryFormOpen(true);
  };

  const handleCategorySubmit = async (categoryData: Omit<Category, 'id'>) => {
    try {
      console.log('🔄 HomePageWrapper handleCategorySubmit called, submitting category:', categoryData);
      await dispatch(addCustomCategory(categoryData)).unwrap();
      console.log('🔄 Category submitted successfully, closing modal');
      setIsCategoryFormOpen(false);
    } catch (error) {
      console.error('Error adding category:', error);
      alert('Failed to add category. Please try again.');
    }
  };

  const handleCategoryCancel = () => {
    console.log('🔄 HomePageWrapper handleCategoryCancel called, closing modal');
    setIsCategoryFormOpen(false);
  };
  
  return (
    <>
      <Layout 
        onAddTransaction={handleAddTransaction}
        onAddCategory={handleAddCategory}
      >
                <HomePage
          isTransactionFormOpen={isTransactionFormOpen}
          onCloseTransactionForm={() => setIsTransactionFormOpen(false)}
          onAddTransaction={handleAddTransaction}
          onAddCategory={handleAddCategory}
        />
      </Layout>

      {/* Category Form Modal */}
      {isCategoryFormOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-50 p-2 sm:p-4" onClick={handleCategoryCancel}>
          <div className="w-full max-w-md bg-white rounded-xl shadow-2xl flex flex-col max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            {/* Sticky Header */}
            <div className="flex items-center justify-between p-4 border-b flex-shrink-0 sticky top-0 bg-white z-10">
              <span className="text-xl font-bold text-green-700 flex items-center">
                <span className="mr-2">
                  <Plus className="h-6 w-6 text-green-700" />
                </span>
                Add New Category
              </span>
              <Button variant="ghost" size="sm" onClick={handleCategoryCancel} className="text-gray-700 hover:bg-gray-100 rounded-full">
                <X className="h-5 w-5" />
              </Button>
            </div>
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-4">
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

export default HomePageWrapper; 