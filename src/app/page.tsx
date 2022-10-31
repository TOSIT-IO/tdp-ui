'use client'

import { useTdpClient } from 'src/hooks/useTdpClient'

export default function App() {
  const { isServerRunning } = useTdpClient()
  return <pre>{JSON.stringify(isServerRunning, null, 2)}</pre>
}
