import React, { useContext } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { useProduct } from "../hooks/useProduct";
import { CartContext } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { GiShoppingCart } from "react-icons/gi";

const BreadcrumbContainer = styled.nav`
  background-color: #000;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #333;
  position: relative;
  z-index: 100;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
`;

const BreadcrumbList = styled.ol`
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 14px;
  justify-self: start;
`;

const BreadcrumbItem = styled.li`
  display: flex;
  align-items: center;

  &:not(:last-child)::after {
    content: "/";
    margin: 0 0.75rem;
    color: #666;
    font-size: 12px;
  }
`;

const BreadcrumbLink = styled(Link)`
  color: #999;
  text-decoration: none;
  font-size: 14px;
  margin: 0;
  padding: 0;

  &:hover {
    color: #ccc;
  }
`;

const BreadcrumbCurrent = styled.span`
  color: #ffffffff;
  font-size: 14px;
  margin: 0;
  padding: 0;
`;

const ActionsSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  justify-self: end;
  line-height: 1;
`;

const LoginLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 14px;
  text-transform: uppercase;
  padding: 0;
  margin: 0;
  border-radius: 4px;
  transition: all 0.2s ease;
  line-height: 1;

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
  font-size: 14px;
  text-transform: uppercase;
  padding: 0;
  margin: 0;
  border-radius: 4px;
  transition: all 0.2s ease;
  line-height: 1;

  &:hover {
    background: rgba(220, 38, 38, 0.1);
    color: #dc2626;
  }

  &::before {
    content: "♥";
    margin-right: 0.5rem;
    color: #dc2626;
  }
`;

const CartButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: white;
  text-decoration: none;
  padding: 0;
  margin: 0;
  border-radius: 4px;
  transition: all 0.2s ease;
  line-height: 1;

  &:hover {
    background: rgba(220, 38, 38, 0.1);
    color: #dc2626;
  }
`;

const CartIcon = styled(GiShoppingCart)`
  font-size: 20px;
  margin: 0;
  padding: 0;
  display: block;
  font-weight: bold;
`;

const CartCount = styled.span`
  font-size: 14px;
  line-height: 1;
  margin: 0;
  padding: 0;
  display: block;
`;

export const Breadcrumbs = () => {
  const location = useLocation();
  const { productId } = useParams();
  const { product, loading } = useProduct(productId);

  // Visa bara breadcrumbs på shopping-relaterade sidor
  const showBreadcrumbs =
    location.pathname === "/merch" ||
    location.pathname.startsWith("/product") ||
    location.pathname === "/cart";

  if (!showBreadcrumbs) return null;

  const renderBreadcrumbs = () => {
    const path = location.pathname;

    if (path === "/merch") {
      return (
        <>
          <BreadcrumbItem>
            <BreadcrumbLink to="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbCurrent>Merch</BreadcrumbCurrent>
          </BreadcrumbItem>
        </>
      );
    }

    if (path.startsWith("/product")) {
      return (
        <>
          <BreadcrumbItem>
            <BreadcrumbLink to="/">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink to="/merch">Merch</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbCurrent>
              {loading ? "Loading..." : product?.name || "Product"}
            </BreadcrumbCurrent>
          </BreadcrumbItem>
        </>
      );
    }

    if (path === "/cart") {
      return (
        <>
          <BreadcrumbItem>
            <BreadcrumbLink to="/">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink to="/merch">Merch</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbCurrent>Cart</BreadcrumbCurrent>
          </BreadcrumbItem>
        </>
      );
    }

    return null;
  };

  const { getTotalItems } = useContext(CartContext);
  const { isAuthenticated, favorites } = useAuth();
  const totalItems = getTotalItems();

  return (
    <BreadcrumbContainer>
      <BreadcrumbList>{renderBreadcrumbs()}</BreadcrumbList>
      <div></div>
      <ActionsSection>
        {isAuthenticated ? (
          <>
            <FavoritesLink to="/favorites">
              Favorites ({favorites.length})
            </FavoritesLink>
            <CartButton to="/cart" aria-label="Go to cart">
              <CartIcon aria-hidden="true" />
              {totalItems > 0 && <CartCount>({totalItems})</CartCount>}
            </CartButton>
          </>
        ) : (
          <>
            <LoginLink to="/login">Login</LoginLink>
            <CartButton to="/cart" aria-label="Go to cart">
              <CartIcon aria-hidden="true" />
              {totalItems > 0 && <CartCount>({totalItems})</CartCount>}
            </CartButton>
          </>
        )}
      </ActionsSection>
    </BreadcrumbContainer>
  );
};
