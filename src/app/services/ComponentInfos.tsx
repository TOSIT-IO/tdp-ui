import { Disclosure } from 'src/components/Disclosure'
import { useComponentInfos } from 'src/hooks'
import Tableau from './Tableau'

type ComponentInfosType = {
  serviceId: string
  componentId: string
}

export default function ComponentInfos({
  serviceId,
  componentId,
}: ComponentInfosType) {
  const componentInfos = useComponentInfos(serviceId, componentId)

  return (
    <Disclosure title={componentId}>
      {componentInfos?.variables[0] ? (
        <Tableau variables={Object.entries(componentInfos.variables)} />
      ) : (
        <span>no values</span>
      )}
    </Disclosure>
  )
}
