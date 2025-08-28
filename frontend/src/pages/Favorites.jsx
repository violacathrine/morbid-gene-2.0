import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import MerchCard from '../components/MerchCard';
import ScrollToTop from '../components/ScrollToTop';

const Container = styled.div`
  padding: 1rem;
  max-width: 1280px;
  margin: 0 auto;
  min-height: 100vh;
  
  @media (min-width: 768px) {
    min-height: auto;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const Title = styled.h1`
  color: #ffffff;
  font-size: 1.8rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem 1rem;
  color: #cccccc;
`;

const EmptyTitle = styled.h2`
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 1rem;
`;

const EmptyText = styled.p`
  font-size: 1rem;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const ShopButton = styled(Link)`
  display: inline-block;
  background-color: #dc2626;
  color: #ffffff;
  padding: 0.75rem 1.5rem;
  text-decoration: none;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: background-color 0.2s;
  font-size: 0.9rem;
  
  @media (max-width: 768px) {
    padding: 1rem 2rem;
    font-size: 1rem;
  }
  
  &:hover {
    background-color: #b91c1c;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  
  @media (min-width: 768px) {
    gap: 1.5rem;
  }
`;

const HeartIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  
  &::before {
    content: "💔";
  }
`;

const LoginPrompt = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #cccccc;
`;

const LoginButton = styled(Link)`
  display: inline-block;
  background-color: #dc2626;
  color: #ffffff;
  padding: 1rem 2rem;
  text-decoration: none;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: background-color 0.2s;
  margin: 0 0.5rem;
  
  &:hover {
    background-color: #b91c1c;
  }
`;

export const Favorites = () => {
  const { isAuthenticated, favorites, user, loading } = useAuth();

  // Show loading state
  if (loading) {
    return (
      <Container>
        <Title>My Favorites</Title>
        <p style={{ color: '#9ca3af' }}>Loading...</p>
      </Container>
    );
  }

  // Show login prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <Container>
        <LoginPrompt>
          <HeartIcon />
          <EmptyTitle>Login Required</EmptyTitle>
          <EmptyText>
            You need to be logged in to view your favorite products.
          </EmptyText>
          <div>
            <LoginButton to="/login">Login</LoginButton>
          </div>
        </LoginPrompt>
        <ScrollToTop />
      </Container>
    );
  }

  return (
    <Container>
      {favorites.length > 0 && (
        <Header>
          <div>
            <Title>My Favorites</Title>
          </div>
        </Header>
      )}

      {favorites.length === 0 ? (
        <EmptyState>
          <HeartIcon />
          <EmptyTitle>No favorites yet</EmptyTitle>
          <EmptyText>
            Start browsing our merch and click the heart icon to add products to your favorites!
          </EmptyText>
          <ShopButton to="/merch">Browse Merch</ShopButton>
        </EmptyState>
      ) : (
        <Grid>
          {favorites.map((item) => (
            <MerchCard key={item.sellableId} item={item} />
          ))}
        </Grid>
      )}
      
      <ScrollToTop />
    </Container>
  );
};