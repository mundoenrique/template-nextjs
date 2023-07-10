"use client";

import { Box, CssBaseline, ThemeProvider } from "@mui/material";
//Internal App
import { MuiProviderProps } from "@/interfaces";
import { Footer, SupportButton } from "../components/UI";

export default function MuiProvider({ children, theme }: MuiProviderProps) {
  let theTheme;

  try {
    theTheme = require(`../../themes/theme-${theme}`);
  } catch (error) {
    theTheme = require(`../../themes/theme-novo`);
  }

  return (
    <ThemeProvider theme={theTheme.changeMode("light")}>
      <CssBaseline />
      <Box sx={{ height: "100vh" }}>
        {children}
        <SupportButton tenant={theme} />
        <Footer tenant={theme} />
      </Box>
    </ThemeProvider>
  );
}
