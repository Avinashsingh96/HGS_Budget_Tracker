import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { useSearchParams } from 'react-router-dom';
import { addCustomCategory, updateCategory, deleteCategory, addTransaction } from '@/store/slices/budgetSlice';
import CategoryForm from '@/components/organisms/CategoryForm';
import CategoryList from '@/components/organisms/CategoryList';
import { TransactionForm } from '@/components/organisms/TransactionForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Category } from '@/types';

interface CategoryManagementPageProps {
  onBack: () => void;
  isTransactionFormOpen?: boolean;
  onCloseTransactionForm?: () => void;
}

const CategoryManagementPage: React.FC<CategoryManagementPageProps> = ({
  onBack,
  isTransactionFormOpen = false,
  onCloseTransactionForm
}) => {
  const dispatch = useAppDispatch();
  const { categories, transactions } = useAppSelector(state => state.budget);
  const [searchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingCategoryId, setDeletingCategoryId] = useState<string | null>(null);

  // Debug: Log categories when they change
  React.useEffect(() => {
    console.log('🔄 CategoryManagementPage categories updated:', categories);
  }, [categories]);

  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Check URL parameters to auto-open category form
  useEffect(() => {
    const action = searchParams.get('action');
    if (action === 'add') {
      setShowForm(true);
      setEditingCategory(null);
    }
  }, [searchParams]);

  const handleAddCategory = () => {
    setEditingCategory(null);
    setShowForm(true);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setShowForm(true);
  };

  const handleFormSubmit = async (categoryData: Omit<Category, 'id'>) => {
    try {
      setIsSubmitting(true);
      console.log('🔄 Submitting category:', categoryData);
      console.log('🔄 Current categories before submission:', categories.length);

      if (editingCategory) {
        console.log('📝 Updating existing category...');
        await dispatch(updateCategory({ ...editingCategory, ...categoryData })).unwrap();
        console.log('✅ Category updated successfully');
      } else {
        console.log('➕ Adding new category...');
        const result = await dispatch(addCustomCategory(categoryData)).unwrap();
        console.log('✅ Category added successfully:', result);
        console.log('🔄 Categories after adding:', categories.length);
      }

      setShowForm(false);
      setEditingCategory(null);

      // Force a small delay to ensure state updates
      setTimeout(() => {
        console.log('🔄 Final categories count:', categories.length);
      }, 100);

    } catch (error) {
      console.error('❌ Error saving category:', error);
      alert('Failed to save category. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingCategory(null);
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      setDeletingCategoryId(id);
      await dispatch(deleteCategory(id)).unwrap();
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Failed to delete category. Please try again.');
    } finally {
      setDeletingCategoryId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button
            onClick={onBack}
            variant="ghost"
            className="mb-4 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Category Management</h1>
              <p className="text-gray-600">Organize your income and expense categories</p>
            </div>

          </div>
        </div>

        {/* Category Form Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="w-full max-w-md">
              <CategoryForm
                category={editingCategory || undefined}
                onSubmit={handleFormSubmit}
                onCancel={handleFormCancel}
                isEditing={!!editingCategory}
                isSubmitting={isSubmitting}
              />
            </div>
          </div>
        )}

        {/* Category List */}
        <CategoryList
          categories={categories}
          transactions={transactions}
          onAddCategory={handleAddCategory}
          onEditCategory={handleEditCategory}
          onDeleteCategory={handleDeleteCategory}
          deletingCategoryId={deletingCategoryId}
        />

        {/* Transaction Form Modal */}
        {isTransactionFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="w-full max-w-2xl">
              <TransactionForm
                categories={categories}
                onSubmit={(newTransaction) => {
                  dispatch(addTransaction(newTransaction));
                  onCloseTransactionForm?.();
                }}
                onCancel={() => onCloseTransactionForm?.()}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryManagementPage; 