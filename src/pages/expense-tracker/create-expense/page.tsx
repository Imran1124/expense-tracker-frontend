import { useState, useCallback } from 'react';
import ExpenseForm from '@/components/expense-form';
import ExpenseList from '@/components/expense-list';
import ExpenseDetail from '@/components/expense-detail';
import {
  useGetExpenses,
  useCreateExpense,
  useUpdateExpense,
  useDeleteExpense,
  useGetCategories
} from '@/hooks/useExpense';
import {
  IExpense,
  ICreateExpensePayload,
  IExpenseFilters
} from '@/types/expenseType';
import { messageService } from '@/lib';

interface ManageExpensePageProps {
  defaultTab?: 'create' | 'list';
}

export default function ManageExpensePage({
  defaultTab = 'create'
}: ManageExpensePageProps) {
  const [activeTab, setActiveTab] = useState<'create' | 'list'>(defaultTab);
  const [filters, setFilters] = useState<IExpenseFilters>({
    page: 1,
    limit: 10
  });
  const [selectedExpense, setSelectedExpense] = useState<IExpense | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<IExpense | null>(null);

  // Queries
  const { data: expenses, isLoading: isLoadingExpenses } =
    useGetExpenses(filters);
  const { data: categories = [], isLoading: isLoadingCategories } =
    useGetCategories();

  // Mutations
  const createExpenseMutation = useCreateExpense();
  const updateExpenseMutation = useUpdateExpense();
  const deleteExpenseMutation = useDeleteExpense();

  // Handlers
  const handleCreateExpense = useCallback(
    async (data: ICreateExpensePayload) => {
      await createExpenseMutation.mutateAsync(data);
      setActiveTab('list');
    },
    [createExpenseMutation]
  );

  const handleUpdateExpense = useCallback(
    async (data: ICreateExpensePayload) => {
      if (!editingExpense?._id) {
        throw new Error('Expense ID is required');
      }
      await updateExpenseMutation.mutateAsync({
        id: editingExpense._id,
        data
      });
      setEditingExpense(null);
      setActiveTab('list');
    },
    [editingExpense, updateExpenseMutation]
  );

  const handleDeleteExpense = useCallback(
    async (expenseId: string) => {
      await deleteExpenseMutation.mutateAsync(expenseId);
      setDetailModalOpen(false);
    },
    [deleteExpenseMutation]
  );

  const handleEditExpense = useCallback((expense: IExpense) => {
    setEditingExpense(expense);
    setDetailModalOpen(false);
    setActiveTab('create');
  }, []);

  const handleViewDetails = useCallback((expense: IExpense) => {
    setSelectedExpense(expense);
    setDetailModalOpen(true);
  }, []);

  const handleFiltersChange = useCallback((newFilters: IExpenseFilters) => {
    setFilters(newFilters);
  }, []);

  const handleResetForm = useCallback(() => {
    setEditingExpense(null);
  }, []);

  const isCreating = createExpenseMutation.isPending;
  const isUpdating = updateExpenseMutation.isPending;
  const isDeleting = deleteExpenseMutation.isPending;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Expense Management
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Create, manage, and track your expenses
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => {
            setActiveTab('create');
            handleResetForm();
          }}
          className={`px-4 py-3 font-medium border-b-2 transition-colors duration-200 ${
            activeTab === 'create'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          {editingExpense ? 'Edit Expense' : 'Create Expense'}
        </button>
        <button
          onClick={() => setActiveTab('list')}
          className={`px-4 py-3 font-medium border-b-2 transition-colors duration-200 ${
            activeTab === 'list'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          View Expenses
        </button>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'create' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8">
            <ExpenseForm
              isEdit={!!editingExpense}
              initialData={editingExpense || undefined}
              categories={categories}
              onSuccess={() => {
                handleResetForm();
              }}
              onSubmit={
                editingExpense ? handleUpdateExpense : handleCreateExpense
              }
              isLoading={isCreating || isUpdating}
            />
          </div>
        )}

        {activeTab === 'list' && (
          <ExpenseList
            expenses={expenses}
            isLoading={isLoadingExpenses}
            onEdit={handleEditExpense}
            onDelete={handleDeleteExpense}
            onFiltersChange={handleFiltersChange}
            onViewDetails={handleViewDetails}
            categories={categories}
          />
        )}
      </div>

      {/* Detail Modal */}
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
  );
}
