import { useState, useEffect } from "react";
import styled from "styled-components";
import { useMerch } from "../hooks/useMerch";
import MerchCard from "../components/MerchCard";
import ScrollToTop from "../components/ScrollToTop";

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const FilterSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const FilterButton = styled.button`
  background: ${props => props.$active ? '#000000' : '#ffffff'};
  color: ${props => props.$active ? '#ffffff' : '#000000'};
  border: 1px solid #000000;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.$active ? '#000000' : '#f5f5f5'};
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2rem;
  padding: 1rem;
`;

const PageButton = styled.button`
  background: ${props => props.$active ? '#000000' : '#ffffff'};
  color: ${props => props.$active ? '#ffffff' : '#000000'};
  border: 1px solid #000000;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 40px;

  &:hover:not(:disabled) {
    background: ${props => props.$active ? '#000000' : '#f5f5f5'};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PageInfo = styled.span`
  font-size: 0.875rem;
  color: #666;
  margin: 0 1rem;
`;

export const Merch = () => {
  const [searchInput, setSearchInput] = useState("");
  const [q, setQ] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const { items, total, loading, error } = useMerch({ 
    q, 
    limit: 100, // Get more items to paginate client-side
    offset: 0 
  });

  // Debounce search input
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setQ(searchInput);
      setCurrentPage(1); // Reset to first page on new search
    }, 300); // 300ms delay

    return () => clearTimeout(delayDebounceFn);
  }, [searchInput]);

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedFilter]);

  const filterOptions = [
    { key: "all", label: "All" },
    { key: "mens", label: "Men" },
    { key: "womens", label: "Women" },
    { key: "other", label: "Other" }
  ];

  const getFilteredItems = () => {
    if (selectedFilter === "all") return items;
    
    return items.filter(item => {
      const productName = (item.productTypeName || item.name || "").toLowerCase();
      
      switch (selectedFilter) {
        case "mens":
          return productName.includes("men") && !productName.includes("women");
        case "womens":
          return productName.includes("women") || productName.includes("ladies");
        case "other":
          return !productName.includes("men") && !productName.includes("women");
        default:
          return true;
      }
    });
  };

  const filteredItems = getFilteredItems();
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ padding: "1rem", maxWidth: "1280px", margin: "0 auto" }}>
      {/* Header with title and filters */}
      <HeaderSection>
        <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", margin: "0" }}>
          Merch
        </h1>
        
        <FilterSection>
          {filterOptions.map(filter => (
            <FilterButton
              key={filter.key}
              $active={selectedFilter === filter.key}
              onClick={() => setSelectedFilter(filter.key)}
            >
              {filter.label}
            </FilterButton>
          ))}
        </FilterSection>
      </HeaderSection>

      {/* Search input */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem", position: "relative" }}>
        <input
          style={{
            border: "1px solid #ccc",
            padding: "0.5rem 0.75rem",
            borderRadius: "0.25rem",
            width: "100%",
            maxWidth: "28rem",
          }}
          placeholder="Search merch…"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        {searchInput && loading && (
          <span style={{ 
            position: "absolute", 
            right: "10px", 
            top: "50%", 
            transform: "translateY(-50%)",
            fontSize: "0.875rem",
            color: "#666"
          }}>
            Searching...
          </span>
        )}
      </div>

      {loading && <p>Loading merch…</p>}
      {error && (
        <p>
          We're sorry, but we couldn't load the merch right now. Please try
          again later or visit: https://morbid-gene.myspreadshop.se/
        </p>
      )}
      {!loading && !error && (
        <>
          <p
            style={{
              fontSize: "0.875rem",
              opacity: "0.7",
              marginBottom: "0.5rem",
            }}
          >
            Showing {startIndex + 1}-{Math.min(endIndex, filteredItems.length)} of {filteredItems.length} products
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "1rem",
            }}
          >
            {currentItems.map((it) => (
              <MerchCard key={it.sellableId} item={it} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <PaginationContainer>
              <PageButton 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </PageButton>
              
              {getPageNumbers().map((page, index) => (
                page === '...' ? (
                  <span key={`ellipsis-${index}`} style={{ margin: '0 0.5rem' }}>...</span>
                ) : (
                  <PageButton
                    key={page}
                    $active={page === currentPage}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </PageButton>
                )
              ))}
              
              <PageButton
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </PageButton>
              
              <PageInfo>
                Page {currentPage} of {totalPages}
              </PageInfo>
            </PaginationContainer>
          )}
        </>
      )}
      
      <ScrollToTop />
    </div>
  );
}
