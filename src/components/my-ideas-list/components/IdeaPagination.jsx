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

const IdeaPagination = ({ pagination, handlePageChange }) => {
  // Generate pagination items
  const renderPaginationItems = () => {
    const items = [];
    const maxPagesToShow = 5;

    if (pagination.totalPages <= maxPagesToShow) {
      // Show all pages if total pages is less than or equal to maxPagesToShow
      for (let i = 1; i <= pagination.totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(i);
              }}
              isActive={i === pagination.currentPage}
              className={
                i === pagination.currentPage ? "bg-primary text-white" : ""
              }
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
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(1);
            }}
            isActive={1 === pagination.currentPage}
            className={
              1 === pagination.currentPage ? "bg-primary text-white" : ""
            }
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      // Calculate start and end page numbers
      let startPage, endPage;
      if (pagination.currentPage <= 3) {
        startPage = 2;
        endPage = 4;
      } else if (pagination.currentPage + 2 >= pagination.totalPages) {
        startPage = pagination.totalPages - 3;
        endPage = pagination.totalPages - 1;
      } else {
        startPage = pagination.currentPage - 1;
        endPage = pagination.currentPage + 1;
      }

      // Show ellipsis if startPage is greater than 2
      if (startPage > 2) {
        items.push(
          <PaginationEllipsis key="startEllipsis">...</PaginationEllipsis>
        );
      }

      // Show middle pages
      for (let i = startPage; i <= endPage; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(i);
              }}
              isActive={i === pagination.currentPage}
              className={
                i === pagination.currentPage ? "bg-primary text-white" : ""
              }
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      // Show ellipsis if endPage is less than totalPages - 1
      if (endPage < pagination.totalPages - 1) {
        items.push(
          <PaginationEllipsis key="endEllipsis">...</PaginationEllipsis>
        );
      }

      // Always show last page
      items.push(
        <PaginationItem key={pagination.totalPages}>
          <PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(pagination.totalPages);
            }}
            isActive={pagination.totalPages === pagination.currentPage}
            className={
              pagination.totalPages === pagination.currentPage
                ? "bg-primary text-white"
                : ""
            }
          >
            {pagination.totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <Pagination className={"justify-end"}>
      <PaginationPrevious
        href="#"
        onClick={(e) => {
          e.preventDefault();
          if (pagination.currentPage > 1)
            handlePageChange(pagination.currentPage - 1);
        }}
        disabled={pagination.currentPage === 1}
      >
        Previous
      </PaginationPrevious>
      <PaginationContent>{renderPaginationItems()}</PaginationContent>
      <PaginationNext
        href="#"
        onClick={(e) => {
          e.preventDefault();
          if (pagination.currentPage < pagination.totalPages)
            handlePageChange(pagination.currentPage + 1);
        }}
        disabled={pagination.currentPage === pagination.totalPages}
      >
        Next
      </PaginationNext>
    </Pagination>
  );
};

export default IdeaPagination;
