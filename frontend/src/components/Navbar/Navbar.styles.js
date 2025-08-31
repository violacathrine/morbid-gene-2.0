/**
 * NAVBAR STYLED COMPONENTS
 * 
 * All styling for the navigation system in one place.
 * Uses theme tokens for consistency across the application.
 * Preserves all original styling from MerchNavbar and Navbar components.
 */

import styled from "styled-components";
import { Link } from "react-router-dom";
import { theme } from "../../styles/theme";
import { FaUser } from "react-icons/fa";

/* ========================================
   WEBSITE MODE STYLES
   
   Original styling from Navbar.jsx
======================================== */

export const WebsiteNavWrapper = styled.nav`
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
  
  /* Homepage animation */
  transform: ${({ $isHomepage, $hasAnimated }) => 
    $isHomepage && !$hasAnimated ? 'translateX(100%)' : 'translateX(0)'};
  transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  @media (min-width: 768px) {
    justify-content: ${({ $hasPageTitle }) => $hasPageTitle ? 'space-between' : 'flex-end'};
    padding: 2rem 3rem;
    min-height: 96px;
  }
`;

export const PageTitle = styled.h1`
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
  }
`;

export const WebsiteNavSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (min-width: 768px) {
    gap: 2rem;
  }
`;

export const DesktopNav = styled.nav`
  display: none;

  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  a {
    color: white;
    text-decoration: none;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 1.1rem;
    letter-spacing: 1px;
    transition: color 0.2s;

    &:hover {
      color: #dc2626;
    }
  }
`;

export const BackToMediaButton = styled(Link)`
  background: none;
  border: none;
  color: white;
  padding: 0;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: #ccc;
  }

  &::before {
    content: "←";
    font-size: 1.2rem;
  }
`;

/* ========================================
   SHOPPING MODE STYLES
   
   Original styling from MerchNavbar.jsx
======================================== */

export const ShoppingNavWrapper = styled.nav`
  background: #000;
  padding: 1.5rem 1rem;
  position: static;
  z-index: 200;

  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto auto auto;
  align-items: center;
  gap: 1rem;
  
  @media (min-width: 768px) {
    padding: 1.5rem 2rem;
    padding-top: 0.5rem;
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-rows: auto auto auto;
    column-gap: 2rem;
    row-gap: 0.5rem;
  }
`;

// Logo section
export const LeftSection = styled.div`
  display: flex;
  justify-content: center;
  grid-column: 1 / -1;
  grid-row: 2;
  
  @media (min-width: 768px) {
    justify-content: flex-start;
    grid-column: 1;
    grid-row: 1;
    align-self: start;
  }
`;

export const LogoLink = styled(Link)`
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

export const LogoImg = styled.img`
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

// Shop title section  
export const CenterSection = styled.div`
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

export const ShopTitle = styled(Link)`
  color: white;
  font-size: 18px;
  font-weight: 800;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: inline-block;

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

export const ShopSubtitle = styled.div`
  font-size: 14px;
  opacity: 0.8;
  margin-top: 4px;

  @media (min-width: 480px) {
    font-size: 16px;
  }
`;

/* ========================================
   USER MENU STYLES
   
   Auth, cart, favorites etc.
======================================== */

export const AuthLink = styled(Link)`
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
    margin-right: -1rem;
  }
`;

export const AuthButton = styled.button`
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

export const DesktopLogoutButton = styled.button`
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

export const FavoritesLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  color: white;
  text-decoration: none;
  font-size: 18px;
  padding: 10px;
  margin: 0;
  transition: all 0.2s ease;
  position: relative;
  height: 38px;
  width: 38px;
  box-sizing: border-box;
  vertical-align: middle;
  border-radius: 50%;

  @media (min-width: 768px) {
    font-size: 20px;
    padding: 12px;
    height: 44px;
    width: 44px;
  }

  &:hover {
    background: rgba(220, 38, 38, 0.1);
    color: #dc2626;
  }
  
  @media (min-width: 768px) {
    &:hover::after {
      content: attr(aria-label);
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

export const CartLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  color: white;
  text-decoration: none;
  font-size: 18px;
  padding: 10px;
  margin: 0;
  transition: all 0.2s ease;
  position: relative;
  height: 38px;
  width: 38px;
  box-sizing: border-box;
  vertical-align: middle;
  border-radius: 50%;

  @media (min-width: 768px) {
    font-size: 20px;
    padding: 12px;
    height: 44px;
    width: 44px;
  }

  &:hover {
    background: rgba(220, 38, 38, 0.1);
    color: #dc2626;
  }
  
  @media (min-width: 768px) {
    &:hover::after {
      content: attr(aria-label);
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

export const CartBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #dc2626;
  color: white;
  border-radius: 50%;
  font-size: 11px;
  font-weight: bold;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;

  @media (min-width: 768px) {
    width: 20px;
    height: 20px;
    font-size: 12px;
    top: -6px;
    right: -6px;
  }
`;

export const FavoritesBadge = styled(CartBadge)``;

