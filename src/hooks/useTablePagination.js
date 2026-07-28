import { useState, useMemo } from 'react';

/**
 * Custom hook for client-side searching, filtering, and pagination.
 * 
 * @param {Array} items - The raw array of items to filter and paginate
 * @param {Object} options - Configuration options
 * @param {Array<string>} options.searchFields - Object keys to perform search on
 * @param {number} options.initialPageSize - Items per page (default 10)
 * @returns {Object} Filtered items, pagination state, and handler functions
 */
export function useTablePagination(items = [], options = {}) {
  const { searchFields = ['title_zh', 'title_en'], initialPageSize = 10 } = options;

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  // Filter items based on search term and dropdown filters
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      // 1. Search term matching
      const matchesSearch = !searchTerm.trim() || searchFields.some(field => {
        const val = item[field];
        return val && String(val).toLowerCase().includes(searchTerm.toLowerCase().trim());
      });

      // 2. Category filter
      const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;

      // 3. Status filter
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [items, searchTerm, categoryFilter, statusFilter, searchFields]);

  // Total pages calculation
  const totalPages = Math.max(1, Math.ceil(filteredItems.length / pageSize));

  // Current page items slice
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredItems.slice(start, start + pageSize);
  }, [filteredItems, currentPage, pageSize]);

  // Reset page to 1 when filters change
  const handleSearchChange = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleCategoryChange = (cat) => {
    setCategoryFilter(cat);
    setCurrentPage(1);
  };

  const handleStatusChange = (status) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const handlePageSizeChange = (size) => {
    setPageSize(Number(size));
    setCurrentPage(1);
  };

  return {
    searchTerm,
    setSearchTerm: handleSearchChange,
    categoryFilter,
    setCategoryFilter: handleCategoryChange,
    statusFilter,
    setStatusFilter: handleStatusChange,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize: handlePageSizeChange,
    totalPages,
    totalItems: filteredItems.length,
    paginatedItems
  };
}
