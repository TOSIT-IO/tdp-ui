import { useAuth } from 'react-oidc-context'
import { Button } from '../commons'
import { useServerStatus } from './hooks'

export const Login = ({ children }) => {
  const auth = useAuth()
  const { data, error, loading } = useServerStatus()

  switch (auth.activeNavigator) {
    case 'signinSilent':
      return <div>Signing you in...</div>
    case 'signoutRedirect':
      return <div>Signing you out...</div>
  }

  if (auth.isLoading) return <div>Loading...</div>

  if (auth.error)
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

  if (auth.isAuthenticated) return <>{children}</>

  //TODO: set running false when error and remove error when server is back running
  return (
    <div className="flex flex-col items-center gap-2 pt-[30vh]">
      <p>{`tdp-server running: ${loading ? 'Loading...' : data}`}</p>
      <Button
        variant="filled"
        onClick={() => auth.signinRedirect({ state: window.location.pathname })}
        disabled={loading}
      >
        Log in
      </Button>
      {error && <p className="text-red-700">{`Error: ${error.message}`}</p>}
    </div>
  )
}
