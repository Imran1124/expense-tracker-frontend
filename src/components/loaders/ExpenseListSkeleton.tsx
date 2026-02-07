export default function ExpenseListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="animate-pulse space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-4 flex-1">
            <div className="h-12 w-12 bg-gray-200 dark:bg-slate-700 rounded-lg"></div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-32"></div>
                <div className="h-5 bg-gray-200 dark:bg-slate-700 rounded-full w-20"></div>
              </div>
              <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-48"></div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="h-5 bg-gray-200 dark:bg-slate-700 rounded w-24 mb-1"></div>
              <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-16"></div>
            </div>
            <div className="flex gap-2">
              <div className="h-8 w-8 bg-gray-200 dark:bg-slate-700 rounded"></div>
              <div className="h-8 w-8 bg-gray-200 dark:bg-slate-700 rounded"></div>
              <div className="h-8 w-8 bg-gray-200 dark:bg-slate-700 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
