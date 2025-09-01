import styled from "styled-components";
import { theme } from "../../styles/theme";

// Last updated date styling for legal pages
export const LastUpdated = styled.p`
  color: ${theme.colors.mutedText};
  text-align: center;
  margin-bottom: ${theme.spacing['2xl']};
  font-size: ${theme.typography.sizes.sm};

  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-bottom: ${theme.spacing.xl};
    font-size: ${theme.typography.sizes.xs};
  }
`;

// Section container for legal page content
export const Section = styled.section`
  margin-bottom: ${theme.spacing['2xl']};

  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-bottom: ${theme.spacing.xl};
  }
`;

// Paragraph styling for legal content
export const Paragraph = styled.p`
  color: ${theme.colors.secondaryText};
  line-height: 1.8;
  margin-bottom: ${theme.spacing.base};
  font-size: ${theme.typography.sizes.base};

  @media (max-width: ${theme.breakpoints.mobile}) {
    line-height: 1.6;
    font-size: ${theme.typography.sizes.sm};
    margin-bottom: ${theme.spacing.md};
  }
`;

// List styling for legal content
export const List = styled.ul`
  color: ${theme.colors.secondaryText};
  line-height: 1.8;
  margin-left: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.base};
  font-size: ${theme.typography.sizes.base};
  
  li {
    margin-bottom: ${theme.spacing.sm};
  }

  a {
    color: ${theme.colors.red};
    text-decoration: underline;
    transition: color ${theme.transitions.normal};

    &:hover {
      color: ${theme.colors.darkRed};
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    line-height: 1.6;
    font-size: ${theme.typography.sizes.sm};
    margin-left: ${theme.spacing.lg};
    margin-bottom: ${theme.spacing.md};

    li {
      margin-bottom: ${theme.spacing.xs};
    }
  }
`;

// Info box styling for contact sections and important notes
export const InfoBox = styled.div`
  background: ${theme.colors.sectionBg};
  border: 1px solid ${theme.colors.borderLight};
  border-radius: 8px;
  padding: ${theme.spacing.xl};
  margin: ${theme.spacing['2xl']} 0;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.base};
    margin: ${theme.spacing.xl} 0;
  }
`;

// Sub-section heading styling (used in Privacy.jsx)
export const SubSection = styled.h3`
  color: ${theme.colors.primaryText};
  font-size: ${theme.typography.sizes.xl};
  font-weight: ${theme.typography.weights.semibold};
  margin-top: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.md};
  font-family: ${theme.typography.fontFamily};

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.typography.sizes.lg};
    margin-top: ${theme.spacing.base};
    margin-bottom: ${theme.spacing.sm};
  }
`;