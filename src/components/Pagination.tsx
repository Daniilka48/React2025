import React from 'react';
// import '../cssComponents/Pagination.css';

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  onPageChange,
}) => {
  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <div className="pagination">
      <button onClick={handlePrev} disabled={currentPage === 1}>
        Previous
      </button>
      <span className="pagination-page">{currentPage}</span>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default Pagination;
