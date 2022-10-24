import type { AppProps } from 'next/app'
import { TdpClientContextProvider, AuthContextProvider } from 'src/contexts'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <TdpClientContextProvider>
        <Component {...pageProps} />
      </TdpClientContextProvider>
    </AuthContextProvider>
  )
}
