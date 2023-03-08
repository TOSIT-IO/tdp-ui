import { useEffect, useState } from 'react'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { Operation } from 'src/clients'
import { useTdpClient } from 'src/contexts'
import { Button } from 'src/components/commons'
import { DeployPreview } from 'src/components/Deploy'
import { NavigationBar } from 'src/components/Layout'
import { toast } from 'react-toastify'

export default function ReconfigurePage() {
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

  async function reconfigureLaunch() {
    try {
      const res = await reconfigureDeploy()
      res && toast.info(`Deploy id: ${res.id}`)
    } catch (error) {
      if (error.status) {
        toast.error(`Error ${error.status} : ${error.statusText.toLowerCase()}`)
      } else {
        toast.error(String(error))
      }
    }
  }

  return (
    <>
      <div className="mt-2 mb-5 border-b border-gray-200 pb-5">
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
          onClick={() => reconfigureLaunch()}
        >
          Deploy Reconfigure
        </Button>
      </NavigationBar>
    </>
  )
}
