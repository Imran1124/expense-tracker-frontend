import { useMemo } from 'react';
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

type UserBreakdownItem = {
  _id: string;
  totalAmount: number;
  count: number;
  avgAmount: number;
  minAmount: number;
  maxAmount: number;
  user?: {
    fullName?: string;
    email?: string;
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

type AdminOverviewResponse = {
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
      users?: UserBreakdownItem[];
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

export default function AdminDashboard() {
  const adminOverViewData = useApi<AdminOverviewResponse>({
    api: expenseApi?.getAdminOverview,
    key: 'adminOverViewData',
    options: {
      enabled: true
    }
  });

  const reportSummary = adminOverViewData?.data?.data?.report?.summary;
  const categoryBreakdown = (adminOverViewData?.data?.data?.report?.breakdown ||
    []) as BreakdownItem[];
  const userBreakdown = (adminOverViewData?.data?.data?.report?.users ||
    []) as UserBreakdownItem[];
  const trend = (adminOverViewData?.data?.data?.trend || []) as TrendItem[];
  const summaryStats = adminOverViewData?.data?.data?.summary?.totalStats?.[0];
  const paymentMethods =
    adminOverViewData?.data?.data?.summary?.paymentMethodBreakdown || [];
  const recentExpenses = (adminOverViewData?.data?.data?.summary
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
        <div className="absolute inset-0 bg-[radial-gradient(1100px_400px_at_15%_-10%,#f4b86a33,transparent),radial-gradient(900px_350px_at_80%_-20%,#5b7d5533,transparent)] dark:bg-[radial-gradient(1100px_400px_at_15%_-10%,#1f293733,transparent),radial-gradient(900px_350px_at_80%_-20%,#0ea5a333,transparent)]" />
        <div className="relative px-4 py-10 sm:px-6 lg:px-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">
                Admin Overview
              </p>
              <h1 className="mt-3 text-3xl font-semibold sm:text-4xl font-['Space_Grotesk']">
                Expense control center
              </h1>
              <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                Monitor totals, categories, users, and recent activity in a
                clean, focused layout.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="rounded-2xl border border-border/60 bg-card/80 p-4 text-sm text-foreground shadow-[0_18px_45px_-30px_rgba(0,0,0,0.45)] backdrop-blur">
                <div className="font-medium">Report summary</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  Last refresh just now
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
                hint: 'Across all categories'
              },
              {
                label: 'Avg transaction',
                value: toCurrency(reportSummary?.avgTransaction),
                hint: 'Recent overall average'
              },
              {
                label: 'Min transaction',
                value: toCurrency(reportSummary?.minTransaction),
                hint: 'Smallest recorded'
              },
              {
                label: 'Max transaction',
                value: toCurrency(reportSummary?.maxTransaction),
                hint: 'Largest recorded'
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
                  Monthly momentum
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
                      className="h-2 rounded-full bg-gradient-to-r from-amber-500 via-orange-400 to-rose-400 dark:from-teal-400 dark:via-sky-400 dark:to-indigo-400"
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
              Users
            </div>
            <div className="mt-2 text-lg font-semibold">Top contributors</div>
            <div className="mt-5 space-y-4">
              {userBreakdown.map((user) => (
                <div
                  key={user._id}
                  className="rounded-2xl border border-border/60 bg-card p-4"
                >
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <div className="font-medium">
                        {user.user?.fullName || 'Unknown user'}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {user.user?.email || 'No email'}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">
                        {toCurrency(user.totalAmount)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {user.count} transactions
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    Avg {toCurrency(user.avgAmount)} · Min{' '}
                    {toCurrency(user.minAmount)} · Max{' '}
                    {toCurrency(user.maxAmount)}
                  </div>
                </div>
              ))}
              {userBreakdown.length === 0 && (
                <div className="rounded-2xl border border-dashed border-border/70 p-6 text-sm text-muted-foreground">
                  No user insights available yet.
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-3xl border border-border/60 bg-card p-6 shadow-[0_18px_50px_-35px_rgba(0,0,0,0.45)]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Recent
              </div>
              <div className="mt-2 text-lg font-semibold">Latest expenses</div>
            </div>
            <div className="text-xs text-muted-foreground">
              Last {recentExpenses.length} entries
            </div>
          </div>
          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {recentExpenses.map((expense) => (
              <div
                key={expense._id}
                className="rounded-2xl border border-border/60 bg-muted/40 p-4"
              >
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {expense.paymentMethod.replace('_', ' ')}
                </div>
                <div className="mt-2 text-lg font-semibold">
                  {toCurrency(expense.amount)}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {expense.category?.categoryName || 'Uncategorized'}
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  {new Date(expense.expenseDate).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </div>
                {expense.description && (
                  <div className="mt-2 text-xs text-muted-foreground">
                    {expense.description}
                  </div>
                )}
              </div>
            ))}
            {recentExpenses.length === 0 && (
              <div className="col-span-full rounded-2xl border border-dashed border-border/70 p-6 text-sm text-muted-foreground">
                No recent expenses yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
