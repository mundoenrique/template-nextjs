'use client';

import { CssBaseline, ThemeProvider } from '@mui/material';
//Internal App
import { log_message } from '@/utils';
import useGetFormStore from '@/hooks/zustanHooks';
import { useModeStore, useFontSizeStore } from '@/store';
import { ProviderProps, ThemeProviderProps } from '@/interfaces';

export default function MuiProvider({ children, theme }: ProviderProps & ThemeProviderProps) {
  const currentMode = useGetFormStore(useModeStore, (state) => state.mode);
  const currentSizeFont = useGetFormStore(useFontSizeStore, (state) => state.fontSize);
  let theTheme;

  try {
    theTheme = require(`../../themes/theme-${theme}`);
  } catch (error) {
    theTheme = require(`../../themes/theme-novo`);
  }

  log_message('debug', `Load the theme ${theme}`);

  return (
    <ThemeProvider theme={theTheme.changeMode(currentMode || 'light', currentSizeFont)}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
