import { useEffect, useState } from 'react'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { Operation } from 'src/clients'
import { useTdpClient } from 'src/contexts'
import { Button } from 'src/components/commons'
import { DeployPreview } from 'src/components/Deploy'
import { NavigationBar } from 'src/components/Layout'

import DeployLayout from 'src/app/dashboard/deploy/layout'
import DashboardLayout from 'src/app/dashboard/layout'

const ReconfigurePage = () => {
  const [preview, setPreview] = useState<Operation[]>([])
  const { planDeployReconfigure, reconfigureDeploy } = useTdpClient()

  useEffect(() => {
    const fetchPreview = async () => {
      try {
        const operations = await planDeployReconfigure()
        setPreview(operations)
      } catch (e) {
        console.error(e)
      }
    }
    fetchPreview()
  }, [planDeployReconfigure])

  return (
    <>
      <div className="mt-2 border-b border-gray-200 pb-5 mb-5">
        <h1 className="text-3xl font-medium text-gray-900">
          Reconfigure cluster
        </h1>
      </div>
      <DeployPreview operations={preview} />
      <NavigationBar className="sticky bottom-0 bg-white py-3">
        <Button
          as="Link"
          href="/deploy/new"
          className="flex items-center gap-1"
        >
          <ChevronLeftIcon className="h-5 w-5" />
          Back
        </Button>
        <Button
          as="button"
          variant={'filled'}
          onClick={() => reconfigureDeploy()}
        >
          Deploy Reconfigure
        </Button>
      </NavigationBar>
    </>
  )
}

ReconfigurePage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <DashboardLayout>
      <DeployLayout>{page}</DeployLayout>
    </DashboardLayout>
  )
}

export default ReconfigurePage
