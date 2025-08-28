import styled from "styled-components";

// Layout containers
export const Container = styled.div`
  padding: 0.75rem;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  @media (min-width: 480px) {
    padding: 1rem;
    gap: 1.5rem;
  }
  
  @media (min-width: 768px) {
    padding: 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
  
  @media (min-width: 1024px) {
    padding: 3rem;
    gap: 3rem;
  }
`;

export const ImageSection = styled.div``;

export const DetailsSection = styled.div``;

// Product image
export const ProductImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  
  @media (min-width: 768px) {
    max-width: 500px;
  }
`;

// Typography
export const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.75rem;
  color: white;
  word-break: break-word;
  
  @media (min-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  
  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;

export const Description = styled.p`
  font-size: 0.875rem;
  margin-bottom: 1rem;
  line-height: 1.5;
  color: #ccc;
  
  @media (min-width: 480px) {
    font-size: 1rem;
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }
  
  @media (min-width: 768px) {
    font-size: 1.1rem;
  }
`;

export const Price = styled.div`
  font-size: 1.125rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #dc2626;
  
  @media (min-width: 480px) {
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
  }
  
  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

// Selection components
export const SelectionContainer = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: end;
  }
`;

export const Select = styled.select`
  padding: 0.625rem;
  border: 1px solid #333;
  background-color: #1a1a1a;
  color: white;
  font-size: 0.875rem;
  width: 100%;
  min-height: 44px;
  
  @media (min-width: 480px) {
    padding: 0.75rem;
    font-size: 1rem;
  }
  
  @media (min-width: 768px) {
    width: auto;
    min-width: 150px;
  }

  option:disabled {
    color: #666;
  }
`;

// Tags
export const TagsSection = styled.div`
  margin-bottom: 2rem;
`;

export const TagsTitle = styled.h3`
  color: white;
  margin-bottom: 0.5rem;
`;

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const Tag = styled.span`
  background-color: #374151;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
`;

// Quantity selector
export const QuantityContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0;
  }
`;

export const QuantityLabel = styled.label`
  color: white;
  font-weight: bold;
  font-size: 0.875rem;
  
  @media (min-width: 480px) {
    font-size: 1rem;
  }
`;

export const QuantityInput = styled.input`
  width: 100%;
  padding: 0.625rem;
  border: 1px solid #374151;
  background-color: #1f2937;
  color: white;
  text-align: center;
  min-height: 44px;
  
  @media (min-width: 480px) {
    padding: 0.75rem;
  }
  
  @media (min-width: 768px) {
    width: 80px;
  }
`;

// Product Info section
export const ProductInfo = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: #1a1a1a;
  font-size: 0.875rem;
  color: #ccc;
  line-height: 1.5;
  
  @media (min-width: 480px) {
    padding: 2rem;
    font-size: 1rem;
  }
  
  strong {
    color: #fff;
    font-weight: bold;
  }
  
  > strong:first-child {
    font-size: 1rem;
    color: #fff;
    display: block;
    margin-bottom: 1rem;
    
    @media (min-width: 480px) {
      font-size: 1.1rem;
    }
  }
`;

// Buttons
export const AddToCartButton = styled.button`
  background-color: ${(props) => (!props.$enabled ? "#4b5563" : "#dc2626")};
  color: ${(props) => (!props.$enabled ? "#d1d5db" : "#ffffff")};
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: none;
  font-size: 0.875rem;
  font-weight: bold;
  cursor: ${(props) => (!props.$enabled ? "not-allowed" : "pointer")};
  transition: background-color 0.2s;
  opacity: ${(props) => (!props.$enabled ? 0.9 : 1)};
  width: 100%;
  min-height: 44px; /* För touch targets */
  
  @media (min-width: 480px) {
    padding: 0.875rem 1.5rem;
    font-size: 1rem;
  }
  
  @media (min-width: 768px) {
    width: auto;
    padding: 1rem 2rem;
    font-size: 1.1rem;
  }

  &:hover {
    background-color: ${(props) => (props.$enabled ? "#b91c1c" : "#6b7280")};
  }
  
  &:active {
    background-color: ${(props) => (props.$enabled ? "#991b1b" : "#6b7280")};
  }
  
  /* Mobile touch optimization */
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
`;

// Loading and error states
export const LoadingMessage = styled.div`
  padding: 2rem;
  color: white;
  text-align: center;
`;

export const ErrorMessage = styled(LoadingMessage)`
  color: #ef4444;
`;

// Popup styles
export const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const PopupBox = styled.div`
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 90%;
  margin: 1rem;
  
  @media (min-width: 480px) {
    padding: 2rem;
  }
`;

export const PopupMessage = styled.p`
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
`;

export const PopupButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

export const PopupButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
`;

export const ContinueButton = styled(PopupButton)`
  background-color: #dc2626;
  color: #ffffff;

  &:hover {
    background-color: #b91c1c;
  }
`;

export const CartButton = styled(PopupButton)`
  background-color: #dc2626;
  color: #ffffff;

  &:hover {
    background-color: #b91c1c;
  }
`;