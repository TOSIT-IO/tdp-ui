import { toast } from 'react-toastify'
import { DeployRequest } from 'src/clients/tdpClient'
import { useTdpClient } from 'src/contexts'

/**
 * Hook to deploy a DAG.
 * @returns The deploy DAG function.
 */
export function useDagDeploy() {
  const { dagDeploy } = useTdpClient()

  async function deployDag(req: DeployRequest) {
    const res = await dagDeploy(req)
    res?.data?.state && toast.info(`Deploy id: ${res.data.id}`)
  }

  return deployDag
}
