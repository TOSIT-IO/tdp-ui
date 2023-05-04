import { useEffect, useState } from 'react'
import { WebStorageStateStore } from 'oidc-client-ts'
import { AuthProvider, AuthProviderProps } from 'react-oidc-context'
import { Login } from 'src/components/Login'
import { useAppSelector } from 'src/store'
import router from 'next/router'

export const AuthContextProvider = ({ children }) => {
  const {
    value: { oidc, skipAuth },
  } = useAppSelector((state) => state.config)
  const [oidcConfig, setOidcConfig] = useState<AuthProviderProps>(null)

  useEffect(() => {
    const createOidcConfig = async () => {
      // TODO: refactor "fetch" to RTK Query API
      const response = await fetch(oidc.discoveryUrl)
      const { issuer } = await response.json()
      setOidcConfig({
        authority: issuer,
        client_id: oidc.clientId,
        redirect_uri: oidc.redirectUri,
        scope: oidc.scope,
        post_logout_redirect_uri: oidc.redirectUri,
        userStore:
          typeof window !== 'undefined' &&
          new WebStorageStateStore({ store: localStorage }),
        onSigninCallback: (user) => {
          if (user) router.push(user.state)
        },
      })
    }
    skipAuth ? setOidcConfig({}) : createOidcConfig()
  }, [oidc, skipAuth])

  if (!oidcConfig) return null

  return (
    <AuthProvider {...oidcConfig}>
      {!skipAuth ? <Login>{children}</Login> : children}
    </AuthProvider>
  )
}
