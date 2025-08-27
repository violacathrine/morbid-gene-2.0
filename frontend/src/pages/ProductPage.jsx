import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useProduct } from "../hooks/useProduct";
import { useProductImages } from "../hooks/useProductImages";
import { formatPrice } from "../utils/formatPrice";
import { CartContext } from "../contexts/CartContext";
import { ProductImageGallery } from "../components/ProductImageGallery";
import ScrollToTop from "../components/ScrollToTop";
import FavoriteButton from "../components/FavoriteButton";
import { translateSize, translateColor, translateProductType } from "../utils/translations";
import { theme } from "../styles/theme";

// Styled Components
const Container = styled.div`
  padding: ${theme.spacing.base};
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.base};
  background-color: ${theme.colors.pageBg};
  
  @media (min-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing['2xl']};
    gap: ${theme.spacing.xl};
  }
  
  @media (min-width: ${theme.breakpoints.desktop}) {
    padding: ${theme.spacing['2xl']};
    gap: ${theme.spacing['2xl']};
  }
`;

const ImageSection = styled.div``;

const ProductImage = styled.img`
  width: 100%;
  max-width: 500px;
  height: auto;
  border: 1px solid ${theme.colors.borderLight};
`;

const DetailsSection = styled.div``;

const Title = styled.h1`
  font-size: ${theme.typography.sizes['3xl']};
  font-weight: ${theme.typography.weights.bold};
  margin-bottom: ${theme.spacing.base};
  color: ${theme.colors.primaryText};
  font-family: ${theme.typography.headingFamily};
`;

const Description = styled.p`
  font-size: ${theme.typography.sizes.lg};
  margin-bottom: ${theme.spacing.xl};
  line-height: 1.6;
  color: ${theme.colors.secondaryText};
`;

const Price = styled.div`
  font-size: ${theme.typography.sizes['2xl']};
  font-weight: ${theme.typography.weights.bold};
  margin-bottom: ${theme.spacing.xl};
  color: ${theme.colors.red};
`;

const SelectionContainer = styled.div`
  margin-bottom: ${theme.spacing.xl};
  display: flex;
  gap: ${theme.spacing.base};
`;

const Select = styled.select`
  padding: ${theme.spacing.sm};
  border: 1px solid ${theme.colors.borderLight};
  background-color: ${theme.colors.sectionBg};
  color: ${theme.colors.primaryText};
  font-size: ${theme.typography.sizes.base};

  option:disabled {
    color: ${theme.colors.mutedText};
  }
`;


const AddToCartButton = styled.button`
  background-color: ${(props) => (!props.$enabled ? theme.colors.buttonDisabled : theme.colors.buttonPrimary)};
  color: ${theme.colors.primaryText};
  padding: ${theme.spacing.base} ${theme.spacing['2xl']};
  border: none;
  font-size: ${theme.typography.sizes.lg};
  font-weight: ${theme.typography.weights.bold};
  text-transform: uppercase;
  letter-spacing: ${theme.typography.letterSpacing.uppercase};
  cursor: ${(props) => (!props.$enabled ? "not-allowed" : "pointer")};
  transition: background-color ${theme.transitions.normal};
  opacity: ${(props) => (!props.$enabled ? 0.6 : 1)};

  &:hover {
    background-color: ${(props) => (props.$enabled ? theme.colors.buttonPrimaryHover : theme.colors.buttonDisabled)};
  }
`;

const ProductInfo = styled.div`
  margin-top: ${theme.spacing['2xl']};
  padding: ${theme.spacing.xl};
  background-color: ${theme.colors.sectionBg};
  border: 1px solid ${theme.colors.borderLight};
  font-size: ${theme.typography.sizes.sm};
  color: ${theme.colors.secondaryText};
  line-height: 1.5;
  
  strong {
    color: ${theme.colors.primaryText};
    font-weight: ${theme.typography.weights.bold};
  }
  
  > strong:first-child {
    font-size: ${theme.typography.sizes.base};
    color: ${theme.colors.primaryText};
  }
`;

