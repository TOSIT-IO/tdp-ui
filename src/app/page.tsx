'use client'

import { useTdpClient } from 'src/hooks/useTdpClient'

export default function App() {
  const { isServerRunning } = useTdpClient()
  return (
    <pre className="text-rose-600">
      {JSON.stringify(isServerRunning, null, 2)}
    </pre>
  )
}
