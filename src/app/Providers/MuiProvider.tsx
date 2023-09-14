'use client';

import { CssBaseline, ThemeProvider } from '@mui/material';
//Internal App
import { useModeStore } from '@/store';
import { MuiProviderProps } from '@/interfaces';
import useGetFormStore from '@/hooks/zustanHooks';

export default function MuiProvider({ children, theme }: MuiProviderProps) {
  const currentMode = useGetFormStore(useModeStore, (state) => state.mode);
  let theTheme;

  try {
    theTheme = require(`../../themes/theme-${theme}`);
  } catch (error) {
    theTheme = require(`../../themes/theme-novo`);
  }

  return (
    <ThemeProvider theme={theTheme.changeMode(currentMode || 'light')}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
