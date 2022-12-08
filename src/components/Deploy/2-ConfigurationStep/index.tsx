import { Button } from 'src/components/commons'
import { useDeployContext } from 'src/contexts'
import {
  DeployMethodsEnum,
  DeployMethodsType,
  TfilterType,
} from 'src/types/deployTypes'
import { DeployTypeField } from './DeployTypeField'
import { FilterField } from './FilterField'
import { OperationsField } from './OperationsField'
import { RestartField } from './RestartFlied'

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

export function ConfigurationStep() {
  return (
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
  )
}

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
