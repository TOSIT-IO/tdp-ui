import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import DashboardLayout from 'src/app/dashboard/layout'
import { useDeployLogInfos } from 'src/hooks'
import LogsLayout from 'src/app/dashboard/logs/layout'
import { getFirstElementIfArray } from 'src/utils'
import { DeploysInfos, OperationsList } from 'src/components/DeployLogs'

const DeployLogPage = () => {
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

DeployLogPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout>
      <LogsLayout>{page}</LogsLayout>
    </DashboardLayout>
  )
}

export default DeployLogPage
