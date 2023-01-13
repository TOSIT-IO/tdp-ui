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
    const res = await operationsDeploy(req)
    res?.data?.state && toast.info(`Deploy id: ${res.data.id}`)
  }

  return { deployOperations }
}
