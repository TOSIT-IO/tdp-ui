import Link from 'next/link'
import { useServerStatus } from 'src/hooks'

export default function App() {
  const isServerRunning = useServerStatus()
  return (
    <>
      <h1 className="font-black text-lg">Login page</h1>
      <div className="flex gap-2">
        <p>tdp-server running: </p>
        <pre>{JSON.stringify(isServerRunning, null, 2)}</pre>
      </div>

      <Link href="/dashboard" className="text-blue-800 underline">
        To the dashboard
      </Link>
    </>
  )
}
