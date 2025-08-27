import React, { useMemo } from "react";
import styled from "styled-components";
import { formatPrice } from "../utils/formatPrice";
import { translateSize, translateColor, translateProductType } from "../utils/translations";
import { FaTrash } from "react-icons/fa";

const CartItemContainer = styled.div`
  display: flex;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  background-color: #ffffff;
  margin-bottom: 0.75rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  gap: 1rem;
  
  @media (min-width: 768px) {
    padding: 1.25rem;
    margin-bottom: 1rem;
  }
`;

const ProductImage = styled.img`
  object-fit: cover;
  width: 80px;
  height: 80px;
  align-self: flex-start;
  flex-shrink: 0;
  
  @media (min-width: 480px) {
    width: 100px;
    height: 100px;
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
  gap: 1rem;
`;

const ProductInfo = styled.div`
  flex: 1; /* Tar upp mesta utrymmet till vänster */
`;

const PriceSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-end;
`;

const QuantityAndActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-end;
`;

const ProductName = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 16px;
  color: #333333;
  text-align: left;
  font-weight: bold;
  
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
  padding: 0.5rem 0.75rem;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  color: #333333;
  cursor: pointer;
  font-size: 16px;
  min-width: 40px;
  font-weight: bold;

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
  margin: 0 0.5rem;
  font-size: 16px;
  font-weight: bold;
  color: #333333;
  min-width: 2rem;
  text-align: center;
  
  @media (min-width: 480px) {
    margin: 0 0.75rem;
  }
`;




export const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  if (!item) return null;

  const getSavedImage = () => {
    // Först: kolla om vi har en giltig selectedImage
    if (
      item.selectedImage &&
      typeof item.selectedImage === "string" &&
      item.selectedImage.startsWith("http")
    ) {
      return item.selectedImage;
    }

    // Sedan: sök i localStorage med flera nyckel-format
    const possibleKeys = [
      `cart-image-${item.sellableId}-${item.size}-${item.appearanceId}`,
      `cart-image-${item.sellableId}-${item.size}-default`,
      `cart-image-${item.sellableId}-${item.size}`, // Gamla formatet
      `cart-image-${item.sellableId}-${item.size}-undefined`,
    ];

    console.log("Söker localStorage för produktdata:", {
      sellableId: item.sellableId,
      size: item.size,
      appearanceId: item.appearanceId,
      selectedImage: item.selectedImage,
    });
    console.log("Provar nycklar:", possibleKeys);

    for (const imageKey of possibleKeys) {
      const savedImage = localStorage.getItem(imageKey);
      console.log(`Nyckel "${imageKey}":`, savedImage ? "HITTAD" : "ej funnen");

      if (
        savedImage &&
        typeof savedImage === "string" &&
        savedImage.startsWith("http")
      ) {
        console.log(
          "Hämtade sparad bild från localStorage med nyckel:",
          imageKey
        );
        return savedImage;
      }
    }

    console.log("Ingen giltig bild hittades i localStorage");
    return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjQ0NDIi8+Cjx0ZXh0IHg9IjQwIiB5PSI0NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSIjNjY2Ij5ObyBJbWFnZTwvdGV4dD4KPHN2Zz4K";
  };

  const imageUrl = useMemo(() => getSavedImage(), [item.sellableId, item.size, item.appearanceId, item.selectedImage]);

  const handleQuantityChange = (newQuantity) => {
    console.log('handleQuantityChange called with:', newQuantity);
    if (newQuantity <= 0) {
      const confirmed = window.confirm(
        `Are you sure you want to remove ${item.name} from your cart?`
      );
      if (confirmed) {
        console.log('Removing item');
        onRemove();
      }
    } else {
      console.log('Updating quantity to:', newQuantity);
      onUpdateQuantity(newQuantity);
    }
  };

  const handleRemove = () => {
    const confirmed = window.confirm(
      `Are you sure you want to remove ${item.name} from your cart?`
    );
    if (confirmed) {
      onRemove();
    }
  };

  return (
    <CartItemContainer>
      <ProductImage
        src={imageUrl}
        alt={item.name || "Product image"}
        width="120"
        height="120"
        onError={(e) => {
          // Förhindra evighetsloop - sätt bara till grå ruta och logga inte
          e.target.src =
            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjQ0NDIi8+Cjx0ZXh0IHg9IjQwIiB5PSI0NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSIjNjY2Ij5ObyBJbWFnZTwvdGV4dD4KPHN2Zz4K";
        }}
      />

      <ProductDetails>
        <ProductInfo>
          <ProductName>{translateProductType(item.name)}</ProductName>
          <ProductInfoDetails>
            <InfoSpan>Size: {translateSize(item.size)}</InfoSpan>
            {item.color && (
              <InfoSpan>
                Color: {translateColor(item.color)}
              </InfoSpan>
            )}
          </ProductInfoDetails>
        </ProductInfo>

        <PriceSection>
          <InfoSpan className="price">
            Price: {formatPrice(item.price)}
          </InfoSpan>
          
          <QuantityAndActions>
            <QuantityContainer>
              <QuantityButton
                onClick={() => {
                  console.log('Minus button clicked, current quantity:', item.quantity);
                  handleQuantityChange(item.quantity - 1);
                }}
              >
                {item.quantity === 1 ? <FaTrash /> : '-'}
              </QuantityButton>
              <QuantityDisplay>{item.quantity}</QuantityDisplay>
              <QuantityButton
                onClick={() => {
                  console.log('Plus button clicked, current quantity:', item.quantity);
                  handleQuantityChange(item.quantity + 1);
                }}
              >
                +
              </QuantityButton>
            </QuantityContainer>
          </QuantityAndActions>
        </PriceSection>
      </ProductDetails>
    </CartItemContainer>
  );
};
