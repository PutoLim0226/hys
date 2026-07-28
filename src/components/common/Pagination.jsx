import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange
}) => {
  const { lang } = useLanguage();

  if (totalItems === 0) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="pagination-container">
      <div className="pagination-info">
        {lang === 'zh-CN' ? (
          `显示第 ${startItem} - ${endItem} 条，共 ${totalItems} 条`
        ) : (
          `Showing ${startItem} - ${endItem} of ${totalItems} items`
        )}
      </div>

      <div className="pagination-controls">
        {/* Page Size Selector */}
        {onPageSizeChange && (
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(e.target.value)}
            className="pagination-select"
            aria-label="Items per page"
          >
            <option value={5}>5 / {lang === 'zh-CN' ? '页' : 'page'}</option>
            <option value={10}>10 / {lang === 'zh-CN' ? '页' : 'page'}</option>
            <option value={20}>20 / {lang === 'zh-CN' ? '页' : 'page'}</option>
            <option value={50}>50 / {lang === 'zh-CN' ? '页' : 'page'}</option>
          </select>
        )}

        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="pagination-btn"
          aria-label="Previous Page"
        >
          <ChevronLeft size={16} />
        </button>

        {/* Numbered Page Buttons */}
        {getPageNumbers().map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`pagination-btn ${pageNum === currentPage ? 'active' : ''}`}
          >
            {pageNum}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="pagination-btn"
          aria-label="Next Page"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};
