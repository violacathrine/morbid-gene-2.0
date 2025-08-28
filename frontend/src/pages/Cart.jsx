import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CartItem } from "../components/CartItem";
import { formatPrice } from "../utils/formatPrice";
import { CartContext } from "../contexts/CartContext";
import { getCheckoutUrl } from "../api/basketApi"; // ÄNDRAT: Importera den nya funktionen
import ScrollToTop from "../components/ScrollToTop";
import { ClearCartPopup } from "../components/ClearCartPopup";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
  
  @media (min-width: 480px) {
    padding: 1.5rem;
  }
  
  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const Header = styled.div`
  margin-bottom: 1rem;
  
  @media (min-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const Title = styled.h1`
  color: white;
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
  color: white;
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
  background: #1a1a1a;
  border: 1px solid #dc2626;
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
  color: #ffffff;
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
  color: #cccccc;
  margin: 0;
  font-size: 0.85rem;
  line-height: 1.4;
  
  @media (min-width: 480px) {
    font-size: 0.9rem;
    line-height: 1.5;
  }
`;

const InfoList = styled.ul`
  color: #cccccc;
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
  color: #ffffff;
  text-decoration: none;
  margin: 0 0.5rem;
  transition: color 0.2s ease;
  font-weight: bold;
  font-size: 0.8rem;
  
  @media (min-width: 480px) {
    font-size: 0.85rem;
  }
  
  &:hover {
    color: #dc2626;
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
    background-color: #dc2626;
    color: #ffffff;
    font-weight: bold;
    letter-spacing: 1px;
    transition: background-color 0.2s;

    &:hover {
      background-color: #b91c1c;
    }

    &:disabled {
      background-color: #6b7280;
      cursor: not-allowed;
    }
  `}

  ${(props) =>
    props.variant === "secondary" &&
    `
    background-color: #dc2626;
    color: white;

    &:hover {
      background-color: #b91c1c;
    }
  `}
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid #ffffff;
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

// Tom kundvagn
const EmptyCart = styled.div`
  text-align: center;
  padding: 2rem 1rem;
  
  @media (min-width: 768px) {
    padding: 3rem;
  }
`;

const EmptyTitle = styled.h1`
  color: white;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  
  @media (min-width: 480px) {
    font-size: 2rem;
  }
`;

const EmptyLink = styled(Link)`
  text-decoration: none;
  font-weight: bold;
  padding: 0.75rem 1.5rem;
  background-color: #dc2626;
  color: #ffffff;
  border: none;
  display: inline-block;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: background-color 0.2s;
  font-size: 0.9rem;
  
  @media (min-width: 480px) {
    font-size: 1rem;
  }

  &:hover {
    background-color: #b91c1c;
    text-decoration: none;
  }
`;

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
      // ÄNDRAT: Använd getCheckoutUrl istället för createCheckout
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
      <EmptyCart>
        <EmptyTitle>Your cart is empty</EmptyTitle>
        <EmptyLink to="/merch">Continue shopping</EmptyLink>
      </EmptyCart>
    );
  }

  return (
    <Container>
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
          <SummaryLabel>Subtotal ({getTotalItems()} items):</SummaryLabel>
          <SummaryValue>{formatPrice(getTotalPrice())}</SummaryValue>
        </SummaryItem>

        <SummaryItem>
          <SummaryLabel>
            Shipping: Final shipping calculated at checkout
          </SummaryLabel>
          <SummaryValue></SummaryValue>
        </SummaryItem>

        <SummaryItem>
          <SummaryLabel bold>Total:</SummaryLabel>
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
