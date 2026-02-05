import { ArrowUp, ArrowDown, TrendingUp } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: number;
  trendLabel?: string;
  description?: string;
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple';
}

const colorClasses = {
  blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
  green: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
  red: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
  yellow:
    'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400',
  purple:
    'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
};

export const StatCard = ({
  title,
  value,
  icon,
  trend,
  trendLabel,
  description,
  color = 'blue'
}: StatCardProps) => {
  const isTrendPositive = trend && trend >= 0;

  return (
    <div className="rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </p>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
          {description && (
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-500">
              {description}
            </p>
          )}
          {trend !== undefined && trendLabel && (
            <div className="mt-3 flex items-center gap-1">
              {isTrendPositive ? (
                <ArrowUp
                  size={16}
                  className="text-green-600 dark:text-green-400"
                />
              ) : (
                <ArrowDown
                  size={16}
                  className="text-red-600 dark:text-red-400"
                />
              )}
              <span
                className={`text-xs font-semibold ${
                  isTrendPositive
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}
              >
                {Math.abs(trend)}% {trendLabel}
              </span>
            </div>
          )}
        </div>
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-lg ${colorClasses[color]}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

interface ExpenseChartCardProps {
  title: string;
  children: React.ReactNode;
}

export const ChartCard = ({ title, children }: ExpenseChartCardProps) => {
  return (
    <div className="rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {title}
      </h3>
      <div className="overflow-x-auto">{children}</div>
    </div>
  );
};

interface RecentItemProps {
  title: string;
  category: string;
  amount: number;
  date: string;
  type: 'expense' | 'income';
  avatar?: string;
}

export const RecentExpenseItem = ({
  title,
  category,
  amount,
  date,
  type,
  avatar
}: RecentItemProps) => {
  const isExpense = type === 'expense';

  return (
    <div className="flex items-center justify-between py-3 px-4 hover:bg-gray-50 dark:hover:bg-slate-700/50 rounded transition-colors">
      <div className="flex items-center gap-3 flex-1">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30">
          {avatar ? (
            <img
              src={avatar}
              alt={title}
              className="h-10 w-10 rounded-lg object-cover"
            />
          ) : (
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              {title.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {title}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{category}</p>
        </div>
      </div>
      <div className="text-right">
        <p
          className={`text-sm font-semibold ${
            isExpense
              ? 'text-red-600 dark:text-red-400'
              : 'text-green-600 dark:text-green-400'
          }`}
        >
          {isExpense ? '-' : '+'} ${amount.toFixed(2)}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{date}</p>
      </div>
    </div>
  );
};

interface ListCardProps {
  title: string;
  children: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}

export const ListCard = ({
  title,
  children,
  actionLabel,
  onAction
}: ListCardProps) => {
  return (
    <div className="rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm overflow-hidden">
      <div className="border-b border-gray-200 dark:border-slate-700 px-6 py-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
        {actionLabel && (
          <button
            onClick={onAction}
            className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            {actionLabel}
          </button>
        )}
      </div>
      <div className="divide-y divide-gray-200 dark:divide-slate-700">
        {children}
      </div>
    </div>
  );
};
