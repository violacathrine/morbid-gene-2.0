// src/components/Navbar.jsx
import { useState, useEffect} from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext";

const NavbarWrapper = styled.nav`
  position: ${({ $isHomepage }) => $isHomepage ? 'absolute' : 'relative'};
  top: ${({ $isHomepage }) => $isHomepage ? '0' : 'auto'};
  left: ${({ $isHomepage }) => $isHomepage ? '0' : 'auto'};
  width: 100%;
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: ${({ $hasPageTitle }) => $hasPageTitle ? 'space-between' : 'flex-end'};
  align-items: center;
  z-index: 999;
  background: ${({ $isHomepage }) => $isHomepage ? 'transparent' : 'black'};
  box-sizing: border-box;
  min-height: 72px;
  
  /* Animation för homepage */
  transform: ${({ $isHomepage, $hasAnimated }) => 
    $isHomepage && !$hasAnimated ? 'translateX(100%)' : 'translateX(0)'};
  transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  @media (min-width: 768px) {
    justify-content: ${({ $hasPageTitle }) => $hasPageTitle ? 'space-between' : 'flex-end'};
    padding: 2rem 3rem;
    min-height: 96px;
  }
`;

const PageTitle = styled.h1`
  color: #ffffff;
  font-size: 1.2rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0;
  
  @media (min-width: 480px) {
    font-size: 1.4rem;
  }
  
  @media (min-width: 768px) {
    font-size: 1.6rem;
    letter-spacing: 1.5px;
  }
  
  @media (min-width: 1024px) {
    font-size: 1.8rem;
    letter-spacing: 2px;
  }
`;

const NavLinks = styled.ul`
  display: none;

  @media (min-width: 768px) {
    display: flex;
    gap: 2rem;
    list-style: none;

    li a {
      font-size: 22px;
      color: white;
      text-decoration: none;
      font-weight: bold;
      text-transform: uppercase;
    }
  }
`;
const TopRow = styled.div`
  background-color: black;
  position: absolute;
  top: -1rem;
  margin-bottom: 2rem;
  right: 0rem;
  display: flex;
  gap: 0.5rem;
  align-items: center;

  @media (max-width: 767px) {
    display: none; // Göms på mobil
  }

  a {
    color: ccc;
    text-decoration: none;
    font-size: 16px;
  }
`;

const CartIcon = styled(Link)`
  &::before {
    content: "🛒";
  }
`;

const BurgerToggle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 20px;
  cursor: pointer;
  position: fixed;
  top: 18px;
  right: 15px;
  z-index: 1001;

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

const AuthLinks = styled.div`
  display: none;
  
  @media (min-width: 768px) {
    display: flex;
    gap: 1rem;
    align-items: center;
    
    a, button {
      color: white;
      text-decoration: none;
      font-size: 14px;
      font-weight: bold;
      text-transform: uppercase;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      transition: all 0.2s ease;
      
      &:hover {
        background: rgba(220, 38, 38, 0.1);
        color: #dc2626;
      }
    }
  }
`;

const FavoritesLink = styled(Link)`
  position: relative;
  
  &::before {
    content: "♥";
    margin-right: 0.5rem;
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

// Auth section component
const AuthSection = () => {
  const { isAuthenticated, user, logout, favorites } = useAuth();

  if (isAuthenticated) {
    return (
      <AuthLinks>
        <FavoritesLink to="/favorites">
          Favorites ({favorites.length})
        </FavoritesLink>
        <span style={{ fontSize: '12px', opacity: 0.7 }}>
          Hello, {user?.name}
        </span>
        <button onClick={logout}>
          Logout
        </button>
      </AuthLinks>
    );
  }

  return (
    <AuthLinks>
      <Link to="/login">Login</Link>
    </AuthLinks>
  );
};

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const location = useLocation();

  const isHomepage = location.pathname === '/';

  // Function to get page title based on current route
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return null; // No title for homepage
      case '/contact':
        return 'Contact';
      case '/media':
        return 'Media';
      case '/merch':
        return 'Merch Store';
      case '/gigs':
        return 'Gigs';
      case '/cart':
        return 'Shopping Cart';
      default:
        // For dynamic routes like /product/:id
        if (location.pathname.startsWith('/product/')) {
          return 'Product Details';
        }
        if (location.pathname.startsWith('/gallery/')) {
          return 'Gallery';
        }
        return null;
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Animation logic för homepage - bara första gången
  useEffect(() => {
    if (isHomepage) {
      // Kolla om animation redan har visats
      const hasSeenAnimation = localStorage.getItem('navbar-animation-shown');
      
      if (!hasSeenAnimation) {
        // Reset animation state när vi kommer till homepage första gången
        setHasAnimated(false);
        
        // Starta animation efter en kort delay
        const timer = setTimeout(() => {
          setHasAnimated(true);
          // Markera att animation har visats
          localStorage.setItem('navbar-animation-shown', 'true');
        }, 100);
        
        return () => clearTimeout(timer);
      } else {
        // Om animation redan har visats, hoppa över den
        setHasAnimated(true);
      }
    } else {
      // På andra sidor, inget animation
      setHasAnimated(true);
    }
  }, [isHomepage]);


  const pageTitle = getPageTitle();

  return (
    <NavbarWrapper 
      $isHomepage={isHomepage} 
      $hasAnimated={hasAnimated}
      $hasPageTitle={!!pageTitle}
    >
      {/* Left side - Page title */}
      {pageTitle && <PageTitle>{pageTitle}</PageTitle>}
      
      {/* Right side - Desktop navigation */}
      <NavLinks>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <a href="/gigs">Gigs</a>
        </li>
        <li>
          <Link to="/media">Media</Link>
        </li>
        <li>
          <Link to="/merch">Merch</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </NavLinks>


      {/* Mobile hamburger button */}
      <BurgerToggle onClick={toggleMenu} $isOpen={isOpen}>
        <Bar $isOpen={isOpen} />
        <Bar $isOpen={isOpen} />
        <Bar $isOpen={isOpen} />
      </BurgerToggle>

      {/* Mobile menu */}
      <MobileMenu $isOpen={isOpen}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <a href="/gigs">Gigs</a>
        </li>
        <li>
          <Link to="/media">Media</Link>
        </li>
        <li>
          <Link to="/merch">Merch</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <button onClick={() => setIsOpen(false)}>✕ Close</button>
        </li>
      </MobileMenu>
    </NavbarWrapper>
  );
};
