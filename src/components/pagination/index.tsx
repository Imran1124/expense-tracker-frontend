import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  hasPrevPage,
  hasNextPage,
  className = ''
}: PaginationProps) {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Check viewport width on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    // Initial check
    checkMobile();

    // Add resize listener
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Calculate which page buttons to show
  const getPageRange = (): (number | string)[] => {
    // For mobile, show a compact version
    if (isMobile) {
      const pages: (number | string)[] = [];

      // Always show current page
      pages.push(currentPage);

      // Show ellipsis and last page if we're not near the end
      if (currentPage < totalPages - 1) {
        if (currentPage < totalPages - 2) {
          pages.push('ellipsis');
        }
        pages.push(totalPages);
      }

      // Show first page and ellipsis if we're not near the beginning
      if (currentPage > 2) {
        pages.unshift('ellipsis');
        pages.unshift(1);
      } else if (currentPage === 2) {
        pages.unshift(1);
      }

      return pages;
    }

    // For desktop view
    if (totalPages <= 7) {
      // Show all pages if there are 7 or fewer
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Always show first page, last page, current page, and pages around current
    const pages: (number | string)[] = [1];

    // Calculate start and end of the displayed range around current page
    let rangeStart = Math.max(2, currentPage - 1);
    let rangeEnd = Math.min(totalPages - 1, currentPage + 1);

    // Adjust range to always show 3 pages when possible
    if (currentPage <= 3) {
      rangeEnd = Math.min(4, totalPages - 1);
    } else if (currentPage >= totalPages - 2) {
      rangeStart = Math.max(totalPages - 3, 2);
    }

    // Add ellipsis before range if needed
    if (rangeStart > 2) {
      pages.push('ellipsis1');
    }

    // Add the range
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }

    // Add ellipsis after range if needed
    if (rangeEnd < totalPages - 1) {
      pages.push('ellipsis2');
    }

    // Add last page if there are more than 1 page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pageRange = getPageRange();

  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-1 sm:gap-2 my-6 ${className}`}
    >
      {/* Previous button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrevPage}
        className="h-8 w-8 sm:h-9 sm:w-9 p-0 flex items-center justify-center rounded-full border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:text-indigo-800 transition-all"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {/* Page number buttons */}
      <div className="flex items-center gap-1 sm:gap-2">
        {pageRange.map((page, index) => {
          if (typeof page === 'string' && page.includes('ellipsis')) {
            return (
              <div
                key={`ellipsis-${index}`}
                className="h-8 w-8 sm:h-9 sm:w-9 flex items-center justify-center text-gray-500"
              >
                <MoreHorizontal className="h-4 w-4" />
              </div>
            );
          }

          return (
            <Button
              key={`page-${page}`}
              variant={currentPage === page ? 'default' : 'outline'}
              size="sm"
              onClick={() => onPageChange(page as number)}
              className={`h-8 w-8 sm:h-9 sm:w-9 p-0 rounded-full transition-all ${
                currentPage === page
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md'
                  : 'text-indigo-700 border-indigo-200 hover:bg-indigo-50 hover:text-indigo-800'
              }`}
            >
              {page}
            </Button>
          );
        })}
      </div>

      {/* Next button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNextPage}
        className="h-8 w-8 sm:h-9 sm:w-9 p-0 flex items-center justify-center rounded-full border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:text-indigo-800 transition-all"
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
