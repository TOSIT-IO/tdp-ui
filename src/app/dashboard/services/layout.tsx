import { useRouter } from 'next/router'
import { PageTitle } from 'src/components/Layout/primitives/PageTitle'
import { useServiceInfos } from 'src/hooks'
import { ComponentsTabs } from 'src/components/Services/ComponentsTabs'
import { getFirstElementIfArray } from 'src/utils'

export default function ServiceLayout({ children }) {
  const {
    query: { serviceId: tempServiceId, componentId: tempComponentId },
    isReady,
  } = useRouter()
  const serviceId = getFirstElementIfArray(tempServiceId)
  const componentId = getFirstElementIfArray(tempComponentId)
  const { initialServiceConfig } = useServiceInfos(serviceId)

  if (!isReady || !initialServiceConfig) return <p>Loading</p>

  return (
    <>
      <PageTitle>Variables configuration</PageTitle>
      <ComponentsTabs
        currentServiceId={serviceId}
        currentComponentId={componentId}
        components={initialServiceConfig.components.map((c) => c.id)}
      />
      {children}
    </>
  )
}
