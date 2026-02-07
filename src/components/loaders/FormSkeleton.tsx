export default function FormSkeleton({ fields = 4 }: { fields?: number }) {
  return (
    <div className="animate-pulse space-y-6">
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-24"></div>
          <div className="h-10 bg-gray-200 dark:bg-slate-700 rounded w-full"></div>
        </div>
      ))}
      <div className="flex gap-3 pt-4">
        <div className="h-10 bg-gray-200 dark:bg-slate-700 rounded w-24"></div>
        <div className="h-10 bg-gray-200 dark:bg-slate-700 rounded w-24"></div>
      </div>
    </div>
  );
}
