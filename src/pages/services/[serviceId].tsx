import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import DashboardLayout from 'src/app/dashboard/layout'
import ComponentInfos from 'src/app/services/ComponentInfos'
import Tableau from 'src/app/services/Tableau'
import { useServiceInfos } from 'src/hooks'

const ServicePage = () => {
  const router = useRouter()
  const { serviceId: tempServiceId } = router.query
  const serviceId = Array.isArray(tempServiceId)
    ? tempServiceId[0]
    : tempServiceId
  const serviceInfos = useServiceInfos(serviceId)

  return (
    <div className="p-5">
      <div className="border-b border-gray-200 pb-5 mb-5">
        <h3 className="text-3xl font-medium leading-6 text-gray-900">
          {serviceId}
        </h3>
      </div>
      <Tableau
        variables={
          serviceInfos?.variables && Object.entries(serviceInfos.variables)
        }
      />
      <br />
      <div className="mt-8 border-b border-gray-200 pb-5 mb-1">
        <h3 className="text-3xl font-medium leading-6 text-gray-900">
          Components
        </h3>
      </div>
      <br />
      <div className="flex flex-col gap-2">
        {serviceInfos?.components.map((component) => (
          <ComponentInfos
            key={component.id}
            serviceId={serviceId}
            componentId={component.id}
          />
        ))}
      </div>
    </div>
  )
}

ServicePage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default ServicePage
