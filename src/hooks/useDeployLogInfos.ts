import { useEffect, useState } from 'react'
import { useTdpClient } from 'src/contexts'

import type { DeploymentLogWithOperations } from 'src/clients/tdpClient'

export function useDeployLogInfos(deployLogId: number) {
  const { getDeployment } = useTdpClient()

  const [deploymentLog, setDeploymentLog] =
    useState<DeploymentLogWithOperations>(null)

  useEffect(() => {
    async function fetchDeployInfos() {
      const res = await getDeployment(deployLogId)
      setDeploymentLog(res)
    }
    deployLogId && fetchDeployInfos()
  }, [getDeployment, deployLogId])

  return deploymentLog
}
