import React from 'react';
import { Transaction } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, Edit } from 'lucide-react';
import { format } from 'date-fns';

interface TransactionItemProps {
  transaction: Transaction;
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
}

const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
  onEdit,
  onDelete,
}) => {
  const isIncome = transaction.type === 'income';
  // const amountColor = isIncome ? 'text-green-600' : 'text-red-600';
  const amountPrefix = isIncome ? '+' : '-';

  return (
    <Card className="mb-4 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] border-l-4 border-l-blue-500 bg-gradient-to-r from-white to-blue-50">
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-3xl bg-white p-3 rounded-full shadow-md">
              {transaction.icon}
            </div>
            <div>
              <h4 className="font-semibold text-lg text-gray-800 mb-1">{transaction.description}</h4>
              <p className="text-sm text-gray-600 font-medium">{transaction.category}</p>
              <p className="text-xs text-gray-500">
                📅 {format(new Date(transaction.date), 'MMM dd, yyyy')}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className={`text-xl font-bold px-4 py-2 rounded-full ${isIncome ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {amountPrefix}₹{transaction.amount.toLocaleString()}
            </span>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(transaction)}
                className="h-10 w-10 p-0 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-full"
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(transaction.id)}
                className="h-10 w-10 p-0 bg-red-50 hover:bg-red-100 text-red-600 rounded-full"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionItem; 