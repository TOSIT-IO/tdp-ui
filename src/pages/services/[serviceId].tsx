import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import DashboardLayout from 'src/app/dashboard/layout'
import Tableau from 'src/components/Tableau'
import { useServiceInfos } from 'src/hooks'

const ServicePage = () => {
  const router = useRouter()
  const { serviceId } = router.query
  const serviceInfos = useServiceInfos(
    Array.isArray(serviceId) ? serviceId[0] : serviceId
  )

  return (
    <div className="p-5">
      <div className="border-b border-gray-200 pb-5">
        <h3 className="text-3xl font-medium leading-6 text-gray-900">
          {serviceInfos?.id}
        </h3>
      </div>
      <Tableau
        variables={
          serviceInfos?.variables && Object.entries(serviceInfos.variables)
        }
      />
    </div>
  )
}

ServicePage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default ServicePage
