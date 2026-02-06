import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Download, Filter } from 'lucide-react';
import * as XLSX from 'xlsx';
import Page from '@/components/helmet-page';
import { useApi } from '@/hooks/useCustomQuery';
import { expenseApi } from '@/lib';
import { useCategoryList } from '@/hooks/useMaster';

type Expense = {
  _id: string;
  userId: string;
  categoryId: string;
  amount: number;
  expenseDate: string;
  paymentMethod: string;
  description?: string;
  tags?: string[];
  status: number;
  createdAt: string;
  updatedAt: string;
  category?: {
    _id: string;
    categoryName: string;
    description: string;
  };
};

type ReportResponse = {
  success: boolean;
  message: string;
  data: {
    docs: Expense[];
    totalDocs: number;
    limit: number;
    page: number;
    totalPages: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
  };
};

export default function AdminUserReport() {
  const categoryList = useCategoryList();
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    q: '',
    categoryId: '',
    startDate: '',
    endDate: '',
    paymentMethod: ''
  });

  const queryParams = {
    page: filters.page,
    limit: filters.limit,
    ...(filters.q ? { q: filters.q } : {}),
    ...(filters.categoryId ? { categoryId: filters.categoryId } : {}),
    ...(filters.startDate ? { startDate: filters.startDate } : {}),
    ...(filters.endDate ? { endDate: filters.endDate } : {}),
    ...(filters.paymentMethod ? { paymentMethod: filters.paymentMethod } : {})
  };

  const UserReport = useApi<ReportResponse>({
    api: expenseApi.getUserReport,
    key: 'getUserReport',
    value: [
      filters.page,
      filters.limit,
      filters.q,
      filters.categoryId,
      filters.startDate,
      filters.endDate,
      filters.paymentMethod
    ],
    config: {
      params: queryParams
    },
    options: {
      enabled: true
    }
  });

  const reportData = UserReport.data?.data;
  const expenses = reportData?.docs || [];
  const totalPages = reportData?.totalPages || 1;
  const currentPage = reportData?.page || 1;
  const totalDocs = reportData?.totalDocs || 0;

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

  const paymentMethodColors: Record<string, string> = {
    cash: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
    credit_card:
      'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
    debit_card:
      'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300',
    upi: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
    bank_transfer:
      'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
  };

  const getPaymentMethodColor = (method: string) => {
    return (
      paymentMethodColors[method] ||
      'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
    );
  };

  const handleExportToExcel = () => {
    if (!expenses.length) {
      alert('No expenses to export');
      return;
    }

    const exportData = expenses.map((expense) => ({
      Date: new Date(expense.expenseDate).toLocaleDateString('en-IN'),
      Category: expense.category?.categoryName || 'Uncategorized',
      Description: expense.description || '-',
      'Payment Method': expense.paymentMethod.replace('_', ' '),
      Amount: expense.amount,
      Status: expense.status === 1 ? 'Active' : 'Inactive',
      'Created Date': new Date(expense.createdAt).toLocaleDateString('en-IN')
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wscols = [
      { wch: 12 },
      { wch: 15 },
      { wch: 20 },
      { wch: 15 },
      { wch: 12 },
      { wch: 10 },
      { wch: 12 }
    ];
    ws['!cols'] = wscols;

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Expenses');

    const fileName = `Expense_Report_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  return (
    <Page title="Reports">
      <div className="min-h-screen bg-background text-foreground">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(900px_360px_at_12%_-10%,#f59e0b33,transparent),radial-gradient(700px_300px_at_88%_-20%,#0ea5e933,transparent)] dark:bg-[radial-gradient(900px_360px_at_12%_-10%,#1f293733,transparent),radial-gradient(700px_300px_at_88%_-20%,#1e40af33,transparent)]" />

          <div className="relative px-6 py-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">
                  Financial Overview
                </p>
                <h1 className="mt-3 text-3xl font-semibold sm:text-4xl font-['Space_Grotesk']">
                  Expense Report
                </h1>
                <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                  View and analyze all your expenses with detailed filters and
                  insights.
                </p>
              </div>
              <div className="flex gap-2 self-start sm:self-auto">
                <button
                  onClick={handleExportToExcel}
                  title="Download report as Excel"
                  className="rounded-2xl border border-border/60 bg-card/80 p-2 shadow-sm transition hover:bg-card"
                >
                  <Download size={20} />
                </button>
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-border/60 bg-card p-6 shadow-[0_18px_50px_-35px_rgba(0,0,0,0.45)]">
              <div className="flex items-center gap-2 mb-4">
                <Filter size={18} />
                <h2 className="text-lg font-semibold">Filters</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <label className="text-xs text-muted-foreground">
                  Search
                  <input
                    type="text"
                    placeholder="Search by description..."
                    value={filters.q}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        q: e.target.value,
                        page: 1
                      }))
                    }
                    className="mt-1 w-full rounded-xl border border-border/70 bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </label>
                <label className="text-xs text-muted-foreground">
                  Category
                  <select
                    value={filters.categoryId}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        categoryId: e.target.value,
                        page: 1
                      }))
                    }
                    className="mt-1 w-full rounded-xl border border-border/70 bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">All categories</option>
                    {categoryList.data?.data?.docs?.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.categoryName}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="text-xs text-muted-foreground">
                  Start date
                  <input
                    type="date"
                    value={filters.startDate}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        startDate: e.target.value,
                        page: 1
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
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        endDate: e.target.value,
                        page: 1
                      }))
                    }
                    className="mt-1 w-full rounded-xl border border-border/70 bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </label>
                <label className="text-xs text-muted-foreground">
                  Payment method
                  <select
                    value={filters.paymentMethod}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        paymentMethod: e.target.value,
                        page: 1
                      }))
                    }
                    className="mt-1 w-full rounded-xl border border-border/70 bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">All methods</option>
                    <option value="cash">Cash</option>
                    <option value="credit_card">Credit card</option>
                    <option value="debit_card">Debit card</option>
                    <option value="upi">UPI</option>
                    <option value="bank_transfer">Bank transfer</option>
                  </select>
                </label>
                <label className="text-xs text-muted-foreground">
                  Limit
                  <select
                    value={filters.limit}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        limit: Number(e.target.value),
                        page: 1
                      }))
                    }
                    className="mt-1 w-full rounded-xl border border-border/70 bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                </label>
                <div className="flex items-end gap-2">
                  <button
                    onClick={() =>
                      setFilters({
                        page: 1,
                        limit: 10,
                        q: '',
                        categoryId: '',
                        startDate: '',
                        endDate: '',
                        paymentMethod: ''
                      })
                    }
                    className="flex-1 rounded-xl border border-border/70 px-4 py-2 text-sm font-medium text-foreground shadow-sm transition hover:bg-muted"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-border/60 bg-card shadow-[0_18px_50px_-35px_rgba(0,0,0,0.45)]">
              <div className="border-b border-border/60 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">Expenses</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Total: {totalDocs} items · Showing{' '}
                      {(currentPage - 1) * filters.limit + 1} to{' '}
                      {Math.min(currentPage * filters.limit, totalDocs)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/60">
                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                        Payment
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {expenses.length > 0 ? (
                      expenses.map((expense) => (
                        <tr
                          key={expense._id}
                          className="transition hover:bg-muted/40"
                        >
                          <td className="px-6 py-4 text-sm">
                            {new Date(expense.expenseDate).toLocaleDateString(
                              'en-IN',
                              {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              }
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium">
                            {expense.category?.categoryName || 'Uncategorized'}
                          </td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">
                            {expense.description || '-'}
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <span
                              className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${getPaymentMethodColor(
                                expense.paymentMethod
                              )}`}
                            >
                              {expense.paymentMethod.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right text-sm font-semibold">
                            {toCurrency(expense.amount)}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center">
                          <p className="text-sm text-muted-foreground">
                            No expenses found. Try adjusting your filters.
                          </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-between border-t border-border/60 px-6 py-4">
                  <p className="text-sm text-muted-foreground">
                    Page {currentPage} of {totalPages}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        setFilters((prev) => ({
                          ...prev,
                          page: Math.max(1, prev.page - 1)
                        }))
                      }
                      disabled={!reportData?.hasPrevPage}
                      className="inline-flex items-center gap-2 rounded-xl border border-border/70 px-3 py-2 text-sm font-medium text-foreground shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted"
                    >
                      <ChevronLeft size={16} />
                      Previous
                    </button>
                    <button
                      onClick={() =>
                        setFilters((prev) => ({
                          ...prev,
                          page: Math.min(totalPages, prev.page + 1)
                        }))
                      }
                      disabled={!reportData?.hasNextPage}
                      className="inline-flex items-center gap-2 rounded-xl border border-border/70 px-3 py-2 text-sm font-medium text-foreground shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted"
                    >
                      Next
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}
