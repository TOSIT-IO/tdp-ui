import { useState, useEffect } from 'react'
import { AuthProvider } from 'react-oidc-context'
import type { AuthProviderProps } from 'react-oidc-context'
import config from 'src/config'
import { LoginPortal } from 'src/app/LoginPortal'

export function AuthContextProvider({ children }): JSX.Element {
  const [oidcConfig, setOidcConfig] = useState<AuthProviderProps>(null)

  useEffect(() => {
    async function fetchAuthority() {
      const response = await fetch(config.oidcDiscoveryUrl)
      const { issuer }: { issuer: string } = await response.json()
      setOidcConfig({
        authority: issuer,
        client_id: config.oidcConfig.oidcClientId,
        redirect_uri: config.oidcConfig.redirectUri,
        scope: config.oidcConfig.scope,
        post_logout_redirect_uri: config.oidcConfig.postLogoutRedirectUri,
      })
    }
    fetchAuthority()
  }, [])

  if (oidcConfig)
    return (
      <AuthProvider {...oidcConfig}>
        <LoginPortal>{children}</LoginPortal>
      </AuthProvider>
    )
  return <p>Loading oidc provider...</p>
}
