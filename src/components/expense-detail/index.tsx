import { IExpense } from '@/types/expenseType';
import { X } from 'lucide-react';

interface ExpenseDetailProps {
  expense: IExpense;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (expense: IExpense) => void;
  onDelete?: (expenseId: string) => Promise<void>;
}

export default function ExpenseDetail({
  expense,
  isOpen,
  onClose,
  onEdit,
  onDelete
}: ExpenseDetailProps) {
  if (!isOpen) return null;

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this expense?')) {
      return;
    }
    try {
      await onDelete?.(expense._id!);
      onClose();
    } catch (error: any) {
      console.error('Failed to delete expense', error);
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
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Expense Details
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Amount - Highlighted */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900 dark:to-emerald-900 rounded-lg p-6 border border-green-200 dark:border-green-700">
            <p className="text-sm font-semibold text-green-700 dark:text-green-300 mb-2">
              Expense Amount
            </p>
            <p className="text-4xl font-bold text-green-600 dark:text-green-400">
              {formatAmount(expense.amount)}
            </p>
          </div>

          {/* Category & Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">
                Category
              </p>
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                {expense.category?.categoryName || 'Unknown'}
              </p>
              {expense.category?.description && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {expense.category.description}
                </p>
              )}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">
                Expense Date
              </p>
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                {formatDate(expense.expenseDate)}
              </p>
            </div>
          </div>

          {/* Payment Method */}
          {expense.paymentMethod && (
            <div>
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">
                Payment Method
              </p>
              <div className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                {expense.paymentMethod.replace('_', ' ').toUpperCase()}
              </div>
            </div>
          )}

          {/* Description */}
          {expense.description && (
            <div>
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                Description
              </p>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {expense.description}
              </p>
            </div>
          )}

          {/* Tags */}
          {expense.tags && expense.tags.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                Tags
              </p>
              <div className="flex flex-wrap gap-2">
                {expense.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* User Info */}
          {expense.user && (
            <div>
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                Created By
              </p>
              <p className="text-gray-900 dark:text-white font-medium">
                {expense.user.fullName}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {expense.user.email}
              </p>
            </div>
          )}

          {/* Timestamps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            {expense.createdAt && (
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  Created
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {new Date(expense.createdAt).toLocaleString('en-IN')}
                </p>
              </div>
            )}
            {expense.updatedAt && (
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  Last Updated
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {new Date(expense.updatedAt).toLocaleString('en-IN')}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="sticky bottom-0 flex gap-3 p-6 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
          {onEdit && (
            <button
              onClick={() => {
                onEdit(expense);
                onClose();
              }}
              className="flex-1 px-4 py-2.5 rounded-lg bg-amber-600 text-white font-medium hover:bg-amber-700 transition-colors duration-200"
            >
              Edit Expense
            </button>
          )}
          {onDelete && (
            <button
              onClick={handleDelete}
              className="flex-1 px-4 py-2.5 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-colors duration-200"
            >
              Delete Expense
            </button>
          )}
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
