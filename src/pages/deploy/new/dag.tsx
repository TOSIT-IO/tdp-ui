import DeployLayout from 'src/app/dashboard/deploy/layout'
import DashboardLayout from 'src/app/dashboard/layout'
import { DeployDag } from 'src/components/Deploy'

const DeployDagPage = () => {
  return (
    <>
      <div className="mt-2 border-b border-gray-200 pb-5 mb-5">
        <h1 className="text-3xl font-medium text-gray-900">
          New deployment from DAG
        </h1>
      </div>
      <DeployDag />
    </>
  )
}

DeployDagPage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <DashboardLayout>
      <DeployLayout>{page}</DeployLayout>
    </DashboardLayout>
  )
}

export default DeployDagPage
