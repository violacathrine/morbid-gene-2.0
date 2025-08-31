import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../styles/theme";
import { useProduct } from "../hooks/useProduct";
import { useProductImages } from "../hooks/useProductImages";
import { formatPrice } from "../utils/formatPrice";
import { translateSize, translateColor, translateProductType } from "../utils/translations";
import { CartContext } from "../contexts/CartProvider";
import { ProductImageGallery } from "../components/ProductImageGallery";
import { LoadingSpinner, InlineLoadingSpinner } from "../components/LoadingSpinner";
import ScrollToTop from "../components/ScrollToTop";
import FavoriteButton from "../components/FavoriteButton";
import {
  SelectionContainer,
  Select,
} from "../components/shared/FormComponents";
import {
  PageTitle,
  Description,
  Price,
} from "../components/shared/TypographyComponents";
import { AddToCartButton } from "../components/shared/ButtonComponents";
import { LoadingMessage, ErrorMessage } from "../components/shared/StatusComponents";
import { Container } from "../components/shared/LayoutComponents";

// ProductPage-specific styled components

const ImageSection = styled.div``;

const DetailsSection = styled.div``;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: ${theme.colors.secondaryText};
  font-size: ${theme.typography.sizes.sm};
  cursor: pointer;
  padding: 0.5rem 0;
  margin-bottom: ${theme.spacing.base};
  transition: color 0.2s ease;
  
  &:hover {
    color: ${theme.colors.primaryText};
  }
  
  @media (min-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.typography.sizes.base};
  }
`;

const Tooltip = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #333;
  color: white;
  padding: 12px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  z-index: 10000;
  opacity: ${props => props.$show ? 1 : 0};
  transition: opacity 0.3s ease;
  pointer-events: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
`;

const ProductInfo = styled.div`
  margin-top: ${theme.spacing['2xl']};
  padding: ${theme.spacing.xl};
  background-color: ${theme.colors.sectionBg};
  font-size: ${theme.typography.sizes.sm};
  color: ${theme.colors.secondaryText};
  line-height: 1.5;
  
  @media (min-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing['2xl']};
    font-size: ${theme.typography.sizes.base};
  }
  
  strong {
    color: ${theme.colors.primaryText};
    font-weight: ${theme.typography.weights.bold};
  }
  
  > strong:first-child {
    font-size: ${theme.typography.sizes.base};
    color: ${theme.colors.primaryText};
    display: block;
    margin-bottom: ${theme.spacing.base};
    
    @media (min-width: ${theme.breakpoints.mobile}) {
      font-size: ${theme.typography.sizes.lg};
    }
  }
`;

// Function to strip HTML tags
const stripHtml = (html) => {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').trim();
};

