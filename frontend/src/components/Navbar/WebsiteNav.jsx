import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FaBars } from 'react-icons/fa';
import {
  WebsiteNavWrapper,
  PageTitle,
  WebsiteNavSection,
  DesktopNav,
  BackToMediaButton,
  UserSection,
  UserName,
  AuthLink,
  AuthButton,
  BurgerToggle,
  Bar
} from './Navbar.styles';

/**
 * Website Navigation Component
 * 
 * Handles navigation for content pages (home, media, gigs, contact).
 * Features page titles, homepage animation, and basic auth functionality.
 */
export const WebsiteNav = ({ 
  isHomepage, 
  hasAnimated, 
  isMobileMenuOpen, 
  toggleMobileMenu 
}) => {
  const location = useLocation();
  const { user, logout } = useAuth();

  // Determine page title based on current route
  const getPageTitle = (pathname) => {
    const titleMap = {
      '/contact': 'Contact',
      '/media': 'Media',
      '/gigs': 'Gigs'
    };
    
    // Don't show title for media subpages
    if (pathname.startsWith('/media/')) return null;
    return titleMap[pathname] || null;
  };

  const pageTitle = getPageTitle(location.pathname);
  const isMediaSubpage = location.pathname.startsWith('/media/') && location.pathname !== '/media';

  return (
    <WebsiteNavWrapper 
      $isHomepage={isHomepage}
      $hasAnimated={hasAnimated}
      $hasPageTitle={!!pageTitle || isMediaSubpage}
    >
      {/* Page title section */}
      {pageTitle && <PageTitle>{pageTitle}</PageTitle>}
      
      {/* Back to media button for media subpages */}
      {isMediaSubpage && (
        <BackToMediaButton to="/media">
          Back to Media
        </BackToMediaButton>
      )}

      {/* Navigation section */}
      <WebsiteNavSection>
        {/* Mobile menu button */}
        <BurgerToggle onClick={toggleMobileMenu} aria-label="Toggle mobile menu">
          <Bar $isOpen={isMobileMenuOpen} />
          <Bar $isOpen={isMobileMenuOpen} />
          <Bar $isOpen={isMobileMenuOpen} />
        </BurgerToggle>

        {/* Desktop navigation */}
        <DesktopNav>
          <Link to="/">Home</Link>
          <Link to="/media">Media</Link>
          <Link to="/gigs">Gigs</Link>
          <Link to="/merch">Merch</Link>
          <Link to="/contact">Contact</Link>
        </DesktopNav>

        {/* User section - removed login/logout from website pages */}
      </WebsiteNavSection>
    </WebsiteNavWrapper>
  );
};