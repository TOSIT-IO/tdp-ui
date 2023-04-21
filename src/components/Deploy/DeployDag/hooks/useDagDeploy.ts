import { toast } from 'react-toastify'
import { DeployRequest } from 'src/store/features/api/tdpApi'
import { useTdpClient } from 'src/contexts'
import router from 'next/router'

/**
 * Hook to deploy a DAG.
 * @returns The deploy DAG function.
 */
export function useDagDeploy() {
  const { dagDeploy } = useTdpClient()

  async function deployDag(req: DeployRequest) {
    try {
      const deploymentLog = await dagDeploy(req)
      if (deploymentLog) {
        toast.info(
          `Deploy id: ${deploymentLog.id} ; redirecting to deploy log page...`
        )
        router.push(`/deploy/logs/${deploymentLog.id}`)
      } else {
        toast.error('Error: no response from server')
      }
    } catch (error) {
      toast.error(`Error ${error.status} : ${error.statusText.toLowerCase()}`)
    }
  }

  return deployDag
}
