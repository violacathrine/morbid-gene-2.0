import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { WebsiteNav } from './WebsiteNav';
import { ShoppingNav } from './ShoppingNav';
import { MobileMenu } from './MobileMenu';

/**
 * Main Navbar component that automatically switches between website and shopping modes
 * based on the current route. Consolidates all navigation logic into one component.
 */
export const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Determine navigation mode based on current path
  const getNavigationMode = (pathname) => {
    const shoppingPaths = ['/merch', '/product', '/cart', '/favorites', '/login', '/register', '/settings'];
    return shoppingPaths.some(path => pathname.startsWith(path)) ? 'shopping' : 'website';
  };

  const mode = getNavigationMode(location.pathname);
  const isHomepage = location.pathname === '/';

  // Handle animation state for homepage
  useEffect(() => {
    if (isHomepage && !hasAnimated) {
      const timer = setTimeout(() => setHasAnimated(true), 100);
      return () => clearTimeout(timer);
    }
  }, [isHomepage, hasAnimated]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Toggle mobile menu
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  // Render appropriate navigation based on mode
  if (mode === 'shopping') {
    return (
      <>
        <ShoppingNav 
          isMobileMenuOpen={isMobileMenuOpen}
          toggleMobileMenu={toggleMobileMenu}
        />
        <MobileMenu 
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          mode="shopping"
        />
      </>
    );
  }

  return (
    <>
      <WebsiteNav 
        isHomepage={isHomepage}
        hasAnimated={hasAnimated}
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
      />
      <MobileMenu 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        mode="website"
        isHomepage={isHomepage}
      />
    </>
  );
};

// Re-export for backwards compatibility if needed
export default Navbar;