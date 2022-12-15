import { useEffect, useState } from 'react'
import { useTdpClient } from 'src/contexts'

import type { DeploymentLogWithOperations } from '@/client-sdk'

// type ApiConfigType = {
// type DeployHeaderType = {
//   id: number
//   state: string
// }

// export type deploymentType = {
//   id: number
//   start_time: string
//   end_time: string
//   state: string
//   operations: string[]
// }

export function useDeployLogInfos(
  deployLogId: number
  // ): DeploymentLogWithOperations {
) {
  const { deployApi } = useTdpClient()

  const [deploymentLog, setDeploymentLog] =
    useState<DeploymentLogWithOperations>(null)
  // const [pastDeploymentsList, setPastDeploymentsList] = useState<{id: number; start_time:string; end_time: string; state: string; operations?: string[] }[]>([])

  useEffect(() => {
    // async function fetchServicesList() {
    async function fetchDeployInfos() {
      // const res = await servicesApi.getServicesApiV1ServiceGet()
      const res = await deployApi.getDeploymentApiV1DeployDeploymentIdGet(
        deployLogId
      )
      // setServicesList(res.data.map((service) => service.id))
      // setPastDeploymentsList(res.data.map((deployment) => deployment.id))
      setDeploymentLog(res.data)
      // OK mais pas utile ici : setPastDeploymentsList(res.data.map(d =>({id:d['id'],start_time:d["start_time"],end_time:d["end_time"],state:d["state"],operations:d["operations"]})))
      // setPastDeploymentsList([{id:1,start_time:'toto',end_time:'titi',state:'Ok'},{id:1,start_time:'toto',end_time:'titi',state:'Ok'}])
      // setPastDeploymentsList([{id:1,start_time:'toto',end_time:'titi',state:'Ok'},{id:1,start_time:'toto',end_time:'titi',state:'Ok'}])
    }
    // fetchServicesList()
    deployLogId && fetchDeployInfos()
    // }, [servicesApi])
  }, [deployApi, deployLogId])

  // return servicesList
  return deploymentLog
}
