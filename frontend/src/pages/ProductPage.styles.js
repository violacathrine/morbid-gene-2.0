import styled from "styled-components";

// Layout containers
export const Container = styled.div`
  padding: 5rem;
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
`;

export const ImageSection = styled.div``;

export const DetailsSection = styled.div``;

// Product image
export const ProductImage = styled.img`
  width: 100%;
  max-width: 500px;
  height: auto;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
`;

// Typography
export const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: white;
`;

export const Description = styled.p`
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  line-height: 1.6;
  color: #ccc;
`;

export const Price = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #4ade80;
`;

// Selection components
export const SelectionContainer = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  gap: 1rem;
`;

export const Select = styled.select`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #374151;
  background-color: #1f2937;
  color: white;
  font-size: 1rem;

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
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const QuantityLabel = styled.label`
  color: white;
  font-weight: bold;
`;

export const QuantityInput = styled.input`
  width: 60px;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #374151;
  background-color: #1f2937;
  color: white;
  text-align: center;
`;

// Buttons
export const AddToCartButton = styled.button`
  background-color: ${(props) => (!props.$enabled ? "#6b7280" : "#dc2626")};
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  border: none;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: ${(props) => (!props.$enabled ? "not-allowed" : "pointer")};
  transition: background-color 0.2s;
  opacity: ${(props) => (!props.$enabled ? 0.6 : 1)};

  &:hover {
    background-color: ${(props) => (props.$enabled ? "#b91c1c" : "#6b7280")};
  }
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
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 90%;
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
  background-color: #ffffff;
  color: #000000;

  &:hover {
    background-color: #dc2626;
    color: #ffffff;
  }
`;

export const CartButton = styled(PopupButton)`
  background-color: #dc2626;
  color: #ffffff;

  &:hover {
    background-color: #b91c1c;
  }
`;