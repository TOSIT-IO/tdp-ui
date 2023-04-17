import { OperationsRequest } from 'src/features/api/tdpApi'
import { toast } from 'react-toastify'
import { useTdpClient } from 'src/contexts'
import router from 'next/router'

/**
 * Hook to deploy operations.
 * @returns The deploy operations function.
 */
export function useDeployOperations() {
  const { operationsDeploy } = useTdpClient()

  async function deployOperations(req: OperationsRequest) {
    try {
      const deploymentLog = await operationsDeploy(req)
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

  return { deployOperations }
}
