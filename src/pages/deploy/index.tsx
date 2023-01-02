import DashboardLayout from 'src/app/dashboard/layout'
import { usePastDeploymentsRichList } from 'src/hooks'
import { DeployLogs } from 'src/components/Deploy'
import { PageTitle } from 'src/components/Layout/primitives'
import LogsLayout from 'src/app/dashboard/logs/layout'

const PastDeployLogsPage = () => {
  const pastDeploymentsRichList = usePastDeploymentsRichList()

  return (
    <>
      <PageTitle>Deploy Logs</PageTitle>
      <p className="mt-2 text-sm text-gray-700">
        A list of all the past deployed logs including their id deploy, start
        deploy, end deploy and state. Click on a deployment to view it
      </p>
      <DeployLogs deployTab={pastDeploymentsRichList} />
    </>
  )
}

PastDeployLogsPage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <DashboardLayout>
      <LogsLayout>{page}</LogsLayout>
    </DashboardLayout>
  )
}

export default PastDeployLogsPage