const LoadingError = styled.div`
  padding: ${theme.spacing['2xl']};
  color: ${theme.colors.primaryText};
  text-align: center;
`;

const ErrorDiv = styled(LoadingError)`
  color: red;
`;

// Popup styles
const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupBox = styled.div`
  background-color: ${theme.colors.sectionBg};
  padding: ${theme.spacing['2xl']};
  border: 1px solid ${theme.colors.borderLight};
  max-width: 400px;
  width: 90%;
`;

const PopupMessage = styled.p`
  color: ${theme.colors.primaryText};
  margin-bottom: ${theme.spacing.xl};
  text-align: center;
  font-size: ${theme.typography.sizes.base};
`;

const PopupButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.base};
  justify-content: center;
`;

const PopupButton = styled.button`
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border: none;
  font-weight: ${theme.typography.weights.bold};
  text-transform: uppercase;
  letter-spacing: ${theme.typography.letterSpacing.uppercase};
  cursor: pointer;
  transition: background-color ${theme.transitions.normal};
`;

const ContinueButton = styled(PopupButton)`
  background-color: ${theme.colors.buttonSecondary};
  color: ${theme.colors.primaryText};

  &:hover {
    background-color: ${theme.colors.buttonSecondaryHover};
  }
`;

const CartButton = styled(PopupButton)`
  background-color: ${theme.colors.buttonPrimary};
  color: ${theme.colors.primaryText};

  &:hover {
    background-color: ${theme.colors.buttonPrimaryHover};
  }
`;


const QuantityInput = styled.input`
  width: 80px;
  padding: ${theme.spacing.sm};
  border: 1px solid ${theme.colors.borderLight};
  background-color: ${theme.colors.inputBg};
  color: ${theme.colors.primaryText};
  text-align: center;
  font-size: ${theme.typography.sizes.base};
