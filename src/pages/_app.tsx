import type { AppProps } from 'next/app'
import { TdpClientContextProvider } from 'src/contexts'
import { AuthProvider } from 'react-oidc-context'
import { useEffect, useState } from 'react'
import axios from 'axios'

const oidcDiscoveryUrl =
  'http://localhost:8080/auth/realms/tdp_server_dev/.well-known/openid-configuration'
const oidcClientId = 'tdp_auth'
const redirectUri = 'http://localhost:3000/login'

function App({ Component, pageProps }: AppProps) {
  const [oidcConfig, setOidcConfig] = useState(null)

  async function fetchAuthority() {
    const response = await axios.get(oidcDiscoveryUrl)
    const { issuer } = await response.data
    setOidcConfig({
      authority: issuer,
      client_id: oidcClientId,
      redirect_uri: redirectUri,
    })
  }

  useEffect(() => {
    fetchAuthority()
  }, [])

  return oidcConfig ? (
    <AuthProvider {...oidcConfig}>
      <TdpClientContextProvider>
        <Component {...pageProps} />
      </TdpClientContextProvider>
    </AuthProvider>
  ) : (
    <p>Waiting for the idp...</p>
  )
}
export default App
