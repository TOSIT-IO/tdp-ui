import { OperationsRequest } from 'src/clients/tdpClient'
import { toast } from 'react-toastify'
import { useTdpClient } from 'src/contexts'

/**
 * Hook to deploy operations.
 * @returns The deploy operations function.
 */
export function useDeployOperations() {
  const { operationsDeploy } = useTdpClient()

  async function deployOperations(req: OperationsRequest) {
    try {
      const res = await operationsDeploy(req)
      res && toast.info(`Deploy id: ${res.id}`)
    } catch (error) {
      toast.error(`Error ${error.status} : ${error.statusText.toLowerCase()}`)
    }
  }

  return { deployOperations }
}
