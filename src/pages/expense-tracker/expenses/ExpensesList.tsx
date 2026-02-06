import { useApi } from '@/hooks/useCustomQuery';
import { expenseApi } from '@/lib';
import { ExpensesResponse } from './type';
import { useMemo, useState } from 'react';
import ExpenseForm from './ExpensesForm';
import { useCategoryList } from '@/hooks/useMaster';
import { Filter, X, CalendarIcon, TrendingUp } from 'lucide-react';

type ExpenseSummaryResponse = {
  data?: {
    totalStats?: Array<{
      totalExpenses: number;
      totalTransactions: number;
      avgTransaction: number;
    }>;
    categoryBreakdown?: Array<{
      _id: string;
      total: number;
      count: number;
      category?: {
        categoryName: string;
      };
    }>;
    paymentMethodBreakdown?: Array<{
      _id: string;
      total: number;
      count: number;
    }>;
    recentExpenses?: Array<{
      _id: string;
      amount: number;
      expenseDate: string;
      paymentMethod: string;
      category?: {
        categoryName: string;
      };
    }>;
  };
};

type ExpenseReportResponse = {
  data?: {
    summary?: {
      totalExpenses: number;
      totalTransactions: number;
      avgTransaction: number;
      minTransaction: number;
      maxTransaction: number;
    };
    breakdown?: Array<{
      _id: string;
      totalAmount: number;
      count: number;
      avgAmount: number;
      minAmount: number;
      maxAmount: number;
      details?: {
        categoryName: string;
      };
    }>;
  };
};

type ExpenseTrendResponse = {
  data?: Array<{
    totalAmount: number;
    count: number;
    avgAmount: number;
    year: number;
    month: number;
    monthYear: string;
  }>;
};

const currency = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0
});

const formatDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

