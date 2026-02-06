import { useMemo, useState } from 'react';
import { useApi } from '@/hooks/useCustomQuery';
import { expenseApi } from '@/lib';

type BreakdownItem = {
  _id: string;
  totalAmount: number;
  count: number;
  avgAmount: number;
  minAmount: number;
  maxAmount: number;
  details?: {
    categoryName?: string;
    description?: string;
  };
};

type TrendItem = {
  monthYear: string;
  totalAmount: number;
  count: number;
  avgAmount: number;
};

type RecentExpense = {
  _id: string;
  amount: number;
  paymentMethod: string;
  expenseDate: string;
  description?: string;
  category?: {
    categoryName?: string;
  };
};

type UserOverviewResponse = {
  success: boolean;
  message: string;
  data: {
    report?: {
      summary?: {
        _id: string | null;
        totalExpenses: number;
        totalTransactions: number;
        avgTransaction: number;
        minTransaction: number;
        maxTransaction: number;
      };
      breakdown?: BreakdownItem[];
    };
    summary?: {
      totalStats?: Array<{
        _id: string | null;
        totalExpenses: number;
        totalTransactions: number;
        avgTransaction: number;
      }>;
      paymentMethodBreakdown?: Array<{
        _id: string;
        total: number;
        count: number;
      }>;
      recentExpenses?: RecentExpense[];
    };
    trend?: TrendItem[];
  };
};

