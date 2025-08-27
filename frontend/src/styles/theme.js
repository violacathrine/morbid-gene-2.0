// Morbid Gene Theme Configuration
// Consistent colors and styling rules for the entire project

export const theme = {
  colors: {
    // Primary colors
    black: '#000000',
    darkGray: '#1a1a1a',
    white: '#ffffff',
    
    // Red palette
    red: '#dc2626',
    darkRed: '#b91c1c',
    lightRed: '#991b1b',
    
    // Gray palette  
    lightGray: '#cccccc',
    mediumGray: '#666666',
    charcoal: '#333333',
    darkCharcoal: '#555555',
    
    // Text colors
    primaryText: '#ffffff',
    secondaryText: '#cccccc',
    mutedText: '#666666',
    
    // Border colors
    borderLight: '#333333',
    borderDark: '#555555',
    borderRed: '#dc2626',
    
    // Background colors
    pageBg: '#000000',        // Main page background (black)
    sectionBg: '#1a1a1a',     // Section/card backgrounds (dark gray)
    inputBg: '#222222',       // Input field backgrounds
    
    // Button states
    buttonPrimary: '#dc2626',
    buttonPrimaryHover: '#b91c1c',
    buttonSecondary: '#333333',
    buttonSecondaryHover: '#555555',
    buttonDisabled: '#666666',
  },
  
  // Typography
  typography: {
    fontFamily: "'Orbitron', sans-serif",
    headingFamily: "'Bebas Neue', sans-serif",
    
    // Font sizes
    sizes: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px  
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
    },
    
    // Font weights
    weights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    
    // Letter spacing
    letterSpacing: {
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
      uppercase: '1px',
    }
  },
  
  // Spacing
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '0.75rem',   // 12px
    base: '1rem',    // 16px
    lg: '1.25rem',   // 20px
    xl: '1.5rem',    // 24px
    '2xl': '2rem',   // 32px
    '3xl': '2.5rem', // 40px
    '4xl': '3rem',   // 48px
  },
  
  // Transitions
  transitions: {
    fast: '0.15s ease',
    normal: '0.2s ease',
    slow: '0.3s ease',
  },
  
  // Breakpoints
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1280px',
  }
};

// Helper function to get consistent button styles
export const getButtonStyles = (variant = 'primary') => {
  const styles = {
    primary: `
      background-color: ${theme.colors.buttonPrimary};
      color: ${theme.colors.white};
      border: none;
      font-weight: ${theme.typography.weights.bold};
      text-transform: uppercase;
      letter-spacing: ${theme.typography.letterSpacing.uppercase};
      cursor: pointer;
      transition: background-color ${theme.transitions.normal};
      
      &:hover:not(:disabled) {
        background-color: ${theme.colors.buttonPrimaryHover};
      }
      
      &:disabled {
        background-color: ${theme.colors.buttonDisabled};
        cursor: not-allowed;
      }
    `,
    secondary: `
      background-color: ${theme.colors.buttonSecondary};
      color: ${theme.colors.white};
      border: none;
      font-weight: ${theme.typography.weights.bold};
      cursor: pointer;
      transition: background-color ${theme.transitions.normal};
      
      &:hover {
        background-color: ${theme.colors.buttonSecondaryHover};
      }
    `,
    danger: `
      background-color: ${theme.colors.red};
      color: ${theme.colors.white};
      border: none;
      font-weight: ${theme.typography.weights.bold};
      text-transform: uppercase;
      letter-spacing: ${theme.typography.letterSpacing.uppercase};
      cursor: pointer;
      transition: background-color ${theme.transitions.normal};
      
      &:hover {
        background-color: ${theme.colors.darkRed};
      }
    `
  };
  
  return styles[variant] || styles.primary;
};