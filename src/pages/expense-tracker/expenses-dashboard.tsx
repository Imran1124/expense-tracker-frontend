import { useState, useCallback, useMemo } from 'react';
import {
  Plus,
  TrendingUp,
  DollarSign,
  Filter,
  Home,
  BarChart3,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
  Search,
  CreditCard,
  Tag
} from 'lucide-react';
import {
  useGetExpenses,
  useDeleteExpense,
  useGetCategories,
  useGetExpenseSummary,
  useGetExpenseReport,
  useGetMonthlyTrend
} from '@/hooks/useExpense';
import { IExpense, IExpenseFilters } from '@/types/expenseType';
import { messageService } from '@/lib';
import { ExpenseListSkeleton } from '@/components/loaders';

export default function ExpensesDashboard() {
  // ==================== State ====================
  const [activeView, setActiveView] = useState<'dashboard' | 'list' | 'form'>(
    'dashboard'
  );
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingExpense, setEditingExpense] = useState<IExpense | null>(null);
  const [filterPeriod, setFilterPeriod] = useState<
    'week' | 'month' | 'year' | 'all'
  >('month');
  const [filters, setFilters] = useState<IExpenseFilters>({
    page: 1,
    limit: 10,
    q: '',
    categoryId: '',
    startDate: '',
    endDate: '',
    paymentMethod: ''
  });

  // ==================== Data Queries ====================
  const { data: expenses, isLoading: isLoadingExpenses } =
    useGetExpenses(filters);
  const { data: categories = [] } = useGetCategories();
  const { data: summary = null } = useGetExpenseSummary(filterPeriod);
  const { data: report = null } = useGetExpenseReport({ groupBy: 'category' });
  const { data: trend = [] } = useGetMonthlyTrend(6);

  // ==================== Mutations ====================
  const { mutateAsync: deleteExpense } = useDeleteExpense();

  // ==================== Handlers ====================
  /* const handleCreateExpense = useCallback(
    async (data: ICreateExpensePayload) => {
      try {
        await createExpense(data);
        messageService.success('Expense created successfully');
        setShowFormModal(false);
        setEditingExpense(null);
      } catch (error: any) {
        messageService.error(error.message || 'Failed to create expense');
      }
    },
    [createExpense]
  ); */

  /* const handleUpdateExpense = useCallback(
    async (data: ICreateExpensePayload) => {
      if (!editingExpense?._id) return;
      try {
        await updateExpense({ id: editingExpense._id, data });
        messageService.success('Expense updated successfully');
        setShowFormModal(false);
        setEditingExpense(null);
      } catch (error: any) {
        messageService.error(error.message || 'Failed to update expense');
      }
    },
    [editingExpense, updateExpense]
  ); */

  const handleDeleteExpense = useCallback(
    async (id: string) => {
      if (!window.confirm('Delete this expense?')) return;
      try {
        await deleteExpense(id);
        messageService.success('Expense deleted successfully');
      } catch (error: any) {
        messageService.error(error.message || 'Failed to delete expense');
      }
    },
    [deleteExpense]
  );

  /* const handleEdit = useCallback((expense: IExpense) => {
    setEditingExpense(expense);
    setShowFormModal(true);
    setDetailModalOpen(false);
  }, []); */

  /* const handleViewDetails = useCallback((expense: IExpense) => {
    setSelectedExpense(expense);
    setDetailModalOpen(true);
  }, []); */

  const handleOpenCreateForm = useCallback(() => {
    setEditingExpense(null);
    setShowFormModal(true);
  }, []);

  const handleFilterChange = useCallback(
    (newFilters: Partial<IExpenseFilters>) => {
      setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
    },
    []
  );

  const handleClearFilters = useCallback(() => {
    setFilters({
      page: 1,
      limit: 10,
      q: '',
      categoryId: '',
      startDate: '',
      endDate: '',
      paymentMethod: ''
    });
  }, []);

  // ==================== Computed ====================
  const topCategories = useMemo(
    () => report?.breakdown?.slice(0, 5) || [],
    [report?.breakdown]
  );

  const hasActiveFilters = useMemo(
    () =>
      filters.q ||
      filters.categoryId ||
      filters.startDate ||
      filters.endDate ||
      filters.paymentMethod,
    [filters]
  );

  // ==================== Render ====================
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Expense Tracker
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Manage, analyze, and control your spending
                </p>
              </div>
            </div>
            <button
              onClick={handleOpenCreateForm}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium hover:shadow-lg transition-all duration-200 hover:scale-105"
            >
              <Plus className="h-5 w-5" />
              Add Expense
            </button>
          </div>

          {/* View Tabs */}
          <div className="flex gap-2 mt-4 border-t border-slate-200 dark:border-slate-700 pt-4">
            {[
              { id: 'dashboard', label: '📊 Dashboard', icon: BarChart3 },
              { id: 'list', label: '📋 All Expenses', icon: Home }
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setActiveView(id as any)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeView === id
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* DASHBOARD VIEW */}
        {activeView === 'dashboard' && (
          <div className="space-y-8">
            {/* Summary Cards */}
            {summary && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Total Expenses */}
                <div className="group relative bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-lg transition-all p-6 border border-slate-200 dark:border-slate-700 overflow-hidden">
                  <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full opacity-10 group-hover:scale-150 transition-transform" />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                        Total Expenses
                      </p>
                      <DollarSign className="h-5 w-5 text-blue-500" />
                    </div>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">
                      ₹
                      {(summary.totalExpenses || 0).toLocaleString('en-IN', {
                        maximumFractionDigits: 0
                      })}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                      {summary.totalTransactions} transactions
                    </p>
                  </div>
                </div>

                {/* Average */}
                <div className="group relative bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-lg transition-all p-6 border border-slate-200 dark:border-slate-700 overflow-hidden">
                  <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-green-400 to-green-500 rounded-full opacity-10 group-hover:scale-150 transition-transform" />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                        Average
                      </p>
                      <TrendingUp className="h-5 w-5 text-green-500" />
                    </div>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">
                      ₹
                      {(summary.avgTransaction || 0).toLocaleString('en-IN', {
                        maximumFractionDigits: 0
                      })}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                      Per transaction
                    </p>
                  </div>
                </div>

                {/* Highest */}
                <div className="group relative bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-lg transition-all p-6 border border-slate-200 dark:border-slate-700 overflow-hidden">
                  <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full opacity-10 group-hover:scale-150 transition-transform" />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                        Highest
                      </p>
                      <CreditCard className="h-5 w-5 text-purple-500" />
                    </div>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">
                      ₹
                      {(summary.maxTransaction || 0).toLocaleString('en-IN', {
                        maximumFractionDigits: 0
                      })}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                      Maximum amount
                    </p>
                  </div>
                </div>

                {/* Period Selector */}
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700">
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-3">
                    Time Period
                  </p>
                  <select
                    value={filterPeriod}
                    onChange={(e) => setFilterPeriod(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="week">Last Week</option>
                    <option value="month">Last Month</option>
                    <option value="year">Last Year</option>
                    <option value="all">All Time</option>
                  </select>
                </div>
              </div>
            )}

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Categories */}
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <Tag className="h-5 w-5 text-blue-500" />
                  Top Categories
                </h3>
                <div className="space-y-3">
                  {topCategories.length > 0 ? (
                    topCategories.map((cat: any, idx: number) => (
                      <div key={idx} className="group">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-slate-900 dark:text-white">
                            {cat.details?.categoryName || 'Unknown'}
                          </span>
                          <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                            ₹
                            {(cat.totalAmount || 0).toLocaleString('en-IN', {
                              maximumFractionDigits: 0
                            })}
                          </span>
                        </div>
                        <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-300 group-hover:from-blue-500 group-hover:to-blue-700"
                            style={{
                              width: `${Math.min(
                                (cat.totalAmount /
                                  (topCategories[0]?.totalAmount || 1)) *
                                  100,
                                100
                              )}%`
                            }}
                          />
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          {cat.count} expenses
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-slate-500 dark:text-slate-400 py-6">
                      No data available
                    </p>
                  )}
                </div>
              </div>

              {/* Monthly Trend */}
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  Monthly Trend
                </h3>
                <div className="space-y-3">
                  {trend && trend.length > 0 ? (
                    trend.map((month: any, idx: number) => (
                      <div key={idx} className="group">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-slate-900 dark:text-white">
                            {new Date(
                              month.year,
                              month.month - 1
                            ).toLocaleString('en-IN', {
                              month: 'short',
                              year: '2-digit'
                            })}
                          </span>
                          <span className="text-sm font-bold text-green-600 dark:text-green-400">
                            ₹
                            {(month.totalAmount || 0).toLocaleString('en-IN', {
                              maximumFractionDigits: 0
                            })}
                          </span>
                        </div>
                        <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-300 group-hover:from-green-500 group-hover:to-green-700"
                            style={{
                              width: `${Math.min(
                                (month.totalAmount /
                                  (trend[0]?.totalAmount || 1)) *
                                  100,
                                100
                              )}%`
                            }}
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-slate-500 dark:text-slate-400 py-6">
                      No data available
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Recent Expenses Preview */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Recent Expenses
                </h3>
                <button
                  onClick={() => setActiveView('list')}
                  className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline"
                >
                  View All →
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700">
                    <tr>
                      <th className="px-6 py-3 text-left font-semibold text-slate-900 dark:text-white">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left font-semibold text-slate-900 dark:text-white">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left font-semibold text-slate-900 dark:text-white">
                        Description
                      </th>
                      <th className="px-6 py-3 text-right font-semibold text-slate-900 dark:text-white">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {expenses?.docs?.slice(0, 5).map((expense) => (
                      <tr
                        key={expense._id}
                        className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors"
                      >
                        <td className="px-6 py-3 text-slate-700 dark:text-slate-300">
                          {new Date(expense.expenseDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-3">
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-medium">
                            {expense.category?.categoryName || 'Unknown'}
                          </span>
                        </td>
                        <td className="px-6 py-3 text-slate-700 dark:text-slate-300 truncate max-w-xs">
                          {expense.description || '—'}
                        </td>
                        <td className="px-6 py-3 text-right font-semibold text-slate-900 dark:text-white">
                          ₹
                          {expense.amount.toLocaleString('en-IN', {
                            maximumFractionDigits: 0
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* LIST VIEW */}
        {activeView === 'list' && (
          <div className="space-y-6">
            {/* Filters Bar */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters
                </h3>
                {hasActiveFilters && (
                  <button
                    onClick={handleClearFilters}
                    className="text-xs px-3 py-1.5 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 font-medium hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                  >
                    Clear All
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={filters.q || ''}
                    onChange={(e) => handleFilterChange({ q: e.target.value })}
                    className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Category */}
                <select
                  value={filters.categoryId || ''}
                  onChange={(e) =>
                    handleFilterChange({ categoryId: e.target.value })
                  }
                  className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.categoryName}
                    </option>
                  ))}
                </select>

                {/* Start Date */}
                <input
                  type="date"
                  value={filters.startDate || ''}
                  onChange={(e) =>
                    handleFilterChange({ startDate: e.target.value })
                  }
                  className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* End Date */}
                <input
                  type="date"
                  value={filters.endDate || ''}
                  onChange={(e) =>
                    handleFilterChange({ endDate: e.target.value })
                  }
                  className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Payment Method */}
                <select
                  value={filters.paymentMethod || ''}
                  onChange={(e) =>
                    handleFilterChange({ paymentMethod: e.target.value })
                  }
                  className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Methods</option>
                  <option value="cash">Cash</option>
                  <option value="credit_card">Credit Card</option>
                  <option value="debit_card">Debit Card</option>
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="digital_wallet">Digital Wallet</option>
                </select>
              </div>
            </div>

            {/* List Component */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
              {isLoadingExpenses ? (
                <div className="p-6">
                  <ExpenseListSkeleton count={10} />
                </div>
              ) : expenses && expenses.docs.length > 0 ? (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700">
                        <tr>
                          <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">
                            Date
                          </th>
                          <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">
                            Category
                          </th>
                          <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">
                            Description
                          </th>
                          <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">
                            Method
                          </th>
                          <th className="px-6 py-4 text-right font-semibold text-slate-900 dark:text-white">
                            Amount
                          </th>
                          <th className="px-6 py-4 text-center font-semibold text-slate-900 dark:text-white">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                        {expenses.docs.map((expense) => (
                          <tr
                            key={expense._id}
                            className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors"
                          >
                            <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                              {new Date(
                                expense.expenseDate
                              ).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4">
                              <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-medium">
                                {expense.category?.categoryName || 'Unknown'}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-slate-700 dark:text-slate-300 max-w-xs truncate">
                              {expense.description || '—'}
                            </td>
                            <td className="px-6 py-4 text-slate-600 dark:text-slate-400 text-xs">
                              {expense.paymentMethod
                                ?.replace('_', ' ')
                                .toUpperCase() || '—'}
                            </td>
                            <td className="px-6 py-4 text-right font-bold text-green-600 dark:text-green-400">
                              ₹
                              {expense.amount.toLocaleString('en-IN', {
                                maximumFractionDigits: 0
                              })}
                            </td>
                            <td className="px-6 py-4 text-center">
                              <div className="flex items-center justify-center gap-1">
                                {/* <button
                                  onClick={() => handleViewDetails(expense)}
                                  className="p-1.5 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded transition-colors"
                                >
                                  <Eye className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleEdit(expense)}
                                  className="p-1.5 text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/30 rounded transition-colors"
                                >
                                  <Edit2 className="h-4 w-4" />
                                </button> */}
                                <button
                                  onClick={() =>
                                    handleDeleteExpense(expense._id!)
                                  }
                                  className="p-1.5 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-colors"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  {expenses.pages > 1 && (
                    <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Page {expenses.page} of {expenses.pages} (
                        {expenses.totalDocs} total)
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            handleFilterChange({
                              page: Math.max(1, filters.page! - 1)
                            })
                          }
                          disabled={!expenses.hasPrevPage}
                          className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        {Array.from(
                          { length: expenses.pages },
                          (_, i) => i + 1
                        ).map((page) => (
                          <button
                            key={page}
                            onClick={() => handleFilterChange({ page })}
                            className={`px-2.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                              expenses.page === page
                                ? 'bg-blue-600 text-white'
                                : 'border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50'
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                        <button
                          onClick={() =>
                            handleFilterChange({
                              page: (filters.page || 1) + 1
                            })
                          }
                          disabled={!expenses.hasNextPage}
                          className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="p-12 text-center">
                  <DollarSign className="h-12 w-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-600 dark:text-slate-400">
                    No expenses found
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Form Modal */}
      {showFormModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="sticky top-0 flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {editingExpense ? 'Edit Expense' : 'Create New Expense'}
              </h2>
              <button
                onClick={() => {
                  setShowFormModal(false);
                  setEditingExpense(null);
                }}
                className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              {/* TODO: Implement ExpenseForm component */}
              <p>Expense form placeholder - Component needs to be created</p>
              {/* <ExpenseForm
                isEdit={!!editingExpense}
                initialData={editingExpense || undefined}
                categories={categories}
                onSubmit={
                  editingExpense ? handleUpdateExpense : handleCreateExpense
                }
                isLoading={isCreating || isUpdating}
                onSuccess={() => {
                  setShowFormModal(false);
                  setEditingExpense(null);
                }}
              /> */}
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {/* TODO: Implement ExpenseDetail component */}
      {/* {selectedExpense && (
        <ExpenseDetail
          expense={selectedExpense}
          isOpen={detailModalOpen}
          onClose={() => {
            setDetailModalOpen(false);
            setSelectedExpense(null);
          }}
          onEdit={handleEdit}
          onDelete={handleDeleteExpense}
        />
      )} */}
    </div>
  );
}
