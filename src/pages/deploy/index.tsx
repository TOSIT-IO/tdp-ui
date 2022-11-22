import { ReactElement } from 'react'
import DashboardLayout from 'src/app/dashboard/layout'
import { Button } from 'src/components'
import { useDeploy } from 'src/hooks/useDeploy'

import OperationsList from 'src/app/deploy/OperationsList'
import InputField from 'src/app/deploy/InputField'
import { OperationsContextProvider } from 'src/app/deploy/OperationsContext'

const DeployPage = () => {
  return (
    <OperationsContextProvider>
      <div className="flex flex-col justify-center h-full items-center gap-2">
        <div className="flex flex-col max-w-xs">
          <OperationsList />
          <InputField />
        </div>
        <Button>Deploy</Button>
      </div>
    </OperationsContextProvider>
  )
}

DeployPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default DeployPage
