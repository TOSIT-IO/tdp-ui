import { useRouter } from 'next/router'
import { PageTitle } from 'src/components/Layout/primitives/PageTitle'
import { useServiceInfos } from 'src/hooks'
import { ComponentsTabs } from 'src/components/Services/ComponentsTabs'

function getFirstElementIfArray<T>(value: T) {
  return Array.isArray(value) ? value[0] : value
}

export default function ServiceLayout({ children }) {
  const {
    query: { serviceId: tempServiceId, componentId: tempComponentId },
    isReady,
  } = useRouter()
  const serviceId = getFirstElementIfArray(tempServiceId)
  const componentId = getFirstElementIfArray(tempComponentId)
  const { initialInfos } = useServiceInfos(serviceId)

  if (!isReady || !initialInfos) return <p>Loading</p>

  return (
    <>
      <PageTitle>Variables configuration</PageTitle>
      <ComponentsTabs
        currentServiceId={serviceId}
        currentComponentId={componentId}
        components={initialInfos.components.map((c) => c.id)}
      />
      {children}
    </>
  )
}
