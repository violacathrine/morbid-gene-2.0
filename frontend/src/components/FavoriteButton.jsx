import { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';

const HeartButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  position: relative;
  
  &:hover {
    background: rgba(0, 0, 0, 0.1);
    transform: scale(1.1);
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  /* Tooltip for non-logged in users */
  ${props => !props.$isAuthenticated && props.$showTooltip ? `
    &:hover::after {
      content: "Login to add favorites";
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
  ` : ''}
`;

const HeartIcon = styled.svg`
  width: 20px;
  height: 20px;
  transition: all 0.2s ease;
  
  path {
    fill: ${props => props.$isFavorite ? '#dc2626' : 'transparent'};
    stroke: ${props => props.$isFavorite ? '#dc2626' : '#666'};
    stroke-width: 2;
    transition: all 0.2s ease;
  }
  
  ${HeartButton}:hover & path {
    stroke: #dc2626;
  }
`;

const FavoriteButton = ({ product, size = 20, showTooltip = false }) => {
  const { isAuthenticated, isFavorite, addToFavorites, removeFromFavorites } = useAuth();
  const [loading, setLoading] = useState(false);
  
  const productIsFavorite = isFavorite(product.sellableId);

  const handleClick = async (e) => {
    e.preventDefault(); // Prevent navigation if button is inside a Link
    e.stopPropagation(); // Prevent event bubbling
    
    if (!isAuthenticated) {
      return;
    }

    setLoading(true);
    
    try {
      if (productIsFavorite) {
        await removeFromFavorites(product.sellableId);
      } else {
        await addToFavorites(product);
      }
    } catch (error) {
      console.error('Favorite toggle error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <HeartButton 
      onClick={handleClick}
      disabled={loading}
      $isAuthenticated={isAuthenticated}
      $showTooltip={showTooltip}
      aria-label={
        productIsFavorite 
          ? "Remove from favorites" 
          : "Add to favorites"
      }
      title={
        isAuthenticated 
          ? (productIsFavorite 
            ? "Remove from favorites" 
            : "Add to favorites")
          : "Login to add favorites"
      }
      style={{ position: 'relative' }}
    >
      <HeartIcon 
        $isFavorite={productIsFavorite}
        width={size} 
        height={size} 
        viewBox="0 0 24 24"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </HeartIcon>
    </HeartButton>
  );
};

export default FavoriteButton;