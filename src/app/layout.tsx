import { MuiProvider } from "./MuiProvider"

export const metadata = {
  title: "Next Challenge",
  description: "My description",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <MuiProvider theme={'ligth-theme'}>{children}</MuiProvider>
      </body>
    </html>
  )
}