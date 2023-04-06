import { DeploymentLog } from 'src/clients/tdpClient'
import { useEffect, useState } from 'react'
import { useTdpClient } from 'src/contexts'

export function useFetchLogsPage(
  pageSize: number = 15,
  currentPage: number = 0
): DeploymentLog[] {
  const { getDeployments } = useTdpClient()

  const [logsPage, setLogsPage] = useState<DeploymentLog[]>([])

  useEffect(() => {
    async function fetchLogsPage(pageSize: number, currentPage: number) {
      const offset = currentPage * pageSize
      const res = await getDeployments(pageSize, offset)
      setLogsPage(res)
    }
    fetchLogsPage(pageSize, currentPage)
    console.log('limit : ' + pageSize + ' offset : ' + currentPage)
  }, [getDeployments, pageSize, currentPage])

  return logsPage
}
