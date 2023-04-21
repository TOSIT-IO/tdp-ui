import { useEffect } from 'react'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { toast } from 'react-toastify'
import router from 'next/router'

import { Button } from 'src/components/commons'
import { DeployPreview } from 'src/components/Deploy'
import { NavigationBar } from 'src/components/Layout'
import {
  useReconfigureApiV1DeployReconfigurePostMutation,
  useReconfigureApiV1PlanReconfigurePostMutation,
} from 'src/store/features/api/tdpApi'

export default function ReconfigurePage() {
  const [deployReconfigure, deployResult] =
    useReconfigureApiV1DeployReconfigurePostMutation()
  const [planReconfigure, planResult] =
    useReconfigureApiV1PlanReconfigurePostMutation()

  useEffect(() => {
    planReconfigure()
  }, [])

  useEffect(() => {
    if (deployResult.error) {
      toast.error(String(deployResult.error))
    }
    if (deployResult.data) {
      toast.info(
        `Deploy id: ${deployResult.data.id} ; redirecting to deploy log page...`
      )
      router.push(`/deploy/logs/${deployResult.data.id}`)
    }
  }, [deployResult])

  if (planResult.isLoading) return <p>Loading...</p>

  return (
    <>
      <div className="mb-5 mt-2 border-b border-gray-200 pb-5">
        <h1 className="text-3xl font-medium text-gray-900">
          Reconfigure cluster
        </h1>
      </div>
      {planResult.data && <DeployPreview operations={planResult.data} />}
      <NavigationBar className="sticky bottom-0 bg-white py-3">
        <Button
          as="Link"
          href="/deploy/new"
          className="flex items-center gap-1"
        >
          <ChevronLeftIcon className="h-5 w-5" />
          Back
        </Button>
        {planResult.data && (
          <Button
            as="button"
            variant={'filled'}
            onClick={() => deployReconfigure()}
          >
            Deploy Reconfigure
          </Button>
        )}
      </NavigationBar>
    </>
  )
}
