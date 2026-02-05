import { useState, useCallback, useMemo } from 'react';
import {
  ExpenseForm,
  ExpenseList,
  ExpenseDetail
} from '@/components/index.expense';
import {
  useGetExpenses,
  useCreateExpense,
  useUpdateExpense,
  useDeleteExpense,
  useGetCategories,
  useGetExpenseSummary,
  useGetExpenseReport,
  useGetMonthlyTrend
} from '@/hooks/useExpense';
import {
  IExpense,
  ICreateExpensePayload,
  IExpenseFilters
} from '@/types/expenseType';
import UseTitle from '@/hooks/useTitle';

/**
 * Comprehensive Example Page showing all features of the Expense Management System
 *
 * This page demonstrates:
 * - Creating new expenses
 * - Editing existing expenses
 * - Deleting expenses
 * - Viewing expense details
 * - Filtering and searching expenses
 * - Pagination
 * - Analytics and reporting
 * - Dark mode support
 * - Loading and error states
 */
export default function ExpenseManagementExample() {
  // Set page title
  UseTitle('Expense Management Example');

  // ============================
  // State Management
  // ============================
  const [activeTab, setActiveTab] = useState<'create' | 'list' | 'analytics'>(
    'create'
  );
  const [filters, setFilters] = useState<IExpenseFilters>({
    page: 1,
    limit: 10
  });
  const [selectedExpense, setSelectedExpense] = useState<IExpense | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<IExpense | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<
    'week' | 'month' | 'year' | 'all'
  >('month');

  // ============================
  // Data Fetching (Queries)
  // ============================
  const {
    data: expenses,
    isLoading: isLoadingExpenses,
    error: expensesError
  } = useGetExpenses(filters);

  const { data: categories = [], isLoading: isLoadingCategories } =
    useGetCategories();

  const { data: summary = null, isLoading: isLoadingSummary } =
    useGetExpenseSummary(selectedPeriod);

  const { data: report = null, isLoading: isLoadingReport } =
    useGetExpenseReport({
      groupBy: 'category'
    });

  const { data: trend = null, isLoading: isLoadingTrend } =
    useGetMonthlyTrend(6);

  // ============================
  // Data Mutations
  // ============================
  const {
    mutateAsync: createExpense,
    isPending: isCreating,
    error: createError
  } = useCreateExpense();

  const {
    mutateAsync: updateExpense,
    isPending: isUpdating,
    error: updateError
  } = useUpdateExpense();

  const {
    mutateAsync: deleteExpense,
    isPending: isDeleting,
    error: deleteError
  } = useDeleteExpense();

  // ============================
  // Event Handlers
  // ============================

  /**
   * Handle creating a new expense
   * - Calls mutation
   * - Switches to list view on success
   * - Resets form
   */
  const handleCreateExpense = useCallback(
    async (data: ICreateExpensePayload) => {
      try {
        await createExpense(data);
        setActiveTab('list');
        // Form reset is handled by ExpenseForm component
      } catch (error) {
        console.error('Failed to create expense:', error);
      }
    },
    [createExpense]
  );

  /**
   * Handle updating an expense
   * - Validates expense ID exists
   * - Calls update mutation
   * - Clears editing state
   * - Switches to list view
   */
  const handleUpdateExpense = useCallback(
    async (data: ICreateExpensePayload) => {
      if (!editingExpense?._id) {
        throw new Error('Expense ID is required for update');
      }

      try {
        await updateExpense({
          id: editingExpense._id,
          data
        });
        setEditingExpense(null);
        setActiveTab('list');
      } catch (error) {
        console.error('Failed to update expense:', error);
      }
    },
    [editingExpense, updateExpense]
  );

  /**
   * Handle deleting an expense
   * - Shows confirmation dialog
   * - Calls delete mutation
   * - Closes detail modal
   * - Refetches list (handled by query invalidation)
   */
  const handleDeleteExpense = useCallback(
    async (expenseId: string) => {
      if (
        !window.confirm(
          'Are you sure you want to delete this expense? This action cannot be undone.'
        )
      ) {
        return;
      }

      try {
        await deleteExpense(expenseId);
        setDetailModalOpen(false);
        setSelectedExpense(null);
      } catch (error) {
        console.error('Failed to delete expense:', error);
      }
    },
    [deleteExpense]
  );

  /**
   * Handle editing an expense
   * - Sets the expense for editing
   * - Closes detail modal
   * - Switches to create tab
   */
  const handleEditExpense = useCallback((expense: IExpense) => {
    setEditingExpense(expense);
    setDetailModalOpen(false);
    setActiveTab('create');
  }, []);

  /**
   * Handle viewing expense details
   * - Opens detail modal
   * - Sets selected expense
   */
  const handleViewDetails = useCallback((expense: IExpense) => {
    setSelectedExpense(expense);
    setDetailModalOpen(true);
  }, []);

  /**
   * Handle filter changes
   * - Updates filter state
   * - Resets to page 1
   * - Triggers new data fetch
   */
  const handleFiltersChange = useCallback((newFilters: IExpenseFilters) => {
    setFilters(newFilters);
  }, []);

  /**
   * Handle form reset
   * - Clears editing state
   * - Returns to empty form
   */
  const handleResetForm = useCallback(() => {
    setEditingExpense(null);
  }, []);

  // ============================
  // Computed Values
  // ============================

  /**
   * Check if currently in edit mode
   */
  const isEditMode = !!editingExpense;

  /**
   * Calculate total expense amount
   */
  const totalAmount = useMemo(
    () => summary?.totalExpenses || 0,
    [summary?.totalExpenses]
  );

  /**
   * Get top categories by spending
   */
  const topCategories = useMemo(
    () => report?.breakdown?.slice(0, 5) || [],
    [report?.breakdown]
  );

  // ============================
  // Render
  // ============================

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* ==================== PAGE HEADER ==================== */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Expense Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track, manage, and analyze your expenses with ease
          </p>
        </div>

        {/* ==================== QUICK STATS ==================== */}
        {(activeTab === 'analytics' || activeTab === 'list') && summary && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Expenses */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border-l-4 border-blue-500">
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                Total Expenses ({selectedPeriod})
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                ₹{summary.totalExpenses?.toLocaleString('en-IN') || 0}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                {summary.totalTransactions} transactions
              </p>
            </div>

            {/* Average Per Transaction */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border-l-4 border-green-500">
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                Average Per Transaction
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                ₹
                {summary.avgTransaction?.toLocaleString('en-IN', {
                  maximumFractionDigits: 0
                }) || 0}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Min: ₹{summary.minTransaction || 0}
              </p>
            </div>

            {/* Max Transaction */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border-l-4 border-purple-500">
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                Highest Transaction
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                ₹{summary.maxTransaction?.toLocaleString('en-IN') || 0}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Multiple transactions exist
              </p>
            </div>
          </div>
        )}

        {/* ==================== TAB NAVIGATION ==================== */}
        <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700">
          {/* Create/Edit Tab */}
          <button
            onClick={() => {
              setActiveTab('create');
              handleResetForm();
            }}
            className={`px-4 py-3 font-semibold border-b-2 transition-all duration-200 ${
              activeTab === 'create'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            {isEditMode ? '✏️ Edit Expense' : '➕ Create Expense'}
          </button>

          {/* List Tab */}
          <button
            onClick={() => setActiveTab('list')}
            className={`px-4 py-3 font-semibold border-b-2 transition-all duration-200 ${
              activeTab === 'list'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            📋 View Expenses
          </button>

          {/* Analytics Tab */}
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-3 font-semibold border-b-2 transition-all duration-200 ${
              activeTab === 'analytics'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            📊 Analytics
          </button>
        </div>

        {/* ==================== TAB CONTENT ==================== */}

        {/* CREATE/EDIT TAB */}
        {activeTab === 'create' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm p-8">
            <ExpenseForm
              isEdit={isEditMode}
              initialData={editingExpense || undefined}
              categories={categories}
              onSuccess={handleResetForm}
              onSubmit={isEditMode ? handleUpdateExpense : handleCreateExpense}
              isLoading={isCreating || isUpdating}
            />

            {/* Error Messages */}
            {(createError || updateError) && (
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400">
                {createError?.message ||
                  updateError?.message ||
                  'An error occurred'}
              </div>
            )}
          </div>
        )}

        {/* LIST TAB */}
        {activeTab === 'list' && (
          <div>
            {expensesError && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 mb-6">
                Failed to load expenses. Please try again.
              </div>
            )}

            <ExpenseList
              expenses={expenses}
              isLoading={isLoadingExpenses}
              onEdit={handleEditExpense}
              onDelete={handleDeleteExpense}
              onFiltersChange={handleFiltersChange}
              onViewDetails={handleViewDetails}
              categories={categories}
            />
          </div>
        )}

        {/* ANALYTICS TAB */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* Period Selector */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-4">
                Time Period:
              </label>
              <div className="flex flex-wrap gap-2">
                {(['week', 'month', 'year', 'all'] as const).map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedPeriod === period
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    {period.charAt(0).toUpperCase() + period.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Top Categories */}
            {isLoadingReport ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center text-gray-500">
                Loading analytics...
              </div>
            ) : topCategories.length > 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  📊 Top Spending Categories
                </h3>
                <div className="space-y-3">
                  {topCategories.map((category: any, index: any) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {category.details?.categoryName || 'Unknown'}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {category.count} transactions
                        </p>
                      </div>
                      <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                        ₹{category.totalAmount?.toLocaleString('en-IN') || 0}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center text-gray-500">
                No analytics data available
              </div>
            )}

            {/* Monthly Trend */}
            {isLoadingTrend ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center text-gray-500">
                Loading trend data...
              </div>
            ) : trend && trend.length > 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  📈 Monthly Trend (Last 6 Months)
                </h3>
                <div className="space-y-2">
                  {trend.map((month: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <p className="text-gray-700 dark:text-gray-300">
                        {new Date(month.year, month.month - 1).toLocaleString(
                          'en-IN',
                          {
                            month: 'long',
                            year: 'numeric'
                          }
                        )}
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="w-40 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
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
                        <p className="font-semibold text-gray-900 dark:text-white min-w-fit">
                          ₹{month.totalAmount?.toLocaleString('en-IN') || 0}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center text-gray-500">
                No trend data available
              </div>
            )}
          </div>
        )}

        {/* ==================== DETAIL MODAL ==================== */}
        {selectedExpense && (
          <ExpenseDetail
            expense={selectedExpense}
            isOpen={detailModalOpen}
            onClose={() => {
              setDetailModalOpen(false);
              setSelectedExpense(null);
            }}
            onEdit={handleEditExpense}
            onDelete={handleDeleteExpense}
          />
        )}
      </div>
    </div>
  );
}
