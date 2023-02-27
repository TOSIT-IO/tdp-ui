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
    // isOperationLogVisible &&
    //   deployLogId &&
    //   operationLogId &&
    if (isOperationLogVisible == true) {
      fetchOperationLog()
      console.log('Appel de fetchOperationLog')
    }
  }, [
    getDeploymentOperation,
    deployLogId,
    operationLogId,
    isOperationLogVisible,
  ])

  operationLog && console.log('operationLog non null : ' + operationLog)
  operationLog &&
    operationLog.logs &&
    console.log('operationLog.logs non null : ' + operationLog.logs)
  return operationLog
}
