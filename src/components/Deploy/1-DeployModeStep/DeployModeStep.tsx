import { ChevronRightIcon } from '@heroicons/react/24/solid'
import { Button } from 'src/components'
import { useDeployContext } from 'src/contexts'
import { DeployMethodsEnum } from 'src/types/deployTypes'
import { PageHeader } from '../PageHeader'
import { DeployOption } from './DeployOption'

export type DeployModes = {
  name: DeployMethodsEnum
  title: string
  description: string
}

const deployModes: DeployModes[] = [
  {
    name: DeployMethodsEnum.ALL,
    title: 'All',
    description: 'Deploy all DAG operations.',
  },
  {
    name: DeployMethodsEnum.SOURCES,
    title: 'From sources',
    description: 'Deploy DAG operations from a list of sources operations.',
  },
  {
    name: DeployMethodsEnum.TARGETS,
    title: 'To targets',
    description: 'Deploy DAG operations from a list of targets operations.',
  },
  {
    name: DeployMethodsEnum.CUSTOM,
    title: 'Custom',
    description: 'Deploy operations in a custom order.',
  },
]

export function DeployModeStep({ toggleNextStep, togglePreviousStep }) {
  const {
    state: { selectedDeployMode: deployMethod },
  } = useDeployContext()
  const modeIsSelected = !!deployMethod

  function handleOnClick() {
    if (!modeIsSelected) return
    toggleNextStep()
  }

  return (
    <>
      <PageHeader title="Deploy Mode" />
      <fieldset>
        <div className="flex flex-col gap-3">
          {deployModes.map((v) => (
            <DeployOption key={v.name} method={v} />
          ))}
        </div>
        {/* TODO: disabled style button */}
        <div className="flex justify-end mt-6">
          <Button
            onClick={handleOnClick}
            disabled={!modeIsSelected}
            variant="outlined"
            className="flex items-center gap-1"
          >
            <span>Configure Deployment</span>
            <ChevronRightIcon className="h-5 w-5" />
          </Button>
        </div>
      </fieldset>
    </>
  )
}
