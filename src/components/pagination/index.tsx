import {
  Pagination,
  PaginationContent,
  //   PaginationEllipsis,
  //   PaginationItem,
  //   PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";

//   using react js page or perpage?

type PaginationProps = {
  page?: number;
  perPage?: number;
  totalPage?: number;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
  setPage?: (page: any) => void;
  setPerPage?: (perPage: any) => void;
};

const PER_PAGE_OPTIONS = [5, 10, 15, 20];

export default function PaginationComponent({
  page,
  perPage,
  totalPage,
  hasNextPage,
  hasPrevPage,
  setPage,
  setPerPage
}: Readonly<PaginationProps>) {
  return (
    <div className="flex justify-between items-center gap-2">
      <div>
        <select
          className="border  border-gray-300  rounded-md px-2 py-1.5 "
          value={perPage}
          onChange={(e) => setPerPage!(parseInt(e.target.value))}
        >
          {PER_PAGE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <Pagination>
        <PaginationPrevious
          className="cursor-pointer"
          onClick={() => {
            if (!hasPrevPage) return;
            setPage!((prev: number) => prev - 1);
          }}
        >
          Previous
        </PaginationPrevious>
        <PaginationContent>
          {page}of {Math.ceil(totalPage! / perPage!)}
        </PaginationContent>

        {/* using paginationEllipsis */}

        <PaginationNext
          className="cursor-pointer"
          aria-disabled={page == totalPage! / perPage! ? true : false}
          onClick={() => {
            if (!hasNextPage) return;
            setPage!((prev: number) => prev + 1);
          }}
        >
          Next
        </PaginationNext>
      </Pagination>
    </div>
  );
}
