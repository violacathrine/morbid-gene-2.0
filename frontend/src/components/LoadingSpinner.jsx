import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: ${props => props.$fullScreen ? '80vh' : props.$minHeight || '200px'};
  padding: ${props => props.$padding || '2rem'};
`;

const Spinner = styled.div`
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top: 3px solid #dc2626;
  border-radius: 50%;
  width: ${props => props.$size || '50px'};
  height: ${props => props.$size || '50px'};
  animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled.p`
  color: #ffffff;
  margin-top: 1rem;
  font-size: 1rem;
  text-align: center;
`;

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LoadingSpinner = ({ 
  size = '50px', 
  fullScreen = false, 
  minHeight = '200px',
  padding = '2rem',
  text = 'Loading...',
  showText = true 
}) => {
  return (
    <SpinnerContainer 
      $fullScreen={fullScreen} 
      $minHeight={minHeight}
      $padding={padding}
    >
      <LoadingWrapper>
        <Spinner $size={size} />
        {showText && <LoadingText>{text}</LoadingText>}
      </LoadingWrapper>
    </SpinnerContainer>
  );
};

const InlineSpinner = styled.div`
  display: inline-block;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid currentColor;
  border-radius: 50%;
  width: ${props => props.$size || '16px'};
  height: ${props => props.$size || '16px'};
  animation: ${spin} 1s linear infinite;
  margin-right: ${props => props.$marginRight || '8px'};
  vertical-align: middle;
`;

export const InlineLoadingSpinner = ({ size = '16px', marginRight = '8px' }) => {
  return <InlineSpinner $size={size} $marginRight={marginRight} />;
};