export default function ExpensesList() {
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(8);
  const [search, setSearch] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [id, setId] = useState<string>('');
  const [edit, setEdit] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Filter states
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [groupBy, setGroupBy] = useState<string>('category');
  const [period, setPeriod] = useState<string>('month');
  const [months, setMonths] = useState<number>(6);

  const categoryListData = useCategoryList();

  // Build query strings
  const expenseListQuery = useMemo(() => {
    const params = new URLSearchParams();
    params.append('page', '1');
    params.append('limit', '100');
    if (categoryFilter) params.append('categoryId', categoryFilter);
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    return params.toString();
  }, [categoryFilter, startDate, endDate]);

  const reportQuery = useMemo(() => {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    params.append('groupBy', groupBy);
    return params.toString();
  }, [startDate, endDate, groupBy]);

  const summaryQuery = useMemo(() => {
    const params = new URLSearchParams();
    params.append('period', period);
    if (categoryFilter) params.append('categoryId', categoryFilter);
    return params.toString();
  }, [period, categoryFilter]);

  const trendQuery = useMemo(() => {
    const params = new URLSearchParams();
    params.append('months', months.toString());
    if (categoryFilter) params.append('categoryId', categoryFilter);
    return params.toString();
  }, [months, categoryFilter]);

  const expesesList = useApi<ExpensesResponse>({
    api: `${expenseApi.getUserExpenses}?${expenseListQuery}`,
    key: 'getUserExpensesA',
    value: [expenseListQuery],
    options: {
      enabled: true
    }
  });

  const GetExpenseReportData = useApi<ExpenseReportResponse>({
    api: `${expenseApi.getExpenseReport}?${reportQuery}`,
    key: 'getExpenseReportData',
    value: [reportQuery],
    options: {
      enabled: true
    }
  });

  const GetExpenseSummaryData = useApi<ExpenseSummaryResponse>({
    api: `${expenseApi.getExpenseSummary}?${summaryQuery}`,
    key: 'getExpenseSummaryData',
    value: [summaryQuery],
    options: {
      enabled: true
    }
  });
  const GetExpenseTrendData = useApi<ExpenseTrendResponse>({
    api: `${expenseApi.getMonthlyTrend}?${trendQuery}`,
    key: 'getExpenseTrendData',
    value: [trendQuery],
    options: {
      enabled: true
    }
  });

  const handleEdit = (expenseId: string) => {
    setEdit(true);
    setOpen(true);
    setId(expenseId);
  };

  const handleAddNew = () => {
    setEdit(false);
    setId('');
    setOpen(true);
  };

  const handleClearFilters = () => {
    setCategoryFilter('');
    setStartDate('');
    setEndDate('');
    setGroupBy('category');
    setPeriod('month');
    setMonths(6);
  };

  const hasActiveFilters =
    categoryFilter ||
    startDate ||
    endDate ||
    groupBy !== 'category' ||
    period !== 'month' ||
    months !== 6;

  const expenses = expesesList.data?.data?.docs ?? [];
  const filteredExpenses = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return expenses;
    return expenses.filter((item) => {
      const category = item.category?.categoryName?.toLowerCase() ?? '';
      const method = item.paymentMethod?.toLowerCase() ?? '';
      const amount = String(item.amount ?? '').toLowerCase();
      return (
        category.includes(term) ||
        method.includes(term) ||
        amount.includes(term)
      );
    });
  }, [expenses, search]);

  const totalPages = Math.max(1, Math.ceil(filteredExpenses.length / perPage));
  const safePage = Math.min(page, totalPages);
  const pagedExpenses = filteredExpenses.slice(
    (safePage - 1) * perPage,
    safePage * perPage
  );

  const totalStats = GetExpenseSummaryData.data?.data?.totalStats?.[0] ?? null;
  const categoryBreakdown =
    GetExpenseSummaryData.data?.data?.categoryBreakdown ?? [];
  const paymentBreakdown =
    GetExpenseSummaryData.data?.data?.paymentMethodBreakdown ?? [];
  const recentExpenses = GetExpenseSummaryData.data?.data?.recentExpenses ?? [];

  const reportSummary = GetExpenseReportData.data?.data?.summary ?? null;
  const reportBreakdown = GetExpenseReportData.data?.data?.breakdown ?? [];
  const maxCategoryTotal = Math.max(
    1,
    ...categoryBreakdown.map((item) => item.total)
  );
  const maxReportTotal = Math.max(
    1,
    ...reportBreakdown.map((item) => item.totalAmount)
  );

  const trendData = GetExpenseTrendData.data?.data ?? [];
  const maxTrendTotal = Math.max(
    1,
    ...trendData.map((item) => item.totalAmount)
  );

  const getMonthName = (month: number) => {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];
    return months[month - 1] || '';
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <ExpenseForm
        open={open}
        setOpen={setOpen}
        id={id}
        edit={edit}
        setEdit={setEdit}
        refetchExpenseList={expesesList.refetch}
        refetchReport={GetExpenseReportData.refetch}
        refetchSummary={GetExpenseSummaryData.refetch}
        refetchTrend={GetExpenseTrendData.refetch}
      />

      <div className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-white via-slate-50 to-emerald-50/70 dark:border-slate-800 dark:from-slate-900 dark:via-slate-950 dark:to-emerald-950/40">
        <div className="absolute -top-24 right-0 h-64 w-64 rounded-full bg-emerald-500/15 blur-3xl dark:bg-emerald-500/10" />
        <div className="absolute -bottom-20 left-0 h-64 w-64 rounded-full bg-amber-400/20 blur-3xl dark:bg-amber-400/10" />
        <div className="mx-auto px-6 py-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-emerald-700 dark:text-emerald-300">
                Expense Tracker
              </p>
              <h1 className="mt-2 text-3xl font-semibold leading-tight text-slate-900 dark:text-white md:text-4xl">
                See where your money flows, then take control.
              </h1>
              <p className="mt-3 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
                Track every transaction, understand category trends, and plan
                your next move with a clean, focused view of spending.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
                  hasActiveFilters
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:border-emerald-400 dark:bg-emerald-950/50 dark:text-emerald-300'
                    : 'border-slate-300 text-slate-700 hover:border-slate-400 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500'
                }`}
              >
                <Filter className="inline-block mr-2 h-4 w-4" />
                Filters
                {hasActiveFilters && (
                  <span className="ml-2 inline-flex items-center justify-center rounded-full bg-emerald-600 px-2 py-0.5 text-xs font-bold text-white dark:bg-emerald-400 dark:text-slate-900">
                    Active
                  </span>
                )}
              </button>
              <button
                onClick={handleAddNew}
                className="rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-500 dark:bg-emerald-500 dark:text-slate-900 dark:shadow-emerald-500/30 dark:hover:bg-emerald-400"
              >
                Add New Expense
              </button>
              <button
                className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500"
                onClick={() => expesesList.refetch()}
              >
                Refresh Data
              </button>
            </div>
          </div>

          {/* Advanced Filters Panel */}
          {showFilters && (
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <Filter className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Advanced Filters
                  </h3>
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={handleClearFilters}
                    className="flex items-center gap-2 rounded-full border border-slate-300 px-4 py-1.5 text-sm font-semibold text-slate-700 transition hover:border-red-400 hover:bg-red-50 hover:text-red-600 dark:border-slate-700 dark:text-slate-200 dark:hover:border-red-500 dark:hover:bg-red-950/30 dark:hover:text-red-400"
                  >
                    <X className="h-4 w-4" />
                    Clear All
                  </button>
                )}
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Category Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Category
                  </label>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-100 dark:focus:border-emerald-400"
                  >
                    <option value="">All Categories</option>
                    {categoryListData?.data?.data?.docs?.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.categoryName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Start Date Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <CalendarIcon className="inline-block mr-1 h-4 w-4" />
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-100 dark:focus:border-emerald-400"
                  />
                </div>

                {/* End Date Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <CalendarIcon className="inline-block mr-1 h-4 w-4" />
                    End Date
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-100 dark:focus:border-emerald-400"
                  />
                </div>

                {/* Group By Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Group Report By
                  </label>
                  <select
                    value={groupBy}
                    onChange={(e) => setGroupBy(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-100 dark:focus:border-emerald-400"
                  >
                    <option value="category">Category</option>
                    <option value="paymentMethod">Payment Method</option>
                    <option value="month">Month</option>
                  </select>
                </div>

                {/* Period Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Summary Period
                  </label>
                  <select
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-100 dark:focus:border-emerald-400"
                  >
                    <option value="day">Daily</option>
                    <option value="week">Weekly</option>
                    <option value="month">Monthly</option>
                    <option value="year">Yearly</option>
                  </select>
                </div>

                {/* Months Trend Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <TrendingUp className="inline-block mr-1 h-4 w-4" />
                    Trend Duration (Months)
                  </label>
                  <select
                    value={months}
                    onChange={(e) => setMonths(Number(e.target.value))}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-100 dark:focus:border-emerald-400"
                  >
                    <option value={3}>Last 3 Months</option>
                    <option value={6}>Last 6 Months</option>
                    <option value={12}>Last 12 Months</option>
                    <option value={24}>Last 24 Months</option>
                  </select>
                </div>
              </div>

              {/* Active Filters Summary */}
              {hasActiveFilters && (
                <div className="mt-5 pt-5 border-t border-slate-200 dark:border-slate-700">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 mb-3">
                    Active Filters
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {categoryFilter && (
                      <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                        Category:{' '}
                        {categoryListData?.data?.data?.docs?.find(
                          (c) => c._id === categoryFilter
                        )?.categoryName || categoryFilter}
                        <button
                          onClick={() => setCategoryFilter('')}
                          className="hover:text-emerald-900 dark:hover:text-emerald-100"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    )}
                    {startDate && (
                      <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
                        From: {new Date(startDate).toLocaleDateString()}
                        <button
                          onClick={() => setStartDate('')}
                          className="hover:text-blue-900 dark:hover:text-blue-100"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    )}
                    {endDate && (
                      <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
                        To: {new Date(endDate).toLocaleDateString()}
                        <button
                          onClick={() => setEndDate('')}
                          className="hover:text-blue-900 dark:hover:text-blue-100"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    )}
                    {groupBy !== 'category' && (
                      <span className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-700 dark:bg-purple-950/50 dark:text-purple-300">
                        Group: {groupBy}
                        <button
                          onClick={() => setGroupBy('category')}
                          className="hover:text-purple-900 dark:hover:text-purple-100"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    )}
                    {period !== 'month' && (
                      <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-700 dark:bg-amber-950/50 dark:text-amber-300">
                        Period: {period}
                        <button
                          onClick={() => setPeriod('month')}
                          className="hover:text-amber-900 dark:hover:text-amber-100"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    )}
                    {months !== 6 && (
                      <span className="inline-flex items-center gap-2 rounded-full bg-pink-100 px-3 py-1 text-sm font-medium text-pink-700 dark:bg-pink-950/50 dark:text-pink-300">
                        Trend: {months} months
                        <button
                          onClick={() => setMonths(6)}
                          className="hover:text-pink-900 dark:hover:text-pink-100"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                Total Spend
              </p>
              <p className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
                {currency.format(totalStats?.totalExpenses ?? 0)}
              </p>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                {totalStats?.totalTransactions ?? 0} transactions recorded
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                Average Transaction
              </p>
              <p className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
                {currency.format(totalStats?.avgTransaction ?? 0)}
              </p>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Your typical spend size
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                Monthly Range
              </p>
              <p className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
                {currency.format(reportSummary?.minTransaction ?? 0)} -{' '}
                {currency.format(reportSummary?.maxTransaction ?? 0)}
              </p>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Min to max transaction size
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto py-6">
        <div className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                Monthly Spending Trend
              </h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Track your expense patterns over time
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                {trendData.length} {trendData.length === 1 ? 'Month' : 'Months'}
              </p>
            </div>
          </div>

          {trendData.length > 0 ? (
            <div className="mt-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {trendData.map((item) => (
                  <div
                    key={item.monthYear}
                    className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 transition hover:shadow-md dark:border-slate-700 dark:bg-slate-950/50"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                          {getMonthName(item.month)} {item.year}
                        </p>
                        <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                          {currency.format(item.totalAmount)}
                        </p>
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                          {item.count} transactions
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-400">Avg</p>
                        <p className="mt-1 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                          {currency.format(item.avgAmount)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all dark:from-emerald-400 dark:to-emerald-500"
                          style={{
                            width: `${(item.totalAmount / maxTrendTotal) * 100}%`
                          }}
                        />
                      </div>
                      <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
                        <span>
                          {((item.totalAmount / maxTrendTotal) * 100).toFixed(
                            0
                          )}
                          % of max
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-700 dark:bg-slate-950/50">
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                      Total Tracked
                    </p>
                    <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">
                      {currency.format(
                        trendData.reduce(
                          (sum, item) => sum + item.totalAmount,
                          0
                        )
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                      Total Transactions
                    </p>
                    <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">
                      {trendData.reduce((sum, item) => sum + item.count, 0)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                      Overall Average
                    </p>
                    <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">
                      {currency.format(
                        trendData.reduce(
                          (sum, item) => sum + item.totalAmount,
                          0
                        ) / trendData.reduce((sum, item) => sum + item.count, 0)
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50/50 p-8 text-center dark:border-slate-700 dark:bg-slate-950/40">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                No trend data available yet. Add expenses to see monthly trends.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto grid  gap-6 pb-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                  Expenses Overview
                </h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Search, filter, and drill into every expense item.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <div className="relative">
                  <input
                    value={search}
                    onChange={(event) => {
                      setPage(1);
                      setSearch(event.target.value);
                    }}
                    placeholder="Search category, method, amount"
                    className="w-64 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-emerald-400"
                  />
                </div>
                <select
                  value={perPage}
                  onChange={(event) => {
                    setPage(1);
                    setPerPage(Number(event.target.value));
                  }}
                  className="rounded-full border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-100 dark:focus:border-emerald-400"
                >
                  <option value={6}>6 / page</option>
                  <option value={8}>8 / page</option>
                  <option value={12}>12 / page</option>
                </select>
              </div>
            </div>

            <div className="mt-6 hidden overflow-hidden rounded-2xl border border-slate-200 md:block dark:border-slate-800">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-100 text-xs uppercase tracking-[0.2em] text-slate-500 dark:bg-slate-900/80 dark:text-slate-400">
                  <tr>
                    <th className="px-5 py-3">Category</th>
                    <th className="px-5 py-3">Payment</th>
                    <th className="px-5 py-3">Date</th>
                    <th className="px-5 py-3">Amount</th>
                    <th className="px-5 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {pagedExpenses.map((item) => (
                    <tr
                      key={item._id}
                      className="bg-white/70 dark:bg-slate-950/40"
                    >
                      <td className="px-5 py-4">
                        <div className="font-semibold text-slate-900 dark:text-white">
                          {item.category?.categoryName ?? 'Uncategorized'}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-500">
                          {item.user?.fullName ?? 'Unknown user'}
                        </div>
                      </td>
                      <td className="px-5 py-4 capitalize text-slate-600 dark:text-slate-300">
                        {item.paymentMethod}
                      </td>
                      <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                        {formatDate(item.expenseDate)}
                      </td>
                      <td className="px-5 py-4 font-semibold text-emerald-600 dark:text-emerald-300">
                        {currency.format(item.amount)}
                      </td>
                      <td className="px-5 py-4">
                        <button
                          onClick={() => handleEdit(item._id)}
                          className="rounded-full border border-slate-300 px-4 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-emerald-500 dark:border-slate-700 dark:text-slate-200 dark:hover:border-emerald-400"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                  {pagedExpenses.length === 0 && (
                    <tr>
                      <td
                        className="px-5 py-6 text-center text-sm text-slate-500 dark:text-slate-400"
                        colSpan={5}
                      >
                        No expenses match your filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-6 space-y-4 md:hidden">
              {pagedExpenses.map((item) => (
                <div
                  key={item._id}
                  className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/60"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        {item.category?.categoryName ?? 'Uncategorized'}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-500">
                        {formatDate(item.expenseDate)} · {item.paymentMethod}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-300">
                      {currency.format(item.amount)}
                    </p>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                    <span>{item.user?.fullName ?? 'Unknown user'}</span>
                    <button
                      onClick={() => handleEdit(item._id)}
                      className="rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
              {pagedExpenses.length === 0 && (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white/70 p-6 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-400">
                  No expenses match your filters.
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500 dark:text-slate-400">
              <p>
                Showing {(safePage - 1) * perPage + 1} -{' '}
                {Math.min(safePage * perPage, filteredExpenses.length)} of{' '}
                {filteredExpenses.length} expenses
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                  className="rounded-full border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 disabled:opacity-40 dark:border-slate-700 dark:text-slate-200"
                  disabled={safePage === 1}
                >
                  Prev
                </button>
                <span className="text-xs">
                  Page {safePage} / {totalPages}
                </span>
                <button
                  onClick={() =>
                    setPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  className="rounded-full border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 disabled:opacity-40 dark:border-slate-700 dark:text-slate-200"
                  disabled={safePage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                Category Breakdown
              </h3>
              <div className="mt-4 space-y-4">
                {categoryBreakdown.map((item) => (
                  <div key={item._id}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-700 dark:text-slate-200">
                        {item.category?.categoryName ?? 'Uncategorized'}
                      </span>
                      <span className="text-slate-500 dark:text-slate-400">
                        {currency.format(item.total)}
                      </span>
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800">
                      <div
                        className="h-2 rounded-full bg-emerald-500 dark:bg-emerald-400"
                        style={{
                          width: `${(item.total / maxCategoryTotal) * 100}%`
                        }}
                      />
                    </div>
                  </div>
                ))}
                {categoryBreakdown.length === 0 && (
                  <p className="text-sm text-slate-500">
                    No categories to show yet.
                  </p>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                Payment Methods
              </h3>
              <div className="mt-4 space-y-4">
                {paymentBreakdown.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-950/60"
                  >
                    <div>
                      <p className="text-sm font-semibold capitalize text-slate-900 dark:text-white">
                        {item._id}
                      </p>
                      <p className="text-xs text-slate-500">
                        {item.count} transactions
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-300">
                      {currency.format(item.total)}
                    </p>
                  </div>
                ))}
                {paymentBreakdown.length === 0 && (
                  <p className="text-sm text-slate-500">
                    No payment methods yet.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              Report Summary
            </h3>
            <div className="mt-5 grid gap-4">
              <div className="rounded-2xl bg-slate-100 p-4 dark:bg-slate-950/60">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Total Expenses
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
                  {currency.format(reportSummary?.totalExpenses ?? 0)}
                </p>
              </div>
              <div className="rounded-2xl bg-slate-100 p-4 dark:bg-slate-950/60">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Average Transaction
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
                  {currency.format(reportSummary?.avgTransaction ?? 0)}
                </p>
              </div>
              <div className="rounded-2xl bg-slate-100 p-4 dark:bg-slate-950/60">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Transaction Range
                </p>
                <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                  {currency.format(reportSummary?.minTransaction ?? 0)} -{' '}
                  {currency.format(reportSummary?.maxTransaction ?? 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              Report Breakdown
            </h3>
            <div className="mt-4 space-y-4">
              {reportBreakdown.map((item) => (
                <div key={item._id}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-700 dark:text-slate-200">
                      {item.details?.categoryName ?? 'Uncategorized'}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400">
                      {currency.format(item.totalAmount)}
                    </span>
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800">
                    <div
                      className="h-2 rounded-full bg-amber-500 dark:bg-amber-400"
                      style={{
                        width: `${(item.totalAmount / maxReportTotal) * 100}%`
                      }}
                    />
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                    <span>{item.count} txns</span>
                    <span>Avg {currency.format(item.avgAmount)}</span>
                  </div>
                </div>
              ))}
              {reportBreakdown.length === 0 && (
                <p className="text-sm text-slate-500">
                  No report breakdown yet.
                </p>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                Recent Expenses
              </h3>
              <span className="text-xs text-slate-500">Latest 4</span>
            </div>
            <div className="mt-4 space-y-3">
              {recentExpenses.slice(0, 4).map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-950/60"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      {item.category?.categoryName ?? 'Uncategorized'}
                    </p>
                    <p className="text-xs text-slate-500">
                      {formatDate(item.expenseDate)} · {item.paymentMethod}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-300">
                    {currency.format(item.amount)}
                  </p>
                </div>
              ))}
              {recentExpenses.length === 0 && (
                <p className="text-sm text-slate-500">
                  No recent expenses yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
