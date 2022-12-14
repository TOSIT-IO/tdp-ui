import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import DashboardLayout from 'src/app/dashboard/layout'
import ServiceLayout from 'src/app/dashboard/services/layout'
import { VariablesDisplay } from 'src/components'
import { useServiceInfos } from 'src/hooks'

const ServicePage = () => {
  const router = useRouter()
  const { serviceId: tempServiceId } = router.query
  const serviceId = Array.isArray(tempServiceId)
    ? tempServiceId[0]
    : tempServiceId
  const { initialInfos, setNewVariables, sendVariables } =
    useServiceInfos(serviceId)

  if (!initialInfos) return <p>Loading</p>

  return (
    <VariablesDisplay
      initialVariables={initialInfos.variables}
      setNewVariables={setNewVariables}
      sendVariables={sendVariables}
    />
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