`;

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
    console.log("getCurrentImage called:", {
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

  // Add to cart button and logic
  const handleAddToCart = () => {
    // Validering
    if (!selectedColor || !selectedSize) {
      alert("Please select both color and size");
      return;
    }

    if (product) {
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

      // Lägg till varor baserat på quantity - BARA EN GÅNG!
      for (let i = 0; i < quantity; i++) {
        addToCart(product, sizeName, selectedImage, colorName);
      }

      setIsPopupOpen(true);
    }
  };

  if (loading) return <LoadingError>Loading product..</LoadingError>;
  if (error) return <ErrorDiv>Error: {error}</ErrorDiv>;
  if (!product) return <LoadingError>Product not found.</LoadingError>;

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

        {product.description && product.description !== (product.description || product.name) && (
          <Description>{product.description}</Description>
        )}

        <Price>
          {formatPrice(product.price?.amount, product.price?.currencyId)}
        </Price>

        {/* Color, Size, and Quantity Selection */}
        {productType && (
          <SelectionContainer>
            {/* Color dropdown */}
            <Select
              value={selectedColor || ""}
              onChange={(e) => {
                console.log("Color changed to:", e.target.value);
                setSelectedColor(e.target.value);
              }}
            >
              <option value="">Select Color</option>
              {productType.appearances
                ?.filter((color) => product.appearanceIds?.includes(color.id))
                ?.map((color) => (
                  <option key={color.id} value={color.id}>
                    {translateColor(color.name)}
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
                  {translateSize(size.name)} {!size.available && "(Out of stock)"}
                </option>
              ))}
            </Select>

            {/* Quantity selector */}
            <QuantityInput
              id="quantity"
              type="number"
              min="1"
              max="10"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              placeholder="Qty"
            />
          </SelectionContainer>
        )}
        {/* Add to Cart Button */}
        <AddToCartButton
          onClick={handleAddToCart}
          $enabled={isButtonEnabled}
          disabled={!isButtonEnabled}
        >
          Add to Cart
        </AddToCartButton>

        {/* Product Details */}
        <ProductInfo>
          <strong>Product Details</strong>
          <br /><br />
          
          {productType?.description ? (
            (() => {
              const cleanDescription = productType.description.replace(/<[^>]*>/g, '');
              
              // Split description into sections to avoid duplicates
              const sections = cleanDescription.split(/(?=Material:|Durable quality:|Fabric weight:|Consistency:|Size:|Fit:|Features?:)/i);
              const specs = {};
              let mainDesc = sections[0]?.trim() || '';
              
              // Process each section
              sections.forEach(section => {
                const trimmedSection = section.trim();
                
                if (trimmedSection.match(/^Material:/i)) {
                  const content = trimmedSection.replace(/^Material:\s*/i, '').split(/(?=Durable quality:|Fabric weight:|Consistency:|Size:|Fit:|Features?:)/i)[0].trim();
                  if (content && !specs.material) specs.material = content;
                }
                else if (trimmedSection.match(/^(?:Durable quality|Fabric weight):/i)) {
                  const content = trimmedSection.replace(/^(?:Durable quality|Fabric weight):\s*/i, '').split(/(?=Material:|Consistency:|Size:|Fit:|Features?:)/i)[0].trim();
                  if (content && !specs.weight) specs.weight = content;
                }
                else if (trimmedSection.match(/^Consistency:/i)) {
                  const content = trimmedSection.replace(/^Consistency:\s*/i, '').split(/(?=Material:|Durable quality:|Fabric weight:|Size:|Fit:|Features?:)/i)[0].trim();
                  if (content && !specs.consistency) specs.consistency = content;
                }
                else if (trimmedSection.match(/^(?:Size|Fit):/i)) {
                  const content = trimmedSection.replace(/^(?:Size|Fit):\s*/i, '').split(/(?=Material:|Durable quality:|Fabric weight:|Consistency:|Features?:)/i)[0].trim();
                  if (content && !specs.size) specs.size = content;
                }
                else if (trimmedSection.match(/^Features?:/i)) {
                  const content = trimmedSection.replace(/^Features?:\s*/i, '').split(/(?=Material:|Durable quality:|Fabric weight:|Consistency:|Size:|Fit:)/i)[0].trim();
                  if (content && !specs.features) specs.features = content;
                }
              });
              
              return (
                <>
                  {mainDesc && (
                    <>
                      <strong>Description:</strong>
                      <br />
                      {mainDesc}
                      <br /><br />
                    </>
                  )}
                  
                  {specs.material && (
                    <>
                      <strong>Material:</strong> {specs.material}
                      <br />
                    </>
                  )}
                  
                  {specs.weight && (
                    <>
                      <strong>Weight:</strong> {specs.weight}
                      <br />
                    </>
                  )}
                  
                  {specs.consistency && (
                    <>
                      <strong>Consistency:</strong> {specs.consistency}
                      <br />
                    </>
                  )}
                  
                  {specs.size && (
                    <>
                      <strong>Size/Fit:</strong> {specs.size}
                      <br />
                    </>
                  )}
                  
                  {specs.features && (
                    <>
                      <strong>Features:</strong> {specs.features}
                      <br />
                    </>
                  )}
                  
                  <strong>Care Instructions:</strong> Machine wash cold, tumble dry low, do not bleach
                </>
              );
            })()
          ) : (
            <>
              <strong>Material:</strong> Premium quality material
              <br />
              <strong>Weight:</strong> Standard weight
              <br />
              <strong>Care Instructions:</strong> Machine wash cold, tumble dry low, do not bleach
            </>
          )}
        </ProductInfo>
      </DetailsSection>
      {/* Popup som visas när vara läggs till */}
      {isPopupOpen && (
        <PopupOverlay>
          <PopupBox>
            <PopupMessage>
              You've added <strong>{quantity} </strong> of this article to the
              cart
            </PopupMessage>
            <PopupButtons>
              <ContinueButton
                onClick={() => {
                  setIsPopupOpen(false);
                  navigate("/merch");
                }}
              >
                Continue shopping
              </ContinueButton>
              <CartButton
                onClick={() => {
                  setIsPopupOpen(false);
                  navigate("/cart");
                }}
              >
                Go to cart
              </CartButton>
            </PopupButtons>
          </PopupBox>
        </PopupOverlay>
      )}
      <ScrollToTop />
    </Container>
  );
};
