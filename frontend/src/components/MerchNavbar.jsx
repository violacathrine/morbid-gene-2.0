import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CartContext } from "../contexts/CartContext";

const MerchNavWrapper = styled.nav`
  background-color: #000;
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 200;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
`;

const Logo = styled(Link)`
  color: white;
  font-size: 22px;
  font-weight: bold;
  text-decoration: none;
  text-transform: uppercase;

  &:hover {
    color: #ccc;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 22px;
  text-transform: uppercase;

  &:hover {
    color: #ccc;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const CartButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 22px;
  text-transform: uppercase;

  &:hover {
    color: #ccc;
  }
`;

const CartCount = styled.span`
  color: white;
  font-size: 18px;
`;

const LoginButton = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 22px;
  text-transform: uppercase;

  &:hover {
    color: #ccc;
  }
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
      <LeftSection>
        <Logo to="/">Morbid Gene</Logo>

        <NavLinks>
          <NavLink to="/merch">Shop</NavLink>
        </NavLinks>
      </LeftSection>

      <RightSection>
        <CartButton to="/cart">
          Cart {totalItems > 0 && <CartCount>({totalItems})</CartCount>}
        </CartButton>

        <LoginButton to="/login">Login</LoginButton>

        <MobileMenuButton>☰</MobileMenuButton>
      </RightSection>
    </MerchNavWrapper>
  );
};
