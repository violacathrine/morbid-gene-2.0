import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useProduct } from "../hooks/useProduct";
import { useCart } from "../hooks/useCart";
import { useProductImages } from "../hooks/useProductImages";
import { formatPrice } from "../utils/formatPrice";

// Styled Components
const Container = styled.div`
  padding: 5rem;
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
`;

const ImageSection = styled.div``;

const ProductImage = styled.img`
  width: 100%;
  max-width: 500px;
  height: auto;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
`;

const DetailsSection = styled.div``;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: white;
`;

const Description = styled.p`
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  line-height: 1.6;
  color: #ccc;
`;

const Price = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #4ade80;
`;

const SelectionContainer = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  gap: 1rem;
`;

const Select = styled.select`
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

const TagsSection = styled.div`
  margin-bottom: 2rem;
`;

const TagsTitle = styled.h3`
  color: white;
  margin-bottom: 0.5rem;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Tag = styled.span`
  background-color: #374151;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
`;

const AddToCartButton = styled.button`
  background-color: ${(props) => (!props.enabled ? "#6b7280" : "#dc2626")};
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  border: none;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: ${(props) => (!props.enabled ? "not-allowed" : "pointer")};
  transition: background-color 0.2s;
  opacity: ${(props) => (!props.enabled ? 0.6 : 1)};

  &:hover {
    background-color: ${(props) => (props.enabled ? "#b91c1c" : "#6b7280")};
  }
`;

const DebugInfo = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  background-color: #1f2937;
  border-radius: 4px;
  font-size: 0.875rem;
  color: #9ca3af;
`;

const LoadingError = styled.div`
  padding: 2rem;
  color: ${(props) => (props.error ? "red" : "white")};
`;

export const ProductPage = () => {
  const { productId } = useParams();
  const { product, productType, loading, error } = useProduct(productId);
  const { addToCart } = useCart();

  // State för vald färg och storlek
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  // Hämta bilder för vald färg (bara om produkten är laddad)
  const { images } = useProductImages(
    product?.sellableId,
    product ? selectedColor || product.defaultAppearanceId : null,
    product?.ideaId
  );

  // Funktion för att kolla tillgänglighet
  const isAvailable = (sizeId, appearanceId) => {
    return productType?.stockStates?.some(
      (stock) =>
        stock.size.id === sizeId &&
        stock.appearance.id === appearanceId &&
        stock.available === true
    );
  };

  // Filtrera storlekar baserat på vald färg
  const getAvailableSizes = () => {
    if (!selectedColor || !productType) return productType?.sizes || [];

    return productType.sizes.map((size) => ({
      ...size,
      available: isAvailable(size.id, selectedColor),
    }));
  };

  // Funktion för att få rätt bild baserat på vald färg
  const getCurrentImage = () => {
    console.log("🖼️ getCurrentImage called:", {
      imagesLength: images?.length,
      firstImageUrl: images?.[0]?.url,
      fallbackUrl: product?.previewImage?.url,
    });

    // Om vi har nya bilder från API:et, använd första bilden
    if (images && images.length > 0) {
      return images[0].url;
    }

    // Fallback till originalbilden
    return product?.previewImage?.url;
  };

  const handleAddToCart = () => {
    // Validation först
    if (!selectedColor || !selectedSize) {
      alert("Please select both color and size!");
      return;
    }

    // Kolla om kombinationen är tillgänglig
    if (!isAvailable(selectedSize, selectedColor)) {
      alert("Sorry, this combination is out of stock!");
      return;
    }

    if (product) {
      // Skapa produkt med vald size/appearance för Spreadshirt basket API
      const productWithSelection = {
        ...product,
        selectedAppearance: selectedColor,
        selectedSize: selectedSize,
      };

      console.log("🎯 SENDING PRODUCT WITH SELECTION:", productWithSelection);
      addToCart(productWithSelection);

      // Hitta namn för user-friendly meddelande
      const colorName = productType.appearances.find(
        (a) => a.id === selectedColor
      )?.name;
      const sizeName = productType.sizes.find(
        (s) => s.id === selectedSize
      )?.name;

      alert(`${product.name} (${colorName}, ${sizeName}) added to cart!`);
    }
  };

  if (loading) return <LoadingError>Loading product..</LoadingError>;
  if (error) return <LoadingError error>Error: {error}</LoadingError>;
  if (!product) return <LoadingError>Product not found.</LoadingError>;

  const isButtonEnabled = selectedColor && selectedSize;

  return (
    <Container>
      {/* Product image */}
      <ImageSection>
        {product.previewImage?.url && (
          <ProductImage src={getCurrentImage()} alt={product.name} />
        )}
      </ImageSection>

      {/* Product details */}
      <DetailsSection>
        <Title>{product.name}</Title>

        {product.description && (
          <Description>{product.description}</Description>
        )}

        <Price>
          {formatPrice(product.price?.amount, product.price?.currencyId)}
        </Price>

        {/* Color and Size Selection */}
        {productType && (
          <SelectionContainer>
            {/* Color dropdown */}
            <Select
              value={selectedColor || ""}
              onChange={(e) => {
                console.log("🔄 Color changed to:", e.target.value);
                setSelectedColor(e.target.value);
              }}
            >
              <option value="">Select Color</option>
              {productType.appearances
                ?.filter((color) => product.appearanceIds?.includes(color.id))
                ?.map((color) => (
                  <option key={color.id} value={color.id}>
                    {color.name.charAt(0).toUpperCase() + color.name.slice(1)}
                  </option>
                ))}
            </Select>

            {/* Size dropdown */}
            <Select
              value={selectedSize || ""}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              <option value="">Select Size</option>
              {getAvailableSizes().map((size) => (
                <option
                  key={size.id}
                  value={size.id}
                  disabled={!size.available}
                >
                  {size.name} {!size.available && "(Out of stock)"}
                </option>
              ))}
            </Select>
          </SelectionContainer>
        )}

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <TagsSection>
            <TagsTitle>Tags:</TagsTitle>
            <TagsContainer>
              {product.tags.map((tag, index) => (
                <Tag key={index}>{tag}</Tag>
              ))}
            </TagsContainer>
          </TagsSection>
        )}

        {/* Add to Cart Button */}
        <AddToCartButton
          onClick={handleAddToCart}
          enabled={isButtonEnabled}
          disabled={!isButtonEnabled}
        >
          Add to Cart
        </AddToCartButton>

        {/* Debug info */}
        <DebugInfo>
          <strong>Debug info:</strong>
          <br />
          Product ID: {productId}
          <br />
          Sellable ID: {product.sellableId}
          <br />
          Idea ID: {product.ideaId}
          <br />
          Product Type: {product.productTypeId}
          <br />
          Selected Color: {selectedColor || "None"}
          <br />
          Selected Size: {selectedSize || "None"}
        </DebugInfo>
      </DetailsSection>
    </Container>
  );
};
