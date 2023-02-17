import { useRouter } from 'next/router'
import { useDeployLogInfos } from 'src/hooks'
import { getFirstElementIfArray } from 'src/utils'
import { DeploysInfos, OperationsList } from 'src/components/Deploy/DeployLogs'

export default function DeployLogPage() {
  const {
    query: { deployLogId: tempDeployLogId },
  } = useRouter()
  const deployLogId = getFirstElementIfArray(tempDeployLogId)
  const deployLogInfos = useDeployLogInfos(Number(deployLogId))

  if (!deployLogInfos) return <p>Loading</p>

  const { operations, ...deployLogInfosWithoutOperations } = deployLogInfos

  return (
    <>
      <DeploysInfos deployInfos={deployLogInfosWithoutOperations} />
      <OperationsList operations={operations} />
    </>
  )
}
