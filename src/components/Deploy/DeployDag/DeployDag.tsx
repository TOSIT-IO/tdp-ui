import { useEffect, useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { toast } from 'react-toastify'
import router from 'next/router'

import {
  Operation,
  useDagApiV1PlanDagPostMutation,
  useDagApiV1DeployDagPostMutation,
} from 'src/store/api/tdpApi'
import { Button } from 'src/components/commons'
import { NavigationBar } from 'src/components/Layout/primitives'
import { DagContextProvider, DeployModeEnum } from './context'
import { useDeployDagRequest } from './hooks'
import {
  DeployModeField,
  FilterField,
  OperationsField,
  RestartField,
} from './fields'
import { DeployPreview } from '../DeployPreview'

export function DeployDag() {
  const [displayPreview, setDisplayPreview] = useState(false)
  return (
    <DagContextProvider
      initialState={{
        selectedDeployMode: DeployModeEnum.ALL,
        filterType: 'glob',
        restart: false,
      }}
    >
      {!displayPreview ? <DagForm /> : <DagPreview />}
      <NavigationBar className="sticky bottom-0 bg-white py-3">
        {!displayPreview ? (
          <BackToNewButton />
        ) : (
          <BackToFormButton setDisplayPreview={setDisplayPreview} />
        )}
        {!displayPreview ? (
          <PreviewButton setDisplayPreview={setDisplayPreview} />
        ) : (
          <DeployButton />
        )}
      </NavigationBar>
    </DagContextProvider>
  )
}

function DagForm() {
  return (
    <form className="flex flex-col gap-7">
      <DeployModeField />
      <OperationsField />
      <FilterField />
      <RestartField />
    </form>
  )
}

function DagPreview() {
  const [operationsPreview, setOperationsPreview] = useState<Operation[]>([])
  const [planDag, result] = useDagApiV1PlanDagPostMutation()
  const dagRequest = useDeployDagRequest()

  useEffect(() => {
    planDag({
      body: dagRequest,
    })
  }, [dagRequest, planDag])

  useEffect(() => {
    if (result.data) setOperationsPreview(result.data)
  }, [result])

  return <DeployPreview operations={operationsPreview} />
}

const PreviewButton = ({
  setDisplayPreview,
}: {
  setDisplayPreview: (value: boolean) => void
}) => (
  <Button
    onClick={() => setDisplayPreview(true)}
    className="flex items-center gap-1"
  >
    Preview
    <ChevronRightIcon className="h-5 w-5" />
  </Button>
)

const BackToNewButton = () => (
  <Button as="Link" href="/deploy/new" className="flex items-center gap-1">
    <ChevronLeftIcon className="h-5 w-5" />
    Back
  </Button>
)

function DeployButton() {
  const [deployDag, result] = useDagApiV1DeployDagPostMutation()
  const dagRequest = useDeployDagRequest()

  useEffect(() => {
    if (result.data) {
      toast.info(
        `Deploy id: ${result.data.id} ; redirecting to deploy log page...`
      )
      router.push(`/deploy/logs/${result.data.id}`)
    }
  }, [result])

  return (
    <Button
      as="button"
      variant={'filled'}
      onClick={() => deployDag({ body: dagRequest })}
    >
      Deploy
    </Button>
  )
}

const BackToFormButton = ({
  setDisplayPreview,
}: {
  setDisplayPreview: (value: boolean) => void
}) => (
  <Button
    onClick={() => setDisplayPreview(false)}
    className="flex items-center gap-1"
  >
    <ChevronLeftIcon className="h-5 w-5" />
    Back
  </Button>
)
