import { Provider } from 'react-redux'
import { AuthContextProvider, TdpClientContextProvider } from 'src/contexts'
import store from 'src/store'
import { LoadingConfig } from 'src/features/config'
import { DashboardLayout } from 'src/components/Layout'

import '../styles/globals.css'
import { LoadVariables } from 'src/features/variables/LoadVariables'
import { AppProps } from 'next/app'
import { NextPageWithLayout } from 'src/types'

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  // see https://nextjs.org/docs/basic-features/layouts#with-typescript
  const getLayout = Component.getLayout ?? ((page) => page)
  return (
    <Provider store={store}>
      <LoadingConfig>
        <AuthContextProvider>
          <TdpClientContextProvider>
            <LoadVariables>
              <DashboardLayout>
                {getLayout(<Component {...pageProps} />)}
              </DashboardLayout>
            </LoadVariables>
          </TdpClientContextProvider>
        </AuthContextProvider>
      </LoadingConfig>
    </Provider>
  )
}
