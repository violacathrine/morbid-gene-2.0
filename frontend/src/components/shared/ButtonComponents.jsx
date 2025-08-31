import styled from "styled-components";
import { theme } from "../../styles/theme";

export const AddToCartButton = styled.button`
  background-color: ${(props) => (!props.$enabled ? theme.colors.buttonDisabled : theme.colors.buttonPrimary)};
  color: ${(props) => (!props.$enabled ? theme.colors.secondaryText : theme.colors.primaryText)};
  padding: ${theme.spacing.md} ${theme.spacing.base};
  border-radius: 8px;
  border: none;
  font-size: ${theme.typography.sizes.sm};
  font-weight: ${theme.typography.weights.bold};
  cursor: ${(props) => (!props.$enabled ? "not-allowed" : "pointer")};
  transition: background-color ${theme.transitions.normal};
  opacity: ${(props) => (!props.$enabled ? 0.9 : 1)};
  width: 100%;
  min-height: 44px;
  
  @media (min-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.md} ${theme.spacing.xl};
    font-size: ${theme.typography.sizes.base};
  }
  
  @media (min-width: ${theme.breakpoints.tablet}) {
    width: auto;
    padding: ${theme.spacing.base} ${theme.spacing['2xl']};
    font-size: ${theme.typography.sizes.lg};
  }

  &:hover {
    background-color: ${(props) => (props.$enabled ? theme.colors.buttonPrimaryHover : theme.colors.buttonDisabled)};
  }
  
  &:active {
    background-color: ${(props) => (props.$enabled ? theme.colors.darkRed : theme.colors.buttonDisabled)};
  }
  
  /* Mobile touch optimization */
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
`;

// Flexible Button component with variants, sizes, and states
export const Button = styled.button.withConfig({
  shouldForwardProp: (prop) => !['$variant', '$size', '$fullWidth', '$uppercase'].includes(prop),
})`
  border: none;
  font-weight: ${theme.typography.weights.bold};
  cursor: pointer;
  transition: background-color ${theme.transitions.normal};
  text-transform: ${props => props.$uppercase ? 'uppercase' : 'none'};
  letter-spacing: ${props => props.$uppercase ? theme.typography.letterSpacing.uppercase : theme.typography.letterSpacing.normal};
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
  min-height: 44px; /* Touch target accessibility */
  
  /* Mobile touch optimization */
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  
  /* Variant styles */
  ${props => {
    switch (props.$variant) {
      case 'secondary':
        return `
          background-color: ${theme.colors.buttonSecondary};
          color: ${theme.colors.primaryText};
          
          &:hover:not(:disabled) {
            background-color: ${theme.colors.buttonSecondaryHover};
          }
        `;
      case 'danger':
        return `
          background-color: ${theme.colors.red};
          color: ${theme.colors.primaryText};
          
          &:hover:not(:disabled) {
            background-color: ${theme.colors.darkRed};
          }
        `;
      case 'outline':
        return `
          background-color: transparent;
          color: ${theme.colors.primaryText};
          border: 1px solid ${theme.colors.borderLight};
          
          &:hover:not(:disabled) {
            background-color: ${theme.colors.sectionBg};
            border-color: ${theme.colors.borderRed};
          }
        `;
      default: // 'primary'
        return `
          background-color: ${theme.colors.buttonPrimary};
          color: ${theme.colors.primaryText};
          
          &:hover:not(:disabled) {
            background-color: ${theme.colors.buttonPrimaryHover};
          }
        `;
    }
  }}
  
  /* Size variants */
  ${props => {
    switch (props.$size) {
      case 'sm':
        return `
          padding: ${theme.spacing.sm} ${theme.spacing.md};
          font-size: ${theme.typography.sizes.sm};
          
          @media (min-width: ${theme.breakpoints.mobile}) {
            padding: ${theme.spacing.md} ${theme.spacing.base};
            font-size: ${theme.typography.sizes.base};
          }
        `;
      case 'lg':
        return `
          padding: ${theme.spacing.base} ${theme.spacing['2xl']};
          font-size: ${theme.typography.sizes.base};
          
          @media (min-width: ${theme.breakpoints.mobile}) {
            padding: ${theme.spacing.xl} ${theme.spacing['3xl']};
            font-size: ${theme.typography.sizes.lg};
          }
        `;
      default: // 'md'
        return `
          padding: ${theme.spacing.md} ${theme.spacing.base};
          font-size: ${theme.typography.sizes.sm};
          
          @media (min-width: ${theme.breakpoints.mobile}) {
            padding: ${theme.spacing.md} ${theme.spacing.xl};
            font-size: ${theme.typography.sizes.base};
          }
        `;
    }
  }}
  
  &:disabled {
    background-color: ${theme.colors.buttonDisabled} !important;
    color: ${theme.colors.mutedText} !important;
    cursor: not-allowed;
    border-color: ${theme.colors.buttonDisabled};
  }
  
  &:focus {
    outline: 2px solid ${theme.colors.buttonPrimary};
    outline-offset: 2px;
  }
`;

// Link-styled button for navigation actions
export const LinkButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['$variant'].includes(prop),
})`
  background: none;
  border: none;
  color: ${props => props.$variant === 'primary' ? theme.colors.buttonPrimary : theme.colors.primaryText};
  text-decoration: none;
  cursor: pointer;
  font-size: ${theme.typography.sizes.sm};
  font-weight: ${theme.typography.weights.bold};
  transition: color ${theme.transitions.normal};
  padding: ${theme.spacing.sm};
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  
  &:hover {
    color: ${theme.colors.buttonPrimary};
    text-decoration: underline;
  }
  
  &:focus {
    outline: 2px solid ${theme.colors.buttonPrimary};
    outline-offset: 2px;
  }
  
  @media (min-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.typography.sizes.base};
  }
`;

// Loading spinner component for buttons
export const LoadingSpinner = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid currentColor;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 1s ease-in-out infinite;
  margin-right: ${theme.spacing.sm};

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;