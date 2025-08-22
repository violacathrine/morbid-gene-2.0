import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { useProduct } from "../hooks/useProduct";

const BreadcrumbContainer = styled.nav`
  background-color: #000;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #333;
  position: relative;
  z-index: 100;
  display: flex;
  align-items: center;
`;

const BreadcrumbList = styled.ol`
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  margin: 0 auto;
  font-size: 14px;
  width: 100%;
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

  return (
    <BreadcrumbContainer>
      <BreadcrumbList>{renderBreadcrumbs()}</BreadcrumbList>
    </BreadcrumbContainer>
  );
};
