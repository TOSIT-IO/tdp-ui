import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import DashboardLayout from 'src/app/dashboard/layout'
import ServiceLayout from 'src/app/services/layout'
import ConfigurationDisplay from 'src/components/ConfigurationDisplay'
import { useComponentInfos } from 'src/hooks'

const ComponentPage = () => {
  const router = useRouter()
  const { serviceId: tempServiceId, componentId: tempComponentId } =
    router.query
  const serviceId = Array.isArray(tempServiceId)
    ? tempServiceId[0]
    : tempServiceId
  const componentId = Array.isArray(tempComponentId)
    ? tempComponentId[0]
    : tempComponentId

  const componentInfos = useComponentInfos(serviceId, componentId)

  if (!componentInfos) return <p>Loading...</p>

  return <ConfigurationDisplay values={componentInfos.variables} />
}

ComponentPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout>
      <ServiceLayout>{page}</ServiceLayout>
    </DashboardLayout>
  )
}

export default ComponentPage
