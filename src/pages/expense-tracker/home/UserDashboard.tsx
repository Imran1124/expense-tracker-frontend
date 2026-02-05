import {
  StatCard,
  ChartCard,
  ListCard,
  RecentExpenseItem
} from './DashboardCards';
import {
  TrendingUp,
  Wallet,
  Target,
  AlertCircle,
  Plus,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '@/store/useAuth';

export const UserDashboard = () => {
  const { user } = useAuth();

  // Mock data - Replace with API calls
  const stats = {
    totalExpenses: 2450.75,
    monthlyBudget: 5000,
    remainingBudget: 2549.25,
    averageDaily: 81.69
  };

  const recentExpenses = [
    {
      title: 'Grocery Shopping',
      category: 'Food & Dining',
      amount: 125.5,
      date: 'Today',
      type: 'expense' as const
    },
    {
      title: 'Gas Station',
      category: 'Transportation',
      amount: 65.0,
      date: 'Yesterday',
      type: 'expense' as const
    },
    {
      title: 'Restaurant',
      category: 'Food & Dining',
      amount: 45.75,
      date: '2 days ago',
      type: 'expense' as const
    },
    {
      title: 'Movie Tickets',
      category: 'Entertainment',
      amount: 30.0,
      date: '3 days ago',
      type: 'expense' as const
    }
  ];

  const categories = [
    {
      name: 'Food & Dining',
      percentage: 35,
      amount: 857.5,
      color: 'bg-red-500'
    },
    {
      name: 'Transportation',
      percentage: 20,
      amount: 490.15,
      color: 'bg-blue-500'
    },
    {
      name: 'Entertainment',
      percentage: 15,
      amount: 367.61,
      color: 'bg-purple-500'
    },
    { name: 'Shopping', percentage: 20, amount: 490.15, color: 'bg-green-500' },
    { name: 'Others', percentage: 10, amount: 245.08, color: 'bg-yellow-500' }
  ];

  const budgetPercentage = (
    (stats.totalExpenses / stats.monthlyBudget) *
    100
  ).toFixed(0);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome back, {user?.fullName?.split(' ')[0]}! 👋
        </h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          Here's your financial overview for this month
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Expenses"
          value={`$${stats.totalExpenses.toFixed(2)}`}
          icon={<TrendingUp size={24} />}
          trend={12}
          trendLabel="vs last month"
          color="red"
        />
        <StatCard
          title="Monthly Budget"
          value={`$${stats.monthlyBudget.toFixed(2)}`}
          icon={<Wallet size={24} />}
          description="Your monthly limit"
          color="blue"
        />
        <StatCard
          title="Remaining Budget"
          value={`$${stats.remainingBudget.toFixed(2)}`}
          icon={<Target size={24} />}
          trend={8}
          trendLabel="available"
          color="green"
        />
        <StatCard
          title="Daily Average"
          value={`$${stats.averageDaily.toFixed(2)}`}
          icon={<AlertCircle size={24} />}
          description="Per day spending"
          color="yellow"
        />
      </div>

      {/* Budget Progress */}
      <div className="rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Monthly Budget Overview
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              You've spent {budgetPercentage}% of your monthly budget
            </p>
          </div>
          {parseInt(budgetPercentage) > 80 && (
            <div className="rounded-lg bg-red-100 dark:bg-red-900/30 px-3 py-1.5 flex items-center gap-2">
              <AlertCircle
                size={16}
                className="text-red-600 dark:text-red-400"
              />
              <span className="text-xs font-semibold text-red-600 dark:text-red-400">
                Approaching limit
              </span>
            </div>
          )}
        </div>
        <div className="space-y-3">
          <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                parseInt(budgetPercentage) > 80
                  ? 'bg-red-500'
                  : parseInt(budgetPercentage) > 60
                    ? 'bg-yellow-500'
                    : 'bg-green-500'
              }`}
              style={{ width: `${Math.min(parseInt(budgetPercentage), 100)}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              ${stats.totalExpenses.toFixed(2)} spent of $
              {stats.monthlyBudget.toFixed(2)}
            </span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {budgetPercentage}%
            </span>
          </div>
        </div>
      </div>

      {/* Charts and Lists Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Expense Categories */}
        <div className="lg:col-span-2">
          <ChartCard title="Expense Categories">
            <div className="space-y-4">
              {categories.map((cat, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {cat.name}
                    </span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      ${cat.amount.toFixed(2)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                    <div
                      className={`h-full rounded-full ${cat.color}`}
                      style={{ width: `${cat.percentage}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {cat.percentage}% of total
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>

        {/* Quick Actions */}
        <div className="rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 transition-colors">
              <Plus size={20} />
              Add New Expense
            </button>
            <button className="w-full flex items-center justify-center gap-2 rounded-lg border border-gray-200 dark:border-slate-600 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-700 font-medium py-3 transition-colors">
              <ArrowRight size={20} />
              View All Expenses
            </button>
          </div>
        </div>
      </div>

      {/* Recent Expenses */}
      <ListCard
        title="Recent Expenses"
        actionLabel="View All"
        onAction={() => {}}
      >
        {recentExpenses.map((expense, idx) => (
          <RecentExpenseItem
            key={idx}
            title={expense.title}
            category={expense.category}
            amount={expense.amount}
            date={expense.date}
            type={expense.type}
          />
        ))}
      </ListCard>
    </div>
  );
};
