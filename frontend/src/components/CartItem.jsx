import React from "react";
import styled from "styled-components";
import { formatPrice } from "../utils/formatPrice";
import { translateSize, translateColor, translateProductType } from "../utils/translations";

const CartItemContainer = styled.div`
  display: flex;
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 16px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ProductImage = styled.img`
  border-radius: 8px;
  object-fit: cover;
  margin-right: 16px;
`;

const ProductDetails = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between; /* Detta skapar mellanrum mellan vänster och höger del */
`;

const ProductInfo = styled.div`
  flex: 1; /* Tar upp mesta utrymmet till vänster */
`;

const QuantityAndActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end; /* Justerar allt till höger */
  gap: 12px;
`;

const ProductName = styled.h3`
  margin: 0 0 8px 0;
  font-size: 18px;
  color: #333;
`;

const ProductInfoDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 12px;
  font-size: 14px;
  color: #666;
`;

const InfoSpan = styled.span`
  &.price {
    font-weight: bold;
    color: #333;
  }
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

const QuantityButton = styled.button`
  padding: 8px 12px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #e5e5e5;
  }
`;

const QuantityDisplay = styled.span`
  margin: 0 16px;
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

const TotalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`;

const TotalPrice = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

const RemoveButton = styled.button`
  padding: 8px 16px;
  background-color: #ff4444;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #dd2222;
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

  const imageUrl = getSavedImage();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity <= 0) {
      const confirmed = window.confirm(
        `Are you sure you want to remove ${item.name} from your cart?`
      );
      if (confirmed) {
        onRemove();
      }
    } else {
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
        width="80"
        height="80"
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
            <InfoSpan className="price">
              Price: {formatPrice(item.price)}
            </InfoSpan>
          </ProductInfoDetails>
        </ProductInfo>

        <QuantityAndActions>
          <QuantityContainer>
            <QuantityButton
              onClick={() => handleQuantityChange(item.quantity - 1)}
            >
              -
            </QuantityButton>
            <QuantityDisplay>{item.quantity}</QuantityDisplay>
            <QuantityButton
              onClick={() => handleQuantityChange(item.quantity + 1)}
            >
              +
            </QuantityButton>
          </QuantityContainer>

          <TotalContainer>
            <TotalPrice>
              Total:{" "}
              {formatPrice({ display: item.price?.display * item.quantity })}
            </TotalPrice>
            <RemoveButton onClick={handleRemove}>Remove</RemoveButton>
          </TotalContainer>
        </QuantityAndActions>
      </ProductDetails>
    </CartItemContainer>
  );
};
