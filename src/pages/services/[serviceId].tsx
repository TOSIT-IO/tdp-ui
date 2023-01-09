import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'
import DashboardLayout from 'src/app/dashboard/layout'
import ServiceLayout from 'src/app/dashboard/services/layout'
import {
  RawViewButton,
  ValidateBar,
  VariablesContextProvider,
  VariablesDisplay,
} from 'src/components/Services'
import { getFirstElementIfArray } from 'src/utils'

const ServicePage = () => {
  const [isRaw, setIsRaw] = useState(false)
  const {
    query: { serviceId: tempServiceId },
  } = useRouter()
  const serviceId = getFirstElementIfArray(tempServiceId)

  if (!serviceId) return <p>Loading</p>

  return (
    <VariablesContextProvider serviceId={serviceId}>
      <div className="flex justify-end mb-4 ">
        <RawViewButton isRaw={isRaw} setIsRaw={setIsRaw} />
      </div>
      <VariablesDisplay isRaw={isRaw} />
      <ValidateBar />
    </VariablesContextProvider>
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
