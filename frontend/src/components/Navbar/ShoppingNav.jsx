import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { CartContext } from '../../contexts/CartProvider';
import { FaShoppingCart, FaHeart, FaSignOutAlt, FaBars, FaUser } from 'react-icons/fa';
import logoUrl from '../../assets/logo.svg';
import { Breadcrumbs } from '../Breadcrumbs';
import { IconLink, IconButton } from '../shared/IconLinkComponents';
import { 
  ConfirmationOverlay, 
  ConfirmationDialog, 
  ConfirmationButtons,
  ConfirmButton,
  CancelButton 
} from '../shared/DialogComponents';
import {
  ShoppingNavWrapper,
  LeftSection,
  LogoLink,
  LogoImg,
  CenterSection,
  ShopTitle,
  ShopSubtitle,
  RightSection,
  DesktopIconsContainer,
  NavigationSection,
  BurgerToggle,
  Bar,
  FavoritesLink,
  CartLink,
  CartBadge,
  FavoritesBadge,
  AccountLink,
  WelcomeTopSection,
  WelcomeMessage,
  MobileWelcomeSection
} from './Navbar.styles';

/**
 * Shopping Navigation Component
 * 
 * Handles navigation for e-commerce pages (merch, product, cart, etc.).
 * Features logo, cart counter, breadcrumbs, user accounts, and logout confirmation.
 */
export const ShoppingNav = ({ isMobileMenuOpen, toggleMobileMenu }) => {
  const { user, logout, favorites } = useAuth();
  const { cartItems, getTotalItems } = useContext(CartContext);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogoutClick = () => setShowLogoutConfirm(true);
  
  const handleLogoutConfirm = () => {
    logout();
    setShowLogoutConfirm(false);
  };
  
  const handleLogoutCancel = () => setShowLogoutConfirm(false);

  return (
    <ShoppingNavWrapper>
      {/* Mobile welcome message */}
      <MobileWelcomeSection>
        {user && <span>Welcome, {user.name || user.email}</span>}
      </MobileWelcomeSection>

      {/* Logo section */}
      <LeftSection>
        <LogoLink to="/">
          <LogoImg src={logoUrl} alt="Morbid Gene Logo" />
        </LogoLink>
      </LeftSection>

      {/* Welcome message (desktop only) */}
      <WelcomeTopSection>
        {user && (
          <WelcomeMessage>Welcome, {user.name || user.email}</WelcomeMessage>
        )}
      </WelcomeTopSection>

      {/* Shop title section */}
      <CenterSection>
        <ShopTitle to="/merch">The Official Morbid Gene Shop</ShopTitle>
        <ShopSubtitle>Powered by Spreadshirt</ShopSubtitle>
      </CenterSection>

      {/* Mobile icons and menu button (mobile only) */}
      <RightSection>
        {user && (
          <AccountLink to="/settings" aria-label="Account">
            <FaUser />
          </AccountLink>
        )}
        
        <FavoritesLink to="/favorites" aria-label="Favorites">
          <FaHeart />
          {favorites.length > 0 && (
            <FavoritesBadge>{favorites.length}</FavoritesBadge>
          )}
        </FavoritesLink>
        
        <CartLink to="/cart" aria-label="Shopping Cart">
          <FaShoppingCart />
          {cartItems.length > 0 && (
            <CartBadge>{getTotalItems()}</CartBadge>
          )}
        </CartLink>
        
        <BurgerToggle onClick={toggleMobileMenu} aria-label="Toggle mobile menu">
          <Bar $isOpen={isMobileMenuOpen} />
          <Bar $isOpen={isMobileMenuOpen} />
          <Bar $isOpen={isMobileMenuOpen} />
        </BurgerToggle>
      </RightSection>

      {/* Desktop icons (desktop only) */}
      <DesktopIconsContainer>
        {user && (
          <AccountLink to="/settings" aria-label="Account">
            <FaUser />
          </AccountLink>
        )}
        
        <FavoritesLink to="/favorites" aria-label="Favorites">
          <FaHeart />
          {favorites.length > 0 && (
            <FavoritesBadge>{favorites.length}</FavoritesBadge>
          )}
        </FavoritesLink>
        
        <CartLink to="/cart" aria-label="Shopping Cart">
          <FaShoppingCart />
          {cartItems.length > 0 && (
            <CartBadge>{getTotalItems()}</CartBadge>
          )}
        </CartLink>
        
        {user ? (
          <IconButton onClick={handleLogoutClick} title="Logout">
            <FaSignOutAlt />
          </IconButton>
        ) : (
          <IconLink to="/login" aria-label="Login">
            <FaUser />
          </IconLink>
        )}
      </DesktopIconsContainer>

      {/* Breadcrumbs section */}
      <NavigationSection>
        <Breadcrumbs />
      </NavigationSection>

      {/* Logout confirmation dialog */}
      {showLogoutConfirm && (
        <ConfirmationOverlay onClick={handleLogoutCancel}>
          <ConfirmationDialog onClick={(e) => e.stopPropagation()}>
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to log out?</p>
            <ConfirmationButtons>
              <CancelButton onClick={handleLogoutCancel}>Cancel</CancelButton>
              <ConfirmButton onClick={handleLogoutConfirm}>Logout</ConfirmButton>
            </ConfirmationButtons>
          </ConfirmationDialog>
        </ConfirmationOverlay>
      )}
    </ShoppingNavWrapper>
  );
};