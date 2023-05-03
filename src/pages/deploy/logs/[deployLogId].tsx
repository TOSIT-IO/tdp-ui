import { useRouter } from 'next/router'

import OperationsLogs from 'src/components/Logs/OperationsLogs'
import DeploymentInfos from 'src/components/Logs/DeploymentInfos'
import { useGetDeploymentApiV1DeployDeploymentIdGetQuery } from 'src/store/api/tdpApi'

export default function DeployLogPage() {
  let {
    query: { deployLogId },
  } = useRouter()
  deployLogId = deployLogId.toString()

  const { data, isLoading } = useGetDeploymentApiV1DeployDeploymentIdGetQuery({
    deploymentId: Number(deployLogId),
  })

  if (isLoading) return <p>Loading</p>

  if (data) {
    const { operations, ...deployLogInfosWithoutOperations } = data
    return (
      <>
        <DeploymentInfos deployInfos={deployLogInfosWithoutOperations} />
        <OperationsLogs operations={operations} />
      </>
    )
  }
}
