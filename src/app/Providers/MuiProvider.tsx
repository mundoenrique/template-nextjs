"use client";

import { Box, CssBaseline, ThemeProvider } from "@mui/material";
//Internal App
import { MuiProviderProps } from "@/interfaces";
import { Footer } from "../components/UI";
import { log_message } from "@/utils";

export default function MuiProvider({ children, theme }: MuiProviderProps) {
  let theTheme;

  try {
    theTheme = require(`../../themes/theme-${theme}`);
  } catch (error) {
    theTheme = require(`../../themes/theme-novo`);
  }

  log_message(`Carga el tema ${theme}`)

  return (
    <ThemeProvider theme={theTheme.changeMode("light")}>
      <CssBaseline />
      <Box sx={{ height: "100vh" }}>
        {children}
        <Footer tenant={theme} />
      </Box>
    </ThemeProvider>
  );
}
