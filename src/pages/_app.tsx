import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material'
import { theme } from 'src/config/theme'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
