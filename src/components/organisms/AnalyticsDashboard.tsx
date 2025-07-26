import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Transaction, Category } from '@/types';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, 
  ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  AreaChart, Area
} from 'recharts';
import { 
  TrendingUp, TrendingDown, BarChart3, PieChart as PieChartIcon, 
  Calendar, DollarSign, Target, AlertTriangle, CheckCircle 
} from 'lucide-react';

interface AnalyticsDashboardProps {
  transactions: Transaction[];
  categories: Category[];
}

type ChartType = 'spending-trends' | 'category-breakdown' | 'income-vs-expense' | 'monthly-comparison';
type TimeRange = '7-days' | '30-days' | '3-months' | '6-months' | '1-year' | 'all-time';

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  transactions,
  categories
}) => {
  const [selectedChart, setSelectedChart] = useState<ChartType>('spending-trends');
  const [timeRange, setTimeRange] = useState<TimeRange>('30-days');

  // Chart colors
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FF6B6B', '#4ECDC4'];

  // Calculate date range based on selection
  const getDateRange = () => {
    const now = new Date();
    const startDate = new Date();

    switch (timeRange) {
      case '7-days':
        startDate.setDate(now.getDate() - 7);
        break;
      case '30-days':
        startDate.setDate(now.getDate() - 30);
        break;
      case '3-months':
        startDate.setMonth(now.getMonth() - 3);
        break;
      case '6-months':
        startDate.setMonth(now.getMonth() - 6);
        break;
      case '1-year':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      case 'all-time':
        startDate.setFullYear(2000); // Very old date to include all
        break;
    }

    return { startDate, endDate: now };
  };

  // Filter transactions by date range
  const filteredTransactions = useMemo(() => {
    const { startDate, endDate } = getDateRange();
    return transactions.filter(t => {
      const transactionDate = new Date(t.date);
      return transactionDate >= startDate && transactionDate <= endDate;
    });
  }, [transactions, timeRange]);

  // Debug: Log props and data
  React.useEffect(() => {
    console.log('🔄 AnalyticsDashboard data:', { 
      transactions: transactions.length, 
      categories: categories.length,
      filteredTransactions: filteredTransactions.length,
      timeRange
    });
  }, [transactions, categories, filteredTransactions, timeRange]);

  // Spending trends data (daily)
  const spendingTrendsData = useMemo(() => {
    const dailyData: { [key: string]: { income: number; expense: number; date: string } } = {};
    
    filteredTransactions.forEach(t => {
      const date = t.date;
      if (!dailyData[date]) {
        dailyData[date] = { income: 0, expense: 0, date };
      }
      
      if (t.type === 'income') {
        dailyData[date].income += t.amount;
      } else {
        dailyData[date].expense += t.amount;
      }
    });

    return Object.values(dailyData)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map(item => ({
        ...item,
        net: item.income - item.expense,
        date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      }));
  }, [filteredTransactions]);

  // Category breakdown data
  const categoryBreakdownData = useMemo(() => {
    const categoryTotals: { [key: string]: number } = {};
    
    filteredTransactions
      .filter(t => t.type === 'expense')
      .forEach(t => {
        categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
      });

    return Object.entries(categoryTotals)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8); // Top 8 categories
  }, [filteredTransactions]);

  // Monthly comparison data
  const monthlyComparisonData = useMemo(() => {
    const monthlyData: { [key: string]: { income: number; expense: number; month: string } } = {};
    
    filteredTransactions.forEach(t => {
      const date = new Date(t.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const monthLabel = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { income: 0, expense: 0, month: monthLabel };
      }
      
      if (t.type === 'income') {
        monthlyData[monthKey].income += t.amount;
      } else {
        monthlyData[monthKey].expense += t.amount;
      }
    });

    return Object.values(monthlyData)
      .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime())
      .map(item => ({
        ...item,
        net: item.income - item.expense,
        savingsRate: item.income > 0 ? ((item.income - item.expense) / item.income * 100) : 0
      }));
  }, [filteredTransactions]);

  // Income vs Expense data
  const incomeVsExpenseData = useMemo(() => {
    const totalIncome = filteredTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpense = filteredTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return [
      { name: 'Income', value: totalIncome, color: '#10B981' },
      { name: 'Expenses', value: totalExpense, color: '#EF4444' }
    ];
  }, [filteredTransactions]);

  // Financial insights
  const insights = useMemo(() => {
    const totalIncome = filteredTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpense = filteredTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const netIncome = totalIncome - totalExpense;
    const savingsRate = totalIncome > 0 ? (netIncome / totalIncome * 100) : 0;
    
    const avgDailyExpense = filteredTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0) / Math.max(spendingTrendsData.length, 1);

    const topCategory = categoryBreakdownData[0];
    const topCategoryPercentage = totalExpense > 0 ? (topCategory?.value / totalExpense * 100) : 0;

    return {
      netIncome,
      savingsRate,
      avgDailyExpense,
      topCategory: topCategory?.name || 'None',
      topCategoryPercentage,
      isPositive: netIncome >= 0,
      isHealthy: savingsRate >= 20
    };
  }, [filteredTransactions, spendingTrendsData, categoryBreakdownData]);

  const renderChart = () => {
    switch (selectedChart) {
      case 'spending-trends':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={spendingTrendsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => [`₹${value.toLocaleString()}`, '']}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="income" 
                stackId="1" 
                stroke="#10B981" 
                fill="#10B981" 
                fillOpacity={0.6}
                name="Income"
              />
              <Area 
                type="monotone" 
                dataKey="expense" 
                stackId="1" 
                stroke="#EF4444" 
                fill="#EF4444" 
                fillOpacity={0.6}
                name="Expenses"
              />
            </AreaChart>
          </ResponsiveContainer>
        );

      case 'category-breakdown':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={categoryBreakdownData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryBreakdownData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Amount']} />
            </PieChart>
          </ResponsiveContainer>
        );

      case 'income-vs-expense':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={incomeVsExpenseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Amount']} />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'monthly-comparison':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={monthlyComparisonData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => [`₹${value.toLocaleString()}`, '']}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="income" 
                stroke="#10B981" 
                strokeWidth={3}
                name="Income"
              />
              <Line 
                type="monotone" 
                dataKey="expense" 
                stroke="#EF4444" 
                strokeWidth={3}
                name="Expenses"
              />
              <Line 
                type="monotone" 
                dataKey="net" 
                stroke="#3B82F6" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Net"
              />
            </LineChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Chart Type Selector */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedChart === 'spending-trends' ? 'default' : 'outline'}
          onClick={() => setSelectedChart('spending-trends')}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
        >
          <TrendingUp className="h-4 w-4 mr-2" />
          Spending Trends
        </Button>
        <Button
          variant={selectedChart === 'category-breakdown' ? 'default' : 'outline'}
          onClick={() => setSelectedChart('category-breakdown')}
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
        >
          <PieChartIcon className="h-4 w-4 mr-2" />
          Category Breakdown
        </Button>
        <Button
          variant={selectedChart === 'income-vs-expense' ? 'default' : 'outline'}
          onClick={() => setSelectedChart('income-vs-expense')}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
        >
          <BarChart3 className="h-4 w-4 mr-2" />
          Income vs Expense
        </Button>
        <Button
          variant={selectedChart === 'monthly-comparison' ? 'default' : 'outline'}
          onClick={() => setSelectedChart('monthly-comparison')}
          className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white"
        >
          <Calendar className="h-4 w-4 mr-2" />
          Monthly Comparison
        </Button>
      </div>

      {/* Time Range Selector */}
      <div className="flex justify-end">
        <Select value={timeRange} onValueChange={(value: TimeRange) => setTimeRange(value)}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7-days">Last 7 Days</SelectItem>
            <SelectItem value="30-days">Last 30 Days</SelectItem>
            <SelectItem value="3-months">Last 3 Months</SelectItem>
            <SelectItem value="6-months">Last 6 Months</SelectItem>
            <SelectItem value="1-year">Last Year</SelectItem>
            <SelectItem value="all-time">All Time</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Main Chart */}
      <Card className="bg-white shadow-lg border-0 rounded-xl overflow-hidden">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-semibold text-gray-800">
            {selectedChart === 'spending-trends' && 'Daily Spending Trends'}
            {selectedChart === 'category-breakdown' && 'Expense Category Breakdown'}
            {selectedChart === 'income-vs-expense' && 'Income vs Expenses Overview'}
            {selectedChart === 'monthly-comparison' && 'Monthly Income vs Expenses'}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {filteredTransactions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <BarChart3 className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No Data Available</h3>
              <p className="text-gray-500 mb-4">
                {timeRange === 'all-time' 
                  ? "You haven't added any transactions yet. Add your first transaction to see analytics."
                  : `No transactions found for the selected time period (${timeRange}). Try selecting a different time range or add some transactions.`
                }
              </p>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setTimeRange('all-time')}
                  className="text-blue-600 hover:text-blue-700"
                >
                  View All Time
                </Button>
              </div>
            </div>
          ) : (
            renderChart()
          )}
        </CardContent>
      </Card>

      {/* Financial Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Net Income</p>
                <p className={`text-2xl font-bold ${insights.isPositive ? 'text-green-700' : 'text-red-700'}`}>
                  ₹{insights.netIncome.toLocaleString()}
                </p>
              </div>
              <div className="p-2 bg-blue-200 rounded-full">
                {insights.isPositive ? (
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                ) : (
                  <TrendingDown className="h-6 w-6 text-red-600" />
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Savings Rate</p>
                <p className="text-2xl font-bold text-green-800">
                  {filteredTransactions.length > 0 ? `${insights.savingsRate.toFixed(1)}%` : '0%'}
                </p>
              </div>
              <div className="p-2 bg-green-200 rounded-full">
                {filteredTransactions.length > 0 && insights.isHealthy ? (
                  <CheckCircle className="h-6 w-6 text-green-600" />
                ) : (
                  <AlertTriangle className="h-6 w-6 text-orange-600" />
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 font-medium">Avg Daily Expense</p>
                <p className="text-2xl font-bold text-purple-800">
                  ₹{filteredTransactions.length > 0 ? insights.avgDailyExpense.toLocaleString() : '0'}
                </p>
              </div>
              <div className="p-2 bg-purple-200 rounded-full">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600 font-medium">Top Category</p>
                <p className="text-lg font-bold text-orange-800">
                  {filteredTransactions.length > 0 ? insights.topCategory : 'None'}
                </p>
                <p className="text-sm text-orange-600">
                  {filteredTransactions.length > 0 ? `${insights.topCategoryPercentage.toFixed(1)}% of expenses` : 'No expenses yet'}
                </p>
              </div>
              <div className="p-2 bg-orange-200 rounded-full">
                <Target className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary Statistics */}
      <Card className="bg-white shadow-lg border-0 rounded-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-gray-600 to-gray-700 text-white">
          <CardTitle className="text-xl font-bold text-white">
            Summary Statistics
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-800 mb-2">
                {filteredTransactions.length}
              </div>
              <div className="text-sm text-gray-600">Total Transactions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                ₹{filteredTransactions
                  .filter(t => t.type === 'income')
                  .reduce((sum, t) => sum + t.amount, 0)
                  .toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Income</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">
                ₹{filteredTransactions
                  .filter(t => t.type === 'expense')
                  .reduce((sum, t) => sum + t.amount, 0)
                  .toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Expenses</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard; 