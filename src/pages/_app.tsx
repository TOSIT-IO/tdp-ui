import { Provider } from 'react-redux'
import { AuthContextProvider } from 'src/contexts'
import store from 'src/store'
import { LoadingConfig } from 'src/features/config'
import { DashboardLayout, Loading } from 'src/components/Layout'

import '../styles/globals.css'
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
          <Loading>
            <DashboardLayout>
              {getLayout(<Component {...pageProps} />)}
            </DashboardLayout>
          </Loading>
        </AuthContextProvider>
      </LoadingConfig>
    </Provider>
  )
}
