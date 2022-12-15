import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import DashboardLayout from 'src/app/dashboard/layout'
import ServiceLayout from 'src/app/dashboard/services/layout'

import { useDeployLogInfos } from 'src/hooks'

import { PastDeployLogs } from 'src/components/DeployLogs/TableDeployLogs/PastDeployLogs'
import type { deployLogWithOpType } from 'src/components/DeployLogs/TableDeployLogs/PastDeployLogs'

// deployLogWithOpType

// const ServicePage = () => {
const DeployLogPage = () => {
  const router = useRouter()
  //  const { serviceId: tempServiceId } = router.query
  const { deployLogId: tempDeployLogId } = router.query
  //  const serviceId = Array.isArray(tempServiceId)
  //    ? tempServiceId[0]
  //    : tempServiceId
  const deployLogId = Array.isArray(tempDeployLogId)
    ? tempDeployLogId[0]
    : tempDeployLogId
  //   const { initialInfos, setNewVariables, sendVariables } =
  //     useServiceInfos(serviceId)
  const deployLogInfos = useDeployLogInfos(Number(deployLogId))
  const deployLogInfosBis = useDeployLogInfos(Number(deployLogId))

  if (!deployLogInfos) return <p>Looading</p>

  const operations = [...deployLogInfos.operations]
  delete deployLogInfos.operations

  return (
    <>
      {/* {PastDeployLogs()} */}
      <PastDeployLogs deployLogWithOp={deployLogInfosBis} />
      <div>
        <div className="mb-60">
          {Object.entries(deployLogInfos).map(([k, v]) => (
            <div key={k} className="flex gap-1 border border-gray-500">
              <p>
                {k}: {v}
              </p>
            </div>
          ))}
          {operations.map((operation) => (
            <div key={operation.start_time}>
              {JSON.stringify(operation, null, 2)}
            </div>
          ))}
        </div>
      </div>
    </>
  )

  // return (
  //   <>
  //     <div>
  //       deployLogId : {deployLogId}
  //       <pre>{JSON.stringify(deployLogInfos,null,2)}</pre>
  //     </div>
  //   </>
  // )
}

// ServicePage.getLayout = function getLayout(page: ReactElement) {
DeployLogPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout>
      <ServiceLayout>{page}</ServiceLayout>
    </DashboardLayout>
  )
}

// export default ServicePage
export default DeployLogPage
