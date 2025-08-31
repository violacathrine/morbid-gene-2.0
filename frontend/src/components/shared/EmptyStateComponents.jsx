import styled from "styled-components";
import { Link } from "react-router-dom";
import { theme } from "../../styles/theme";

// Main EmptyState container
const EmptyStateContainer = styled.div`
  text-align: center;
  padding: 2rem 1rem;
  color: ${theme.colors.secondaryText};
  
  @media (min-width: ${theme.breakpoints.tablet}) {
    padding: 3rem;
  }
`;

// Icon/Symbol display
const EmptyStateIcon = styled.div.withConfig({
  shouldForwardProp: (prop) => !["$size"].includes(prop),
})`
  font-size: ${props => props.$size === 'large' ? '3rem' : '2rem'};
  margin-bottom: 1rem;
  
  &::before {
    content: ${props => props.children || '"❌"'};
  }
`;

// Title for empty state
const EmptyStateTitle = styled.h1.withConfig({
  shouldForwardProp: (prop) => !["$size"].includes(prop),
})`
  color: ${theme.colors.primaryText};
  margin-bottom: ${props => props.$size === 'large' ? '1rem' : '0.5rem'};
  
  ${props => {
    switch (props.$size) {
      case 'large':
        return `
          font-size: 1.5rem;
          
          @media (min-width: ${theme.breakpoints.mobile}) {
            font-size: 2rem;
          }
        `;
      default:
        return `
          font-size: 1.25rem;
          
          @media (min-width: ${theme.breakpoints.mobile}) {
            font-size: 1.5rem;
          }
        `;
    }
  }}
`;

// Description text
const EmptyStateText = styled.p`
  font-size: 1rem;
  margin-bottom: 2rem;
  line-height: 1.6;
  color: ${theme.colors.secondaryText};
`;

// Actions container for buttons
const EmptyStateActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: center;
  
  @media (min-width: ${theme.breakpoints.mobile}) {
    flex-direction: row;
    justify-content: center;
    gap: 1rem;
  }
`;

// Styled Link as button (matching Cart.jsx EmptyLink)
const EmptyStateLink = styled(Link)`
  text-decoration: none;
  font-weight: bold;
  padding: 0.75rem 1.5rem;
  background-color: ${theme.colors.buttonPrimary};
  color: ${theme.colors.primaryText};
  border: none;
  display: inline-block;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: background-color ${theme.transitions.normal};
  font-size: 0.9rem;
  
  @media (min-width: ${theme.breakpoints.mobile}) {
    font-size: 1rem;
  }

  &:hover {
    background-color: ${theme.colors.buttonPrimaryHover};
    text-decoration: none;
  }
`;

// Reusable EmptyState component
export const EmptyState = ({ 
  icon, 
  title, 
  message, 
  actions, 
  titleSize = "medium",
  iconSize = "medium" 
}) => {
  return (
    <EmptyStateContainer>
      {icon && (
        <EmptyStateIcon $size={iconSize}>
          {icon}
        </EmptyStateIcon>
      )}
      
      <EmptyStateTitle $size={titleSize}>
        {title}
      </EmptyStateTitle>
      
      {message && (
        <EmptyStateText>
          {message}
        </EmptyStateText>
      )}
      
      {actions && (
        <EmptyStateActions>
          {actions}
        </EmptyStateActions>
      )}
    </EmptyStateContainer>
  );
};

// Export styled components for custom use cases
export { 
  EmptyStateContainer,
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateText,
  EmptyStateActions,
  EmptyStateLink
};