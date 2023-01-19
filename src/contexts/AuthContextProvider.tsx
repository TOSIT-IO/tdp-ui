import { useEffect, useState } from 'react'
import { WebStorageStateStore } from 'oidc-client-ts'
import { AuthProvider, AuthProviderProps } from 'react-oidc-context'
import { LoginPortal } from 'src/components/Login'
import { useSelectConfig } from 'src/features/config/hooks'

export function AuthContextProvider({ children }) {
  const { value: config } = useSelectConfig()
  const [oidcConfig, setOidcConfig] = useState<AuthProviderProps>(null)

  useEffect(() => {
    async function createOidcConfig() {
      const response = await fetch(config.oidc.discoveryUrl)
      const { issuer } = await response.json()
      setOidcConfig({
        authority: issuer,
        client_id: config.oidc.clientId,
        redirect_uri: config.oidc.redirectUri,
        scope: config.oidc.scope,
        post_logout_redirect_uri: config.oidc.redirectUri,
        userStore:
          typeof window !== 'undefined' &&
          new WebStorageStateStore({ store: localStorage }),
      })
    }
    createOidcConfig()
  }, [config])

  if (!oidcConfig) return null

  return (
    <AuthProvider {...oidcConfig}>
      <LoginPortal>{children}</LoginPortal>
    </AuthProvider>
  )
}
