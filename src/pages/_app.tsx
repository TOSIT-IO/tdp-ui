import type { AppProps } from 'next/app'
import { TdpClientContextProvider } from 'src/contexts'

function App({ Component, pageProps }: AppProps) {
  return (
    <TdpClientContextProvider>
      <Component {...pageProps} />
    </TdpClientContextProvider>
  )
}
export default App
