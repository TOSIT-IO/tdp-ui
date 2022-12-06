import { FieldHeader } from 'src/components'
import { Card } from './Card'
import { DeployMethodsType } from 'src/types/deployTypes'

export function DeployTypeField({
  deployMethods,
}: {
  deployMethods: DeployMethodsType[]
}) {
  return (
    <fieldset>
      <FieldHeader as="legend" title="Deploy type" />
      <ul className="grid gap-6 w-full md:grid-cols-3 auto-rows-max">
        {deployMethods.map((v) => (
          <Card key={v.name} method={v} />
        ))}
      </ul>
    </fieldset>
  )
}
