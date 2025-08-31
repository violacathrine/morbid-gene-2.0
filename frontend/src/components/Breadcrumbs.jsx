import { Link, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { useProduct } from "../hooks/useProduct";

const BreadcrumbContainer = styled.nav`
  padding: 0.75rem 1rem;
  position: relative;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 0; /* No extra margin needed */
  
  @media (min-width: 480px) {
    padding: 1rem 1.5rem;
  }
  
  @media (min-width: 768px) {
    padding: 1.25rem 2rem;
  }
`;

const BreadcrumbList = styled.ol`
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 0.75rem;
  justify-self: start;
  
  @media (min-width: 480px) {
    font-size: 0.875rem;
  }
`;

const BreadcrumbItem = styled.li`
  display: flex;
  align-items: center;

  &:not(:last-child)::after {
    content: "/";
    margin: 0 0.5rem;
    color: #cccccc;
    font-size: 0.75rem;
    
    @media (min-width: 480px) {
      margin: 0 0.75rem;
      font-size: 0.8rem;
    }
  }
`;

const BreadcrumbLink = styled(Link)`
  color: #cccccc;
  text-decoration: none;
  font-size: 14px;
  margin: 0;
  padding: 0;

  &:hover {
    color: #ffffff;
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

  // Show breadcrumbs only on shopping-related pages
  const showBreadcrumbs =
    location.pathname === "/merch" ||
    location.pathname.startsWith("/product") ||
    location.pathname === "/cart" ||
    location.pathname === "/favorites" ||
    location.pathname === "/settings" ||
    location.pathname === "/login";

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

    if (path === "/settings") {
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
            <BreadcrumbCurrent>Settings</BreadcrumbCurrent>
          </BreadcrumbItem>
        </>
      );
    }

    if (path === "/favorites") {
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
            <BreadcrumbCurrent>Favorites</BreadcrumbCurrent>
          </BreadcrumbItem>
        </>
      );
    }

    if (path === "/login") {
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
            <BreadcrumbCurrent>Login</BreadcrumbCurrent>
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
