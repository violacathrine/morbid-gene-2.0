import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CartContext } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { GiShoppingCart } from "react-icons/gi";
import { IoSettingsOutline } from "react-icons/io5";
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
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const AuthLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 14px;
  text-transform: uppercase;
  padding: 10px 16px;
  border-radius: 4px;
  transition: all 0.2s ease;
  height: 44px;
  box-sizing: border-box;

  &:hover {
    background: rgba(220, 38, 38, 0.1);
    color: #dc2626;
  }
`;

const AuthButton = styled.button`
  display: inline-flex;
  align-items: baseline;
  justify-content: center;
  line-height: 1;
  color: white;
  background: none;
  border: none;
  font-weight: bold;
  font-size: 14px;
  text-transform: uppercase;
  padding: 10px 16px;
  margin: 0;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  height: 44px;
  box-sizing: border-box;
  vertical-align: baseline;

  &:hover {
    background: rgba(220, 38, 38, 0.1);
    color: #dc2626;
  }
`;

const FavoritesLink = styled(Link)`
  display: inline-flex;
  align-items: baseline;
  justify-content: center;
  line-height: 1;
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 14px;
  text-transform: uppercase;
  padding: 10px 16px;
  border-radius: 4px;
  transition: all 0.2s ease;
  height: 44px;
  box-sizing: border-box;

  &:hover {
    background: rgba(220, 38, 38, 0.1);
    color: #dc2626;
  }

  &::before {
    content: "♥";
    margin-right: 0.5rem;
    color: #dc2626;
    vertical-align: baseline;
  }
`;

const AuthenticatedSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
`;

const UserSection = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.75rem;
  height: 24px;
  line-height: 1;
  justify-self: center;
`;

const ActionsRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 1.25rem;
  height: 44px;
`;

const UserInfo = styled.span`
  font-size: 12px;
  color: #ccc;
  font-weight: normal;
  white-space: nowrap;
  line-height: 1;
  margin: 0;
  padding: 0;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const SettingsLink = styled(Link)`
  background: none;
  border: none;
  color: #ccc;
  cursor: pointer;
  padding: 0;
  margin: 0;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.2s ease;
  line-height: 1;
  vertical-align: baseline;
  
  &:hover {
    color: #dc2626;
    background: rgba(220, 38, 38, 0.1);
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const SettingsIcon = styled(IoSettingsOutline)`
  font-size: 12px;
  vertical-align: middle;
  margin: 0;
  padding: 0;
  display: block;
`;

const CartIcon = styled(GiShoppingCart)`
  display: block;
  font-size: 28px;
  flex-shrink: 0;
  vertical-align: baseline;
  margin: 0;
  padding: 0;
`;

const CartButton = styled(Link)`
  display: inline-flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.4rem;
  line-height: 1;
  text-decoration: none;
  color: white;
  padding: 10px 16px;
  border-radius: 4px;
  transition: all 0.2s ease;
  height: 44px;
  box-sizing: border-box;

  &:hover {
    background: rgba(220, 38, 38, 0.1);
    color: #dc2626;
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

const ConfirmationOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ConfirmationDialog = styled.div`
  background: #1a1a1a;
  border: 2px solid #333;
  border-radius: 8px;
  padding: 2rem;
  max-width: 400px;
  text-align: center;
  
  h3 {
    color: #fff;
    margin: 0 0 1rem 0;
    font-size: 1.2rem;
  }
  
  p {
    color: #ccc;
    margin: 0 0 1.5rem 0;
    font-size: 0.95rem;
  }
`;

const ConfirmationButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

const ConfirmButton = styled.button`
  background-color: #dc2626;
  color: #ffffff;
  border: none;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #b91c1c;
  }
`;

const CancelButton = styled.button`
  background-color: #333333;
  color: #ffffff;
  border: none;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #555555;
  }
`;


export const MerchNavbar = () => {
  const { getTotalItems } = useContext(CartContext);
  const { isAuthenticated, user, logout, favorites } = useAuth();
  const totalItems = getTotalItems();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleConfirmLogout = () => {
    logout();
    setShowLogoutConfirm(false);
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirm(false);
  };

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
        <ShopTitle to="/merch">THE OFFICIAL MORBID GENE SHOP</ShopTitle>
        <ShopSubtitle>Powered by Spreadshirt</ShopSubtitle>
      </CenterSection>

      {/* Höger: auth + varukorg */}
      <RightSection>
        {isAuthenticated ? (
          <AuthenticatedSection>
            <UserSection>
              <UserInfo>Hello, {user?.name}</UserInfo>
              <span style={{ color: 'white', fontSize: '12px' }}>|</span>
              <SettingsLink to="/settings" aria-label="Account settings">
                <SettingsIcon />
              </SettingsLink>
              <span style={{ color: 'white', fontSize: '12px' }}>|</span>
              <AuthButton onClick={handleLogoutClick} style={{ fontSize: '12px', padding: '2px 8px', height: 'auto', textTransform: 'none', fontWeight: 'normal' }}>
                Logout
              </AuthButton>
            </UserSection>
          </AuthenticatedSection>
        ) : (
          <div></div>
        )}
        <MobileMenuButton aria-label="Open menu">☰</MobileMenuButton>
      </RightSection>

      {/* Logout Confirmation Dialog */}
      {showLogoutConfirm && (
        <ConfirmationOverlay onClick={handleCancelLogout}>
          <ConfirmationDialog onClick={(e) => e.stopPropagation()}>
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to log out?</p>
            <ConfirmationButtons>
              <CancelButton onClick={handleCancelLogout}>
                Cancel
              </CancelButton>
              <ConfirmButton onClick={handleConfirmLogout}>
                Logout
              </ConfirmButton>
            </ConfirmationButtons>
          </ConfirmationDialog>
        </ConfirmationOverlay>
      )}
    </MerchNavWrapper>
  );
};
