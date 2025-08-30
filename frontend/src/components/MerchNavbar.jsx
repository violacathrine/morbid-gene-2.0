import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CartContext } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { FaShoppingCart, FaHeart, FaUser, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import logoUrl from "../assets/logo.svg";
import { Breadcrumbs } from "./Breadcrumbs";

// NAVBAR med grid
const MerchNavWrapper = styled.nav`
  background: #000;
  padding: 1.5rem 1rem;
  position: static; /* Changed from sticky to prevent overlap */
  z-index: 200;

  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto auto;
  align-items: center;
  gap: 1rem;
  
  @media (min-width: 768px) {
    padding: 1.5rem 2rem;
    padding-top: 0.5rem;
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-rows: auto auto auto;  /* welcome-rad, logo-rad, breadcrumb-rad */
    column-gap: 2rem;
    row-gap: 0.5rem;
  }
`;

// Logo section
const LeftSection = styled.div`
  display: flex;
  justify-content: center;
  grid-column: 1 / -1;
  grid-row: 2;
  
  @media (min-width: 768px) {
    justify-content: flex-start;
    grid-column: 1;
    grid-row: 1;
    align-self: start;  /* Högst upp i grid-cellen */
  }
`;

const LogoLink = styled(Link)`
  display: inline-flex;
  align-items: flex-start;
  text-decoration: none;
  position: relative;
  
  @media (min-width: 768px) {
    &:hover::after {
      content: "Home";
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      margin-top: 5px;
      background: #333;
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      white-space: nowrap;
      z-index: 1000;
    }
  }
`;

const LogoImg = styled.img`
  height: 120px;
  width: auto;
  display: block;
  margin-top: 2rem;
  
  @media (min-width: 768px) {
    height: 90px;
    margin-top: 0;
  }
  
  @media (min-width: 1024px) {
    height: 100px;
  }
`;

// Shop-titel section  
const CenterSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #fff;
  grid-row: 3;
  grid-column: 1 / -1;
  
  @media (min-width: 768px) {
    grid-row: 2;
    grid-column: 2;
    justify-content: flex-start;
    margin-top: -0.5rem;
  }
`;

const ShopTitle = styled(Link)`
  color: white;
  font-size: 18px;
  font-weight: 800;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  @media (min-width: 480px) {
    font-size: 20px;
  }
  
  @media (min-width: 768px) {
    font-size: 22px;
  }
  
  @media (min-width: 1024px) {
    font-size: 24px;
  }

  &:hover {
    color: #ccc;
  }
`;

const ShopSubtitle = styled.div`
  font-size: 14px;
  opacity: 0.8;
  margin-top: 4px;

  @media (min-width: 480px) {
    font-size: 16px;
  }
`;

// Vänster: cart, favorites, settings (bara mobil)
const LeftIconSection = styled.div`
  position: absolute;
  top: 14px;
  left: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.75rem;
  z-index: 1001;
  
  @media (min-width: 768px) {
    display: none;
  }
`;

// Höger: hamburger (bara mobil)
const RightSection = styled.div`
  position: absolute;
  top: 14px;
  right: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  z-index: 1001;
  
  @media (min-width: 768px) {
    display: none;
  }
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
  margin: 0;
  vertical-align: middle;

  &:hover {
    background: rgba(220, 38, 38, 0.1);
    color: #dc2626;
  }
  
  @media (min-width: 768px) {
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 25px;
    min-width: 80px;
    margin-right: -1rem; /* Putta till höger */
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

const DesktopLogoutButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: white;
  background: none;
  border: none;
  font-size: 20px;
  padding: 12px;
  margin: 0;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  height: 44px;
  width: 44px;
  box-sizing: border-box;
  vertical-align: middle;
  
  &:hover {
    background: rgba(220, 38, 38, 0.1);
    color: #dc2626;
  }
  
  &:hover::after {
    content: "Logout";
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 5px;
    background: #333;
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
    z-index: 1000;
  }
`;

const FavoritesLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  color: white;
  text-decoration: none;
  font-size: 18px;
  padding: 0;
  margin: 0;
  transition: all 0.2s ease;
  position: relative;
  height: 24px;
  width: 24px;
  box-sizing: border-box;
  vertical-align: middle;

  @media (min-width: 768px) {
    font-size: 20px;
    padding: 12px;
    height: 44px;
    width: 44px;
    border-radius: 50%;
  }

  &:hover {
    background: rgba(220, 38, 38, 0.1);
    color: #dc2626;
  }
  
  @media (min-width: 768px) {
    &:hover::after {
      content: "Favorites";
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      margin-top: 5px;
      background: #333;
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      white-space: nowrap;
      z-index: 1000;
    }
  }
`;

const CartSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  @media (max-width: 767px) {
    align-items: flex-end;
  }
`;

const CartLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  color: white;
  text-decoration: none;
  font-size: 18px;
  padding: 0;
  margin: 0;
  transition: all 0.2s ease;
  position: relative;
  height: 24px;
  width: 24px;
  box-sizing: border-box;
  vertical-align: middle;

  @media (min-width: 768px) {
    font-size: 20px;
    padding: 12px;
    height: 44px;
    width: 44px;
    border-radius: 50%;
  }

  &:hover {
    background: rgba(220, 38, 38, 0.1);
    color: #dc2626;
  }
  
  @media (min-width: 768px) {
    &:hover::after {
      content: "Cart";
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      margin-top: 5px;
      background: #333;
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      white-space: nowrap;
      z-index: 1000;
    }
  }
`;

const CartBadge = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #dc2626;
  color: white;
  border-radius: 50%;
  padding: 2px 4px;
  font-size: 10px;
  font-weight: bold;
  min-width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;

  @media (min-width: 768px) {
    top: -5px;
    right: -5px;
    padding: 2px 6px;
    font-size: 12px;
    min-width: 18px;
    height: 18px;
  }
`;

const FavoritesBadge = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #dc2626;
  color: white;
  border-radius: 50%;
  padding: 2px 4px;
  font-size: 10px;
  font-weight: bold;
  min-width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;

  @media (min-width: 768px) {
    top: -5px;
    right: -5px;
    padding: 2px 6px;
    font-size: 12px;
    min-width: 18px;
    height: 18px;
  }
`;

const AuthenticatedSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
  position: relative;
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

const UserName = styled.span`
  color: #ffffff;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(220, 38, 38, 0.1);
    color: #dc2626;
  }
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
  color: white;
  cursor: pointer;
  padding: 8px;
  margin: 0;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.2s ease;
  line-height: 1;
  vertical-align: baseline;
  font-size: 16px;
  gap: 0.25rem;
  
  &:hover {
    color: #dc2626;
    background: rgba(220, 38, 38, 0.1);
  }
  
  @media (min-width: 768px) {
    padding: 12px;
    font-size: 20px;
    border-radius: 50%;
    height: 44px;
    width: 44px;
    position: relative;
    vertical-align: middle;
    box-sizing: border-box;
    
    &:hover::after {
      content: "Settings";
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      margin-top: 5px;
      background: #333;
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      white-space: nowrap;
      z-index: 1000;
    }
  }
`;

const SettingsIcon = styled(FaUser)`
  font-size: 16px;
  margin: 0;
  padding: 0;
  
  @media (min-width: 768px) {
    font-size: 20px;
  }
`;


const WelcomeTopSection = styled.div`
  display: none;
  
  @media (min-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    grid-column: 2;  /* Mitten kolumnen */
    grid-row: 1;
    padding-top: 0;
    margin-top: 0.5rem;
    align-self: start;
  }
`;

const TopUserBar = styled.div`
  display: none;
  
  @media (min-width: 768px) {
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    grid-column: 3;  /* Bara högra kolumnen */
    grid-row: 1;
    padding-top: 0;
    margin-top: 0.5rem;
    gap: 1rem;
    align-self: start;
  }
`;

const UserIconsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const BottomRowContainer = styled.div`
  display: none;
  
  @media (min-width: 768px) {
    display: block;
    grid-column: 1 / -1;
    grid-row: 3;
    padding-top: 1rem;
  }
`;


const WelcomeMessage = styled.div`
  color: #ffffff;
  font-size: 12px;
  text-align: center;
  margin: 0;
  padding: 0;
  margin-bottom: 0.25rem;
  
  @media (min-width: 768px) {
    text-align: left;
    margin-bottom: 0;
    white-space: nowrap;
    flex-shrink: 0;
  }
`;

const MobileWelcomeMessage = styled(WelcomeMessage)`
  @media (min-width: 768px) {
    display: none;
  }
`;

const MobileBreadcrumbWrapper = styled.div`
  @media (min-width: 768px) {
    display: none;
  }
`;

const BurgerToggle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 20px;
  cursor: pointer;
  z-index: 1001;
  position: relative;
  margin-top: 2px;

  @media (min-width: 768px) {
    display: none;
  }
`;

const Bar = styled.div`
  width: 100%;
  height: 2px;
  background-color: white;
  border-radius: 5px;
  transition: 0.4s;

  &:nth-child(1) {
    transform: ${({ $isOpen }) =>
      $isOpen ? "rotate(45deg) translateY(9px)" : "none"};
  }
  &:nth-child(2) {
    opacity: ${({ $isOpen }) => ($isOpen ? 0 : 1)};
  }
  &:nth-child(3) {
    transform: ${({ $isOpen }) =>
      $isOpen ? "rotate(-45deg) translateY(-9px)" : "none"};
  }
`;

const MobileMenu = styled.ul`
  position: fixed;
  top: ${({ $isOpen }) => ($isOpen ? "0" : "-100vh")};
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.95);
  list-style: none;
  padding: 5rem 2rem 2rem;
  margin: 0;
  transition: top 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1002;
  transform: none !important;
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};

  li {
    margin-bottom: 1.5rem;

    a, button {
      color: white;
      text-decoration: none;
      font-size: 1.2rem;
      text-transform: uppercase;
      font-weight: bold;
      background: none;
      border: none;
      cursor: pointer;
      
      &:hover {
        color: #dc2626;
      }
    }
  }

  @media (min-width: 768px) {
    display: none !important;
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
  const [showMobileMenu, setShowMobileMenu] = useState(false);

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

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const closeMobileMenu = () => {
    setShowMobileMenu(false);
  };

  const handleMobileLogout = () => {
    logout();
    closeMobileMenu();
  };

  return (
    <>
      <MerchNavWrapper>
      {/* Vänster: klickbar logga */}
      <LeftSection>
        <LogoLink to="/" aria-label="Gå till startsidan">
          <LogoImg src={logoUrl} alt="Morbid Gene logga" />
        </LogoLink>
      </LeftSection>

      {/* Mitten: Shop-titel (nu perfekt centrerad) */}
      <CenterSection>
        <ShopTitle to="/merch">THE OFFICIAL MORBID GENE SHOP</ShopTitle>
        <ShopSubtitle>Powered by Spreadshirt</ShopSubtitle>
      </CenterSection>

      {/* Desktop Layout - Rad 1: Welcome text centrerat */}
      {isAuthenticated && (
        <WelcomeTopSection>
          <WelcomeMessage>Welcome, {user?.name || 'User'}!</WelcomeMessage>
        </WelcomeTopSection>
      )}

      {/* Desktop Layout - Rad 1: User actions till höger */}
      <TopUserBar>
        {isAuthenticated ? (
          <>
            <FavoritesLink to="/favorites" aria-label={`Favoriter med ${favorites?.length || 0} ${favorites?.length === 1 ? 'vara' : 'varor'}`}>
              <FaHeart />
              {favorites?.length > 0 && <FavoritesBadge>{favorites.length}</FavoritesBadge>}
            </FavoritesLink>
            <CartLink to="/cart" aria-label={`Varukorg med ${totalItems} ${totalItems === 1 ? 'vara' : 'varor'}`}>
              <FaShoppingCart />
              {totalItems > 0 && <CartBadge>{totalItems}</CartBadge>}
            </CartLink>
            <SettingsLink to="/settings" aria-label="Settings">
              <SettingsIcon />
            </SettingsLink>
            <DesktopLogoutButton onClick={() => setShowLogoutConfirm(true)} aria-label="Logout">
              <FaSignOutAlt />
            </DesktopLogoutButton>
          </>
        ) : (
          <>
            <CartLink to="/cart" aria-label={`Varukorg med ${totalItems} ${totalItems === 1 ? 'vara' : 'varor'}`}>
              <FaShoppingCart />
              {totalItems > 0 && <CartBadge>{totalItems}</CartBadge>}
            </CartLink>
            <AuthLink to="/login">Login</AuthLink>
          </>
        )}
      </TopUserBar>

      {/* Desktop Layout - Rad 3: Endast Breadcrumbs */}
      <BottomRowContainer>
        <Breadcrumbs />
      </BottomRowContainer>

      {/* Mobile Layout - Left icons */}
      <LeftIconSection>
        {isAuthenticated && (
          <>
            <SettingsLink to="/settings" aria-label="Settings">
              <SettingsIcon />
            </SettingsLink>
            <FavoritesLink to="/favorites" aria-label={`Favoriter med ${favorites?.length || 0} ${favorites?.length === 1 ? 'vara' : 'varor'}`}>
              <FaHeart />
              {favorites?.length > 0 && <FavoritesBadge>{favorites.length}</FavoritesBadge>}
            </FavoritesLink>
          </>
        )}
        <CartLink to="/cart" aria-label={`Varukorg med ${totalItems} ${totalItems === 1 ? 'vara' : 'varor'}`}>
          <FaShoppingCart />
          {totalItems > 0 && <CartBadge>{totalItems}</CartBadge>}
        </CartLink>
        {isAuthenticated && (
          <DesktopLogoutButton onClick={() => setShowLogoutConfirm(true)} aria-label="Logout">
            <FaSignOutAlt />
          </DesktopLogoutButton>
        )}
      </LeftIconSection>

      {/* Mobile Layout - Right hamburger */}
      <RightSection>
        <BurgerToggle onClick={toggleMobileMenu} $isOpen={showMobileMenu}>
          <Bar $isOpen={showMobileMenu} />
          <Bar $isOpen={showMobileMenu} />
          <Bar $isOpen={showMobileMenu} />
        </BurgerToggle>
      </RightSection>

      {/* Mobile menu */}
      <MobileMenu $isOpen={showMobileMenu}>
        <li>
          <Link to="/" onClick={closeMobileMenu}>Home</Link>
        </li>
        <li>
          <a href="/gigs" onClick={closeMobileMenu}>Gigs</a>
        </li>
        <li>
          <Link to="/media" onClick={closeMobileMenu}>Media</Link>
        </li>
        <li>
          <Link to="/merch" onClick={closeMobileMenu}>Shop</Link>
        </li>
        <li>
          <Link to="/contact" onClick={closeMobileMenu}>Contact</Link>
        </li>
        {!isAuthenticated && (
          <li>
            <Link to="/login" onClick={closeMobileMenu}>Login</Link>
          </li>
        )}
        <li>
          <button onClick={closeMobileMenu}>✕ Close</button>
        </li>
      </MobileMenu>

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
      
      {/* Mobile Breadcrumbs - visas bara på mobil som separat komponent */}
      <MobileBreadcrumbWrapper>
        <Breadcrumbs />
      </MobileBreadcrumbWrapper>
    </>
  );
};
