import { useCallback, useEffect, useState } from 'react'
import { useTdpClient } from 'src/contexts'

export function useServerStatus() {
  const { defaultApi } = useTdpClient()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error>(null)

  const fetchServerStatus = useCallback(async () => {
    try {
      const res = await defaultApi.rootGet()
      setData(!!res.data)
    } catch (e) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }, [defaultApi])

  const fetchServerStatusPeriodically = useCallback(() => {
    const interval = setInterval(fetchServerStatus, 1000)
    return () => clearInterval(interval)
  }, [fetchServerStatus])

  useEffect(() => {
    fetchServerStatus()
    fetchServerStatusPeriodically()
  }, [fetchServerStatus, fetchServerStatusPeriodically])

  return { data, loading, error }
}
