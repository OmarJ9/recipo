import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface RecipesPaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export default function RecipesPagination({
  currentPage,
  totalPages,
  baseUrl,
}: RecipesPaginationProps) {
  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <Pagination className="mt-12">
      <PaginationContent>
        {hasPrevious && (
          <PaginationItem>
            <PaginationPrevious
              href={`${baseUrl}?page=${currentPage - 1}`}
              aria-disabled={!hasPrevious}
            />
          </PaginationItem>
        )}

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
          // Show first page, last page, and pages around current page
          const shouldShowPage =
            page === 1 ||
            page === totalPages ||
            Math.abs(page - currentPage) <= 1;

          return shouldShowPage ? (
            <PaginationItem key={page}>
              <PaginationLink
                href={`${baseUrl}?page=${page}`}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ) : page === 2 || page === totalPages - 1 ? (
            <PaginationItem key={page}>
              <span className="flex h-9 w-9 items-center justify-center">
                ...
              </span>
            </PaginationItem>
          ) : null;
        })}

        {hasNext && (
          <PaginationItem>
            <PaginationNext
              href={`${baseUrl}?page=${currentPage + 1}`}
              aria-disabled={!hasNext}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
