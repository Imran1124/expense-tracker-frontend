import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axios } from '@/lib';
import { expenseApi } from '@/lib/apis';
import {
  IExpense,
  ICreateExpensePayload,
  IExpenseApiResponse,
  IPaginatedExpenses,
  IExpenseFilters,
  ICategory
} from '@/types/expenseType';

const QUERY_KEYS = {
  expenses: 'expenses',
  expenseDetail: 'expense-detail',
  categories: 'categories'
};

// Get all expenses with filters
export function useGetExpenses(filters: IExpenseFilters = {}) {
  const params = new URLSearchParams();
  if (filters.page) params.append('page', String(filters.page));
  if (filters.limit) params.append('limit', String(filters.limit));
  if (filters.q) params.append('q', filters.q);
  if (filters.categoryId) params.append('categoryId', filters.categoryId);
  if (filters.startDate) params.append('startDate', filters.startDate);
  if (filters.endDate) params.append('endDate', filters.endDate);
  if (filters.paymentMethod)
    params.append('paymentMethod', filters.paymentMethod);

  return useQuery({
    queryKey: [QUERY_KEYS.expenses, filters],
    queryFn: async () => {
      const { data } = await axios.get<IExpenseApiResponse<IPaginatedExpenses>>(
        `${expenseApi.getUserExpenses}?${params.toString()}`
      );
      return data.data;
    }
  });
}

// Get single expense by ID
export function useGetExpenseById(expenseId: string | undefined) {
  return useQuery({
    queryKey: [QUERY_KEYS.expenseDetail, expenseId],
    queryFn: async () => {
      if (!expenseId) {
        throw new Error('Expense ID is required');
      }
      const { data } = await axios.get<IExpenseApiResponse<IExpense>>(
        expenseApi.getExpenseById.replace(':id', expenseId)
      );
      return data.data;
    },
    enabled: !!expenseId
  });
}

// Create new expense
export function useCreateExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: ICreateExpensePayload) => {
      const { data } = await axios.post<IExpenseApiResponse<IExpense>>(
        expenseApi.createExpense,
        payload
      );
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.expenses] });
    }
  });
}

// Update expense
export function useUpdateExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: {
      id: string;
      data: ICreateExpensePayload;
    }) => {
      const { data } = await axios.put<IExpenseApiResponse<IExpense>>(
        expenseApi.updateExpense.replace(':id', payload.id),
        payload.data
      );
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.expenses] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.expenseDetail] });
    }
  });
}

// Delete expense
export function useDeleteExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (expenseId: string) => {
      const { data } = await axios.delete<IExpenseApiResponse<any>>(
        expenseApi.deleteExpense.replace(':id', expenseId)
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.expenses] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.expenseDetail] });
    }
  });
}

// Get expense report
export function useGetExpenseReport(
  filters: {
    startDate?: string;
    endDate?: string;
    groupBy?: string;
  } = {}
) {
  const params = new URLSearchParams();
  if (filters.startDate) params.append('startDate', filters.startDate);
  if (filters.endDate) params.append('endDate', filters.endDate);
  if (filters.groupBy) params.append('groupBy', filters.groupBy);

  return useQuery({
    queryKey: ['expense-report', filters],
    queryFn: async () => {
      const { data } = await axios.get<IExpenseApiResponse<any>>(
        `${expenseApi.getExpenseReport}?${params.toString()}`
      );
      return data.data;
    }
  });
}

// Get expense summary
export function useGetExpenseSummary(
  period: 'week' | 'month' | 'year' | 'all' = 'month'
) {
  return useQuery({
    queryKey: ['expense-summary', period],
    queryFn: async () => {
      const { data } = await axios.get<IExpenseApiResponse<any>>(
        `${expenseApi.getExpenseSummary}?period=${period}`
      );
      return data.data;
    }
  });
}

// Get monthly trend
export function useGetMonthlyTrend(months: number = 6) {
  return useQuery({
    queryKey: ['monthly-trend', months],
    queryFn: async () => {
      const { data } = await axios.get<IExpenseApiResponse<any>>(
        `${expenseApi.getMonthlyTrend}?months=${months}`
      );
      return data.data;
    }
  });
}

// Get all categories (reuse from master data or create dedicated endpoint)
export function useGetCategories() {
  return useQuery({
    queryKey: [QUERY_KEYS.categories],
    queryFn: async () => {
      const { data } = await axios.get<IExpenseApiResponse<ICategory[]>>(
        expenseApi.getAllCategories
      );
      return data.data;
    }
  });
}
