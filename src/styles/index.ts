import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
  ${reset}
  /* other styles */
  :root {
    --primary-color: #192947;
  }

  *, *::after, *::before {
    box-sizing: border-box;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-smoothing: antialiased;
  }

  body {
    font-family: 'Meiryo';
    line-height: 2;
    font-size: 16px;
    letter-spacing: 0.05em;
    background: #ffffff;
    color: #333;
  }
`;
