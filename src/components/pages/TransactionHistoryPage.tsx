import React, { useState } from 'react';
import { Transaction, Category } from '@/types';
import TransactionSearch from '@/components/organisms/TransactionSearch';
import TransactionExport from '@/components/organisms/TransactionExport';
import TransactionItem from '@/components/molecules/TransactionItem';
import { TransactionForm } from '@/components/organisms/TransactionForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Download, FileText } from 'lucide-react';
import { useAppDispatch } from '@/store/hooks';
import { addTransaction } from '@/store/slices/budgetSlice';

interface TransactionHistoryPageProps {
  transactions: Transaction[];
  categories: Category[];
  onBack: () => void;
  onEditTransaction: (transaction: Transaction) => void;
  onDeleteTransaction: (id: string) => void;
  isTransactionFormOpen?: boolean;
  onCloseTransactionForm?: () => void;
  isEditModalOpen?: boolean;
  onCloseEditModal?: () => void;
  editingTransaction?: Transaction | null;
  onUpdateTransaction?: (updatedTransaction: Omit<Transaction, 'id'>) => void;
}

const TransactionHistoryPage: React.FC<TransactionHistoryPageProps> = ({
  transactions,
  categories,
  onBack,
  onEditTransaction,
  onDeleteTransaction,
  isTransactionFormOpen = false,
  onCloseTransactionForm,
  isEditModalOpen = false,
  onCloseEditModal,
  editingTransaction,
  onUpdateTransaction
}) => {
  const dispatch = useAppDispatch();
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(transactions);
  const [showExport, setShowExport] = useState(false);

  const handleEdit = (transaction: Transaction) => {
    onEditTransaction(transaction);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      onDeleteTransaction(id);
    }
  };

  // Calculate summary for filtered transactions
  const summary = {
    totalIncome: filteredTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0),
    totalExpenses: filteredTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0),
    balance: 0,
    count: filteredTransactions.length
  };
  summary.balance = summary.totalIncome - summary.totalExpenses;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button
            onClick={onBack}
            variant="ghost"
            className="mb-4 text-gray-600 hover:text-gray-800 flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Transaction History
              </h1>
              <p className="text-gray-600">
                Search, filter, and export your transaction data
              </p>
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={() => setShowExport(!showExport)}
                variant="outline"
                className="border-green-300 text-green-700 hover:bg-green-50"
              >
                <Download className="h-4 w-4 mr-2" />
                {showExport ? 'Hide' : 'Show'} Export
              </Button>
            </div>
          </div>
        </div>

        {/* Search & Filter */}
        <TransactionSearch
          transactions={transactions}
          categories={categories}
          onFilterChange={setFilteredTransactions}
        />

        {/* Export Section */}
        {showExport && (
          <TransactionExport
            transactions={transactions}
            filteredTransactions={filteredTransactions}
          />
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Total Transactions</p>
                  <p className="text-2xl font-bold text-blue-800">{summary.count}</p>
                </div>
                <div className="p-2 bg-blue-200 rounded-full">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Total Income</p>
                  <p className="text-2xl font-bold text-green-800">₹{summary.totalIncome.toLocaleString()}</p>
                </div>
                <div className="p-2 bg-green-200 rounded-full">
                  <span className="text-2xl">💰</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-600 font-medium">Total Expenses</p>
                  <p className="text-2xl font-bold text-red-800">₹{summary.totalExpenses.toLocaleString()}</p>
                </div>
                <div className="p-2 bg-red-200 rounded-full">
                  <span className="text-2xl">💸</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={`bg-gradient-to-br ${summary.balance >= 0 ? 'from-emerald-50 to-emerald-100 border-emerald-200' : 'from-orange-50 to-orange-100 border-orange-200'}`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium" style={{ color: summary.balance >= 0 ? '#059669' : '#ea580c' }}>
                    Net Balance
                  </p>
                  <p className="text-2xl font-bold" style={{ color: summary.balance >= 0 ? '#047857' : '#c2410c' }}>
                    ₹{summary.balance.toLocaleString()}
                  </p>
                </div>
                <div className={`p-2 rounded-full ${summary.balance >= 0 ? 'bg-emerald-200' : 'bg-orange-200'}`}>
                  <span className="text-2xl">{summary.balance >= 0 ? '📈' : '📉'}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transactions List */}
        <Card className="bg-white shadow-lg border-0 rounded-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold text-white">
                  Transaction List
                </CardTitle>
                <p className="text-indigo-100 text-sm mt-1">
                  {filteredTransactions.length} transaction(s) found
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm text-indigo-100">Showing</div>
                <div className="text-2xl font-bold">{filteredTransactions.length}</div>
                <div className="text-sm text-indigo-100">transactions</div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            {filteredTransactions.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Transactions Found</h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your search criteria or filters to find transactions.
                </p>
                <Button
                  onClick={() => setFilteredTransactions(transactions)}
                  variant="outline"
                  className="border-indigo-300 text-indigo-700 hover:bg-indigo-50"
                >
                  Show All Transactions
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTransactions.map((transaction) => (
                  <TransactionItem
                    key={transaction.id}
                    transaction={transaction}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pagination Info */}
        {filteredTransactions.length > 0 && (
          <div className="mt-6 text-center text-sm text-gray-600">
            Showing {filteredTransactions.length} of {transactions.length} total transactions
          </div>
        )}

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

        {/* Edit Transaction Modal */}
        {isEditModalOpen && editingTransaction && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="w-full max-w-2xl">
              <TransactionForm
                categories={categories}
                transaction={editingTransaction}
                onSubmit={(updatedTransaction) => {
                  onUpdateTransaction?.(updatedTransaction);
                }}
                onCancel={() => onCloseEditModal?.()}
                isEditing={true}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistoryPage; 