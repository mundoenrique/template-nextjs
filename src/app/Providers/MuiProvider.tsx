'use client';

import { CssBaseline, ThemeProvider } from '@mui/material';
//Internal App
import { log_message } from '@/utils';
import { ProviderProps, ThemeProviderProps } from '@/interfaces';

export default function MuiProvider({ children, theme }: ProviderProps & ThemeProviderProps) {
  let theTheme;

  try {
    theTheme = require(`../../themes/theme-${theme}`);
  } catch (error) {
    theTheme = require(`../../themes/theme-novo`);
  }

  log_message('debug', `Load the theme ${theme}`);

  return (
    <ThemeProvider theme={theTheme.changeMode('light')}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
