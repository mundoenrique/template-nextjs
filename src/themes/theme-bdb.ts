import { createTheme } from '@mui/material';

const white = '#fff';
const black = '#000';

// Primary color - Tenant
const primary = '#1C83E1';

// Primary color mode dark
const primaryDark = '#0b2741';

//Secondary color - Tenant
const secondary = '#A19DA2';

// Text color variables
const textColor = '#A19DA2';

// Grayscale variables
const greyLight = '#f3f3f3';
const greyNormal = '#d3d3d3';
const greyDark = '#c4c4c4';

// Border variables
const borderRadius = 4;

// Font size variables
const h1 = 28; //28px
const h2 = 24; //24px
const h3 = 22; //22px
const h4 = 20; //20px
const h5 = 18; //18px
const text = 16; //16px
const small = 12; //12px

export function changeMode(mode: string, count: number) {
  const theme = createTheme({
    palette: {
      primary: {
        main: primary,
      },
      secondary: {
        main: secondary,
      },
      grey: {
        50: greyLight,
        100: greyNormal,
        200: greyDark,
        300: textColor,
      },
    },
    //Custom typography
    typography: {
      fontFamily: 'OpenSans',
      allVariants: {
        color: mode === 'light' ? textColor : white,
        fontSize: `${count + text}px`,
      },
      h1: {
        fontSize: `${count + h1}px`,
      },
      h2: {
        fontSize: `${count + h2}px`,
      },
      h3: {
        fontSize: `${count + h3}px`,
      },
      h4: {
        fontSize: `${count + h4}px`,
      },
      h5: {
        fontSize: `${count + h5}px`,
      },
      body1: {
        fontSize: `${count + text}px`,
      },
      caption: {
        fontSize: `${count + small}px`,
      },
    },
    // Border radius
    shape: {
      borderRadius: borderRadius,
    },
    components: {
      // Typography
      MuiTypography: {
        styleOverrides: {
          root: {
            color: textColor,
          },
        },
      },
      // Global component styles
      MuiCssBaseline: {
        styleOverrides: `
        @font-face {
          font-family: 'OpenSans';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('OpenSans'), local('OpenSans-Regular'), url(/fonts/bdb/OpenSans-Regular.ttf) format('ttf');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
				@font-face {
          font-family: 'OpenSans';
          font-style: Bold;
          font-display: swap;
          font-weight: 700;
          src: local('OpenSans'), local('OpenSans-Bold'), url(/fonts/bdb/OpenSans-Bold.ttf) format('ttf');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
				.grecaptcha-badge {
					width: 70px !important;
					overflow: hidden !important;
					transition: all 0.3s ease !important;
					left: -2px !important;
					bottom: 20px !important;
				}
				.grecaptcha-badge:hover {
					width: 256px !important;
				}
        `,
      },
      // Main container styles
      MuiContainer: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'light' ? white : primaryDark,
            maxWidth: 'initial !important',
            flex: 'auto',
            paddingLeft: '0 !important',
            paddingRight: '0 !important',
          },
        },
      },
      //NavBar
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: primary,
            boxShadow: 'none',
            height: '88px',
          },
        },
      },
      //Button
      MuiButton: {
        styleOverrides: {
          root: {
            color: mode === 'light' ? '' : white,
            fontSize: `${count + text}px`,
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
            color: mode === 'light' ? '' : white,
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
            height: '40px',
            width: '40px',
          },
        },
      },
      //Divider - hr
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
      // Inputs styles
      MuiInputBase: {
        styleOverrides: {
          root: {
            color: textColor,
          },
          input: {
            borderRadius: borderRadius,
            padding: '14.23px 14px !important',
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: mode === 'light' ? '' : textColor,
            backgroundColor: mode === 'light' ? '' : white,
            borderRadius: mode === 'light' ? '' : borderRadius,
            paddingLeft: mode === 'light' ? '' : 8,
            paddingRight: mode === 'light' ? '' : 8,
            '&.Mui-focused': {
              color: mode === 'light' ? '' : textColor,
              backgroundColor: mode === 'light' ? '' : white,
              borderRadius: mode === 'light' ? '' : borderRadius,
              paddingLeft: mode === 'light' ? '' : 8,
              paddingRight: mode === 'light' ? '' : 8,
            },
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            color: mode === 'light' ? '' : textColor,
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          input: {
            color: textColor,
            '&:-webkit-autofill': {
              WebkitTextFillColor: mode === 'light' ? textColor : '',
              WebkitBoxShadow: mode === 'light' ? '' : `0 0 0 100px ${white} inset`,
            },
            '&.Mui-disabled': {
              WebkitTextFillColor: mode === 'light' ? textColor : '',
              opacity: 0.5,
            },
          },
          root: {
            backgroundColor: white,
            ':hover': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: secondary,
              },
            },
            '&.Mui-error': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: secondary,
              },
            },
            fieldset: {
              borderWidth: '.5px',
            },
            '&.Mui-disabled': {
              backgroundColor: greyLight,
              borderColor: secondary,
              color: textColor,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: secondary,
              },
            },
            '&.Mui-focused': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: secondary,
              },
            },
          },
        },
      },
      MuiRadio: {
        styleOverrides: {
          root: {
            color: mode === 'light' ? '' : secondary,
          },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            color: mode === 'light' ? '' : secondary,
          },
        },
      },
      //Modals
      MuiModal: {
        styleOverrides: {
          root: {
            '& > .container-modal': {
              backgroundColor: white,
              borderRadius: borderRadius,
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              position: 'absolute',
              paddingTop: '16px',
              paddingBottom: '16px',
              width: '100%',
              '& .modal-text': {
                color: textColor,
                display: 'flex',
                flexDirection: 'column',
                height: 'auto',
                overflowY: 'auto',
              },
            },
          },
        },
      },
      //Avatar
      MuiAvatar: {
        styleOverrides: {
          root: {
            backgroundColor: greyLight,
            color: primary,
            width: '44px',
            height: '44px',
          },
        },
      },
    },
  });

  return theme;
}
