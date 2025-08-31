import { useMemo } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { formatPrice } from "../utils/formatPrice";
import { translateSize, translateColor, translateProductType } from "../utils/translations";
import { FaTrash } from "react-icons/fa";

const CartItemContainer = styled.div`
  display: flex;
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  background-color: #ffffff;
  margin-bottom: 0.75rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  gap: 0.75rem;
  width: 100%;
  box-sizing: border-box;
  
  @media (min-width: 480px) {
    padding: 1rem;
    gap: 1rem;
  }
  
  @media (min-width: 768px) {
    padding: 1.25rem;
    margin-bottom: 1rem;
  }
`;

const ProductImageLink = styled(Link)`
  display: block;
  align-self: flex-start;
  flex-shrink: 0;
  cursor: pointer;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 0.8;
  }
`;

const ProductImage = styled.img`
  object-fit: cover;
  width: 60px;
  height: 60px;
  display: block;
  
  @media (min-width: 480px) {
    width: 80px;
    height: 80px;
  }
  
  @media (min-width: 768px) {
    width: 120px;
    height: 120px;
  }
`;

const ProductDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-width: 0; /* Prevent overflow */
  
  @media (min-width: 480px) {
    gap: 1rem;
  }
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

const ProductInfo = styled.div`
  flex: 1; /* Takes up most space to the left */
`;

const PriceSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-end;
`;

const QuantityAndActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  
  @media (min-width: 768px) {
    justify-content: flex-end;
  }
`;

const ProductName = styled(Link)`
  margin: 0 0 0.5rem 0;
  font-size: 16px;
  color: #333333;
  text-align: left;
  font-weight: bold;
  text-decoration: none;
  display: block;
  transition: color 0.2s;
  
  &:hover {
    color: #666666;
  }
  
  @media (min-width: 480px) {
    font-size: 18px;
  }
`;

const ProductInfoDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 0.75rem;
  font-size: 16px;
  color: #666666;
  text-align: left;
`;

const InfoSpan = styled.span`
  font-size: 16px;
  
  &.price {
    font-weight: bold;
    color: #333333;
    font-size: 16px;
  }
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.75rem;
  
  @media (min-width: 480px) {
    justify-content: flex-end;
  }
`;

const QuantityButton = styled.button`
  padding: 0.4rem 0.6rem;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  color: #333333;
  cursor: pointer;
  font-size: 16px;
  min-width: 36px;
  font-weight: bold;
  
  @media (min-width: 480px) {
    padding: 0.5rem 0.75rem;
    min-width: 40px;
  }

  &:hover {
    background-color: #e5e5e5;
  }
  
  &:disabled {
    background-color: #f9f9f9;
    color: #999;
    cursor: not-allowed;
  }
`;

const QuantityDisplay = styled.span`
  margin: 0 0.4rem;
  font-size: 16px;
  font-weight: bold;
  color: #333333;
  min-width: 1.5rem;
  text-align: center;
  
  @media (min-width: 480px) {
    margin: 0 0.75rem;
    min-width: 2rem;
  }
`;




export const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  if (!item) return null;

  const getSavedImage = () => {
    // First: check if we have a valid selectedImage
    if (
      item.selectedImage &&
      typeof item.selectedImage === "string" &&
      item.selectedImage.startsWith("http")
    ) {
      return item.selectedImage;
    }

    // Then: search in localStorage with multiple key formats
    const possibleKeys = [
      `cart-image-${item.sellableId}-${item.size}-${item.appearanceId}`,
      `cart-image-${item.sellableId}-${item.size}-default`,
      `cart-image-${item.sellableId}-${item.size}`, // Gamla formatet
      `cart-image-${item.sellableId}-${item.size}-undefined`,
    ];


    for (const imageKey of possibleKeys) {
      const savedImage = localStorage.getItem(imageKey);

      if (
        savedImage &&
        typeof savedImage === "string" &&
        savedImage.startsWith("http")
      ) {
        return savedImage;
      }
    }

    return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjQ0NDIi8+Cjx0ZXh0IHg9IjQwIiB5PSI0NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSIjNjY2Ij5ObyBJbWFnZTwvdGV4dD4KPHN2Zz4K";
  };

  const imageUrl = useMemo(() => getSavedImage(), [item.sellableId, item.size, item.appearanceId, item.selectedImage]);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity <= 0) {
      onRemove();
    } else {
      onUpdateQuantity(newQuantity);
    }
  };

  const handleRemove = () => {
    onRemove();
  };

  return (
    <CartItemContainer>
      <ProductImageLink to={`/product/${item.sellableId}`}>
        <ProductImage
          src={imageUrl}
          alt={item.name || "Product image"}
          width="120"
          height="120"
          onError={(e) => {
            // Prevent infinite loop - just set to gray box and don't log
            e.target.src =
              "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjQ0NDIi8+Cjx0ZXh0IHg9IjQwIiB5PSI0NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSIjNjY2Ij5ObyBJbWFnZTwvdGV4dD4KPHN2Zz4K";
          }}
        />
      </ProductImageLink>

      <ProductDetails>
        <ProductInfo>
          <ProductName to={`/product/${item.sellableId}`}>
            {translateProductType(item.name)}
          </ProductName>
          <ProductInfoDetails>
            <InfoSpan>Size: {translateSize(item.size)}</InfoSpan>
            {item.color && (
              <InfoSpan>
                Color: {translateColor(item.color)}
              </InfoSpan>
            )}
            <InfoSpan className="price">
              Price: {formatPrice(item.price)}
            </InfoSpan>
          </ProductInfoDetails>
        </ProductInfo>

        <QuantityAndActions>
          <QuantityContainer>
            <QuantityButton
              onClick={() => {
                handleQuantityChange(item.quantity - 1);
              }}
              aria-label={item.quantity === 1 ? "Remove item from cart" : "Decrease quantity"}
              title={item.quantity === 1 ? "Remove item from cart" : "Decrease quantity"}
            >
              {item.quantity === 1 ? <FaTrash /> : '-'}
            </QuantityButton>
            <QuantityDisplay>{item.quantity}</QuantityDisplay>
            <QuantityButton
              onClick={() => {
                handleQuantityChange(item.quantity + 1);
              }}
              aria-label="Increase quantity"
              title="Increase quantity"
            >
              +
            </QuantityButton>
          </QuantityContainer>
        </QuantityAndActions>
      </ProductDetails>
    </CartItemContainer>
  );
};
