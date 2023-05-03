import { useRouter } from 'next/router'

import { OperationsLogs, DeploymentInfos } from 'src/components/Logs'
import { useGetDeploymentApiV1DeployDeploymentIdGetQuery } from 'src/store/api/tdpApi'

const Page = () => {
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

export default Page
