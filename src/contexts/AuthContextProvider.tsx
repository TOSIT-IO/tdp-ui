import { useState, useEffect } from 'react'
import { AuthProvider } from 'react-oidc-context'
import type { AuthProviderProps } from 'react-oidc-context'
import config from 'src/config'

export function AuthContextProvider({ children }): JSX.Element {
  const [oidcConfig, setOidcConfig] = useState<AuthProviderProps>(null)

  useEffect(() => {
    async function fetchAuthority() {
      const response = await fetch(config.oidcDiscoveryUrl)
      const { issuer } = await response.json()
      setOidcConfig({
        authority: issuer,
        client_id: config.oidcClientId,
        redirect_uri: config.redirectUri,
        scope: config.scope,
      })
    }
    fetchAuthority()
  }, [])

  return oidcConfig && <AuthProvider {...oidcConfig}>{children}</AuthProvider>
}
