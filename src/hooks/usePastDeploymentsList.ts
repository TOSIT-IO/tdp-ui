import { DeploymentLog } from 'src/clients/tdpClient'
import { useEffect, useState } from 'react'
import { useTdpClient } from 'src/contexts'

export function usePastDeploymentsRichList() {
  const { getDeployments } = useTdpClient()

  const [pastDeploymentsList, setPastDeploymentsList] = useState<
    DeploymentLog[]
  >([])

  useEffect(() => {
    async function fetchPastDeploymentsList() {
      const res = await getDeployments()
      setPastDeploymentsList(res)
    }
    fetchPastDeploymentsList()
  }, [getDeployments])

  return pastDeploymentsList
}
