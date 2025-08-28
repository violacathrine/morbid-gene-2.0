import { useState } from "react";
import styled from "styled-components";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const GalleryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0;
`;

const ThumbnailSlider = styled.div`
  display: flex;
  gap: 0.5rem;
  transition: transform 0.3s ease;
  transform: translateX(${props => props.$offset}px);
  width: max-content;
  overflow: visible;
`;

const SliderArrow = styled.button`
  background-color: #dc2626;
  color: #ffffff;
  border: none;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  
  &:hover {
    background-color: #b91c1c;
  }
  
  &:disabled {
    background-color: #666666;
    cursor: not-allowed;
  }
  
  &.left {
    left: -20px; /* Position outside the wrapper margin */
  }
  
  &.right {
    right: -20px; /* Position outside the wrapper margin */
  }
`;

const ThumbnailWrapper = styled.div`
  overflow: hidden;
  margin: 0 20px;
  width: 480px; /* Show 5 full thumbnails + hint of the 6th */
  
  @media (max-width: 767px) {
    width: 176px; /* Show exactly 2 full thumbnails (80px * 2 + 16px for gap and safety) */
    margin: 0 15px;
  }
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
  const [sliderOffset, setSliderOffset] = useState(0);
  
  const VISIBLE_THUMBNAILS_DESKTOP = 5;
  const VISIBLE_THUMBNAILS_MOBILE = 2;
  const THUMBNAIL_WIDTH = 80;
  const GAP_SIZE = 8;
  const TOTAL_WIDTH_PER_THUMBNAIL = THUMBNAIL_WIDTH + GAP_SIZE;
  
  // Check if we're on mobile (simplified check)
  const isMobile = window.innerWidth <= 767;
  const visibleThumbnails = isMobile ? VISIBLE_THUMBNAILS_MOBILE : VISIBLE_THUMBNAILS_DESKTOP;
  const shouldShowSlider = images && images.length > visibleThumbnails;
  
  // Calculate disable states for arrows
  const maxOffset = images ? -(Math.max(0, images.length - visibleThumbnails) * TOTAL_WIDTH_PER_THUMBNAIL) : 0;
  const isFirstPage = sliderOffset === 0;
  const isLastPage = sliderOffset <= maxOffset;
  
  const moveSlider = (direction) => {
    // Calculate how many positions we can move
    const totalImages = images.length;
    const maxSlidePositions = Math.max(0, totalImages - visibleThumbnails);
    
    if (direction === 'right') {
      // Calculate current position based on offset
      const currentPosition = Math.abs(Math.round(sliderOffset / TOTAL_WIDTH_PER_THUMBNAIL));
      
      if (currentPosition < maxSlidePositions) {
        // Move one position to the right
        const newOffset = sliderOffset - TOTAL_WIDTH_PER_THUMBNAIL;
        setSliderOffset(newOffset);
        
        // Update selected image to next one
        if (selectedImageIndex < images.length - 1) {
          setSelectedImageIndex(selectedImageIndex + 1);
        }
      }
    } else {
      // Move left
      if (sliderOffset < 0) {
        const newOffset = sliderOffset + TOTAL_WIDTH_PER_THUMBNAIL;
        setSliderOffset(newOffset);
        
        // Update selected image to previous one
        if (selectedImageIndex > 0) {
          setSelectedImageIndex(selectedImageIndex - 1);
        }
      }
    }
  };

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
          {shouldShowSlider && (
            <SliderArrow 
              className="left"
              onClick={() => moveSlider('left')}
              disabled={isFirstPage}
              aria-label="Previous image"
            >
              <FaChevronLeft />
            </SliderArrow>
          )}
          
          <ThumbnailWrapper>
            <ThumbnailSlider $offset={sliderOffset}>
              {images.map((image, index) => (
                <Thumbnail
                  key={index}
                  src={image.url}
                  alt={`${productName} thumbnail ${index + 1}`}
                  $isActive={index === selectedImageIndex}
                  onClick={() => setSelectedImageIndex(index)}
                />
              ))}
            </ThumbnailSlider>
          </ThumbnailWrapper>
          
          {shouldShowSlider && (
            <SliderArrow 
              className="right"
              onClick={() => moveSlider('right')}
              disabled={isLastPage}
              aria-label="Next image"
            >
              <FaChevronRight />
            </SliderArrow>
          )}
        </ThumbnailContainer>
      )}
    </GalleryContainer>
  );
};