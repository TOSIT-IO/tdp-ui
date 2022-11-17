import { useRouter } from 'next/router'
import { useServiceInfos } from 'src/hooks'
import ComponentMenu from './ComponentMenu'

export default function ServiceLayout({ children }) {
  const router = useRouter()
  const { serviceId: tempServiceId } = router.query
  const serviceId = Array.isArray(tempServiceId)
    ? tempServiceId[0]
    : tempServiceId
  const { initialInfos } = useServiceInfos(serviceId)

  return (
    <div className="p-5">
      <div className="mt-8 border-b border-gray-200 pb-5 mb-5">
        <h3 className="text-3xl font-medium leading-6 text-gray-900">
          {serviceId}
        </h3>
      </div>
      {initialInfos ? (
        <ComponentMenu
          serviceId={serviceId}
          components={initialInfos.components.map((c) => c.id)}
        />
      ) : (
        <p>Loading</p>
      )}
      {children}
    </div>
  )
}
