'use client'

import { useAuth } from 'react-oidc-context'
import { Login } from './Login'

export function LoginPortal({ children }) {
  const auth = useAuth()

  switch (auth.activeNavigator) {
    case 'signinSilent':
      return <div>Signing you in...</div>
    case 'signoutRedirect':
      return <div>Signing you out...</div>
  }

  if (auth.isLoading) {
    return <div>Loading...</div>
  }

  if (auth.error) {
    return (
      <div>
        <div>ops... {auth.error.message}</div>
        <button
          onClick={() =>
            void auth.signinRedirect({ state: window.location.pathname })
          }
        >
          Log in
        </button>
      </div>
    )
  }

  if (auth.isAuthenticated) {
    return <>{children}</>
  }
  return <Login />
}
