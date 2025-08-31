import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CartItem } from "../components/CartItem";
import { formatPrice } from "../utils/formatPrice";
import { CartContext } from "../contexts/CartProvider";
import { getCheckoutUrl } from "../api/basketApi"; // ÄNDRAT: Importera den nya funktionen
import ScrollToTop from "../components/ScrollToTop";
import { ClearCartPopup } from "../components/ClearCartPopup";
import { Container } from "../components/shared/LayoutComponents";
import { EmptyState, EmptyStateLink } from "../components/shared/EmptyStateComponents";
import { theme } from "../styles/theme";


const Header = styled.div`
  margin-bottom: 1rem;
  
  @media (min-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const Title = styled.h1`
  color: ${theme.colors.primaryText};
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  
  @media (min-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`;

const CartList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  
  @media (min-width: 768px) {
    gap: 1rem;
    margin-bottom: 2rem;
  }
`;

// Ordersammanfattning sektion
const OrderSummarySection = styled.div`
  background: #1f2937;
  border: 1px solid #374151;
  padding: 1rem;
  margin-bottom: 1.5rem;
  
  @media (min-width: 480px) {
    padding: 1.5rem;
  }
  
  @media (min-width: 768px) {
    padding: 2rem;
    margin-bottom: 2rem;
  }
`;

const SummaryTitle = styled.h2`
  color: ${theme.colors.primaryText};
  font-size: 1.1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #374151;
  padding-bottom: 0.5rem;
  
  @media (min-width: 480px) {
    font-size: 1.3rem;
    margin-bottom: 1.5rem;
  }
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0.5rem 0;
  color: #e5e7eb;
  border-bottom: 1px solid #374151;
  gap: 0.5rem;
  
  @media (min-width: 480px) {
    align-items: center;
    padding: 0.75rem 0;
  }

  &:last-child {
    border-bottom: none;
    padding-top: 0.75rem;
    margin-top: 0.5rem;
    font-weight: bold;
    font-size: 1rem;
    color: white;
    
    @media (min-width: 480px) {
      padding-top: 1rem;
      font-size: 1.1rem;
    }
  }
`;

const SummaryLabel = styled.span.withConfig({
  shouldForwardProp: (prop) => !["bold"].includes(prop),
})`
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
  font-size: 0.9rem;
  
  @media (min-width: 480px) {
    font-size: 1rem;
  }
`;

const SummaryValue = styled.span.withConfig({
  shouldForwardProp: (prop) => !["bold"].includes(prop),
})`
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
  font-size: 0.9rem;
  text-align: right;
  
  @media (min-width: 480px) {
    font-size: 1rem;
  }
`;

// Checkout info sektion
const CheckoutInfoSection = styled.div`
  background: ${theme.colors.sectionBg};
  border: 1px solid ${theme.colors.buttonPrimary};
  padding: 1rem;
  margin-bottom: 1.5rem;
  
  @media (min-width: 480px) {
    padding: 1.5rem;
  }
  
  @media (min-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const InfoTitle = styled.h3`
  color: ${theme.colors.primaryText};
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  
  @media (min-width: 480px) {
    margin: 0 0 0.75rem 0;
    font-size: 1.1rem;
  }
`;

const InfoText = styled.p`
  color: ${theme.colors.secondaryText};
  margin: 0;
  font-size: 0.85rem;
  line-height: 1.4;
  
  @media (min-width: 480px) {
    font-size: 0.9rem;
    line-height: 1.5;
  }
`;

const InfoList = styled.ul`
  color: ${theme.colors.secondaryText};
  margin: 0.5rem 0 0 0.75rem;
  font-size: 0.85rem;
  line-height: 1.3;
  
  @media (min-width: 480px) {
    margin: 0.5rem 0 0 1rem;
    font-size: 0.9rem;
    line-height: 1.4;
  }
`;

const LegalLinksSection = styled.div`
  text-align: center;
  margin: 1rem 0;
  padding: 0.75rem 0;
  border-top: 1px solid #374151;
  border-bottom: 1px solid #374151;
  
  @media (min-width: 768px) {
    margin: 1.5rem 0;
    padding: 1rem 0;
  }
`;

const LegalText = styled.p`
  color: #9ca3af;
  font-size: 0.8rem;
  margin: 0;
  line-height: 1.4;
  
  @media (min-width: 480px) {
    font-size: 0.85rem;
  }
`;

const LegalLink = styled(Link)`
  color: ${theme.colors.primaryText};
  text-decoration: none;
  margin: 0 0.5rem;
  transition: color 0.2s ease;
  font-weight: bold;
  font-size: 0.8rem;
  
  @media (min-width: 480px) {
    font-size: 0.85rem;
  }
  
  &:hover {
    color: ${theme.colors.buttonPrimary};
    text-decoration: underline;
  }
`;

// Footer med knappar
const Footer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  
  @media (min-width: 480px) {
    flex-direction: row;
    gap: 1rem;
    justify-content: space-between;
    align-items: center;
  }
`;

const Button = styled.button.withConfig({
  shouldForwardProp: (prop) => !["variant"].includes(prop),
})`
  padding: 0.75rem 1rem;
  border: none;
  font-weight: bold;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s;
  width: 100%;
  
  @media (min-width: 480px) {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    width: auto;
  }

  ${(props) =>
    props.variant === "primary" &&
    `
    background-color: ${theme.colors.buttonPrimary};
    color: ${theme.colors.primaryText};
    font-weight: bold;
    letter-spacing: 1px;
    transition: background-color 0.2s;

    &:hover {
      background-color: ${theme.colors.buttonPrimaryHover};
    }

    &:disabled {
      background-color: #6b7280;
      cursor: not-allowed;
    }
  `}

  ${(props) =>
    props.variant === "secondary" &&
    `
    background-color: ${theme.colors.buttonPrimary};
    color: white;

    &:hover {
      background-color: ${theme.colors.buttonPrimaryHover};
    }
  `}
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid ${theme.colors.primaryText};
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 1s ease-in-out infinite;
  margin-right: 8px;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

// Note: EmptyState components moved to shared/EmptyStateComponents.jsx

export const Cart = () => {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    getTotalPrice,
    getTotalItems,
    clearCart,
    basketId,
  } = useContext(CartContext);

  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [showClearCartPopup, setShowClearCartPopup] = useState(false);

  // KORRIGERAD handleCheckout funktion
  const handleCheckout = async () => {
    if (!basketId) {
      alert("No basket found. Please try refreshing the page.");
      return;
    }


    setCheckoutLoading(true);

    try {
      // CHANGED: Use getCheckoutUrl instead of createCheckout
      const data = await getCheckoutUrl(basketId);

      if (!data.checkoutUrl) {
        throw new Error("No checkout URL received from server");
      }

      window.location.href = data.checkoutUrl;
    } catch (error) {
      console.error("Checkout-fel:", error);
      alert(`An error occurred during checkout: ${error.message}`);
      setCheckoutLoading(false);
    }
  };

  const totalWithShipping = getTotalPrice();

  if (cartItems.length === 0) {
    return (
      <EmptyState
        title="Your cart is empty"
        titleSize="large"
        actions={<EmptyStateLink to="/merch">Continue shopping</EmptyStateLink>}
      />
    );
  }

  return (
    <Container $maxWidth="sm" $padding="md">
      <Header>
        <Title>Shopping Cart ({getTotalItems()} items)</Title>
      </Header>

      {/* Kundvagn med produkter */}
      <CartList>
        {cartItems.map((item) => (
          <CartItem
            key={`${item.sellableId}-${item.size}`}
            item={item}
            onUpdateQuantity={(qty) =>
              updateQuantity(item.sellableId, item.size, qty)
            }
            onRemove={() => removeFromCart(item.sellableId, item.size)}
          />
        ))}
      </CartList>

      {/* Ordersammanfattning */}
      <OrderSummarySection>
        <SummaryTitle>Order Summary</SummaryTitle>

        <SummaryItem>
          <SummaryLabel>Items ({getTotalItems()}):</SummaryLabel>
          <SummaryValue>{formatPrice(getTotalPrice())}</SummaryValue>
        </SummaryItem>

        <SummaryItem>
          <SummaryLabel>
            Shipping:
          </SummaryLabel>
          <SummaryValue>Calculated at checkout</SummaryValue>
        </SummaryItem>

        <SummaryItem>
          <SummaryLabel bold>Total (excl. shipping):</SummaryLabel>
          <SummaryValue bold>{formatPrice(totalWithShipping)}</SummaryValue>
        </SummaryItem>
      </OrderSummarySection>

      {/* Checkout information */}
      <CheckoutInfoSection>
        <InfoTitle>Secure Payment via Spreadshirt</InfoTitle>
        <InfoText>
          When you click "Proceed to Checkout" you will be redirected to
          Spreadshirt's secure payment page where you can:
        </InfoText>
        <InfoList>
          <li>Enter delivery address</li>
          <li>Choose payment method (card, PayPal etc.)</li>
          <li>See exact delivery time estimates (typically ~7 days)</li>
          <li>Review and complete your order</li>
          <li>Receive order confirmation via email</li>
        </InfoList>
        <InfoText style={{ marginTop: '1rem', fontSize: '0.85rem', fontStyle: 'italic' }}>
          <strong>Delivery:</strong> Spreadshirt typically delivers within 7 days. The exact estimated delivery date will be shown during checkout based on your location and chosen shipping method.
        </InfoText>
      </CheckoutInfoSection>

      {/* Legal links */}
      <LegalLinksSection>
        <LegalText>
          By proceeding to checkout, you agree to our
          <LegalLink to="/terms">Terms of Use</LegalLink>
          and
          <LegalLink to="/privacy">Privacy Policy</LegalLink>
        </LegalText>
      </LegalLinksSection>

      {/* Footer med knappar */}
      <Footer>
        <Button variant="secondary" onClick={() => setShowClearCartPopup(true)}>
          Clear Cart
        </Button>

        <Button
          variant="primary"
          onClick={handleCheckout}
          disabled={checkoutLoading}
        >
          {checkoutLoading && <LoadingSpinner />}
          {checkoutLoading ? "Preparing checkout..." : "Proceed to Checkout"}
        </Button>
      </Footer>
      
      <ClearCartPopup
        isOpen={showClearCartPopup}
        onClose={() => setShowClearCartPopup(false)}
        onConfirm={clearCart}
      />
      
      <ScrollToTop />
    </Container>
  );
};
