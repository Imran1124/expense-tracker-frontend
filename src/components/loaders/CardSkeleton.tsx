export default function CardSkeleton({ count = 1 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-32 mb-2"></div>
              <div className="h-8 bg-gray-200 dark:bg-slate-700 rounded w-24"></div>
            </div>
            <div className="h-12 w-12 bg-gray-200 dark:bg-slate-700 rounded-full"></div>
          </div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-full"></div>
            <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-3/4"></div>
          </div>
        </div>
      ))}
    </>
  );
}
