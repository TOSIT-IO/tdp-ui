import { Disclosure } from 'src/components/Disclosure'
import { useComponentInfos } from 'src/hooks'
import VariableList from './VariableList'

type ComponentInfosType = {
  serviceId: string
  componentId: string
}

export default function ComponentInfos({
  serviceId,
  componentId,
}: ComponentInfosType) {
  const componentInfos = useComponentInfos(serviceId, componentId)

  if (componentInfos) {
    const { variables } = componentInfos
    return (
      <Disclosure title={componentId}>
        <VariableList variables={variables ? Object.entries(variables) : []} />
      </Disclosure>
    )
  }

  return <></>
}
