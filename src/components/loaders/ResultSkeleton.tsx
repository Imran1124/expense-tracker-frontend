import { GraduationCap, Calculator } from 'lucide-react';

const Skeleton = ({ className = '', ...props }) => {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded ${className}`}
      {...props}
    />
  );
};

const CardHeader = ({ children, className = '' }: any) => (
  <div className={className}>{children}</div>
);

const ResultsSkeletonLoader = () => {
  // Generate skeleton rows (you can adjust this number)
  const skeletonRows = Array.from({ length: 5 }, (_, i) => i);

  return (
    <div className="shadow-lg border border-gray-200">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200 py-3 px-3 lg:px-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-4 w-4 lg:h-5 lg:w-5 text-blue-600" />
            <h2 className="text-sm lg:text-lg font-semibold text-gray-900">
              <Skeleton className="h-5 w-32 lg:w-48" />
            </h2>
            <div className="hidden sm:flex items-center space-x-1 text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
              <Calculator className="h-3 w-3" />
              <span>Auto-calc</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <div className="p-0">
        <div className="overflow-x-auto">
          {/* Desktop Table View Skeleton */}
          <div className="hidden lg:block">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-3 text-sm font-medium text-gray-700">
                    Subject Name
                  </th>
                  <th className="text-center p-3 text-sm font-medium text-gray-700">
                    <Skeleton className="h-4 w-16 mx-auto mb-1" />
                    <br />
                    <span className="text-xs text-gray-500">(Max: 20)</span>
                  </th>
                  <th className="text-center p-3 text-sm font-medium text-gray-700">
                    <Skeleton className="h-4 w-16 mx-auto mb-1" />
                    <br />
                    <span className="text-xs text-gray-500">(Max: 80)</span>
                  </th>
                  <th className="text-center p-3 text-sm font-medium text-gray-700">
                    Total
                    <br />
                    <span className="text-xs text-green-600">Auto</span>
                  </th>
                  <th className="text-center p-3 text-sm font-medium text-gray-700">
                    Grade
                    <br />
                    <span className="text-xs text-blue-600">Auto</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {skeletonRows.map((index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <Skeleton className="h-10 w-full rounded bg-gray-100" />
                    </td>
                    <td className="p-3">
                      <Skeleton className="h-10 w-full rounded" />
                    </td>
                    <td className="p-3">
                      <Skeleton className="h-10 w-full rounded" />
                    </td>
                    <td className="p-3">
                      <Skeleton className="h-10 w-full rounded bg-green-100" />
                    </td>
                    <td className="p-3">
                      <Skeleton className="h-10 w-full rounded bg-blue-100" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View Skeleton */}
          <div className="lg:hidden space-y-3 p-3">
            {skeletonRows.map((index) => (
              <div
                key={index}
                className="bg-white border rounded-lg p-4 space-y-3"
              >
                <div className="font-medium text-gray-900 text-sm">
                  <Skeleton className="h-10 w-full rounded bg-gray-100" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-600 mb-1 block">
                      <Skeleton className="h-3 w-20 mb-1" />
                    </label>
                    <Skeleton className="h-10 w-full rounded" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 mb-1 block">
                      <Skeleton className="h-3 w-20 mb-1" />
                    </label>
                    <Skeleton className="h-10 w-full rounded" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-green-600 mb-1 block">
                      Total (Auto)
                    </label>
                    <Skeleton className="h-10 w-full rounded bg-green-100" />
                  </div>
                  <div>
                    <label className="text-xs text-blue-600 mb-1 block">
                      Grade (Auto)
                    </label>
                    <Skeleton className="h-10 w-full rounded bg-blue-100" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsSkeletonLoader;
