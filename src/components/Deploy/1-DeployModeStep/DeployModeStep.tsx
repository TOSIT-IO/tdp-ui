import { FieldHeader, Button } from 'src/components'
import { useDeployContext } from 'src/contexts'
import { DeployMethodsEnum } from 'src/types/deployTypes'
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

export function DeployModeStep({ toggleNextStep }) {
  const {
    state: { selectedDeployMode: deployMethod },
  } = useDeployContext()
  const modeIsSelected = !!deployMethod

  function handleOnClick() {
    if (!modeIsSelected) return
    toggleNextStep()
  }

  return (
    <fieldset>
      <FieldHeader as="legend" title="Deploy type" />
      <div className="flex flex-col gap-3">
        {deployModes.map((v) => (
          <DeployOption key={v.name} method={v} />
        ))}
      </div>
      {/* TODO: disabled style button */}
      <Button onClick={handleOnClick} disabled={!modeIsSelected}>
        Configuration
      </Button>
    </fieldset>
  )
}
