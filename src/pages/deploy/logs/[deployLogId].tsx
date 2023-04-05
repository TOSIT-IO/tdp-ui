import { useRouter } from 'next/router'
import DeploymentInfos from 'src/components/Logs/DeploymentInfos'
import OperationsLogs from 'src/components/Logs/OperationsLogs'
import { useDeployLogInfos } from 'src/hooks'
import { getFirstElementIfArray } from 'src/utils'

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
      <DeploymentInfos deployInfos={deployLogInfosWithoutOperations} />
      <OperationsLogs operations={operations} />
    </>
  )
}
