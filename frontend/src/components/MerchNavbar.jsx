import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CartContext } from "../contexts/CartContext";
import { GiShoppingCart } from "react-icons/gi";
import logoUrl from "../assets/logo.svg";

// NAVBAR med grid
const MerchNavWrapper = styled.nav`
  background: #000;
  padding: 1.5rem 2rem;
  position: sticky;
  top: 0;
  z-index: 200;

  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center; /* default: mitten för alla */
`;

// Vänster: logga
const LeftSection = styled.div`
  justify-self: start;
  align-self: start; /* <-- viktigt (Grid) */
`;

const LogoLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  text-decoration: none;
`;

const LogoImg = styled.img`
  height: 100px; /* anpassa storlek */
  width: auto;
  display: block;
`;

// Mitten: Shop-titel
const CenterSection = styled.div`
  justify-self: center;
  align-self: center;
  text-align: center;
  color: #fff;
`;

const ShopTitle = styled(Link)`
  color: white;
  font-size: 22px;
  font-weight: 800;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  &:hover {
    color: #ccc;
  }
`;

const ShopSubtitle = styled.div`
  font-size: 16px;
  opacity: 0.8;
  margin-top: 2px;

  @media (max-width: 640px) {
    display: none;
  }
`;

// Höger: login + cart
const RightSection = styled.div`
  justify-self: end;
  align-self: start; /* uppe i cellen */
  display: flex;
  align-items: center; /* samma höjdlinje inom sektionen */
  gap: 1.25rem;
`;

const LoginButton = styled(Link)`
  display: flex; /* så texten beter sig som en rad */
  align-items: center;
  line-height: 1;
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 18px;
  text-transform: uppercase;

  &:hover {
    color: #ccc;
  }
`;

const CartIcon = styled(GiShoppingCart)`
  display: block; /* <-- viktiga fixen */
  font-size: 28px;
  flex-shrink: 0;
`;

const CartButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  line-height: 1;
  text-decoration: none;
  color: white;

  &:hover {
    color: #ccc;
  }
`;
const CartCount = styled.span`
  line-height: 1; /* samma som texten */
  font-size: 16px;
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const MerchNavbar = () => {
  const { getTotalItems } = useContext(CartContext);
  const totalItems = getTotalItems();

  return (
    <MerchNavWrapper>
      {/* Vänster: klickbar logga */}
      <LeftSection>
        <LogoLink to="/" aria-label="Gå till startsidan">
          <LogoImg src={logoUrl} alt="Morbid Gene logga" />
        </LogoLink>
      </LeftSection>

      {/* Mitten: Shop-titel */}
      <CenterSection>
        <ShopTitle to="/merch">MERCH</ShopTitle>
        <ShopSubtitle>The official Morbid Gene Shop</ShopSubtitle>
      </CenterSection>

      {/* Höger: login + varukorg */}
      <RightSection>
        <LoginButton to="/login">Login</LoginButton>
        <CartButton to="/cart" aria-label="Go to cart">
          <CartIcon aria-hidden="true" />
          {totalItems > 0 && <CartCount>({totalItems})</CartCount>}
        </CartButton>
        <MobileMenuButton aria-label="Open menu">☰</MobileMenuButton>
      </RightSection>
    </MerchNavWrapper>
  );
};
