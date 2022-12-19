import { useEffect, useState } from 'react'
import { useTdpClient } from 'src/contexts'

import type { DeploymentLogWithOperations } from '@/client-sdk'

export function useDeployLogInfos(deployLogId: number) {
  const { deployApi } = useTdpClient()

  const [deploymentLog, setDeploymentLog] =
    useState<DeploymentLogWithOperations>(null)

  useEffect(() => {
    async function fetchDeployInfos() {
      const res = await deployApi.getDeploymentApiV1DeployDeploymentIdGet(
        deployLogId
      )
      setDeploymentLog(res.data)
    }
    deployLogId && fetchDeployInfos()
  }, [deployApi, deployLogId])

  return deploymentLog
}
