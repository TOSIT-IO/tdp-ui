import DeployLayout from 'src/app/dashboard/deploy/layout'
import DashboardLayout from 'src/app/dashboard/layout'
import { DeployOperations } from 'src/components/Deploy'

const DeployOperationsPage = () => {
  return <DeployOperations />
}

DeployOperationsPage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <DashboardLayout>
      <DeployLayout>{page}</DeployLayout>
    </DashboardLayout>
  )
}

export default DeployOperationsPage
