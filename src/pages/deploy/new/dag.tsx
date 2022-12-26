import DeployLayout from 'src/app/dashboard/deploy/layout'
import DashboardLayout from 'src/app/dashboard/layout'
import { DeployDag } from 'src/components/Deploy'

const DeployDagPage = () => {
  return <DeployDag />
}

DeployDagPage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <DashboardLayout>
      <DeployLayout>{page}</DeployLayout>
    </DashboardLayout>
  )
}

export default DeployDagPage
