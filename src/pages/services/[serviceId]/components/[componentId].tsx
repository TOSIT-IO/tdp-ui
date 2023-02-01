import { useRouter } from 'next/router'
import {
  Layout as ServiceLayout,
  ValidateBar,
  VariablesDisplay,
} from 'src/components/Services'
import { getFirstElementIfArray } from 'src/utils'
import { useSelectComponent } from 'src/features/variables'
//Layouts
import DashboardLayout from 'src/app/dashboard/layout'

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
    <>
      <VariablesDisplay variables={variables} />
      <ValidateBar />
    </>
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
