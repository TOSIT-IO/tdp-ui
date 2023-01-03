import { useAuth } from 'react-oidc-context'
import { Button } from '../commons'
import { useServerStatus } from './hooks'

export function Login() {
  const { signinRedirect } = useAuth()
  const { data, error, loading } = useServerStatus()
  return (
    <div className="pt-[30vh] flex items-center flex-col gap-2">
      <p>{`tdp-server running: ${loading ? 'Loading...' : data}`}</p>
      <Button
        variant="filled"
        onClick={() => signinRedirect()}
        disabled={loading}
      >
        Log in
      </Button>
      {error && <p className="text-red-700">{`Error: ${error.message}`}</p>}
    </div>
  )
}
