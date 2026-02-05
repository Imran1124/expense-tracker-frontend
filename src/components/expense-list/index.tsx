import { useState, useCallback } from 'react';
import {
  IExpense,
  IExpenseFilters,
  IPaginatedExpenses
} from '@/types/expenseType';
import SkeletonLoader from '@/components/loaders/SkeletonLoader';
import { messageService } from '@/lib';
import {
  Search,
  Trash2,
  Edit2,
  Eye,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface ExpenseListProps {
  expenses: IPaginatedExpenses | undefined;
  isLoading?: boolean;
  onEdit?: (expense: IExpense) => void;
  onDelete?: (expenseId: string) => Promise<void>;
  onFiltersChange?: (filters: IExpenseFilters) => void;
  onViewDetails?: (expense: IExpense) => void;
  categories?: Array<{ _id: string; categoryName: string }>;
}

export default function ExpenseList({
  expenses,
  isLoading = false,
  onEdit,
  onDelete,
  onFiltersChange,
  onViewDetails,
  categories = []
}: ExpenseListProps) {
  const [filters, setFilters] = useState<IExpenseFilters>({
    page: 1,
    limit: 10,
    q: '',
    categoryId: '',
    startDate: '',
    endDate: '',
    paymentMethod: ''
  });

  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  const handleFilterChange = useCallback(
    (newFilters: Partial<IExpenseFilters>) => {
      const updatedFilters = { ...filters, ...newFilters, page: 1 };
      setFilters(updatedFilters);
      onFiltersChange?.(updatedFilters);
    },
    [filters, onFiltersChange]
  );

  const handlePageChange = (newPage: number) => {
    const updatedFilters = { ...filters, page: newPage };
    setFilters(updatedFilters);
    onFiltersChange?.(updatedFilters);
  };

  const handleDelete = async (expenseId: string) => {
    if (!window.confirm('Are you sure you want to delete this expense?')) {
      return;
    }

    try {
      setDeleteLoading(expenseId);
      await onDelete?.(expenseId);
      messageService.success('Expense deleted successfully');
    } catch (error: any) {
      messageService.error(error.message || 'Failed to delete expense');
    } finally {
      setDeleteLoading(null);
    }
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCategoryName = (categoryId?: string) => {
    if (!categoryId) return 'N/A';
    const category = categories?.docs?.find((cat) => cat._id === categoryId);
    return category?.categoryName || 'Unknown';
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, idx) => (
          <SkeletonLoader key={idx} />
        ))}
      </div>
    );
  }

  if (!expenses || expenses.docs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No expenses found
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
            Create your first expense to get started
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Filters
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search expenses..."
              value={filters.q || ''}
              onChange={(e) =>
                handleFilterChange({ q: e.target.value, page: 1 })
              }
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category Filter */}
          <select
            value={filters.categoryId || ''}
            onChange={(e) =>
              handleFilterChange({ categoryId: e.target.value, page: 1 })
            }
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            {categories?.docs?.map((cat) => (
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
              handleFilterChange({ startDate: e.target.value, page: 1 })
            }
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* End Date */}
          <input
            type="date"
            value={filters.endDate || ''}
            onChange={(e) =>
              handleFilterChange({ endDate: e.target.value, page: 1 })
            }
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Payment Method */}
          <select
            value={filters.paymentMethod || ''}
            onChange={(e) =>
              handleFilterChange({ paymentMethod: e.target.value, page: 1 })
            }
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Payment Methods</option>
            <option value="cash">Cash</option>
            <option value="credit_card">Credit Card</option>
            <option value="debit_card">Debit Card</option>
            <option value="bank_transfer">Bank Transfer</option>
            <option value="digital_wallet">Digital Wallet</option>
            <option value="check">Check</option>
            <option value="other">Other</option>
          </select>

          {/* Clear Filters */}
          <button
            onClick={() =>
              handleFilterChange({
                q: '',
                categoryId: '',
                startDate: '',
                endDate: '',
                paymentMethod: ''
              })
            }
            className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                  Payment Method
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {expenses.docs.map((expense) => (
                <tr
                  key={expense._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {formatDate(expense.expenseDate)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                      {expense.category?.categoryName ||
                        getCategoryName(expense.categoryId)}
                    </span>
                  </td>
                  <td className="px-6 py-4 max-w-xs">
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {expense.description || '—'}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {expense.paymentMethod
                        ? expense.paymentMethod.replace('_', ' ').toUpperCase()
                        : '—'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                      {formatAmount(expense.amount)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center gap-2">
                      {onViewDetails && (
                        <button
                          onClick={() => onViewDetails(expense)}
                          className="p-1.5 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900 rounded transition-colors"
                          title="View details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      )}
                      {onEdit && (
                        <button
                          onClick={() => onEdit(expense)}
                          className="p-1.5 text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900 rounded transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => handleDelete(expense._id!)}
                          disabled={deleteLoading === expense._id}
                          className="p-1.5 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900 rounded transition-colors disabled:opacity-50"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {expenses && expenses.pages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Showing page {expenses.page} of {expenses.pages} (
            {expenses.totalDocs} total expenses)
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handlePageChange(expenses.page - 1)}
              disabled={!expenses.hasPrevPage}
              className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2">
              {Array.from({ length: expenses.pages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      expenses.page === page
                        ? 'bg-blue-600 text-white'
                        : 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>
            <button
              onClick={() => handlePageChange(expenses.page + 1)}
              disabled={!expenses.hasNextPage}
              className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
