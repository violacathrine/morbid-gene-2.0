import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CartItem } from "../components/CartItem";
import { formatPrice } from "../utils/formatPrice";
import { CartContext } from "../contexts/CartContext";
import { getCheckoutUrl } from "../api/basketApi"; // ÄNDRAT: Importera den nya funktionen

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: white;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const CartList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

// Ordersammanfattning sektion
const OrderSummarySection = styled.div`
  background: #1f2937;
  border: 1px solid #374151;
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
`;

const SummaryTitle = styled.h2`
  color: white;
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #374151;
  padding-bottom: 0.5rem;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  color: #e5e7eb;
  border-bottom: 1px solid #374151;

  &:last-child {
    border-bottom: none;
    padding-top: 1rem;
    margin-top: 0.5rem;
    font-weight: bold;
    font-size: 1.1rem;
    color: white;
  }
`;

const SummaryLabel = styled.span.withConfig({
  shouldForwardProp: (prop) => !["bold"].includes(prop),
})`
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
`;

const SummaryValue = styled.span`
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
`;

// Checkout info sektion
const CheckoutInfoSection = styled.div`
  background: #065f46;
  border: 1px solid #10b981;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const InfoTitle = styled.h3`
  color: #d1fae5;
  margin: 0 0 0.75rem 0;
  font-size: 1.1rem;
`;

const InfoText = styled.p`
  color: #a7f3d0;
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.5;
`;

const InfoList = styled.ul`
  color: #a7f3d0;
  margin: 0.5rem 0 0 1rem;
  font-size: 0.9rem;
  line-height: 1.4;
`;

// Footer med knappar
const Footer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const Button = styled.button.withConfig({
  shouldForwardProp: (prop) => !["variant"].includes(prop),
})`
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  border: none;
  font-weight: bold;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;

  ${(props) =>
    props.variant === "primary" &&
    `
    background-color: #10b981;
    color: white;
    padding: 1rem 2rem;
    font-size: 1.1rem;

    &:hover {
      background-color: #059669;
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
  padding: 3rem;
`;

const EmptyTitle = styled.h1`
  color: white;
  margin-bottom: 1rem;
`;

const EmptyLink = styled(Link)`
  color: #10b981;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
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

      console.log("Redirecting to checkout:", data.checkoutUrl);
      window.location.href = data.checkoutUrl;
    } catch (error) {
      console.error("Checkout-fel:", error);
      alert(`An error occurred during checkout: ${error.message}`);
      setCheckoutLoading(false);
    }
  };

  // Beräkna fraktkostnad (mockad)
  const getShippingCost = () => {
    const total = getTotalPrice();
    return total >= 500 ? 0 : 49; // Free shipping over 500 SEK
  };

  const shippingCost = getShippingCost();
  const totalWithShipping = getTotalPrice() + shippingCost;

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
            Shipping: {shippingCost === 0 ? "(Free over 500 SEK)" : ""}
          </SummaryLabel>
          <SummaryValue>
            {shippingCost === 0 ? "Free" : formatPrice(shippingCost)}
          </SummaryValue>
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
          <li>Choose payment method (card, PayPal, Klarna etc.)</li>
          <li>Review and complete your order</li>
          <li>Receive order confirmation via email</li>
        </InfoList>
      </CheckoutInfoSection>

      {/* Footer med knappar */}
      <Footer>
        <Button variant="secondary" onClick={clearCart}>
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
    </Container>
  );
};
