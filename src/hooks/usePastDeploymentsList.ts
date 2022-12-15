import { useEffect, useState } from 'react'
import { useTdpClient } from 'src/contexts'

import type { DeploymentLog } from '@/client-sdk'

// type ApiConfigType = {
// type DeployHeaderType = {
//   id: number
//   state: string
// }

export type deploymentType = {
  id: number
  start_time: string
  end_time: string
  state: string
  operations: string[]
}

export type deploymentTabType = {
  deployTab: deploymentType[]
}

export function usePastDeploymentsList() {
  const { servicesApi } = useTdpClient()
  const { deployApi } = useTdpClient()

  const [servicesList, setServicesList] = useState([])
  // const [pastDeploymentsList, setPastDeploymentsList] = useState([])
  const [pastDeploymentsList, setPastDeploymentsList] = useState<
    DeploymentLog[]
  >([])

  useEffect(() => {
    // async function fetchServicesList() {
    async function fetchPastDeploymentsList() {
      // const res = await servicesApi.getServicesApiV1ServiceGet()
      const res = await deployApi.getDeploymentsApiV1DeployGet()
      // setServicesList(res.data.map((service) => service.id))
      setPastDeploymentsList(res.data.map((deployment) => deployment))
    }
    // fetchServicesList()
    fetchPastDeploymentsList()
    // }, [servicesApi])
  }, [deployApi])

  // return servicesList
  return pastDeploymentsList
}

export function usePastDeploymentsRichList() {
  const { servicesApi } = useTdpClient()
  const { deployApi } = useTdpClient()

  const [servicesList, setServicesList] = useState([])
  const [pastDeploymentsList, setPastDeploymentsList] = useState<
    deploymentType[]
  >([])
  const [pastDeploymentsTab, setPastDeploymentsTab] =
    useState<deploymentTabType>(null)
  //deploymentTabType

  // const [pastDeploymentsList, setPastDeploymentsList] = useState<{id: number; start_time:string; end_time: string; state: string; operations?: string[] }[]>([])

  useEffect(() => {
    // async function fetchServicesList() {
    async function fetchPastDeploymentsList() {
      // const res = await servicesApi.getServicesApiV1ServiceGet()
      const res = await deployApi.getDeploymentsApiV1DeployGet()
      // setServicesList(res.data.map((service) => service.id))
      // setPastDeploymentsList(res.data.map((deployment) => deployment.id))
      setPastDeploymentsList(
        res.data.map((d) => ({
          id: d.id,
          start_time: d.start_time,
          end_time: d.end_time,
          state: d.state,
          operations: d.operations,
        }))
      )
      // setPastDeploymentsTab(
      //   res.data.map((d) => ({
      //     id: d.id,
      //     start_time: d.start_time,
      //     end_time: d.end_time,
      //     state: d.state,
      //     operations: d.operations,
      //   }))
      // )
      // OK mais pas utile ici : setPastDeploymentsList(res.data.map(d =>({id:d['id'],start_time:d["start_time"],end_time:d["end_time"],state:d["state"],operations:d["operations"]})))
      // setPastDeploymentsList([{id:1,start_time:'toto',end_time:'titi',state:'Ok'},{id:1,start_time:'toto',end_time:'titi',state:'Ok'}])
      // setPastDeploymentsList([{id:1,start_time:'toto',end_time:'titi',state:'Ok'},{id:1,start_time:'toto',end_time:'titi',state:'Ok'}])
    }
    // fetchServicesList()
    fetchPastDeploymentsList()
    // }, [servicesApi])
  }, [deployApi])

  // return servicesList
  return pastDeploymentsList
}
