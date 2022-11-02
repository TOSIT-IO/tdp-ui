import { useState } from 'react'
import { useTdpClient } from 'src/contexts'

export function useHdfsVariables() {
  const { servicesApi } = useTdpClient()
  const [hdfsVariables, setHdfsVariables] = useState({})

  async function getHdfsVariables() {
    const res = await servicesApi.getServiceApiV1ServiceServiceIdGet('hdfs')
    setHdfsVariables(res.data)
  }
  getHdfsVariables()

  return hdfsVariables
}
