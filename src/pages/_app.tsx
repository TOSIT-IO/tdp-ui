import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { AuthContextProvider, TdpClientContextProvider } from 'src/contexts'
import store from 'src/store'
import { LoadingConfig } from 'src/features/config'

import '../styles/globals.css'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)
  return (
    <Provider store={store}>
      <LoadingConfig>
        <AuthContextProvider>
          <TdpClientContextProvider>
            {getLayout(<Component {...pageProps} />)}
          </TdpClientContextProvider>
        </AuthContextProvider>
      </LoadingConfig>
    </Provider>
  )
}
