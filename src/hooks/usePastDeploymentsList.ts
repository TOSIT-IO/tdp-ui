import { DeploymentLog } from '@/client-sdk'
import { useEffect, useState } from 'react'
import { useTdpClient } from 'src/contexts'

export function usePastDeploymentsRichList() {
  const { deployApi } = useTdpClient()

  const [pastDeploymentsList, setPastDeploymentsList] = useState<
    DeploymentLog[]
  >([])

  useEffect(() => {
    async function fetchPastDeploymentsList() {
      const res = await deployApi.getDeploymentsApiV1DeployGet()
      setPastDeploymentsList(res.data)
    }
    fetchPastDeploymentsList()
  }, [deployApi])

  return pastDeploymentsList
}
