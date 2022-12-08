import { FieldHeader } from 'src/components'
import { DeployMethodsEnum, DeployMethodsType } from 'src/types/deployTypes'
import { DeployOption } from './DeployOption'

const deployMethods: DeployMethodsType[] = [
  {
    name: DeployMethodsEnum.ALL,
    title: 'All',
    description: 'Deploy all operations in the dag order.',
  },
  {
    name: DeployMethodsEnum.SOURCES,
    title: 'From sources',
    description:
      'Deploy operations in the dag order from a list of sources operations.',
  },
  {
    name: DeployMethodsEnum.TARGETS,
    title: 'To targets',
    description:
      'Deploy operations in the dag order from a list of targets operations.',
  },
  {
    name: DeployMethodsEnum.CUSTOM,
    title: 'Custom',
    description: 'Deploy speficif operations in a custom order.',
  },
]

export function DeployModeStep() {
  return (
    <fieldset>
      <FieldHeader as="legend" title="Deploy type" />
      <ul className="flex flex-col gap-3">
        {deployMethods.map((v) => (
          <DeployOption key={v.name} method={v} />
        ))}
      </ul>
    </fieldset>
  )
}
