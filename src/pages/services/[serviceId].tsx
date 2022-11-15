import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import DashboardLayout from 'src/app/dashboard/layout'
import ServiceLayout from 'src/app/services/layout'
import { useServiceInfos } from 'src/hooks'
import ConfigurationDisplay from 'src/components/ConfigurationDisplay'

const ServicePage = () => {
  const router = useRouter()
  const { serviceId: tempServiceId } = router.query
  const serviceId = Array.isArray(tempServiceId)
    ? tempServiceId[0]
    : tempServiceId
  const serviceInfos = useServiceInfos(serviceId)

  if (!serviceInfos) return <p>Loading</p>

  return <ConfigurationDisplay values={serviceInfos.variables} />
}

ServicePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout>
      <ServiceLayout>{page}</ServiceLayout>
    </DashboardLayout>
  )
}

export default ServicePage
