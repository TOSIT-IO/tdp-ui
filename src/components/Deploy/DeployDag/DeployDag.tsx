import { useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { FilterTypeEnum } from '@/client-sdk'
import { Button } from 'src/components/commons'
import { NavigationBar } from 'src/components/Layout/primitives'
import { DagContextProvider, DeployModeEnum } from './context'
import {
  DeployModeField,
  FilterField,
  OperationsField,
  RestartField,
} from './fields'
import { PreviewDagDeploy } from './PreviewDagDeploy'

export function DeployDag() {
  return (
    <DagContextProvider
      initialState={{
        selectedDeployMode: DeployModeEnum.ALL,
        filterType: FilterTypeEnum.Glob,
        restart: false,
      }}
    >
      <DagForm />
    </DagContextProvider>
  )
}

function DagForm() {
  const [displayPreview, setDisplayPreview] = useState(false)

  if (displayPreview)
    return <PreviewDagDeploy setDisplayPreview={setDisplayPreview} />

  return (
    <form className="flex flex-col gap-7">
      <DeployModeField />
      <OperationsField />
      <FilterField />
      <RestartField />
      <NavigationBar>
        <Button
          as="Link"
          href="/deploy/new"
          className="flex items-center gap-1"
        >
          <ChevronLeftIcon className="h-5 w-5" />
          Back
        </Button>
        <Button
          onClick={() => setDisplayPreview(true)}
          className="flex items-center gap-1"
        >
          Preview
          <ChevronRightIcon className="h-5 w-5" />
        </Button>
      </NavigationBar>
    </form>
  )
}
