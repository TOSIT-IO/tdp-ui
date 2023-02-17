import { useRouter } from 'next/router'
import {
  Layout as ServiceLayout,
  ValidateBar,
  VariablesDisplay,
} from 'src/components/Services'
import { getFirstElementIfArray } from 'src/utils'
import { useSelectComponent } from 'src/features/variables'

export default function ComponentPage() {
  const {
    query: { serviceId: tempServiceId, componentId: tempComponentId },
  } = useRouter()
  const serviceId = getFirstElementIfArray(tempServiceId)
  const componentId = getFirstElementIfArray(tempComponentId)

  const {
    value: { variables },
  } = useSelectComponent(serviceId, componentId)

  if (!serviceId || !componentId || !variables) return <p>Loading...</p>

  return (
    <ServiceLayout>
      <VariablesDisplay variables={variables} />
      <ValidateBar />
    </ServiceLayout>
  )
}
