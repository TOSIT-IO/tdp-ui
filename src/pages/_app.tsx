import { Provider } from 'react-redux'
import { AuthContextProvider } from 'src/contexts'
import store from 'src/store'
import { LoadingConfig } from 'src/store/config'
import {
  DashboardLayout,
  Loading as LoadingServices,
} from 'src/components/Layout'

import '../styles/globals.css'
import { AppProps } from 'next/app'
import { NextPageWithLayout } from 'src/types'

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  // Use the layout defined at the page level, if available
  // see https://nextjs.org/docs/basic-features/layouts#with-typescript
  const getLayout = Component.getLayout ?? ((page) => page)
  return (
    <Provider store={store}>
      <LoadingConfig>
        <AuthContextProvider>
          <LoadingServices>
            <DashboardLayout>
              {getLayout(<Component {...pageProps} />)}
            </DashboardLayout>
          </LoadingServices>
        </AuthContextProvider>
      </LoadingConfig>
    </Provider>
  )
}

export default App
