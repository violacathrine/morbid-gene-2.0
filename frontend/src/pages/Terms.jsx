import { useNavigate } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import { Container } from "../components/shared/LayoutComponents";
import { Title, SectionTitle } from "../components/shared/TypographyComponents";
import { LinkButton } from "../components/shared/ButtonComponents";
import { LastUpdated, Section, Paragraph, List, InfoBox } from "../components/shared/LegalPageComponents";

export const Terms = () => {
  const navigate = useNavigate();
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  return (
    <Container $maxWidth="sm" $minHeight="viewport" $padding="lg">
      <LinkButton onClick={handleGoBack}>← Go Back</LinkButton>
      
      <Title $size="lg" $align="center" $style={{ marginBottom: '1rem' }}>Terms of Use</Title>
      <LastUpdated>Last updated: August 28, 2025</LastUpdated>
      
      <Section>
        <SectionTitle $border>1. Acceptance of Terms</SectionTitle>
        <Paragraph>
          By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
        </Paragraph>
      </Section>
      
      <Section>
        <SectionTitle $border>2. Use License</SectionTitle>
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
        <SectionTitle $border>3. Product Purchases and Third-Party Terms</SectionTitle>
        <Paragraph>
          All merchandise purchases are processed through our partner Spreadshirt. When making a purchase, you will be redirected to Spreadshirt's secure checkout system.
        </Paragraph>
        <Paragraph>
          By purchasing products through our store, you also agree to Spreadshirt's terms and conditions:
        </Paragraph>
        <List>
          <li>
            <a href="https://www.spreadshirt.se/allmaenna-villkoren-C10183" target="_blank" rel="noopener noreferrer">
              Spreadshirt General Terms and Conditions
            </a>
          </li>
          <li>
            <a href="https://www.spreadshirt.se/allm%C3%A4nna-villkor-kunder-C2377" target="_blank" rel="noopener noreferrer">
              Spreadshirt Customer Terms and Conditions
            </a>
          </li>
        </List>
        <Paragraph>
          <strong>Note:</strong> These are Spreadshirt's terms and conditions in Swedish. They govern all aspects of product ordering, payment, shipping, returns, and customer service for merchandise purchases.
        </Paragraph>
      </Section>
      
      <Section>
        <SectionTitle $border>4. User Accounts and Data Retention</SectionTitle>
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
        <SectionTitle $border>5. Privacy</SectionTitle>
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