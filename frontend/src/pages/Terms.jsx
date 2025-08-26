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

export const Terms = () => {
  return (
    <Container>
      <BackLink to="/cart">Back to Cart</BackLink>
      
      <Title>Terms of Use</Title>
      <LastUpdated>Last updated: [Date]</LastUpdated>
      
      <Section>
        <SectionTitle>1. Acceptance of Terms</SectionTitle>
        <Paragraph>
          [Your terms content will go here. This is a placeholder for the actual terms of use.]
        </Paragraph>
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
        <SectionTitle>3. Product Purchases</SectionTitle>
        <Paragraph>
          All merchandise purchases are processed through our partner Spreadshirt. When making a purchase, you will be redirected to Spreadshirt's secure checkout system.
        </Paragraph>
        <Paragraph>
          By purchasing products through our store, you also agree to Spreadshirt's terms and conditions.
        </Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>4. Privacy</SectionTitle>
        <Paragraph>
          Your use of our website is also governed by our Privacy Policy. Please review our Privacy Policy, which also governs the Site and informs users of our data collection practices.
        </Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>5. Contact Information</SectionTitle>
        <Paragraph>
          If you have any questions about these Terms of Use, please contact us at:
        </Paragraph>
        <Paragraph>
          Email: [Your email]<br/>
          Address: [Your address]
        </Paragraph>
      </Section>
      
      <ScrollToTop />
    </Container>
  );
};