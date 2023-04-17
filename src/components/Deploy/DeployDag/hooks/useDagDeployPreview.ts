import { useCallback, useEffect, useState } from 'react'
import { DeployRequest, Operation } from 'src/features/api/tdpApi'
import { useTdpClient } from 'src/contexts'

/**
 * Hook to fetch the DAG deploy preview.
 * @param deployDagReq - The deploy request to use to fetch the preview.
 * @returns The DAG deploy preview, an error and a loading flag.
 */
export function useDagDeployPreview(deployDagReq: DeployRequest) {
  const { planDeployDag } = useTdpClient()
  const [preview, setPreview] = useState<Operation[]>([])
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchPreview = useCallback(
    async (deployDagReq: DeployRequest) => {
      setLoading(true)
      try {
        const res = await planDeployDag(deployDagReq)
        setPreview(res)
      } catch (e) {
        setError(e)
      } finally {
        setLoading(false)
      }
    },
    [planDeployDag]
  )

  useEffect(() => {
    fetchPreview(deployDagReq)
  }, [fetchPreview, deployDagReq])

  return { preview, error, loading }
}