export const AccountLink = styled(Link)`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 10px;
  margin: 0;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.2s ease;
  line-height: 1;
  vertical-align: middle;
  font-size: 16px;
  height: 38px;
  width: 38px;
  box-sizing: border-box;
  
  &:hover {
    color: #dc2626;
    background: rgba(220, 38, 38, 0.1);
  }
  
  @media (min-width: 768px) {
    padding: 12px;
    font-size: 20px;
    height: 44px;
    width: 44px;
    position: relative;
    
    &:hover::after {
      content: attr(aria-label);
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

export const SettingsIcon = styled(FaUser)`
  font-size: 16px;
  margin: 0;
  padding: 0;
  
  @media (min-width: 768px) {
    font-size: 20px;
  }
`;

/* ========================================
   MOBILE MENU STYLES
   
   Shared mobile navigation
======================================== */

export const BurgerToggle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 38px;
  height: 38px;
  cursor: pointer;
  z-index: 1001;
  position: relative;
  border-radius: 50%;
  padding: 10px;
  
  &:hover {
    background: rgba(220, 38, 38, 0.1);
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

export const Bar = styled.div`
  width: 18px;
  height: 2px;
  background-color: white;
  border-radius: 5px;
  transition: 0.4s;

  &:nth-child(1) {
    transform: ${({ $isOpen }) =>
      $isOpen ? "rotate(45deg) translateY(6px)" : "none"};
  }
  &:nth-child(2) {
    opacity: ${({ $isOpen }) => ($isOpen ? 0 : 1)};
  }
  &:nth-child(3) {
    transform: ${({ $isOpen }) =>
      $isOpen ? "rotate(-45deg) translateY(-6px)" : "none"};
  }
`;

export const MobileMenuOverlay = styled.ul`
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

export const MobileCloseButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
`;

export const MobileNavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
  text-transform: uppercase;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    color: #dc2626;
  }
`;

export const MobileAuthSection = styled.li`
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #333;
`;

export const MobileWelcomeText = styled.div`
  color: white;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  text-align: center;
`;

export const MobileLogoutButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  text-transform: uppercase;
  font-weight: bold;
  cursor: pointer;
  
  &:hover {
    color: #dc2626;
  }
`;

export const MobileContactSection = styled.li`
  margin-top: 1rem;
`;

/* ========================================
   SHOPPING MODE SPECIFIC LAYOUTS
======================================== */

export const LeftIconSection = styled.div`
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

export const RightSection = styled.div`
  position: absolute;
  top: 14px;
  right: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.75rem;
  z-index: 1001;
  
  @media (min-width: 768px) {
    display: none;
  }
`;

export const WelcomeTopSection = styled.div`
  display: none;
  
  @media (min-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    grid-column: 2;
    grid-row: 1;
    padding-top: 0;
    margin-top: 0.5rem;
    align-self: start;
  }
`;

export const TopUserBar = styled.div`
  display: none;
  
  @media (min-width: 768px) {
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    grid-column: 3;
    grid-row: 1;
    padding-top: 0;
    margin-top: 0.5rem;
    gap: 1rem;
    align-self: start;
  }
`;

export const BottomRowContainer = styled.div`
  display: none;
  
  @media (min-width: 768px) {
    display: block;
    grid-column: 1 / -1;
    grid-row: 3;
    padding-top: 1rem;
  }
`;

// Desktop icons container for shopping navigation
export const DesktopIconsContainer = styled.div`
  display: none;
  
  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 1rem;
    grid-column: 3;
    grid-row: 1;
    align-self: start;
  }
`;

// Navigation section (breadcrumbs)
export const NavigationSection = styled.div`
  grid-column: 1 / -1;
  grid-row: 4;
  display: flex;
  justify-content: flex-start;
  margin-top: 1rem;
  position: relative;
  
  /* Full-width border that extends beyond container */
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100vw;
    height: 1px;
    background-color: #333;
    z-index: -1;
  }
  
  @media (min-width: 768px) {
    grid-column: 1 / -1;
    grid-row: 3;
    margin-top: 0.5rem;
  }
`;

export const WelcomeMessage = styled.div`
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

export const MobileWelcomeSection = styled.div`
  position: absolute;
  top: 14px;
  left: 15px;
  right: 200px; /* Leave space for icons on the right */
  display: flex;
  align-items: center;
  color: #ffffff;
  font-size: 11px;
  z-index: 1000; /* Lower than RightSection */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  @media (min-width: 768px) {
    display: none;
  }
`;

export const MobileBreadcrumbWrapper = styled.div`
  @media (min-width: 768px) {
    display: none;
  }
`;

/* ========================================
   DIALOG STYLES
   
   Logout confirmation etc.
======================================== */

export const ConfirmationOverlay = styled.div`
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

export const ConfirmationDialog = styled.div`
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

export const ConfirmationButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

export const ConfirmButton = styled.button`
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

export const CancelButton = styled.button`
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

/* ========================================
   WEBSITE MODE SPECIFIC
======================================== */

export const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const UserName = styled.span`
  color: #ffffff;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  padding: 8px 12px;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(220, 38, 38, 0.1);
    color: #dc2626;
  }
`;