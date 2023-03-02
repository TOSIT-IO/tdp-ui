import { useRouter } from 'next/router'
import { PageTitle } from 'src/components/Layout'
import {
  ComponentsNav,
  ParamsContextProvider,
  VariablesDisplay,
} from 'src/components/Services'
import { useSelectComponent } from 'src/features/variables'
import { getFirstElementIfArray } from 'src/utils'

export default function ServicePage() {
  const {
    isReady,
    query: { serviceId: tempServiceId, componentId: tempComponentId },
  } = useRouter()
  const serviceId = isReady && getFirstElementIfArray(tempServiceId)
  const componentId = isReady && getFirstElementIfArray(tempComponentId)

  const {
    value: { variables },
  } = useSelectComponent(serviceId, componentId)

  if (!variables) return <p>Loading...</p>

  return (
    <ParamsContextProvider
      currentServiceId={serviceId}
      currentComponentId={componentId}
    >
      <PageTitle>Variables configuration</PageTitle>
      <ComponentsNav />
      <VariablesDisplay variables={variables} />
    </ParamsContextProvider>
  )
}
