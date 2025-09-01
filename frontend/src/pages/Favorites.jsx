import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import MerchCard from '../components/MerchCard';
import ScrollToTop from '../components/ScrollToTop';
import { Container } from '../components/shared/LayoutComponents';
import { Title } from '../components/shared/TypographyComponents';
import { Button } from '../components/shared/ButtonComponents';
import { EmptyState } from '../components/shared/EmptyStateComponents';
import { theme } from '../styles/theme';


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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  
  @media (min-width: 768px) {
    gap: 1.5rem;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

export const Favorites = () => {
  const { isAuthenticated, favorites, user, loading } = useAuth();

  // Show loading state
  if (loading) {
    return (
      <Container $maxWidth="lg" $minHeight="viewport">
        <Title $size="lg" $uppercase $spacing="wider">My Favorites</Title>
        <p style={{ color: '${theme.colors.mediumGray}' }}>Loading...</p>
      </Container>
    );
  }

  // Show login prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <Container $maxWidth="lg" $minHeight="viewport">
        <EmptyState
          icon="💔"
          iconSize="large"
          title="Login Required"
          message="You need to be logged in to view your favorite products."
          actions={
            <StyledLink to="/login">
              <Button $variant="primary" $uppercase>Login</Button>
            </StyledLink>
          }
        />
        <ScrollToTop />
      </Container>
    );
  }

  return (
    <Container $maxWidth="lg" $minHeight="viewport">
      {favorites.length > 0 && (
        <Header>
          <div>
            <Title $size="lg" $uppercase $spacing="wider">My Favorites</Title>
          </div>
        </Header>
      )}

      {favorites.length === 0 ? (
        <EmptyState
          icon="💔"
          iconSize="large"
          title="No favorites yet"
          message="Start browsing our merch and click the heart icon to add products to your favorites!"
          actions={
            <StyledLink to="/merch">
              <Button $variant="primary" $uppercase>Browse Merch</Button>
            </StyledLink>
          }
        />
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