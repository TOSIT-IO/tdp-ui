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
    try {
      const res = await dagDeploy(req)
      res && res?.state && toast.info(`Deploy id: ${res.id}`)
    } catch (error) {
      toast.error(`Error ${error.status} : ${error.statusText.toLowerCase()}`)
    }
  }

  return deployDag
}