export const ProductPage = () => {
  const { productId } = useParams();
  const { product, productType, loading, error } = useProduct(productId);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  // States
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Get images for selected color (only if product is loaded)
  const { images } = useProductImages(
    product?.sellableId,
    product ? selectedColor || product.defaultAppearanceId : null,
    product?.ideaId
  );

  // Function to check availability
  const isAvailable = (sizeId, appearanceId) => {
    return productType?.stockStates?.some(
      (stock) =>
        stock.size.id === sizeId &&
        stock.appearance.id === appearanceId &&
        stock.available === true
    );
  };

  // Filter sizes based on selected color
  const getAvailableSizes = () => {
    if (!selectedColor || !productType) return productType?.sizes || [];

    return productType.sizes.map((size) => ({
      ...size,
      available: isAvailable(size.id, selectedColor),
    }));
  };

  // Add to cart button and logic
  const handleAddToCart = async () => {
    
    // Validation
    if (!selectedColor || !selectedSize) {
      alert("Please select both color and size");
      return;
    }

    if (product) {
      setIsAddingToCart(true);
      
      try {
        // Find color and size names
        const colorName = productType.appearances.find(
          (a) => a.id === selectedColor
        )?.name;
        const sizeName = productType.sizes.find(
          (s) => s.id === selectedSize
        )?.name;

        // Get correct image for selected color
        const selectedImage =
          images && images.length > 0 ? images[0].url : product.previewImage?.url;

        
        // Add the specified quantity directly with the correct price
        await addToCart(product, sizeName, selectedImage, colorName, quantity, product.price);

        // Show tooltip for 2 seconds
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 2000);
      } finally {
        setIsAddingToCart(false);
      }
    }
  };

  if (loading) return <LoadingSpinner fullScreen text="Loading product..." />;
  if (error) return <ErrorMessage>Error: {error}</ErrorMessage>;
  if (!product) return <LoadingSpinner fullScreen text="Product not found." />;

  const isButtonEnabled = selectedColor && selectedSize;

  return (
    <Container $maxWidth="md" $variant="grid" $padding="md">
      {/* Product image gallery */}
      <ImageSection>
        <ProductImageGallery
          images={images}
          productName={product.name}
          fallbackImage={product.previewImage?.url}
        />
      </ImageSection>

      {/* Product details */}
      <DetailsSection>
        <BackButton onClick={() => navigate('/merch')}>
          ← Back to Merch
        </BackButton>
        
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <PageTitle style={{ margin: 0, flex: 1, paddingRight: '1rem' }}>
            {translateProductType(productType?.name || product.productTypeName || product.name)}
          </PageTitle>
          <div style={{ flexShrink: 0, paddingTop: '0.25rem' }}>
            <FavoriteButton product={product} size={24} showTooltip={true} />
          </div>
        </div>

        {/* Show shortDescription from productType instead */}
        {productType?.shortDescription && (
          <Description>{stripHtml(productType.shortDescription)}</Description>
        )}

        <Price>
          {formatPrice(product.price?.amount, product.price?.currencyId)}
        </Price>

        {/* Color, Size and Quantity Selection */}
        <SelectionContainer>
          {/* Color Selection */}
          <Select
            value={selectedColor || ""}
            onChange={(e) => {
              setSelectedColor(e.target.value);
              setSelectedSize(null); // Reset size when color changes
            }}
            aria-label="Choose Color"
          >
            <option value="" disabled>
              Choose Color
            </option>
            {productType?.appearances?.map((appearance) => (
              <option key={appearance.id} value={appearance.id}>
                {translateColor(appearance.name)}
              </option>
            ))}
          </Select>

          {/* Size Selection */}
          <Select
            value={selectedSize || ""}
            onChange={(e) => setSelectedSize(e.target.value)}
            disabled={!selectedColor}
            aria-label="Choose Size"
          >
            <option value="" disabled>
              Choose Size
            </option>
            {getAvailableSizes().map((size) => (
              <option
                key={size.id}
                value={size.id}
                disabled={selectedColor && !size.available}
              >
                {translateSize(size.name)} {selectedColor && !size.available && "(Out of stock)"}
              </option>
            ))}
          </Select>

          {/* Quantity Selection */}
          <Select
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            aria-label="Quantity"
          >
            {[1,2,3,4,5,6,7,8,9,10].map(num => (
              <option key={num} value={num}>
                {num === 1 ? 'Qty: 1' : num}
              </option>
            ))}
          </Select>
        </SelectionContainer>

        {/* Add to Cart Button */}
        <AddToCartButton 
          onClick={handleAddToCart} 
          $enabled={isButtonEnabled && !isAddingToCart}
          disabled={!isButtonEnabled || isAddingToCart}
        >
          {isAddingToCart ? (
            <>
              <InlineLoadingSpinner />
              Adding to Cart...
            </>
          ) : (
            'Add to Cart'
          )}
        </AddToCartButton>

        {/* Product Information */}
        {productType && (
          <ProductInfo>
            <strong>Product Details</strong>

            {/* Print - alltid Morbid Gene */}
            <div>
              <strong>Print:</strong> Morbid Gene
            </div>
            
            {/* Material - alltid visa med fallback */}
            <div>
              <strong>Material:</strong> {
                productType.description && productType.description.includes('Material:') 
                  ? stripHtml(productType.description.match(/Material:([^<]*)/)?.[1] || '').trim()
                  : 'N/A'
              }
            </div>
            
            {/* Weight - more flexible search */}
            <div>
              <strong>Weight:</strong> {
                (() => {
                  // Testa olika format i description
                  if (productType.description) {
                    const weightMatch = productType.description.match(/(\d+(?:g\/m²|g\/m2|gsm|\s*g\/m²))/i);
                    if (weightMatch) {
                      return stripHtml(weightMatch[1]).trim();
                    }
                    
                    // Test only numbers followed by g
                    const simpleWeight = productType.description.match(/(\d+)\s*g/i);
                    if (simpleWeight) {
                      return `${simpleWeight[1]}g/m²`;
                    }
                  }
                  
                  return 'N/A';
                })()
              }
            </div>
            
            {/* Fit - alltid visa med fallback */}
            <div>
              <strong>Fit:</strong> {productType.sizeFitHint || 'N/A'}
            </div>
            
            {/* Clothing Brand - from API */}
            <div>
              <strong>Clothing Brand:</strong> {productType.brand || 'N/A'}
            </div>

            {/* Care Instructions - alltid visa med fallback */}
            <div>
              <strong>Care Instructions:</strong> {
                productType.washingInstructions && productType.washingInstructions.length > 0
                  ? productType.washingInstructions.join(', ')
                  : 'N/A'
              }
            </div>
          </ProductInfo>
        )}
      </DetailsSection>

      {/* Success Tooltip */}
      <Tooltip $show={showTooltip}>
        Product added
      </Tooltip>

      <ScrollToTop />
    </Container>
  );
};