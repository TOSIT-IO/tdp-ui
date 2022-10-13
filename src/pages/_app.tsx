import type { AppProps } from 'next/app'
import { TdpClientContext } from 'src/contexts'
import { TdpClient } from 'src/clients'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TdpClientContext.Provider value={TdpClient()}>
      <Component {...pageProps} />
    </TdpClientContext.Provider>
  )
}
export default MyApp
