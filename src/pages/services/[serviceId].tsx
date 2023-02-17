import { useRouter } from 'next/router'

import {
  Layout as ServiceLayout,
  ValidateBar,
  VariablesDisplay,
} from 'src/components/Services'
import { useSelectService } from 'src/features/variables'
import { getFirstElementIfArray } from 'src/utils'

export default function ServicePage() {
  const {
    query: { serviceId: tempServiceId },
  } = useRouter()
  const serviceId = getFirstElementIfArray(tempServiceId)

  const {
    value: { variables },
  } = useSelectService(serviceId)

  if (!serviceId || !variables) return <p>Loading</p>

  return (
    <ServiceLayout>
      <VariablesDisplay variables={variables} />
      <ValidateBar />
    </ServiceLayout>
  )
}
