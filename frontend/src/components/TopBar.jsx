import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CartContext } from "../contexts/CartProvider";
import { useAuth } from "../contexts/AuthContext";
import { GiShoppingCart } from "react-icons/gi";

const TopBarContainer = styled.div`
  background-color: #000;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #333;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (min-width: 480px) {
    padding: 0.75rem 1.5rem;
  }
`;

const ActionsSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  @media (min-width: 480px) {
    gap: 1rem;
  }
`;

const LoginLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 0.75rem;
  text-transform: uppercase;
  padding: 0.25rem 0.5rem;
  transition: all 0.2s ease;
  line-height: 1;
  
  @media (min-width: 480px) {
    font-size: 0.875rem;
    padding: 0.5rem;
  }

  &:hover {
    background: rgba(220, 38, 38, 0.1);
    color: #dc2626;
  }
`;

const FavoritesLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 0.75rem;
  text-transform: uppercase;
  padding: 0.25rem 0.5rem;
  transition: all 0.2s ease;
  line-height: 1;
  
  @media (min-width: 480px) {
    font-size: 0.875rem;
    padding: 0.5rem;
  }

  &:hover {
    background: rgba(220, 38, 38, 0.1);
    color: #dc2626;
  }

  &::before {
    content: "♥";
    margin-right: 0.25rem;
    color: #dc2626;
    
    @media (min-width: 480px) {
      margin-right: 0.5rem;
    }
  }
`;

const CartButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  color: white;
  text-decoration: none;
  padding: 0.25rem 0.5rem;
  transition: all 0.2s ease;
  line-height: 1;
  
  @media (min-width: 480px) {
    gap: 0.4rem;
    padding: 0.5rem;
  }

  &:hover {
    background: rgba(220, 38, 38, 0.1);
    color: #dc2626;
  }
`;

const CartIcon = styled(GiShoppingCart)`
  font-size: 16px;
  margin: 0;
  padding: 0;
  display: block;
  font-weight: bold;
  
  @media (min-width: 480px) {
    font-size: 18px;
  }
`;

const CartCount = styled.span`
  font-size: 0.75rem;
  line-height: 1;
  margin: 0;
  padding: 0;
  display: block;
  font-weight: bold;
  
  @media (min-width: 480px) {
    font-size: 0.875rem;
  }
`;

const MobileMenuButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  transition: all 0.2s ease;
  
  @media (min-width: 768px) {
    display: none;
  }

  &:hover {
    background: rgba(220, 38, 38, 0.1);
    color: #dc2626;
  }
`;

export const TopBar = () => {
  const { getTotalItems } = useContext(CartContext);
  const { isAuthenticated } = useAuth();

  return (
    <TopBarContainer>
      <MobileMenuButton aria-label="Open menu">☰</MobileMenuButton>
      
      <ActionsSection>
        {isAuthenticated ? (
          <FavoritesLink to="/favorites">Favorites</FavoritesLink>
        ) : (
          <LoginLink to="/login">Login</LoginLink>
        )}
        
        <CartButton to="/cart">
          <CartIcon />
          <CartCount>{getTotalItems()}</CartCount>
        </CartButton>
      </ActionsSection>
    </TopBarContainer>
  );
};