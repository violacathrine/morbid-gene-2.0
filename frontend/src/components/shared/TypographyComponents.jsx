import styled from "styled-components";
import { theme } from "../../styles/theme";

export const PageTitle = styled.h1`
  font-size: ${theme.typography.sizes.xl};
  font-weight: ${theme.typography.weights.bold};
  margin-bottom: ${theme.spacing.md};
  color: ${theme.colors.primaryText};
  word-break: break-word;
  
  @media (min-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.typography.sizes['2xl']};
    margin-bottom: ${theme.spacing.base};
  }
  
  @media (min-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.typography.sizes['4xl']};
  }
`;

// Flexible Title component that can be h1, h2, or h3 with different sizes and alignment
export const Title = styled.h1.withConfig({
  shouldForwardProp: (prop) => !['$size', '$align', '$uppercase', '$spacing'].includes(prop),
})`
  color: ${theme.colors.primaryText};
  font-weight: ${theme.typography.weights.bold};
  margin: 0;
  text-align: ${props => props.$align || 'left'};
  text-transform: ${props => props.$uppercase ? 'uppercase' : 'none'};
  letter-spacing: ${props => {
    if (props.$uppercase) return theme.typography.letterSpacing.uppercase;
    if (props.$spacing === 'wide') return theme.typography.letterSpacing.wide;
    if (props.$spacing === 'wider') return theme.typography.letterSpacing.wider;
    if (props.$spacing === 'widest') return theme.typography.letterSpacing.widest;
    return theme.typography.letterSpacing.normal;
  }};
  
  /* Size variants */
  ${props => {
    switch (props.$size) {
      case 'sm':
        return `
          font-size: ${theme.typography.sizes.lg};
          margin-bottom: ${theme.spacing.sm};
          
          @media (min-width: ${theme.breakpoints.mobile}) {
            font-size: ${theme.typography.sizes.xl};
            margin-bottom: ${theme.spacing.md};
          }
          
          @media (min-width: ${theme.breakpoints.tablet}) {
            font-size: ${theme.typography.sizes['2xl']};
          }
        `;
      case 'md':
        return `
          font-size: ${theme.typography.sizes.xl};
          margin-bottom: ${theme.spacing.md};
          
          @media (min-width: ${theme.breakpoints.mobile}) {
            font-size: ${theme.typography.sizes['2xl']};
            margin-bottom: ${theme.spacing.base};
          }
          
          @media (min-width: ${theme.breakpoints.tablet}) {
            font-size: ${theme.typography.sizes['3xl']};
          }
        `;
      case 'lg':
        return `
          font-size: ${theme.typography.sizes['2xl']};
          margin-bottom: ${theme.spacing.base};
          
          @media (min-width: ${theme.breakpoints.mobile}) {
            font-size: ${theme.typography.sizes['3xl']};
            margin-bottom: ${theme.spacing.xl};
          }
          
          @media (min-width: ${theme.breakpoints.tablet}) {
            font-size: ${theme.typography.sizes['4xl']};
          }
        `;
      case 'xl':
        return `
          font-size: ${theme.typography.sizes['3xl']};
          margin-bottom: ${theme.spacing.xl};
          
          @media (min-width: ${theme.breakpoints.mobile}) {
            font-size: ${theme.typography.sizes['4xl']};
            margin-bottom: ${theme.spacing['2xl']};
          }
          
          @media (min-width: ${theme.breakpoints.tablet}) {
            font-size: 3.5rem;
            margin-bottom: ${theme.spacing['3xl']};
          }
        `;
      default: // 'md' is default
        return `
          font-size: ${theme.typography.sizes.xl};
          margin-bottom: ${theme.spacing.md};
          
          @media (min-width: ${theme.breakpoints.mobile}) {
            font-size: ${theme.typography.sizes['2xl']};
            margin-bottom: ${theme.spacing.base};
          }
          
          @media (min-width: ${theme.breakpoints.tablet}) {
            font-size: ${theme.typography.sizes['3xl']};
          }
        `;
    }
  }}
`;

// Section Title component for h2 headings  
export const SectionTitle = styled.h2.withConfig({
  shouldForwardProp: (prop) => !['$border', '$align'].includes(prop),
})`
  color: ${theme.colors.primaryText};
  font-size: ${theme.typography.sizes.lg};
  font-weight: ${theme.typography.weights.bold};
  margin-bottom: ${theme.spacing.base};
  text-align: ${props => props.$align || 'left'};
  border-bottom: ${props => props.$border ? `1px solid ${theme.colors.borderLight}` : 'none'};
  padding-bottom: ${props => props.$border ? theme.spacing.sm : '0'};
  
  @media (min-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.typography.sizes.xl};
    margin-bottom: ${theme.spacing.xl};
  }
  
  @media (min-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.typography.sizes['2xl']};
  }
`;

export const Description = styled.p`
  font-size: ${theme.typography.sizes.sm};
  margin-bottom: ${theme.spacing.base};
  line-height: 1.5;
  color: ${theme.colors.secondaryText};
  
  @media (min-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.typography.sizes.base};
    margin-bottom: ${theme.spacing.xl};
    line-height: 1.6;
  }
  
  @media (min-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.typography.sizes.lg};
  }
`;

export const Price = styled.div`
  font-size: ${theme.typography.sizes.lg};
  font-weight: ${theme.typography.weights.bold};
  margin-bottom: ${theme.spacing.base};
  color: ${theme.colors.buttonPrimary};
  
  @media (min-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.typography.sizes.xl};
    margin-bottom: ${theme.spacing.xl};
  }
  
  @media (min-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.typography.sizes['2xl']};
  }
`;