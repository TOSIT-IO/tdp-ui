import { useState, useEffect } from 'react'
import { useTdpClient } from 'src/hooks/useTdpClient'

function HomePage() {
  const [res, setRes] = useState()
  const { defaultApi } = useTdpClient()

  useEffect(() => {
    async function fetchDefault() {
      const res = await defaultApi.rootGet()
      setRes(res.data)
    }
    fetchDefault()
  }, [defaultApi])

  return <pre>{JSON.stringify(res, null, 2)}</pre>
}

export default HomePage
