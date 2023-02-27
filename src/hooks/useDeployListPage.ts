import { DeploymentLog } from 'src/clients/tdpClient'
import { useEffect, useState } from 'react'
import { useTdpClient } from 'src/contexts'

export function useDeployListPage(
  limit: number,
  offset: number
): DeploymentLog[] {
  const { getDeployments } = useTdpClient()

  const [pastDeploymentsList, setPastDeploymentsList] = useState<
    DeploymentLog[]
  >([])

  useEffect(() => {
    async function fetchPastDeploymentsList(limit: number, offset: number) {
      const res = await getDeployments(limit, offset)
      setPastDeploymentsList(res)
    }
    fetchPastDeploymentsList(limit, offset)
    console.log('limit : ' + limit + ' offset : ' + offset)
  }, [getDeployments, limit, offset])

  return pastDeploymentsList
}
