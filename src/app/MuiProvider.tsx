"use client"

import { CssBaseline, ThemeProvider } from "@mui/material"
import { FC, ReactNode } from "react"

type Props = {
  children: ReactNode
  theme?: any
}

export const MuiProvider:FC<Props> = ({ children, theme}) => {

	let theTheme

	try {
  	theTheme = require(`../themes/${theme}`).theme(true)
	} catch (error) {
  	theTheme = require(`../themes/ligth-theme`).theme(true)
	}

  return (

  <ThemeProvider theme={theTheme}>
    <CssBaseline />
      {children}
  </ThemeProvider>

  )
}
