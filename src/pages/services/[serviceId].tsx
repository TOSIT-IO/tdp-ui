import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import DashboardLayout from 'src/app/dashboard/layout'

import {
  Layout as ServiceLayout,
  ValidateBar,
  VariablesDisplay,
} from 'src/components/Services'
import { useSelectService } from 'src/features/variables'
import { getFirstElementIfArray } from 'src/utils'

const ServicePage = () => {
  const {
    query: { serviceId: tempServiceId },
  } = useRouter()
  const serviceId = getFirstElementIfArray(tempServiceId)

  const {
    value: { variables },
  } = useSelectService(serviceId)

  if (!serviceId || !variables) return <p>Loading</p>

  return (
    <>
      <VariablesDisplay variables={variables} />
      <ValidateBar />
    </>
  )
}

ServicePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout>
      <ServiceLayout>{page}</ServiceLayout>
    </DashboardLayout>
  )
}

export default ServicePage
