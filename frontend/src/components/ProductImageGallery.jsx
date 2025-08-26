import { useState } from "react";
import styled from "styled-components";

const GalleryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MainImage = styled.img`
  width: 100%;
  max-width: 500px;
  height: auto;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  cursor: pointer;
`;

const ThumbnailContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding: 0.5rem 0;
`;

const Thumbnail = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
  border: 2px solid ${props => props.$isActive ? '#dc2626' : '#e2e8f0'};
  cursor: pointer;
  transition: border-color 0.2s ease;
  flex-shrink: 0;

  &:hover {
    border-color: #dc2626;
  }
`;

const LoadingPlaceholder = styled.div`
  width: 100%;
  max-width: 500px;
  height: 300px;
  background-color: #f3f4f6;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
`;

export const ProductImageGallery = ({ images, productName, fallbackImage }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!images || images.length === 0) {
    if (fallbackImage) {
      return <MainImage src={fallbackImage} alt={productName} />;
    }
    return <LoadingPlaceholder>Loading images...</LoadingPlaceholder>;
  }

  const currentImage = images[selectedImageIndex] || images[0];

  return (
    <GalleryContainer>
      <MainImage
        src={currentImage.url}
        alt={`${productName} - Image ${selectedImageIndex + 1}`}
        onClick={() => {
          // Optional: Could add lightbox functionality here
        }}
      />
      
      {images.length > 1 && (
        <ThumbnailContainer>
          {images.map((image, index) => (
            <Thumbnail
              key={index}
              src={image.url}
              alt={`${productName} thumbnail ${index + 1}`}
              $isActive={index === selectedImageIndex}
              onClick={() => setSelectedImageIndex(index)}
            />
          ))}
        </ThumbnailContainer>
      )}
    </GalleryContainer>
  );
};