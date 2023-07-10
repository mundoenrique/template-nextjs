import { createTheme } from '@mui/material';

const white = '#fff';
const black = '#000'

// Primary color - Tenant
const primary = '#0D5D56';

// Text color variables
const secondary = '#A19DA2';

// Grayscale variables
const greyLight = '#f3f3f3';
const greyNormal = '#d3d3d3';
const greyDark = '#c4c4c4';

// Border variables
const borderRadius = 4;

// Font size variables
const h1 = '3rem'; //28px
const h2 = '1.75rem'; //24px
const h3 = '1.5rem'; //22px
const h4 = '1.25rem'; //20px
const h5 = '1.125rem'; //18px
const text = '0.938rem'; //16px
const small = '0.75rem'; //12px

export function changeMode(mode: string) {
  const theme = createTheme({
    palette: {
      primary: {
        main: primary,
      },
      secondary: {
        main: secondary,
      },
      grey: {
        50:  greyLight,
        100: greyNormal,
        200: greyDark,
      }
    },
    //Custom typography
    typography: {
      fontFamily: 'Prelo',
      allVariants: {
        color: mode === 'light' ? secondary : white,
        fontSize: text,
      },
      h1: {
        fontSize: h1,
      },
      h2: {
        fontSize: h2,
      },
      h3: {
        fontSize: h3,
      },
      h4: {
        fontSize: h4,
      },
      h5: {
        fontSize: h5,
      },
      body1: {
        fontSize: text,
      },
      caption: {
        fontSize: small,
      }
    },
    // Border radius
    shape: {
      borderRadius: borderRadius,
    },
    components: {
      //Global component styles
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
      //Button
      MuiButton: {
        styleOverrides: {
          root: {
            color: mode === 'light' ? '' : white,
            fontSize: text,
            height: '50px',
            letterSpacing: 'normal',
            minWidth: '115px',
            textTransform: 'none',
            ':hover': {
              background: primary,
            },
          },
          contained: {
            background: primary,
          },
          textPrimary: {
            color: primary,
            ':hover': {
              background: 'transparent',
            },
          },
          outlinedPrimary: {
            ':hover': {
              backgroundColor: primary,
              color: white,
            },
          },
        },
      },
      //Support Button
      MuiFab: {
        styleOverrides: {
          root: {
            background: primary,
            height: "40px",
            width: "40px",
          }
        }
      },
      //Divider - hr
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: "rgba(0, 0, 0, 0.5)"
          }
        }
      }
    },
  });

  return theme;
}


