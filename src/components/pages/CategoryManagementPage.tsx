import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { useSearchParams } from 'react-router-dom';
import { addCustomCategory, updateCategory, deleteCategory, addTransaction } from '@/store/slices/budgetSlice';
import CategoryForm from '@/components/organisms/CategoryForm';
import CategoryList from '@/components/organisms/CategoryList';
import { TransactionForm } from '@/components/organisms/TransactionForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { X, Plus, Pencil } from 'lucide-react';
import { Category } from '@/types';

interface CategoryManagementPageProps {
  onBack: () => void;
  isTransactionFormOpen?: boolean;
  onCloseTransactionForm?: () => void;
  onAddCategory?: () => void;
}

const CategoryManagementPage: React.FC<CategoryManagementPageProps> = ({
  onBack,
  isTransactionFormOpen = false,
  onCloseTransactionForm,
  onAddCategory
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
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-2 sm:p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-2xl flex flex-col max-h-[90vh]">
              {/* Sticky Header */}
              <div className="flex items-center justify-between p-4 border-b flex-shrink-0 sticky top-0 bg-white z-10">
                <span className="text-xl font-bold text-green-700 flex items-center">
                  <span className="mr-2">
                    {editingCategory ? (
                      <Pencil className="h-6 w-6 text-green-700" />
                    ) : (
                      <Plus className="h-6 w-6 text-green-700" />
                    )}
                  </span>
                  {editingCategory ? 'Edit Category' : 'Add New Category'}
                </span>
                <Button variant="ghost" size="sm" onClick={handleFormCancel} className="text-gray-700 hover:bg-gray-100 rounded-full">
                  <X className="h-5 w-5" />
                </Button>
              </div>
              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-4">
                <CategoryForm
                  category={editingCategory || undefined}
                  onSubmit={handleFormSubmit}
                  onCancel={handleFormCancel}
                  isEditing={!!editingCategory}
                  isSubmitting={isSubmitting}
                  hideHeader={true}
                />
              </div>
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
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-2 sm:p-4">
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl flex flex-col max-h-[90vh]">
              {/* Sticky Header */}
              <div className="flex items-center justify-between p-4 border-b flex-shrink-0 sticky top-0 bg-white z-10">
                <span className="text-xl font-bold text-blue-700 flex items-center">
                  <span className="mr-2">
                    <Plus className="h-6 w-6 text-blue-700" />
                  </span>
                  Add New Transaction
                </span>
                <Button variant="ghost" size="sm" onClick={() => onCloseTransactionForm?.()} className="text-gray-700 hover:bg-gray-100 rounded-full">
                  <X className="h-5 w-5" />
                </Button>
              </div>
              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-4">
                <TransactionForm
                  categories={categories}
                  onSubmit={(newTransaction) => {
                    dispatch(addTransaction(newTransaction));
                    onCloseTransactionForm?.();
                  }}
                  onCancel={() => onCloseTransactionForm?.()}
                  hideHeader={true}
                  onAddCategory={onAddCategory}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryManagementPage; 