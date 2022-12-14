import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import DashboardLayout from 'src/app/dashboard/layout'
import ServiceLayout from 'src/app/dashboard/services/layout'
import { VariablesDisplay } from 'src/components'
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

  const { initialInfos, setNewVariables, sendVariables } = useComponentInfos(
    serviceId,
    componentId
  )

  if (!initialInfos) return <p>Loading...</p>

  return (
    <VariablesDisplay
      initialVariables={initialInfos.variables}
      setNewVariables={setNewVariables}
      sendVariables={sendVariables}
    />
  )
}

ComponentPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout>
      <ServiceLayout>{page}</ServiceLayout>
    </DashboardLayout>
  )
}

export default ComponentPage
