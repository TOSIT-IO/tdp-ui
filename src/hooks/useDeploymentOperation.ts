import { useEffect, useState } from 'react'
import { useTdpClient } from 'src/contexts'

import type { OperationLog } from 'src/clients/tdpClient'

export function useDeploymentOperation(
  deployLogId: number,
  operationLogId: string,
  isOperationLogVisible: boolean
) {
  const { getDeploymentOperation } = useTdpClient()

  const [operationLog, setOperationLog] = useState<OperationLog>(null)

  useEffect(() => {
    async function fetchOperationLog() {
      const res = await getDeploymentOperation(deployLogId, operationLogId)
      setOperationLog(res)
    }
    if (isOperationLogVisible == true) {
      fetchOperationLog()
    }
  }, [
    getDeploymentOperation,
    deployLogId,
    operationLogId,
    isOperationLogVisible,
  ])

  return operationLog
}