export default function UserDashboard() {
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    groupBy: 'category',
    period: 'month',
    months: 6
  });
  const [appliedFilters, setAppliedFilters] = useState(filters);

  const queryParams = {
    ...(appliedFilters.startDate
      ? { startDate: appliedFilters.startDate }
      : {}),
    ...(appliedFilters.endDate ? { endDate: appliedFilters.endDate } : {}),
    groupBy: appliedFilters.groupBy,
    period: appliedFilters.period,
    months: appliedFilters.months
  };

  const userOverviewData = useApi<UserOverviewResponse>({
    api: expenseApi.getUserOverview,
    key: 'getUserOverview',
    value: [
      appliedFilters.startDate,
      appliedFilters.endDate,
      appliedFilters.groupBy,
      appliedFilters.period,
      appliedFilters.months
    ],
    config: {
      params: queryParams
    },
    options: {
      enabled: true
    }
  });

  const reportSummary = userOverviewData?.data?.data?.report?.summary;
  const categoryBreakdown = (userOverviewData?.data?.data?.report?.breakdown ||
    []) as BreakdownItem[];
  const trend = (userOverviewData?.data?.data?.trend || []) as TrendItem[];
  const summaryStats = userOverviewData?.data?.data?.summary?.totalStats?.[0];
  const paymentMethods =
    userOverviewData?.data?.data?.summary?.paymentMethodBreakdown || [];
  const recentExpenses = (userOverviewData?.data?.data?.summary
    ?.recentExpenses || []) as RecentExpense[];

  const currency = useMemo(
    () =>
      new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
      }),
    []
  );

  const toCurrency = (value?: number) => currency.format(Number(value || 0));

  const trendMax = Math.max(1, ...trend.map((item) => item.totalAmount || 0));

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/20 to-purple-50/20 dark:from-slate-900 dark:via-purple-900/10 dark:to-slate-900">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(900px_360px_at_12%_-10%,#a855f733,transparent),radial-gradient(700px_300px_at_88%_-20%,#0ea5e933,transparent)] dark:bg-[radial-gradient(900px_360px_at_12%_-10%,#6d28d933,transparent),radial-gradient(700px_300px_at_88%_-20%,#1e40af33,transparent)]" />
        <div className="relative px-4 py-10 sm:px-6 lg:px-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.32em] text-purple-600 dark:text-purple-400 font-bold">
                📊 Your Dashboard
              </p>
              <h1 className="mt-3 text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 dark:from-purple-400 dark:via-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
                Personal Spending Insights
              </h1>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 sm:text-base">
                Track your expenses with beautiful analytics and real-time
                insights into your spending patterns.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="rounded-2xl border border-purple-200/50 dark:border-purple-900/30 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-6 text-sm text-foreground shadow-lg backdrop-blur-sm">
                <div className="font-bold text-gray-900 dark:text-white">
                  Quick Summary
                </div>
                <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  ✨ Updated moments ago
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.18em] text-purple-600 dark:text-purple-400 font-bold">
                      Total
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                      {toCurrency(reportSummary?.totalExpenses)}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400 font-bold">
                      Transactions
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                      {reportSummary?.totalTransactions || 0}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-4">
            {[
              {
                label: 'Total Expenses',
                value: toCurrency(reportSummary?.totalExpenses),
                hint: 'All your spending',
                icon: '💰',
                gradient: 'from-purple-500 to-purple-600'
              },
              {
                label: 'Avg Transaction',
                value: toCurrency(reportSummary?.avgTransaction),
                hint: 'Typical spend size',
                icon: '📈',
                gradient: 'from-blue-500 to-blue-600'
              },
              {
                label: 'Min Transaction',
                value: toCurrency(reportSummary?.minTransaction),
                hint: 'Lowest recorded',
                icon: '📉',
                gradient: 'from-cyan-500 to-cyan-600'
              },
              {
                label: 'Max Transaction',
                value: toCurrency(reportSummary?.maxTransaction),
                hint: 'Highest recorded',
                icon: '🔥',
                gradient: 'from-orange-500 to-orange-600'
              }
            ].map((card) => (
              <div
                key={card.label}
                className="group rounded-2xl border border-purple-200/30 dark:border-purple-900/20 bg-gradient-to-br from-white to-blue-50/30 dark:from-slate-800 dark:to-purple-900/20 p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 dark:shadow-purple-900/10"
              >
                <div className="flex items-center justify-between">
                  <div className="text-2xl">{card.icon}</div>
                  <div
                    className={`h-8 w-8 rounded-lg bg-gradient-to-r ${card.gradient} opacity-20 group-hover:opacity-30 transition-opacity`}
                  ></div>
                </div>
                <div className="mt-4 text-[11px] uppercase tracking-[0.2em] text-gray-600 dark:text-gray-400 font-bold">
                  {card.label}
                </div>
                <div className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                  {card.value}
                </div>
                <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                  {card.hint}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-3xl border border-purple-200/30 dark:border-purple-900/20 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-slate-800 dark:via-purple-900/10 dark:to-slate-800 p-8 shadow-xl backdrop-blur-sm">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-[0.2em] text-purple-600 dark:text-purple-400 font-bold">
                  🎯 Filters
                </div>
                <div className="mt-2 text-lg font-bold text-gray-900 dark:text-white">
                  Refine Your View
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Start Date
                  <input
                    type="date"
                    value={filters.startDate}
                    onChange={(event) =>
                      setFilters((prev) => ({
                        ...prev,
                        startDate: event.target.value
                      }))
                    }
                    className="mt-2 w-full rounded-xl border border-purple-200/30 dark:border-purple-900/30 bg-white dark:bg-slate-700 px-4 py-2.5 text-sm text-gray-900 dark:text-white shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 transition-all"
                  />
                </label>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  End Date
                  <input
                    type="date"
                    value={filters.endDate}
                    onChange={(event) =>
                      setFilters((prev) => ({
                        ...prev,
                        endDate: event.target.value
                      }))
                    }
                    className="mt-2 w-full rounded-xl border border-purple-200/30 dark:border-purple-900/30 bg-white dark:bg-slate-700 px-4 py-2.5 text-sm text-gray-900 dark:text-white shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 transition-all"
                  />
                </label>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Group By
                  <select
                    value={filters.groupBy}
                    onChange={(event) =>
                      setFilters((prev) => ({
                        ...prev,
                        groupBy: event.target.value
                      }))
                    }
                    className="mt-2 w-full rounded-xl border border-purple-200/30 dark:border-purple-900/30 bg-white dark:bg-slate-700 px-4 py-2.5 text-sm text-gray-900 dark:text-white shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 transition-all"
                  >
                    <option value="category">Category</option>
                    <option value="paymentMethod">Payment Method</option>
                  </select>
                </label>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Period
                  <select
                    value={filters.period}
                    onChange={(event) =>
                      setFilters((prev) => ({
                        ...prev,
                        period: event.target.value
                      }))
                    }
                    className="mt-2 w-full rounded-xl border border-purple-200/30 dark:border-purple-900/30 bg-white dark:bg-slate-700 px-4 py-2.5 text-sm text-gray-900 dark:text-white shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 transition-all"
                  >
                    <option value="day">Day</option>
                    <option value="week">Week</option>
                    <option value="month">Month</option>
                    <option value="year">Year</option>
                  </select>
                </label>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Months
                  <input
                    type="number"
                    min={1}
                    max={24}
                    value={filters.months}
                    onChange={(event) =>
                      setFilters((prev) => ({
                        ...prev,
                        months: Number(event.target.value || 1)
                      }))
                    }
                    className="mt-2 w-full rounded-xl border border-purple-200/30 dark:border-purple-900/30 bg-white dark:bg-slate-700 px-4 py-2.5 text-sm text-gray-900 dark:text-white shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 transition-all"
                  />
                </label>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setAppliedFilters(filters)}
                  className="rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-2.5 text-sm font-bold text-white shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
                >
                  Apply Filters
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const defaults = {
                      startDate: '',
                      endDate: '',
                      groupBy: 'category',
                      period: 'month',
                      months: 6
                    };
                    setFilters(defaults);
                    setAppliedFilters(defaults);
                  }}
                  className="rounded-xl border-2 border-purple-300 dark:border-purple-700 hover:border-purple-400 dark:hover:border-purple-600 px-8 py-2.5 text-sm font-bold text-purple-600 dark:text-purple-400 bg-transparent hover:bg-purple-50 dark:hover:bg-purple-900/20 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 pb-12 sm:px-6 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-3xl border border-purple-200/30 dark:border-purple-900/20 bg-gradient-to-br from-white to-blue-50/30 dark:from-slate-800 dark:to-purple-900/20 p-8 shadow-xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="text-[11px] uppercase tracking-[0.2em] text-purple-600 dark:text-purple-400 font-bold">
                  📊 Trend
                </div>
                <div className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                  Your Spending Rhythm
                </div>
              </div>
              <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 bg-purple-100 dark:bg-purple-900/30 rounded-full px-3 py-1">
                {trend.length} months
              </div>
            </div>
            <div className="space-y-4">
              {trend.map((item) => (
                <div
                  key={item.monthYear}
                  className="rounded-2xl border border-purple-200/30 dark:border-purple-900/20 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-5 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-between text-sm mb-3">
                    <div className="font-bold text-gray-900 dark:text-white">
                      {item.monthYear}
                    </div>
                    <div className="font-bold text-purple-600 dark:text-purple-400">
                      {toCurrency(item.totalAmount)}
                    </div>
                  </div>
                  <div className="mt-3 h-3 w-full rounded-full bg-gray-200 dark:bg-slate-700 overflow-hidden">
                    <div
                      className="h-3 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 shadow-lg shadow-purple-500/50 transition-all duration-500"
                      style={{
                        width: `${(item.totalAmount / trendMax) * 100}%`
                      }}
                    />
                  </div>
                  <div className="mt-3 flex justify-between text-[11px] text-gray-600 dark:text-gray-400 font-semibold">
                    <span>💳 {item.count} transactions</span>
                    <span>⌛ Avg {toCurrency(item.avgAmount)}</span>
                  </div>
                </div>
              ))}
              {trend.length === 0 && (
                <div className="rounded-2xl border-2 border-dashed border-purple-300 dark:border-purple-700 p-8 text-center text-sm text-gray-600 dark:text-gray-400">
                  No trend data available yet. Start tracking your expenses!
                </div>
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-purple-200/30 dark:border-purple-900/20 bg-gradient-to-br from-white to-blue-50/30 dark:from-slate-800 dark:to-purple-900/20 p-8 shadow-xl">
            <div className="text-[11px] uppercase tracking-[0.2em] text-purple-600 dark:text-purple-400 font-bold">
              ⚡ Snapshot
            </div>
            <div className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
              Today At A Glance
            </div>
            <div className="mt-6 grid gap-4">
              <div className="rounded-2xl bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-xs uppercase tracking-[0.2em] text-white/80 font-bold">
                  Summary Total
                </div>
                <div className="mt-3 text-3xl font-bold">
                  {toCurrency(summaryStats?.totalExpenses)}
                </div>
                <div className="mt-2 text-sm text-white/80">
                  💳 {summaryStats?.totalTransactions || 0} transactions
                </div>
              </div>
              <div className="rounded-2xl border border-purple-200/30 dark:border-purple-900/20 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-6">
                <div className="text-xs uppercase tracking-[0.2em] text-purple-600 dark:text-purple-400 font-bold">
                  💳 Payment Mix
                </div>
                <div className="mt-4 space-y-3">
                  {paymentMethods.map(
                    (method: { _id: string; total: number; count: number }) => (
                      <div
                        key={method._id}
                        className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-transparent to-purple-100/30 dark:to-purple-900/20 hover:to-purple-100/50 dark:hover:to-purple-900/40 transition-all"
                      >
                        <span className="capitalize font-medium text-gray-900 dark:text-white">
                          {method._id.replace('_', ' ')}
                        </span>
                        <div className="text-right">
                          <div className="font-bold text-purple-600 dark:text-purple-400">
                            {toCurrency(method.total)}
                          </div>
                          <div className="text-[11px] text-gray-500 dark:text-gray-400">
                            {method.count} txns
                          </div>
                        </div>
                      </div>
                    )
                  )}
                  {paymentMethods.length === 0 && (
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      No payment data yet.
                    </div>
                  )}
                </div>
              </div>
              <div className="rounded-2xl border border-cyan-200/30 dark:border-cyan-900/20 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 p-6">
                <div className="text-xs uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400 font-bold">
                  ⌛ Average
                </div>
                <div className="mt-3 text-3xl font-bold text-gray-900 dark:text-white">
                  {toCurrency(summaryStats?.avgTransaction)}
                </div>
                <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  Per Transaction
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-3xl border border-purple-200/30 dark:border-purple-900/20 bg-gradient-to-br from-white to-blue-50/30 dark:from-slate-800 dark:to-purple-900/20 p-8 shadow-xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="text-[11px] uppercase tracking-[0.2em] text-purple-600 dark:text-purple-400 font-bold">
                  📂 Category
                </div>
                <div className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                  Top Categories
                </div>
              </div>
              <div className="text-sm font-bold text-white bg-purple-600 dark:bg-purple-700 rounded-full px-3 py-1">
                {categoryBreakdown.length}
              </div>
            </div>
            <div className="space-y-4">
              {categoryBreakdown.map((item, idx) => (
                <div
                  key={item._id}
                  className="rounded-2xl border border-purple-200/30 dark:border-purple-900/20 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-3 h-3 rounded-full bg-gradient-to-r ${['from-purple-500 to-purple-600', 'from-blue-500 to-blue-600', 'from-cyan-500 to-cyan-600', 'from-pink-500 to-pink-600'][idx % 4]}`}
                      ></div>
                      <span className="font-bold text-gray-900 dark:text-white">
                        {item.details?.categoryName || 'Unknown'}
                      </span>
                    </div>
                    <span className="font-bold text-purple-600 dark:text-purple-400 text-lg">
                      {toCurrency(item.totalAmount)}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-[11px]">
                    <div className="bg-white dark:bg-slate-700 rounded-lg p-2 text-center">
                      <div className="text-gray-500 dark:text-gray-400">
                        Txns
                      </div>
                      <div className="font-bold text-gray-900 dark:text-white mt-1">
                        {item.count}
                      </div>
                    </div>
                    <div className="bg-white dark:bg-slate-700 rounded-lg p-2 text-center">
                      <div className="text-gray-500 dark:text-gray-400">
                        Avg
                      </div>
                      <div className="font-bold text-gray-900 dark:text-white mt-1">
                        {toCurrency(item.avgAmount)}
                      </div>
                    </div>
                    <div className="bg-white dark:bg-slate-700 rounded-lg p-2 text-center">
                      <div className="text-gray-500 dark:text-gray-400">
                        Min
                      </div>
                      <div className="font-bold text-gray-900 dark:text-white mt-1">
                        {toCurrency(item.minAmount)}
                      </div>
                    </div>
                    <div className="bg-white dark:bg-slate-700 rounded-lg p-2 text-center">
                      <div className="text-gray-500 dark:text-gray-400">
                        Max
                      </div>
                      <div className="font-bold text-gray-900 dark:text-white mt-1">
                        {toCurrency(item.maxAmount)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {categoryBreakdown.length === 0 && (
                <div className="rounded-2xl border-2 border-dashed border-purple-300 dark:border-purple-700 p-8 text-center text-sm text-gray-600 dark:text-gray-400">
                  No categories tracked yet. Create your first expense!
                </div>
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-purple-200/30 dark:border-purple-900/20 bg-gradient-to-br from-white to-blue-50/30 dark:from-slate-800 dark:to-purple-900/20 p-8 shadow-xl">
            <div className="text-[11px] uppercase tracking-[0.2em] text-purple-600 dark:text-purple-400 font-bold mb-2">
              ⏱️ Recent
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              Latest Expenses
            </div>
            <div className="space-y-4">
              {recentExpenses.map((expense) => (
                <div
                  key={expense._id}
                  className="rounded-2xl border border-purple-200/30 dark:border-purple-900/20 bg-gradient-to-r from-white to-purple-50/30 dark:from-slate-700 dark:to-purple-900/20 p-4 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="text-[11px] uppercase tracking-[0.2em] font-bold text-gray-500 dark:text-gray-400 mb-1">
                        {expense.paymentMethod?.replace('_', ' ')}
                      </div>
                      <div className="text-sm font-bold text-gray-900 dark:text-white">
                        {expense.category?.categoryName || 'Uncategorized'}
                      </div>
                      {expense.description && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                          💬 {expense.description}
                        </div>
                      )}
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        {toCurrency(expense.amount)}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {new Date(expense.expenseDate).toLocaleDateString(
                          'en-IN',
                          {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          }
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {recentExpenses.length === 0 && (
                <div className="rounded-2xl border-2 border-dashed border-purple-300 dark:border-purple-700 p-8 text-center text-sm text-gray-600 dark:text-gray-400">
                  No recent expenses yet. Start tracking!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
