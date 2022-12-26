import { toast } from 'react-toastify'
import { DeployRequest } from '@/client-sdk'
import { useTdpClient } from 'src/contexts'

/**
 * Hook to deploy a DAG.
 * @returns The deploy DAG function.
 */
export function useDagDeploy() {
  const { deployApi } = useTdpClient()

  async function deployDag(req: DeployRequest) {
    const res = await deployApi.deployNodeApiV1DeployPost(req)
    res?.data?.state && toast.info(`Deploy id: ${res.data.id}`)
  }

  return deployDag
}
