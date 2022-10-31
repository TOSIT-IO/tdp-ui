import { useState } from 'react'
import { useTdpClient } from 'src/contexts'

export function useServerStatus() {
  const { defaultApi } = useTdpClient()
  const [isServerRunning, setIsServerRunning] = useState(null)

  async function getStatus() {
    setTimeout(async () => {
      const res = await defaultApi.rootGet()
      setIsServerRunning(!!res.data)
    }, 1000)
  }
  getStatus()

  return isServerRunning
}
