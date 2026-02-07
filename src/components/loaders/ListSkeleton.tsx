export default function ListSkeleton({ items = 5 }: { items?: number }) {
  return (
    <div className="animate-pulse space-y-3">
      {Array.from({ length: items }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800"
        >
          <div className="h-12 w-12 bg-gray-200 dark:bg-slate-700 rounded-lg flex-shrink-0"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-1/2"></div>
          </div>
          <div className="flex gap-2">
            <div className="h-8 w-8 bg-gray-200 dark:bg-slate-700 rounded"></div>
            <div className="h-8 w-8 bg-gray-200 dark:bg-slate-700 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
