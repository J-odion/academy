import React from 'react'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"

  type PaginationProps = {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange: (page: number) => void;
  };


const Datapagination = ({
    totalItems,
    itemsPerPage,
    currentPage,
    onPageChange,
  }: PaginationProps) => {

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handleClick = (page: number) => {
        if (page >= 1 && page <= totalPages) {
        onPageChange(page);
        }
    };

  return (
    <Pagination className='fixed bottom-4 left-0 right-0 '>
        <PaginationPrevious
        // disabled={currentPage === 1}
        onClick={() => handleClick(currentPage - 1)}
        className='cursor-pointer'
      />
      <PaginationContent>
        {Array.from({ length: totalPages }).map((_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              isActive={index + 1 === currentPage}
              onClick={() => handleClick(index + 1)}
              className='cursor-pointer'
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
      </PaginationContent>
      <PaginationNext
        // disabled={currentPage === totalPages}
        onClick={() => handleClick(currentPage + 1)}
        className='cursor-pointer'
      />
    </Pagination>
  )
}

export default Datapagination
