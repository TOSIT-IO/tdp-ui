import { useCallback, useEffect, useState } from 'react'
import { useAppSelector } from 'src/store'

export const useServerStatus = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error>(null)
  const {
    value: { apiBasePath },
  } = useAppSelector((state) => state.config)

  const fetchServerStatus = useCallback(async () => {
    try {
      const res = await fetch(apiBasePath)
      setData(!!res)
    } catch (e) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }, [apiBasePath])

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
