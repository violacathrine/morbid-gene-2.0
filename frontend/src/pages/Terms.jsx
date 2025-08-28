import styled from "styled-components";
import { Link } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
`;

const BackLink = styled(Link)`
  color: #ffffff;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  font-size: 0.9rem;
  transition: color 0.2s ease;
  
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

export const Terms = () => {
  return (
    <Container>
      <BackLink to="/cart">Back to Cart</BackLink>
      
      <Title>Terms of Use</Title>
      <LastUpdated>Last updated: August 28, 2025</LastUpdated>
      
      <Section>
        <SectionTitle>1. Acceptance of Terms</SectionTitle>
        <Paragraph>
          By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
        </Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>2. Use License</SectionTitle>
        <Paragraph>
          Permission is granted to temporarily download one copy of the materials on Morbid Gene's website for personal, non-commercial transitory viewing only.
        </Paragraph>
        <List>
          <li>This is the grant of a license, not a transfer of title</li>
          <li>This license shall automatically terminate if you violate any of these restrictions</li>
          <li>Morbid Gene may terminate this license at any time</li>
        </List>
      </Section>
      
      <Section>
        <SectionTitle>3. Product Purchases and Third-Party Terms</SectionTitle>
        <Paragraph>
          All merchandise purchases are processed through our partner Spreadshirt. When making a purchase, you will be redirected to Spreadshirt's secure checkout system.
        </Paragraph>
        <Paragraph>
          By purchasing products through our store, you also agree to Spreadshirt's terms and conditions:
        </Paragraph>
        <List>
          <li>
            <a href="https://www.spreadshirt.se/allmaenna-villkoren-C10183" target="_blank" rel="noopener noreferrer" style={{ color: '#dc2626', textDecoration: 'underline' }}>
              Spreadshirt General Terms and Conditions
            </a>
          </li>
          <li>
            <a href="https://www.spreadshirt.se/allm%C3%A4nna-villkor-kunder-C2377" target="_blank" rel="noopener noreferrer" style={{ color: '#dc2626', textDecoration: 'underline' }}>
              Spreadshirt Customer Terms and Conditions
            </a>
          </li>
        </List>
        <Paragraph>
          <strong>Note:</strong> These are Spreadshirt's terms and conditions in Swedish. They govern all aspects of product ordering, payment, shipping, returns, and customer service for merchandise purchases.
        </Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>4. User Accounts and Data Retention</SectionTitle>
        <Paragraph>
          If you create an account on our website, the following terms apply:
        </Paragraph>
        <List>
          <li><strong>Account Security:</strong> You are responsible for maintaining the confidentiality of your account and password</li>
          <li><strong>Inactive Account Deletion:</strong> Accounts that remain inactive (no login) for 30 months will be automatically deleted from our system</li>
          <li><strong>Data Deletion:</strong> When an account is deleted, all associated personal data is permanently removed from our database</li>
          <li><strong>Account Recreation:</strong> After deletion, you may create a new account using the same email address if desired</li>
          <li><strong>No Recovery:</strong> Once deleted, inactive account data cannot be recovered</li>
        </List>
        <Paragraph>
          This policy ensures compliance with data protection regulations and helps maintain system security and performance.
        </Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>5. Privacy</SectionTitle>
        <Paragraph>
          Your use of our website is also governed by our Privacy Policy. Please review our Privacy Policy, which also governs the Site and informs users of our data collection practices.
        </Paragraph>
      </Section>
      
      <InfoBox>
        <SectionTitle style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>
          Contact Us
        </SectionTitle>
        <Paragraph style={{ marginBottom: '0.5rem' }}>
          If you have any questions about these Terms of Use, please contact us at:
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