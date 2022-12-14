import { useRouter } from 'next/router'
import { PageTitle } from 'src/components/Layout/primitives/PageTitle'
import { useServiceInfos } from 'src/hooks'
import ComponentMenu from 'src/components/Services/ComponentTabs'

export default function ServiceLayout({ children }) {
  const router = useRouter()
  const { serviceId: tempServiceId } = router.query
  const serviceId = Array.isArray(tempServiceId)
    ? tempServiceId[0]
    : tempServiceId
  const { initialInfos } = useServiceInfos(serviceId)

  return (
    <>
      <PageTitle>{serviceId}</PageTitle>
      {initialInfos ? (
        <ComponentMenu
          serviceId={serviceId}
          components={initialInfos.components.map((c) => c.id)}
        />
      ) : (
        <p>Loading</p>
      )}
      {children}
    </>
  )
}
