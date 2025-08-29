import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";
import { useProductImages } from "../hooks/useProductImages";
import { formatPrice } from "../utils/formatPrice";
import { translateSize, translateColor, translateProductType } from "../utils/translations";
import { CartContext } from "../contexts/CartContext";
import { ProductImageGallery } from "../components/ProductImageGallery";
import { LoadingSpinner, InlineLoadingSpinner } from "../components/LoadingSpinner";
import ScrollToTop from "../components/ScrollToTop";
import FavoriteButton from "../components/FavoriteButton";
import {
  Container,
  ImageSection,
  DetailsSection,
  Title,
  Description,
  Price,
  SelectionContainer,
  Select,
  AddToCartButton,
  LoadingMessage,
  ErrorMessage,
  PopupOverlay,
  PopupBox,
  PopupMessage,
  PopupButtons,
  ContinueButton,
  CartButton,
  ProductInfo
} from "./ProductPage.styles";

// Funktion för att rensa HTML-taggar
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
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

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

  // Add to cart button and logic
  const handleAddToCart = async () => {
    
    // Validering
    if (!selectedColor || !selectedSize) {
      alert("Please select both color and size");
      return;
    }

    if (product) {
      setIsAddingToCart(true);
      
      try {
        // Hitta färg- och storleksnamn
        const colorName = productType.appearances.find(
          (a) => a.id === selectedColor
        )?.name;
        const sizeName = productType.sizes.find(
          (s) => s.id === selectedSize
        )?.name;

        // Hämta rätt bild för vald färg
        const selectedImage =
          images && images.length > 0 ? images[0].url : product.previewImage?.url;

        
        // Add the specified quantity directly with the correct price
        await addToCart(product, sizeName, selectedImage, colorName, quantity, product.price);

        setIsPopupOpen(true);
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
    <Container>
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <Title style={{ margin: 0, flex: 1 }}>
            {translateProductType(productType?.name || product.productTypeName || product.name)}
          </Title>
          <FavoriteButton product={product} size={24} showTooltip={true} />
        </div>

        {/* Visa shortDescription från productType istället */}
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
            
            {/* Vikt - mer flexibel sökning */}
            <div>
              <strong>Weight:</strong> {
                (() => {
                  // Testa olika format i description
                  if (productType.description) {
                    const weightMatch = productType.description.match(/(\d+(?:g\/m²|g\/m2|gsm|\s*g\/m²))/i);
                    if (weightMatch) {
                      return stripHtml(weightMatch[1]).trim();
                    }
                    
                    // Testa bara siffror följt av g
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
            
            {/* Clothing Brand - från API */}
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

      {/* Success Popup */}
      {isPopupOpen && (
        <PopupOverlay onClick={() => setIsPopupOpen(false)}>
          <PopupBox onClick={(e) => e.stopPropagation()}>
            <PopupMessage>Product added to cart!</PopupMessage>
            <PopupButtons>
              <ContinueButton onClick={() => setIsPopupOpen(false)}>
                Continue Shopping
              </ContinueButton>
              <CartButton onClick={() => navigate("/cart")}>
                View Cart
              </CartButton>
            </PopupButtons>
          </PopupBox>
        </PopupOverlay>
      )}

      <ScrollToTop />
    </Container>
  );
};