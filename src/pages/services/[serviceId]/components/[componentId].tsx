import { useRouter } from 'next/router'
import {
  ValidateBar,
  VariablesContextProvider,
  VariablesDisplay,
} from 'src/components/Services'
import { getFirstElementIfArray } from 'src/utils'
import { useSelectComponent } from 'src/features/variables'
//Layouts
import DashboardLayout from 'src/app/dashboard/layout'
import ServiceLayout from 'src/app/dashboard/services/layout'

const ComponentPage = () => {
  const {
    query: { serviceId: tempServiceId, componentId: tempComponentId },
  } = useRouter()
  const serviceId = getFirstElementIfArray(tempServiceId)
  const componentId = getFirstElementIfArray(tempComponentId)

  const {
    value: { variables },
  } = useSelectComponent(serviceId, componentId)

  if (!serviceId || !componentId || !variables) return <p>Loading...</p>

  return (
    <VariablesContextProvider serviceId={serviceId} componentId={componentId}>
      <VariablesDisplay variables={variables} />
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
