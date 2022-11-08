'use client'

import { useAuth } from 'react-oidc-context'

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
    return <div>Oops... {auth.error.message}</div>
  }

  if (auth.isAuthenticated) {
    console.log('Authentifié')
    return <>{children}</>
  }
  return <button onClick={() => void auth.signinRedirect()}>Log in</button>
}
