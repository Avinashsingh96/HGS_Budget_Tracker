import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateTransaction, deleteTransaction } from '@/store/slices/budgetSlice';
import { Transaction } from '@/types';
import Layout from '@/components/templates/Layout';
import TransactionHistoryPage from '@/components/pages/TransactionHistoryPage';

/**
 * Wrapper component for TransactionHistoryPage
 * 
 * Handles navigation, transaction management, form state, and layout integration
 * for the transaction history page.
 */
const TransactionHistoryPageWrapper: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { categories, transactions } = useAppSelector(state => state.budget);
  const [isTransactionFormOpen, setIsTransactionFormOpen] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [editingTransaction, setEditingTransaction] = React.useState<Transaction | null>(null);
  
  const handleBack = () => navigate('/');
  
  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsEditModalOpen(true);
  };
  
  const handleDeleteTransaction = (id: string) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      dispatch(deleteTransaction(id));
    }
  };
  
  const handleAddTransaction = () => {
    setIsTransactionFormOpen(true);
  };

  const handleAddCategory = () => {
    // Navigate to categories page with add action
    navigate('/categories?action=add');
  };
  
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingTransaction(null);
  };
  
  const handleUpdateTransaction = (updatedTransaction: Omit<Transaction, 'id'>) => {
    if (editingTransaction) {
      const transactionToUpdate: Transaction = {
        ...updatedTransaction,
        id: editingTransaction.id
      };
      dispatch(updateTransaction(transactionToUpdate));
      handleCloseEditModal();
    }
  };
  
  return (
    <Layout 
      onAddTransaction={handleAddTransaction}
      onAddCategory={handleAddCategory}
    >
      <TransactionHistoryPage
        transactions={transactions}
        categories={categories}
        onBack={handleBack}
        onEditTransaction={handleEditTransaction}
        onDeleteTransaction={handleDeleteTransaction}
        isTransactionFormOpen={isTransactionFormOpen}
        onCloseTransactionForm={() => setIsTransactionFormOpen(false)}
        isEditModalOpen={isEditModalOpen}
        onCloseEditModal={handleCloseEditModal}
        editingTransaction={editingTransaction}
        onUpdateTransaction={handleUpdateTransaction}
      />
    </Layout>
  );
};

export default TransactionHistoryPageWrapper; 