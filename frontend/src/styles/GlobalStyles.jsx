import { createGlobalStyle } from "styled-components";
import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  html, body, #root {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  #root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  body {
    font-family: ${theme.typography.fontFamily};
    color: ${theme.colors.primaryText};
    line-height: 1.5;
    overflow-x: hidden;
    background-color: ${theme.colors.black};
    min-height: 100vh;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  h1, h2, h3 {
    font-family: ${theme.typography.headingFamily};
    letter-spacing: ${theme.typography.letterSpacing.uppercase};
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }
`;
