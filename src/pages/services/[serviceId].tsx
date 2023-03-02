import { useRouter } from 'next/router'
import { PageTitle } from 'src/components/Layout'
import {
  ComponentsNav,
  ParamsContextProvider,
  VariablesDisplay,
} from 'src/components/Services'
import { useSelectService } from 'src/features/variables'
import { getFirstElementIfArray } from 'src/utils'

export default function ServicePage() {
  const {
    isReady,
    query: { serviceId: tempServiceId },
  } = useRouter()
  const serviceId = isReady && getFirstElementIfArray(tempServiceId)

  const {
    value: { variables },
  } = useSelectService(serviceId)

  if (!variables) return <p>Loading...</p>

  return (
    <ParamsContextProvider currentServiceId={serviceId}>
      <PageTitle>Variables configuration</PageTitle>
      <ComponentsNav />
      <VariablesDisplay variables={variables} />
    </ParamsContextProvider>
  )
}
