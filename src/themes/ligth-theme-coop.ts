import { createTheme } from '@mui/material';

interface PaletteColor {
  tertiary?: string;
  quaternary?: string;
  fifth?: string;
}

declare module '@mui/material/styles' {
  interface PaletteOptions {
    custom?: PaletteColor;
  }
}

const white = '#fff';
const primary = '#0BC53E';
const secondary = '#F3F4F8';
const tertiary = '#A19DA2';
const quaternary = '#f4f4f4';
const fifth = '#e5e5e5';


 export const theme = (mode:string) => createTheme({
  palette: {
    mode: 'light',
    background: {
      default: white,
    },
    primary: {
      main: primary,
    },
    secondary: {
      main: secondary,
    },
    custom: {
      tertiary: tertiary,
      quaternary: quaternary,
      fifth: fifth,
    },
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundColor: white,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: secondary,
          minWidth: '95px',
          padding: '8px',
          textAlign: 'center',
          color: tertiary,
          fontWeight: 600,
          fontSize: 16,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          position: 'relative',
          minWidth: '140px',
          justifyContent: 'left',
          borderColor: quaternary,
          backgroundColor: quaternary,
        },
        icon: {
          position: 'absolute',
          color: primary,
          left: 0,
        },
        label: {
          position: 'relative',
          color: tertiary,
          fontWeight: '600',
        },
        avatar: {
          backgroundColor: white,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          letterSpacing: 'normal',
          minWidth: '140px',
          height: '40px'
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        sizeMedium: {
          padding: '12px 16px',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          color: tertiary,
          '&:-webkit-autofill': {
            WebkitTextFillColor: tertiary,
          },
          '&.Mui-disabled': {
            WebkitTextFillColor: secondary,
            opacity: 0.5,
          },
        },
        root: {
          backgroundColor: white,
          borderRadius: '10px',
          borderWidth: '1px',
          height: '48px',
          ':hover': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: tertiary,
              borderRadius: '10px',
            },
          },
          '&.Mui-error': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#d32f2f',
            },
          },
          fieldset: {
            borderWidth: '1px',
          },
          '&.Mui-disabled': {
            backgroundColor: tertiary,
            borderColor: tertiary,
            color: tertiary,
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: secondary,
            },
          },
          '&.Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: tertiary,
              borderWidth: '1px',
            },
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: white,
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            backgroundColor: white,
            width: '8px',
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 8,
            backgroundColor: tertiary,
            border: '1px solid',
            borderColor: tertiary,
          },
        },
      },
    },
  },
});
