import { useRouter } from 'next/router'

import { getFirstElementIfArray } from 'src/utils'
import OperationsLogs from 'src/components/Logs/OperationsLogs'
import DeploymentInfos from 'src/components/Logs/DeploymentInfos'
import { useGetDeploymentApiV1DeployDeploymentIdGetQuery } from 'src/store/features/api/tdpApi'

export default function DeployLogPage() {
  let {
    query: { deployLogId },
  } = useRouter()
  deployLogId = getFirstElementIfArray(deployLogId)

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
