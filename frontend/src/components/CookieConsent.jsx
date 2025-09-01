import { useState, useEffect } from 'react';
import styled from 'styled-components';

const CookieBanner = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #1a1a1a;
  border-top: 2px solid #dc2626;
  padding: 1rem;
  z-index: 1000;
  display: ${props => props.$show ? 'block' : 'none'};
  
  @media (min-width: 768px) {
    padding: 1.5rem;
  }
`;

const CookieContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const CookieText = styled.div`
  color: #ffffff;
  font-size: 0.875rem;
  line-height: 1.5;
  
  @media (min-width: 768px) {
    font-size: 1rem;
  }
  
  a {
    color: #dc2626;
    text-decoration: underline;
    
    &:hover {
      color: #b91c1c;
    }
  }
`;

const CookieButtons = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

const CookieButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 0.875rem;
  
  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

const AcceptButton = styled(CookieButton)`
  background-color: #dc2626;
  color: #ffffff;
  
  &:hover {
    background-color: #b91c1c;
  }
`;

const DeclineButton = styled(CookieButton)`
  background-color: #374151;
  color: #ffffff;
  
  &:hover {
    background-color: #4b5563;
  }
`;

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setShowBanner(false);
    // Here you could disable non-essential cookies/tracking
    // For now, we'll just hide the banner since authentication cookies are necessary
  };

  return (
    <CookieBanner $show={showBanner}>
      <CookieContent>
        <CookieText>
          We use cookies to improve your experience on our website. 
          Essential cookies are used for login and shopping cart functionality. 
          <a href="/privacy" target="_blank"> Read more in our privacy policy</a>
        </CookieText>
        <CookieButtons>
          <DeclineButton onClick={handleDecline}>
            Essential only
          </DeclineButton>
          <AcceptButton onClick={handleAccept}>
            Accept all
          </AcceptButton>
        </CookieButtons>
      </CookieContent>
    </CookieBanner>
  );
};

export default CookieConsent;