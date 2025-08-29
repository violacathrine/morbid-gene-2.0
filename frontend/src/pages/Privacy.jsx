import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
`;

const BackButton = styled.button`
  color: #ffffff;
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  font-size: 0.9rem;
  transition: color 0.2s ease;
  padding: 0;
  
  &:hover {
    color: #dc2626;
    text-decoration: underline;
  }
  
  &::before {
    content: "←";
  }
`;

const Title = styled.h1`
  color: white;
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const LastUpdated = styled.p`
  color: #9ca3af;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 0.9rem;
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  color: white;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #374151;
  padding-bottom: 0.5rem;
`;

const SubSection = styled.h3`
  color: white;
  font-size: 1.2rem;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
`;

const Paragraph = styled.p`
  color: #e5e7eb;
  line-height: 1.8;
  margin-bottom: 1rem;
`;

const List = styled.ul`
  color: #e5e7eb;
  line-height: 1.8;
  margin-left: 1.5rem;
  margin-bottom: 1rem;
  
  li {
    margin-bottom: 0.5rem;
  }
`;

const InfoBox = styled.div`
  background: #1f2937;
  border: 1px solid #374151;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 2rem 0;
`;

export const Privacy = () => {
  const navigate = useNavigate();
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  return (
    <Container>
      <BackButton onClick={handleGoBack}>Go Back</BackButton>
      
      <Title>Privacy Policy</Title>
      <LastUpdated>Last updated: August 28, 2025</LastUpdated>
      
      <Section>
        <SectionTitle>1. Introduction</SectionTitle>
        <Paragraph>
          Morbid Gene ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and share information about you when you use our website and services.
        </Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>2. Information We Collect</SectionTitle>
        
        <SubSection>Information You Provide</SubSection>
        <List>
          <li>Contact information (email, name) when you use our contact form</li>
          <li>Information provided when making purchases through Spreadshirt</li>
          <li>Communications you send to us</li>
        </List>
        
        <SubSection>Information Automatically Collected</SubSection>
        <List>
          <li>Browser type and version</li>
          <li>IP address</li>
          <li>Pages you visit on our site</li>
          <li>Time and date of your visit</li>
        </List>
      </Section>
      
      <Section>
        <SectionTitle>3. How We Use Your Information</SectionTitle>
        <Paragraph>
          We use the information we collect to:
        </Paragraph>
        <List>
          <li>Process and fulfill merchandise orders through Spreadshirt</li>
          <li>Respond to your inquiries and support requests</li>
          <li>Send you updates about your orders</li>
          <li>Improve our website and services</li>
          <li>Comply with legal obligations</li>
        </List>
      </Section>
      
      <Section>
        <SectionTitle>4. Information Sharing</SectionTitle>
        <Paragraph>
          We do not sell, trade, or rent your personal information to third parties. We may share your information with:
        </Paragraph>
        <List>
          <li><strong>Spreadshirt:</strong> To process merchandise orders and handle shipping. When you make a purchase, your information is shared with Spreadshirt according to their privacy policy.</li>
          <li><strong>Service Providers:</strong> Who help us operate our website and business</li>
          <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
        </List>
        <Paragraph>
          For merchandise purchases, please also review:
        </Paragraph>
        <List>
          <li>
            <a href="https://www.spreadshirt.se/allmaenna-villkoren-C10183" target="_blank" rel="noopener noreferrer" style={{ color: '#dc2626', textDecoration: 'underline' }}>
              Spreadshirt General Terms and Conditions (Swedish)
            </a>
          </li>
          <li>
            <a href="https://www.spreadshirt.se/allm%C3%A4nna-villkor-kunder-C2377" target="_blank" rel="noopener noreferrer" style={{ color: '#dc2626', textDecoration: 'underline' }}>
              Spreadshirt Customer Terms and Conditions (Swedish)
            </a>
          </li>
        </List>
      </Section>
      
      <Section>
        <SectionTitle>5. Cookies and Local Storage</SectionTitle>
        <Paragraph>
          Our website uses cookies and local storage to enhance your browsing experience and provide essential functionality.
        </Paragraph>
        
        <SubSection>Essential Cookies</SubSection>
        <Paragraph>
          These cookies are necessary for the website to function properly:
        </Paragraph>
        <List>
          <li><strong>Authentication Cookie:</strong> Keeps you logged in securely using httpOnly cookies that cannot be accessed by JavaScript</li>
          <li><strong>Shopping Cart:</strong> Stores items in your cart locally on your device</li>
          <li><strong>Cookie Consent:</strong> Remembers your cookie preferences</li>
        </List>
        
        <SubSection>Data Storage</SubSection>
        <Paragraph>
          We use the following storage methods:
        </Paragraph>
        <List>
          <li><strong>HttpOnly Cookies:</strong> For secure authentication (cannot be accessed by scripts)</li>
          <li><strong>Local Storage:</strong> For shopping cart items and user preferences</li>
          <li><strong>Session Storage:</strong> For temporary data during your browsing session</li>
        </List>
        
        <Paragraph>
          You can control cookies through your browser settings. However, disabling essential cookies will prevent you from logging in or using the shopping cart.
        </Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>6. Data Security</SectionTitle>
        <Paragraph>
          We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
        </Paragraph>
        <Paragraph>
          All payment processing is handled by Spreadshirt's secure payment system. We do not store credit card information on our servers.
        </Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>7. Data Retention</SectionTitle>
        <Paragraph>
          We retain your personal information only as long as necessary to fulfill the purposes outlined in this policy.
        </Paragraph>
        
        <SubSection>Account Data Retention</SubSection>
        <Paragraph>
          For user accounts created on our website:
        </Paragraph>
        <List>
          <li><strong>Active Accounts:</strong> We retain your account data as long as your account remains active</li>
          <li><strong>Inactive Accounts:</strong> Accounts that have been inactive (no login) for 30 months will be automatically deleted from our system</li>
          <li><strong>Account Recovery:</strong> After deletion, you may create a new account using the same email address if desired</li>
          <li><strong>Data Deletion:</strong> When an account is deleted, all associated personal data (name, email, preferences, favorites) is permanently removed from our database</li>
        </List>
        
        <Paragraph>
          This automated cleanup process helps us comply with data minimization principles and ensures we only retain data that serves a legitimate purpose.
        </Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>8. Your Rights</SectionTitle>
        <Paragraph>
          Depending on your location, you may have certain rights regarding your personal information, including:
        </Paragraph>
        <List>
          <li>The right to access your personal information</li>
          <li>The right to correct inaccurate information</li>
          <li>The right to request deletion of your information</li>
          <li>The right to object to processing of your information</li>
        </List>
      </Section>
      
      <Section>
        <SectionTitle>9. Children's Privacy</SectionTitle>
        <Paragraph>
          Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
        </Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>10. Changes to This Policy</SectionTitle>
        <Paragraph>
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
        </Paragraph>
      </Section>
      
      <InfoBox>
        <SectionTitle style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>
          Contact Us
        </SectionTitle>
        <Paragraph style={{ marginBottom: '0.5rem' }}>
          If you have any questions about this Privacy Policy, please contact us at:
        </Paragraph>
        <Paragraph style={{ marginBottom: '0' }}>
          Email: morbidgenemusic@gmail.com<br/>
          Website: morbidgeneofficial.com
        </Paragraph>
      </InfoBox>
      
      <ScrollToTop />
    </Container>
  );
};