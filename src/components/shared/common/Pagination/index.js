import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const CommonPagination = ({
  currentPage,
  totalPages,
  onPageChange,
  maxPagesToShow = 5,
  position = "end", // "start", "center", or "end"
  showNextPrevious = true,
  isLoading = false,
  className
}) => {
  // Generate pagination items
  const renderPaginationItems = () => {
    const items = [];

    if (totalPages <= maxPagesToShow) {
      // Show all pages if total pages is less than or equal to maxPagesToShow
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i} className="cursor-pointer">
            <PaginationLink
              onClick={(e) => {
                e.preventDefault();
                onPageChange(i);
              }}
              isActive={i === currentPage}
              className={`${i === currentPage ? "bg-primary text-white" : ""}`}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // Always show first page
      items.push(
        <PaginationItem key={1}>
          <PaginationLink

            onClick={(e) => {
              e.preventDefault();
              onPageChange(1);
            }}
            isActive={1 === currentPage}
            className={`cursor-pointer ${1 === currentPage ? "bg-primary text-white" : ""}`}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      // Calculate start and end page numbers
      let startPage, endPage;
      if (currentPage <= 3) {
        startPage = 2;
        endPage = 4;
      } else if (currentPage + 2 >= totalPages) {
        startPage = totalPages - 3;
        endPage = totalPages - 1;
      } else {
        startPage = currentPage - 1;
        endPage = currentPage + 1;
      }

      // Show ellipsis if startPage is greater than 2
      if (startPage > 2) {
        items.push(
          <PaginationItem key="startEllipsis">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      // Show middle pages
      for (let i = startPage; i <= endPage; i++) {
        items.push(
          <PaginationItem key={i} className="cursor-pointer">
            <PaginationLink
              onClick={(e) => {
                e.preventDefault();
                onPageChange(i);
              }}
              isActive={i === currentPage}
              className={i === currentPage ? "bg-primary text-white" : ""}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      // Show ellipsis if endPage is less than totalPages - 1
      if (endPage < totalPages - 1) {
        items.push(
          <PaginationItem key="endEllipsis">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      // Always show last page
      items.push(
        <PaginationItem key={totalPages} className="cursor-pointer">
          <PaginationLink

            onClick={(e) => {
              e.preventDefault();
              onPageChange(totalPages);
            }}
            isActive={totalPages === currentPage}
            className={
              totalPages === currentPage ? "bg-primary text-white" : ""
            }
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <Pagination className={`justify-${position} ${className} ${isLoading && 'opacity-50 pointer-events-none select-none cursor-wait'}`}>
      {showNextPrevious && (
        <PaginationPrevious
          onClick={(e) => {
            e.preventDefault();
            if (currentPage > 1) onPageChange(currentPage - 1);
          }}
          disabled={currentPage === 1}
          className={'cursor-pointer p-0 lg:p-2'}
        >
          Previous
        </PaginationPrevious>
      )}
      <PaginationContent className="gap-0">{renderPaginationItems()}</PaginationContent>
      {showNextPrevious && (
        <PaginationNext
          onClick={(e) => {
            e.preventDefault();
            if (currentPage < totalPages) onPageChange(currentPage + 1);
          }}
          disabled={currentPage === totalPages}
          className={'cursor-pointer p-0 lg:p-2'}
        >
          Next
        </PaginationNext>
      )}
    </Pagination>
  );
};

export default CommonPagination;
