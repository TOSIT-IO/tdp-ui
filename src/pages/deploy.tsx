import { ReactElement } from 'react'
import DashboardLayout from 'src/app/dashboard/layout'
import {
  Button,
  FilterField,
  DeployTypeField,
  RestartField,
  OperationsField,
} from 'src/components'
import {
  DeployMethodsEnum,
  DeployMethodsType,
  TfilterType,
} from 'src/types/deployTypes'
import { DeployContextProvider, useDeployContext } from 'src/contexts'

const deployMethods: DeployMethodsType[] = [
  {
    name: DeployMethodsEnum.ALL,
    title: 'All',
    description: 'Deploy all operations.',
  },
  {
    name: DeployMethodsEnum.SOURCES,
    title: 'From sources',
    description: 'List of operations used as targets on the dag generation.',
  },
  {
    name: DeployMethodsEnum.TARGETS,
    title: 'To targets',
    description: 'List of operations used as sources on the dag generation.',
  },
]

const filterTypes: TfilterType[] = [
  { name: 'regex', placeholder: `.+config` },
  { name: 'glob', placeholder: `*_config` },
]

const DeployPage = () => {
  return (
    <DeployContextProvider>
      <form className="flex flex-col gap-7">
        <header className="border-b border-gray-200 pb-5">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
            Deploy
          </h1>
        </header>
        <DeployTypeField deployMethods={deployMethods} />
        <div className="-mt-4">
          <OperationsField />
        </div>
        <FilterField filterTypes={filterTypes} />
        <RestartField />
        <div className="self-center">
          <DeployButton label="Deploy" />
        </div>
      </form>
    </DeployContextProvider>
  )
}

DeployPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default DeployPage

function DeployButton({ label }: { label: string }) {
  const { deploy } = useDeployContext()
  function handleDeploy(e: React.SyntheticEvent) {
    e.preventDefault()
    deploy()
  }
  return (
    <Button type="button" onClick={handleDeploy} className="font-bold text-xl">
      {label}
    </Button>
  )
}
