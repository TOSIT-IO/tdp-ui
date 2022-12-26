import { useCallback, useEffect, useState } from 'react'
import { DeployRequest, Operation } from '@/client-sdk'
import { useTdpClient } from 'src/contexts'

/**
 * Hook to fetch the DAG deploy preview.
 * @param deployDagReq - The deploy request to use to fetch the preview.
 * @returns The DAG deploy preview, an error and a loading flag.
 */
export function useDagDeployPreview(deployDagReq: DeployRequest) {
  const { planApi } = useTdpClient()
  const [preview, setPreview] = useState<Operation[]>([])
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchPreview = useCallback(
    async (deployDagReq: DeployRequest) => {
      setLoading(true)
      try {
        const res = await planApi.getDagPlanApiV1PlanDagPost(deployDagReq)
        setPreview(res.data)
      } catch (e) {
        setError(e)
      } finally {
        setLoading(false)
      }
    },
    [planApi]
  )

  useEffect(() => {
    fetchPreview(deployDagReq)
  }, [fetchPreview, deployDagReq])

  return { preview, error, loading }
}
