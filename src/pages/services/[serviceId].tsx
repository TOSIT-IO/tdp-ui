import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import DashboardLayout from 'src/app/dashboard/layout'
import { useServiceInfos } from 'src/hooks'

const ServicePage = () => {
  const router = useRouter()
  const { serviceId } = router.query
  const serviceInfos = useServiceInfos(
    Array.isArray(serviceId) ? serviceId[0] : serviceId
  )

  return <pre>{JSON.stringify(serviceInfos, null, 2)}</pre>
}

ServicePage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default ServicePage
