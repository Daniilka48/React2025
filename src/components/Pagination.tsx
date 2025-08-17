import React from 'react';
import '../cssComponents/Pagination.css';
import { useTranslations } from 'next-intl';

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

  const t = useTranslations();

  return (
    <div className="pagination">
      <button onClick={handlePrev} disabled={currentPage === 1}>
        {t('pagination_prev')}
      </button>
      <span className="pagination-page">{currentPage}</span>
      <button onClick={handleNext}>{t('pagination_next')}</button>
    </div>
  );
};

export default Pagination;
