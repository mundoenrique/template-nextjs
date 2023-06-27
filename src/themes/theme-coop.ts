import { createTheme } from '@mui/material';

export const theme = (mode: string) => createTheme({
  typography: {
    fontFamily: 'Myriad Pro, sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Myriad';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Myriad'), local('Myriad-regular'), url(/fonts/coop/Myriad-Pro-Regular.woff) format('woff');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
    },
    MuiButton: {
      defaultProps: {
        style: {
          textTransform: 'none',
          letterSpacing: 'normal',
          height: '50px',
          background: 'green'
        },
      },
    },
  },
});