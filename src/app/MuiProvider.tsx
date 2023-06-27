"use client";

import { Container, CssBaseline, ThemeProvider } from "@mui/material";
//Internal App
import { MuiProviderProps } from "@/interfaces";

export default function MuiProvider({ children, theme }: MuiProviderProps) {
  let theTheme;

  try {
    theTheme = require(`../themes/${theme}`).theme(true);
  } catch (error) {
    theTheme = require(`../themes/theme-novo`).theme(true);
  }

  return (
    <ThemeProvider theme={theTheme}>
      <CssBaseline />
      <Container
        maxWidth={false}
        sx={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          height: "100vh",
        }}
        disableGutters
      >
        {children}
      </Container>
    </ThemeProvider>
  );
}
