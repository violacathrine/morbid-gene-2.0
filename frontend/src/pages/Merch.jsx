import { useState, useEffect } from "react";
import styled from "styled-components";
import { useMerch } from "../hooks/useMerch";
import MerchCard from "../components/MerchCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import ScrollToTop from "../components/ScrollToTop";
import { theme } from "../styles/theme";

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
  background: ${props => props.$active ? theme.colors.buttonPrimary : theme.colors.primaryText};
  color: ${props => props.$active ? theme.colors.primaryText : theme.colors.pageBg};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: ${props => props.$active ? 'bold' : 'normal'};

  &:hover {
    background: ${props => props.$active ? theme.colors.buttonPrimaryHover : '#f5f5f5'};
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  margin-top: 2rem;
  padding: 1rem;
`;

const PaginationButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const PageButton = styled.button`
  background: ${props => props.$active ? theme.colors.buttonPrimary : theme.colors.primaryText};
  color: ${props => props.$active ? theme.colors.primaryText : theme.colors.pageBg};
  border: none;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 40px;
  font-weight: ${props => props.$active ? 'bold' : 'normal'};

  &:hover:not(:disabled) {
    background: ${props => props.$active ? theme.colors.buttonPrimaryHover : '#f5f5f5'};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PageInfo = styled.span`
  font-size: 0.875rem;
  color: ${theme.colors.mediumGray};
  text-align: center;

  @media (min-width: 768px) {
    margin: 0 1rem;
  }
`;

const MerchGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`;

const Container = styled.div`
  padding: 1rem;
  max-width: 1280px;
  margin: 0 auto;
`;

const HeaderTitleWrapper = styled.div``;

const HeaderTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
`;

const HeaderSubtitle = styled.h2`
  font-size: 1rem;
  font-weight: normal;
  margin: 0.25rem 0 0 0;
  opacity: 0.8;
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  position: relative;
`;

const SearchInput = styled.input`
  border: 1px solid #ccc;
  padding: 0.5rem 0.75rem;
  border-radius: 0.25rem;
  width: 100%;
  max-width: 28rem;
`;

const SearchingIndicator = styled.span`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.875rem;
  color: ${theme.colors.mediumGray};
`;

const ProductCount = styled.p`
  font-size: 0.875rem;
  opacity: 0.7;
  margin-bottom: 0.5rem;
`;

const PaginationEllipsis = styled.span`
  margin: 0 0.5rem;
`;

export const Merch = () => {
  const [searchInput, setSearchInput] = useState("");
  const [q, setQ] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const { items, loading, error } = useMerch({ 
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
    <Container>
      {/* Header with title and filters */}
      <HeaderSection>
        <HeaderTitleWrapper>
          <HeaderTitle>Merch</HeaderTitle>
        </HeaderTitleWrapper>
        
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
      <SearchContainer>
        <SearchInput
          placeholder="Search merch…"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        {searchInput && loading && (
          <SearchingIndicator>
            Searching...
          </SearchingIndicator>
        )}
      </SearchContainer>

      {loading && <LoadingSpinner text="Loading products..." minHeight="400px" />}
      {error && (
        <p>
          We're sorry, but we couldn't load the merch right now. Please try
          again later or visit: https://morbid-gene.myspreadshop.se/
        </p>
      )}
      {!loading && !error && (
        <>
          <ProductCount>
            Showing {startIndex + 1}-{Math.min(endIndex, filteredItems.length)} of {filteredItems.length} products
          </ProductCount>
          <MerchGrid>
            {currentItems.map((it) => (
              <MerchCard key={it.sellableId} item={it} />
            ))}
          </MerchGrid>

          {/* Pagination */}
          {totalPages > 1 && (
            <PaginationContainer>
              <PaginationButtons>
                <PageButton 
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                >
                  ←
                </PageButton>
                
                {getPageNumbers().map((page, index) => (
                  page === '...' ? (
                    <PaginationEllipsis key={`ellipsis-${index}`}>...</PaginationEllipsis>
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
                  aria-label="Next page"
                >
                  →
                </PageButton>
              </PaginationButtons>
              
              <PageInfo>
                Page {currentPage} of {totalPages}
              </PageInfo>
            </PaginationContainer>
          )}
        </>
      )}
      
      <ScrollToTop />
    </Container>
  );
}
