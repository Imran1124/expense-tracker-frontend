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
    <div className="min-h-screen bg-background text-foreground">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(900px_360px_at_12%_-10%,#f59e0b33,transparent),radial-gradient(700px_300px_at_88%_-20%,#0ea5e933,transparent)] dark:bg-[radial-gradient(900px_360px_at_12%_-10%,#1f293733,transparent),radial-gradient(700px_300px_at_88%_-20%,#1e40af33,transparent)]" />
        <div className="relative px-4 py-10 sm:px-6 lg:px-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">
                Your dashboard
              </p>
              <h1 className="mt-3 text-3xl font-semibold sm:text-4xl font-['Space_Grotesk']">
                Personal spending focus
              </h1>
              <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                Track your totals, category mix, and recent activity with a
                calm, modern layout.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="rounded-2xl border border-border/60 bg-card/80 p-4 text-sm text-foreground shadow-[0_18px_45px_-30px_rgba(0,0,0,0.45)] backdrop-blur">
                <div className="font-medium">Quick summary</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  Updated moments ago
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                      Total
                    </div>
                    <div className="text-lg font-semibold">
                      {toCurrency(reportSummary?.totalExpenses)}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                      Transactions
                    </div>
                    <div className="text-lg font-semibold">
                      {reportSummary?.totalTransactions || 0}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-4">
            {[
              {
                label: 'Total expenses',
                value: toCurrency(reportSummary?.totalExpenses),
                hint: 'All your spending'
              },
              {
                label: 'Avg transaction',
                value: toCurrency(reportSummary?.avgTransaction),
                hint: 'Typical spend size'
              },
              {
                label: 'Min transaction',
                value: toCurrency(reportSummary?.minTransaction),
                hint: 'Lowest recorded'
              },
              {
                label: 'Max transaction',
                value: toCurrency(reportSummary?.maxTransaction),
                hint: 'Highest recorded'
              }
            ].map((card) => (
              <div
                key={card.label}
                className="group rounded-2xl border border-border/60 bg-card/90 p-5 shadow-[0_18px_45px_-30px_rgba(0,0,0,0.45)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_55px_-35px_rgba(0,0,0,0.55)]"
              >
                <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  {card.label}
                </div>
                <div className="mt-3 text-2xl font-semibold">{card.value}</div>
                <div className="mt-2 text-xs text-muted-foreground">
                  {card.hint}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-3xl border border-border/60 bg-card/80 p-4 shadow-[0_18px_45px_-30px_rgba(0,0,0,0.45)] backdrop-blur">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  Filters
                </div>
                <div className="mt-1 text-sm font-medium">Refine your view</div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                <label className="text-xs text-muted-foreground">
                  Start date
                  <input
                    type="date"
                    value={filters.startDate}
                    onChange={(event) =>
                      setFilters((prev) => ({
                        ...prev,
                        startDate: event.target.value
                      }))
                    }
                    className="mt-1 w-full rounded-xl border border-border/70 bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </label>
                <label className="text-xs text-muted-foreground">
                  End date
                  <input
                    type="date"
                    value={filters.endDate}
                    onChange={(event) =>
                      setFilters((prev) => ({
                        ...prev,
                        endDate: event.target.value
                      }))
                    }
                    className="mt-1 w-full rounded-xl border border-border/70 bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </label>
                <label className="text-xs text-muted-foreground">
                  Group by
                  <select
                    value={filters.groupBy}
                    onChange={(event) =>
                      setFilters((prev) => ({
                        ...prev,
                        groupBy: event.target.value
                      }))
                    }
                    className="mt-1 w-full rounded-xl border border-border/70 bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="category">Category</option>
                    <option value="paymentMethod">Payment method</option>
                  </select>
                </label>
                <label className="text-xs text-muted-foreground">
                  Period
                  <select
                    value={filters.period}
                    onChange={(event) =>
                      setFilters((prev) => ({
                        ...prev,
                        period: event.target.value
                      }))
                    }
                    className="mt-1 w-full rounded-xl border border-border/70 bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="day">Day</option>
                    <option value="week">Week</option>
                    <option value="month">Month</option>
                    <option value="year">Year</option>
                  </select>
                </label>
                <label className="text-xs text-muted-foreground">
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
                    className="mt-1 w-full rounded-xl border border-border/70 bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </label>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setAppliedFilters(filters)}
                  className="rounded-xl bg-foreground px-4 py-2 text-sm font-medium text-background shadow-sm transition hover:opacity-90"
                >
                  Apply
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
                  className="rounded-xl border border-border/70 px-4 py-2 text-sm font-medium text-foreground shadow-sm transition hover:bg-muted"
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
          <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-[0_18px_50px_-35px_rgba(0,0,0,0.45)]">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  Trend
                </div>
                <div className="mt-2 text-lg font-semibold">
                  Your spending rhythm
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                {trend.length} months
              </div>
            </div>
            <div className="mt-6 space-y-4">
              {trend.map((item) => (
                <div
                  key={item.monthYear}
                  className="rounded-2xl border border-border/50 bg-muted/40 p-4"
                >
                  <div className="flex items-center justify-between text-sm">
                    <div className="font-medium">{item.monthYear}</div>
                    <div>{toCurrency(item.totalAmount)}</div>
                  </div>
                  <div className="mt-3 h-2 w-full rounded-full bg-background/70">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-amber-500 via-orange-400 to-rose-400 dark:from-emerald-400 dark:via-sky-400 dark:to-indigo-400"
                      style={{
                        width: `${(item.totalAmount / trendMax) * 100}%`
                      }}
                    />
                  </div>
                  <div className="mt-2 flex justify-between text-[11px] text-muted-foreground">
                    <span>{item.count} transactions</span>
                    <span>Avg {toCurrency(item.avgAmount)}</span>
                  </div>
                </div>
              ))}
              {trend.length === 0 && (
                <div className="rounded-2xl border border-dashed border-border/70 p-6 text-sm text-muted-foreground">
                  No trend data available yet.
                </div>
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-[0_18px_50px_-35px_rgba(0,0,0,0.45)]">
            <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Snapshot
            </div>
            <div className="mt-2 text-lg font-semibold">Today at a glance</div>
            <div className="mt-5 grid gap-4">
              <div className="rounded-2xl bg-gradient-to-br from-foreground/90 to-foreground/70 p-4 text-background">
                <div className="text-xs uppercase tracking-[0.2em] text-background/70">
                  Summary total
                </div>
                <div className="mt-2 text-2xl font-semibold">
                  {toCurrency(summaryStats?.totalExpenses)}
                </div>
                <div className="mt-1 text-xs text-background/70">
                  {summaryStats?.totalTransactions || 0} transactions
                </div>
              </div>
              <div className="rounded-2xl border border-border/60 bg-muted/40 p-4">
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Payment mix
                </div>
                <div className="mt-3 space-y-3">
                  {paymentMethods.map(
                    (method: { _id: string; total: number; count: number }) => (
                      <div
                        key={method._id}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="capitalize">
                          {method._id.replace('_', ' ')}
                        </span>
                        <span>{toCurrency(method.total)}</span>
                      </div>
                    )
                  )}
                  {paymentMethods.length === 0 && (
                    <div className="text-sm text-muted-foreground">
                      No payment data yet.
                    </div>
                  )}
                </div>
              </div>
              <div className="rounded-2xl border border-border/60 bg-card p-4">
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Average transaction
                </div>
                <div className="mt-2 text-xl font-semibold">
                  {toCurrency(summaryStats?.avgTransaction)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-[0_18px_50px_-35px_rgba(0,0,0,0.45)]">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  Category
                </div>
                <div className="mt-2 text-lg font-semibold">Top categories</div>
              </div>
              <div className="text-xs text-muted-foreground">
                {categoryBreakdown.length} categories
              </div>
            </div>
            <div className="mt-5 space-y-4">
              {categoryBreakdown.map((item) => (
                <div
                  key={item._id}
                  className="rounded-2xl border border-border/60 bg-muted/40 p-4"
                >
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">
                      {item.details?.categoryName || 'Unknown'}
                    </span>
                    <span>{toCurrency(item.totalAmount)}</span>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    {item.count} transactions · Avg {toCurrency(item.avgAmount)}{' '}
                    · Min {toCurrency(item.minAmount)} · Max{' '}
                    {toCurrency(item.maxAmount)}
                  </div>
                </div>
              ))}
              {categoryBreakdown.length === 0 && (
                <div className="rounded-2xl border border-dashed border-border/70 p-6 text-sm text-muted-foreground">
                  No categories tracked yet.
                </div>
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-[0_18px_50px_-35px_rgba(0,0,0,0.45)]">
            <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Recent
            </div>
            <div className="mt-2 text-lg font-semibold">Latest expenses</div>
            <div className="mt-5 space-y-4">
              {recentExpenses.map((expense) => (
                <div
                  key={expense._id}
                  className="rounded-2xl border border-border/60 bg-muted/40 p-4"
                >
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        {expense.paymentMethod.replace('_', ' ')}
                      </div>
                      <div className="mt-2 text-sm font-medium">
                        {expense.category?.categoryName || 'Uncategorized'}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold">
                        {toCurrency(expense.amount)}
                      </div>
                      <div className="text-xs text-muted-foreground">
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
                  {expense.description && (
                    <div className="mt-2 text-xs text-muted-foreground">
                      {expense.description}
                    </div>
                  )}
                </div>
              ))}
              {recentExpenses.length === 0 && (
                <div className="rounded-2xl border border-dashed border-border/70 p-6 text-sm text-muted-foreground">
                  No recent expenses yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
