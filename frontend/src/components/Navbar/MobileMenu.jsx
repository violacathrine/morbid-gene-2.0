import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { CartContext } from '../../contexts/CartProvider';
import { FaShoppingCart, FaHeart, FaSignOutAlt, FaTimes, FaUser } from 'react-icons/fa';
import {
  MobileMenuOverlay,
  BurgerToggle,
  Bar,
  MobileCloseButton,
  MobileNavLink,
  MobileAuthSection,
  MobileWelcomeText,
  MobileLogoutButton,
  MobileContactSection
} from './Navbar.styles';

/**
 * Mobile Menu Component
 * 
 * Shared mobile navigation that adapts content based on website/shopping mode.
 * Provides full-screen overlay with navigation links and user actions.
 */
export const MobileMenu = ({ isOpen, onClose, mode, isHomepage }) => {
  const { user, logout } = useAuth();
  const { getTotalItems } = useContext(CartContext);

  const handleLinkClick = () => {
    onClose();
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  // Website mode navigation links
  const websiteLinks = [
    { to: '/', label: 'Home' },
    { to: '/media', label: 'Media' },
    { to: '/gigs', label: 'Gigs' },
    { to: '/merch', label: 'Merch' },
    { to: '/contact', label: 'Contact' }
  ];

  // Shopping mode navigation links
  const shoppingLinks = [
    { to: '/', label: 'Home' },
    { to: '/merch', label: 'Merch' },
    { to: '/contact', label: 'Contact' }
  ];

  const navigationLinks = mode === 'shopping' ? shoppingLinks : websiteLinks;

  return (
    <MobileMenuOverlay $isOpen={isOpen}>
      {/* Close button */}
      <li>
        <MobileCloseButton 
          onClick={onClose}
          aria-label="Close mobile menu"
        >
          <FaTimes />
        </MobileCloseButton>
      </li>

      {/* Navigation links */}
      {navigationLinks.map((link) => (
        <li key={link.to}>
          <MobileNavLink 
            to={link.to} 
            onClick={handleLinkClick}
          >
            {link.icon && link.icon}
            {link.label}
          </MobileNavLink>
        </li>
      ))}

      {/* User-specific navigation - removed settings since it's now an icon */}

      {/* Auth section - only show on shopping pages */}
      {mode === 'shopping' && (
        <MobileAuthSection>
          {user ? (
            <MobileLogoutButton onClick={handleLogout}>
              <FaSignOutAlt />
              Logout
            </MobileLogoutButton>
          ) : (
            <MobileNavLink to="/login" onClick={handleLinkClick}>
              Login
            </MobileNavLink>
          )}
        </MobileAuthSection>
      )}
    </MobileMenuOverlay>
  );
};