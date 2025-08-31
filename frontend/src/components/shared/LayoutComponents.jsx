import styled from 'styled-components';
import { theme } from '../../styles/theme';

/**
 * Shared Container Component
 * 
 * A flexible, responsive container component that provides consistent
 * layout patterns across all pages. Uses theme values for consistency.
 * 
 * Props:
 * - $maxWidth: 'sm' (800px), 'md' (1200px), 'lg' (1600px), or custom CSS value
 * - $minHeight: 'viewport' (100vh), 'auto', or custom CSS value
 * - $variant: 'page' (standard page), 'form' (centered form), 'grid' (product grid)
 * - $padding: 'sm', 'md', 'lg', or 'xl' for different padding scales
 */
export const Container = styled.div.withConfig({
  shouldForwardProp: (prop) => !['$maxWidth', '$minHeight', '$variant', '$padding'].includes(prop),
})`
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
  
  /* Max-width variants */
  max-width: ${(props) => {
    const { $maxWidth = 'md' } = props;
    switch ($maxWidth) {
      case 'sm': return '800px';
      case 'md': return '1200px';
      case 'lg': return '1600px';
      default: return $maxWidth;
    }
  }};
  
  /* Min-height variants */
  min-height: ${(props) => {
    const { $minHeight = 'auto' } = props;
    switch ($minHeight) {
      case 'viewport': return '100vh';
      case 'auto': return 'auto';
      default: return $minHeight;
    }
  }};
  
  /* Responsive padding based on size variant */
  padding: ${(props) => {
    const { $padding = 'md' } = props;
    switch ($padding) {
      case 'sm':
        return `${theme.spacing.base}`;
      case 'md':
        return `${theme.spacing.base}`;
      case 'lg':
        return `${theme.spacing.xl}`;
      case 'xl':
        return `${theme.spacing['2xl']}`;
      default:
        return `${theme.spacing.base}`;
    }
  }};
  
  /* Responsive padding adjustments */
  @media (min-width: ${theme.breakpoints.mobile}) {
    padding: ${(props) => {
      const { $padding = 'md' } = props;
      switch ($padding) {
        case 'sm':
          return `${theme.spacing.lg}`;
        case 'md':
          return `${theme.spacing.xl}`;
        case 'lg':
          return `${theme.spacing['2xl']}`;
        case 'xl':
          return `${theme.spacing['2xl']}`;
        default:
          return `${theme.spacing.xl}`;
      }
    }};
  }
  
  @media (min-width: ${theme.breakpoints.tablet}) {
    padding: ${(props) => {
      const { $padding = 'md' } = props;
      switch ($padding) {
        case 'sm':
          return `${theme.spacing['2xl']}`;
        case 'md':
          return `${theme.spacing['2xl']}`;
        case 'lg':
          return `${theme.spacing['3xl']}`;
        case 'xl':
          return `${theme.spacing['3xl']}`;
        default:
          return `${theme.spacing['2xl']}`;
      }
    }};
  }
  
  @media (min-width: ${theme.breakpoints.desktop}) {
    padding: ${(props) => {
      const { $padding = 'md' } = props;
      switch ($padding) {
        case 'sm':
          return `${theme.spacing['2xl']}`;
        case 'md':
          return `${theme.spacing['3xl']}`;
        case 'lg':
          return `${theme.spacing['3xl']}`;
        case 'xl':
          return `${theme.spacing['4xl']}`;
        default:
          return `${theme.spacing['3xl']}`;
      }
    }};
  }
  
  /* Layout variants */
  ${(props) => {
    const { $variant } = props;
    switch ($variant) {
      case 'form':
        return `
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        `;
      case 'grid':
        return `
          display: flex;
          flex-direction: column;
          gap: ${theme.spacing.base};
          
          @media (min-width: ${theme.breakpoints.tablet}) {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: ${theme.spacing['2xl']};
          }
          
          @media (min-width: ${theme.breakpoints.desktop}) {
            gap: ${theme.spacing['3xl']};
          }
        `;
      case 'page':
      default:
        return `
          display: block;
        `;
    }
  }}
`;

/**
 * Centered Content Container
 * 
 * A specialized container for forms and centered content like login/register pages.
 * Provides consistent centering and responsive sizing.
 * 
 * Props:
 * - $maxWidth: Maximum width of the centered box (default: 600px)
 */
export const CenteredContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !['$maxWidth'].includes(prop),
})`
  max-width: ${(props) => props.$maxWidth || '600px'};
  margin: 0 auto;
  padding: ${theme.spacing.base};
  width: 100%;
  box-sizing: border-box;
  
  @media (min-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing['2xl']};
  }
`;

/**
 * Section Container
 * 
 * A reusable container for content sections with consistent background and borders.
 * Commonly used for form sections, info boxes, etc.
 */
export const SectionContainer = styled.div`
  background: ${theme.colors.sectionBg};
  border: 1px solid ${theme.colors.borderLight};
  padding: ${theme.spacing.base};
  margin-bottom: ${theme.spacing.base};
  
  @media (min-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.xl};
  }
  
  @media (min-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing['2xl']};
    margin-bottom: ${theme.spacing['2xl']};
  }
`;