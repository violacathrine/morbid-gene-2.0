import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaSpotify, FaInstagram, FaYoutube, FaFacebook } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background-color: #000;
  border-top: 1px solid #333;
  padding: 2rem 1rem;
  margin-top: auto;
  
  @media (min-width: 768px) {
    padding: 2rem 2rem;
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  text-align: center;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
    text-align: left;
    align-items: center;
  }
`;

const SocialSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  
  @media (min-width: 768px) {
    justify-content: flex-start;
  }
`;

const SocialLink = styled.a`
  color: white;
  font-size: 1.5rem;
  transition: color 0.2s ease;
  
  &:hover {
    color: #dc2626;
  }
`;

const CopyrightSection = styled.div`
  color: #ccc;
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  
  @media (min-width: 768px) {
    text-align: center;
  }
`;

const LegalLinks = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (min-width: 768px) {
    font-size: 12px;
  }
`;

const LegalLink = styled(Link)`
  color: #999;
  text-decoration: none;
  transition: color 0.2s ease;
  
  &:hover {
    color: #ccc;
  }
`;

const ContactSection = styled.div`
  color: #ccc;
  font-size: 0.9rem;
  
  @media (min-width: 768px) {
    text-align: right;
  }
`;

const EmailLink = styled.a`
  color: #ccc;
  text-decoration: none;
  transition: color 0.2s ease;
  
  &:hover {
    color: white;
  }
`;

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <SocialSection>
          <SocialLink 
            href="https://open.spotify.com/artist/YOUR_ARTIST_ID" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Spotify"
          >
            <FaSpotify />
          </SocialLink>
          <SocialLink 
            href="https://instagram.com/morbidgeneofficial" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram />
          </SocialLink>
          <SocialLink 
            href="https://youtube.com/YOUR_CHANNEL" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="YouTube"
          >
            <FaYoutube />
          </SocialLink>
          <SocialLink 
            href="https://facebook.com/YOUR_PAGE" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <FaFacebook />
          </SocialLink>
        </SocialSection>
        
        <CopyrightSection>
          <div>© {currentYear} Morbid Gene</div>
          <LegalLinks>
            <LegalLink to="/terms">Terms of Use</LegalLink>
            <LegalLink to="/privacy">Privacy Policy</LegalLink>
          </LegalLinks>
        </CopyrightSection>
        
        <ContactSection>
          <EmailLink href="mailto:morbidgenemusic@gmail.com">
            morbidgenemusic@gmail.com
          </EmailLink>
        </ContactSection>
      </FooterContent>
    </FooterContainer>
  );
};