import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Transaction } from '@/types';
import { Download, FileText, Calendar, Filter } from 'lucide-react';

interface TransactionExportProps {
  transactions: Transaction[];
  filteredTransactions: Transaction[];
}

interface ExportOptions {
  format: 'csv' | 'json';
  dateRange: 'all' | 'current-month' | 'current-year' | 'last-month' | 'last-year';
  includeHeaders: boolean;
  filename: string;
}

const TransactionExport: React.FC<TransactionExportProps> = ({
  transactions,
  filteredTransactions
}) => {
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    format: 'csv',
    dateRange: 'all',
    includeHeaders: true,
    filename: `budget-transactions-${new Date().toISOString().split('T')[0]}`
  });

  const getTransactionsToExport = (): Transaction[] => {
    let transactionsToExport = filteredTransactions.length > 0 ? filteredTransactions : transactions;

    // Apply date range filter
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    switch (exportOptions.dateRange) {
      case 'current-month':
        transactionsToExport = transactionsToExport.filter(t => {
          const date = new Date(t.date);
          return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
        });
        break;
      case 'current-year':
        transactionsToExport = transactionsToExport.filter(t => {
          const date = new Date(t.date);
          return date.getFullYear() === currentYear;
        });
        break;
      case 'last-month':
        const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
        transactionsToExport = transactionsToExport.filter(t => {
          const date = new Date(t.date);
          return date.getMonth() === lastMonth && date.getFullYear() === lastMonthYear;
        });
        break;
      case 'last-year':
        transactionsToExport = transactionsToExport.filter(t => {
          const date = new Date(t.date);
          return date.getFullYear() === currentYear - 1;
        });
        break;
      default:
        // 'all' - no filtering needed
        break;
    }

    return transactionsToExport;
  };

  const generateCSV = (transactions: Transaction[]): string => {
    const headers = ['Date', 'Type', 'Category', 'Description', 'Amount', 'Icon'];
    const rows = transactions.map(t => [
      t.date,
      t.type,
      t.category,
      t.description,
      t.amount.toString(),
      t.icon
    ]);

    let csv = '';
    if (exportOptions.includeHeaders) {
      csv += headers.join(',') + '\n';
    }
    csv += rows.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    return csv;
  };

  const generateJSON = (transactions: Transaction[]): string => {
    return JSON.stringify(transactions, null, 2);
  };

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExport = () => {
    const transactionsToExport = getTransactionsToExport();
    
    if (transactionsToExport.length === 0) {
      alert('No transactions to export with the current filters.');
      return;
    }

    const extension = exportOptions.format === 'csv' ? 'csv' : 'json';
    const filename = `${exportOptions.filename}.${extension}`;
    const mimeType = exportOptions.format === 'csv' ? 'text/csv' : 'application/json';

    let content: string;
    if (exportOptions.format === 'csv') {
      content = generateCSV(transactionsToExport);
    } else {
      content = generateJSON(transactionsToExport);
    }

    downloadFile(content, filename, mimeType);
  };

  const getDateRangeLabel = (range: string): string => {
    switch (range) {
      case 'all': return 'All Time';
      case 'current-month': return 'Current Month';
      case 'current-year': return 'Current Year';
      case 'last-month': return 'Last Month';
      case 'last-year': return 'Last Year';
      default: return 'All Time';
    }
  };

  const transactionsToExport = getTransactionsToExport();
  const totalAmount = transactionsToExport.reduce((sum, t) => {
    return t.type === 'income' ? sum + t.amount : sum - t.amount;
  }, 0);

  return (
    <Card className="bg-white shadow-lg border-0 rounded-xl overflow-hidden mb-6">
      <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold text-white flex items-center">
              <Download className="h-5 w-5 mr-2" />
              Export Transactions
            </CardTitle>
            <p className="text-green-100 text-sm mt-1">
              Export your transaction data for analysis or backup
            </p>
          </div>
          <div className="flex space-x-2">
            <Button
              onClick={() => setShowExportOptions(!showExportOptions)}
              variant="outline"
              size="sm"
              className="bg-white/20 text-white border-white/30 hover:bg-white/30"
            >
              <Filter className="h-4 w-4 mr-2" />
              {showExportOptions ? 'Hide' : 'Show'} Options
            </Button>
            <Button
              onClick={handleExport}
              className="bg-white text-green-600 hover:bg-green-50 px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              <FileText className="h-4 w-4 mr-2" />
              Export Now
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {/* Export Summary */}
        <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-green-600 font-semibold">Transactions to Export:</span>
              <div className="text-green-800 font-bold text-lg">{transactionsToExport.length}</div>
            </div>
            <div>
              <span className="text-green-600 font-semibold">Date Range:</span>
              <div className="text-green-800">{getDateRangeLabel(exportOptions.dateRange)}</div>
            </div>
            <div>
              <span className="text-green-600 font-semibold">Format:</span>
              <div className="text-green-800 uppercase">{exportOptions.format}</div>
            </div>
            <div>
              <span className="text-green-600 font-semibold">Net Amount:</span>
              <div className={`font-bold text-lg ${totalAmount >= 0 ? 'text-green-700' : 'text-red-600'}`}>
                ₹{totalAmount.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Export Options */}
        {showExportOptions && (
          <div className="space-y-6">
            {/* First Row - Format and Date Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Export Format
                </label>
                <Select
                  value={exportOptions.format}
                  onValueChange={(value: 'csv' | 'json') => 
                    setExportOptions(prev => ({ ...prev, format: value }))
                  }
                >
                  <SelectTrigger className="h-10 border-2 border-gray-200 hover:border-green-300 focus:border-green-500 rounded-lg">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="csv">CSV (Excel Compatible)</SelectItem>
                    <SelectItem value="json">JSON (Developer Friendly)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Date Range
                </label>
                <Select
                  value={exportOptions.dateRange}
                  onValueChange={(value: 'all' | 'current-month' | 'current-year' | 'last-month' | 'last-year') => 
                    setExportOptions(prev => ({ ...prev, dateRange: value }))
                  }
                >
                  <SelectTrigger className="h-10 border-2 border-gray-200 hover:border-green-300 focus:border-green-500 rounded-lg">
                    <SelectValue placeholder="Select date range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="current-month">Current Month</SelectItem>
                    <SelectItem value="current-year">Current Year</SelectItem>
                    <SelectItem value="last-month">Last Month</SelectItem>
                    <SelectItem value="last-year">Last Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Second Row - Filename and Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Filename</label>
                <input
                  type="text"
                  value={exportOptions.filename}
                  onChange={(e) => setExportOptions(prev => ({ ...prev, filename: e.target.value }))}
                  className="w-full h-10 px-3 border-2 border-gray-200 hover:border-green-300 focus:border-green-500 rounded-lg focus:outline-none"
                  placeholder="Enter filename"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">CSV Options</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="includeHeaders"
                    checked={exportOptions.includeHeaders}
                    onChange={(e) => setExportOptions(prev => ({ ...prev, includeHeaders: e.target.checked }))}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor="includeHeaders" className="text-sm text-gray-700">
                    Include column headers
                  </label>
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Export Preview:</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <div>📄 File: <span className="font-mono">{exportOptions.filename}.{exportOptions.format}</span></div>
                <div>📊 Records: <span className="font-semibold">{transactionsToExport.length}</span> transactions</div>
                <div>📅 Period: <span className="font-semibold">{getDateRangeLabel(exportOptions.dateRange)}</span></div>
                <div>💰 Net Amount: <span className={`font-semibold ${totalAmount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ₹{totalAmount.toLocaleString()}
                </span></div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Export Buttons */}
        {!showExportOptions && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              onClick={() => {
                setExportOptions(prev => ({ ...prev, format: 'csv', dateRange: 'current-month' }));
                handleExport();
              }}
              variant="outline"
              className="border-green-200 text-green-700 hover:bg-green-50"
            >
              <Download className="h-4 w-4 mr-2" />
              Export This Month
            </Button>
            <Button
              onClick={() => {
                setExportOptions(prev => ({ ...prev, format: 'csv', dateRange: 'current-year' }));
                handleExport();
              }}
              variant="outline"
              className="border-blue-200 text-blue-700 hover:bg-blue-50"
            >
              <Download className="h-4 w-4 mr-2" />
              Export This Year
            </Button>
            <Button
              onClick={() => {
                setExportOptions(prev => ({ ...prev, format: 'csv', dateRange: 'all' }));
                handleExport();
              }}
              variant="outline"
              className="border-purple-200 text-purple-700 hover:bg-purple-50"
            >
              <Download className="h-4 w-4 mr-2" />
              Export All Data
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionExport; 