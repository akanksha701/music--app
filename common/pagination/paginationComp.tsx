import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface PaginationCompProps {
  page: number;
  totalPages: number;
  onPageChange?: (newPage: number) => void;
}

const PaginationComp: React.FC<PaginationCompProps> = ({ page, totalPages, onPageChange }) => {
//   const handlePageChange = (newPage: number) => {
//     if (newPage >= 1 && newPage <= totalPages) {
//       onPageChange(newPage);
//     }
//   };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          {/* <PaginationPrevious href="#" onClick={() => handlePageChange(page - 1)} /> */}
        </PaginationItem>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
          <PaginationItem key={pageNumber}>
            <PaginationLink
              href="#"
            //   onClick={() => handlePageChange(pageNumber)}
              isActive={pageNumber === page}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          {/* <PaginationNext href="#" onClick={() => handlePageChange(page + 1)} /> */}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComp;
