'use client';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { SessionProvider } from "next-auth/react"
//Internal App
import { MuiProviderProps } from '@/interfaces';
import { log_message } from "@/utils";

export default function MuiProvider({ children, theme, session }: MuiProviderProps) {
  let theTheme;

  try {
    theTheme = require(`../../themes/theme-${theme}`);
  } catch (error) {
    theTheme = require(`../../themes/theme-novo`);
  }

  log_message('debug',`Carga el tema ${theme}`)

  return (
    <ThemeProvider theme={theTheme.changeMode('light')}>
			<CssBaseline />
			<SessionProvider session={session}>
				{children}
			</SessionProvider>
    </ThemeProvider>
  );
}
