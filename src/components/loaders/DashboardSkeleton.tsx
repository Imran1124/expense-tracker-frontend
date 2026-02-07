export default function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/20 to-purple-50/20 dark:from-slate-900 dark:via-purple-900/10 dark:to-slate-900">
      <div className="animate-pulse relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(900px_360px_at_12%_-10%,#a855f733,transparent),radial-gradient(700px_300px_at_88%_-20%,#0ea5e933,transparent)] dark:bg-[radial-gradient(900px_360px_at_12%_-10%,#6d28d933,transparent),radial-gradient(700px_300px_at_88%_-20%,#1e40af33,transparent)]" />
        <div className="relative px-4 py-10 sm:px-6 lg:px-10">
          {/* Header Skeleton */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-3">
              <div className="h-3 bg-gray-300 dark:bg-slate-700 rounded w-32"></div>
              <div className="h-10 bg-gray-300 dark:bg-slate-700 rounded w-96"></div>
              <div className="h-4 bg-gray-300 dark:bg-slate-700 rounded w-full max-w-lg"></div>
            </div>
            <div className="rounded-2xl border border-purple-200/50 dark:border-purple-900/30 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-6 w-64">
              <div className="h-4 bg-gray-300 dark:bg-slate-700 rounded w-24 mb-2"></div>
              <div className="h-3 bg-gray-300 dark:bg-slate-700 rounded w-32 mb-4"></div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="h-3 bg-gray-300 dark:bg-slate-700 rounded w-12 mb-2"></div>
                  <div className="h-6 bg-gray-300 dark:bg-slate-700 rounded w-20"></div>
                </div>
                <div>
                  <div className="h-3 bg-gray-300 dark:bg-slate-700 rounded w-16 mb-2"></div>
                  <div className="h-6 bg-gray-300 dark:bg-slate-700 rounded w-12"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards Skeleton */}
          <div className="mt-10 grid gap-5 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-purple-200/30 dark:border-purple-900/20 bg-gradient-to-br from-white to-blue-50/30 dark:from-slate-800 dark:to-purple-900/20 p-6 shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="h-8 w-8 bg-gray-300 dark:bg-slate-700 rounded"></div>
                  <div className="h-8 w-8 bg-gray-300 dark:bg-slate-700 rounded-lg"></div>
                </div>
                <div className="h-3 bg-gray-300 dark:bg-slate-700 rounded w-24 mb-2"></div>
                <div className="h-8 bg-gray-300 dark:bg-slate-700 rounded w-32 mb-3"></div>
                <div className="h-3 bg-gray-300 dark:bg-slate-700 rounded w-28"></div>
              </div>
            ))}
          </div>

          {/* Chart Area Skeleton */}
          <div className="mt-8 rounded-3xl border border-purple-200/30 dark:border-purple-900/20 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-slate-800 dark:via-purple-900/10 dark:to-slate-800 p-8 shadow-xl">
            <div className="h-6 bg-gray-300 dark:bg-slate-700 rounded w-48 mb-6"></div>
            <div className="h-64 bg-gray-200 dark:bg-slate-700/50 rounded-xl"></div>
          </div>

          {/* Content Grid Skeleton */}
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-purple-200/30 dark:border-purple-900/20 bg-white dark:bg-slate-800 p-6 shadow-lg"
              >
                <div className="h-5 bg-gray-300 dark:bg-slate-700 rounded w-32 mb-4"></div>
                <div className="space-y-3">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <div key={j} className="flex items-center gap-4">
                      <div className="h-12 w-12 bg-gray-300 dark:bg-slate-700 rounded-lg"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-300 dark:bg-slate-700 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-300 dark:bg-slate-700 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
