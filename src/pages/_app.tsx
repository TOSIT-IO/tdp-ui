import { Provider } from 'react-redux'
import { AuthContextProvider, TdpClientContextProvider } from 'src/contexts'
import store from 'src/store'
import { LoadingConfig } from 'src/features/config'
import { DashboardLayout } from 'src/components/Layout'

import '../styles/globals.css'
import { LoadVariables } from 'src/features/variables/LoadVariables'
import { AppProps } from 'next/app'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <LoadingConfig>
        <AuthContextProvider>
          <TdpClientContextProvider>
            <LoadVariables>
              <DashboardLayout>
                <Component {...pageProps} />
              </DashboardLayout>
            </LoadVariables>
          </TdpClientContextProvider>
        </AuthContextProvider>
      </LoadingConfig>
    </Provider>
  )
}
