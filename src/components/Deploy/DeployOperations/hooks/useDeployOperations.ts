import { OperationsRequest } from '@/client-sdk'
import { toast } from 'react-toastify'
import { useTdpClient } from 'src/contexts'

/**
 * Hook to deploy operations.
 * @returns The deploy operations function.
 */
export function useDeployOperations() {
  const { deployApi } = useTdpClient()

  async function deployOperations(req: OperationsRequest) {
    const res = await deployApi.operationsApiV1DeployOperationsPost(req)
    res?.data?.state && toast.info(`Deploy id: ${res.data.id}`)
  }

  return { deployOperations }
}
