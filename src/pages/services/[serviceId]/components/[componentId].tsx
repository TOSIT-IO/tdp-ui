import { useRouter } from 'next/router'
import { useState } from 'react'
import {
  RawViewButton,
  ValidateBar,
  VariablesContextProvider,
  VariablesDisplay,
} from 'src/components'
import { getFirstElementIfArray } from 'src/utils'
//Layouts
import DashboardLayout from 'src/app/dashboard/layout'
import ServiceLayout from 'src/app/dashboard/services/layout'

const ComponentPage = () => {
  const [isRaw, setIsRaw] = useState(false)
  const {
    query: { serviceId: tempServiceId, componentId: tempComponentId },
  } = useRouter()
  const serviceId = getFirstElementIfArray(tempServiceId)
  const componentId = getFirstElementIfArray(tempComponentId)

  if (!serviceId || !componentId) return <p>Loading...</p>

  return (
    <VariablesContextProvider serviceId={serviceId} componentId={componentId}>
      <div className="flex justify-end mb-4 ">
        <RawViewButton isRaw={isRaw} setIsRaw={setIsRaw} />
      </div>
      <VariablesDisplay isRaw={isRaw} />
      <ValidateBar />
    </VariablesContextProvider>
  )
}

ComponentPage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <DashboardLayout>
      <ServiceLayout>{page}</ServiceLayout>
    </DashboardLayout>
  )
}

export default ComponentPage
