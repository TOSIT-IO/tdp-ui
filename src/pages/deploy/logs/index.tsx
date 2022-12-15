import { ReactElement, useReducer } from 'react'
import DashboardLayout from 'src/app/dashboard/layout'
import { Button } from 'src/components'
import { useDeploy } from 'src/hooks'
import { usePastDeploymentsList, usePastDeploymentsRichList } from 'src/hooks'
import { DeployRequest, FilterTypeEnum } from '@/client-sdk'
import { DeployMethodsEnum, DeployStateType } from 'src/types/deployTypes'
import { PastDeployLogs } from 'src/components/DeployLogs/TableDeployLogs'

import { ListPastDeployLogs } from 'src/components/DeployLogs/'

import type { DeploymentLog } from '@/client-sdk'
import type { deploymentType } from 'src/hooks/usePastDeploymentsList'
import Operation from 'src/app/deploy/Operation'
import Link from 'next/link'

// ListPastDeployLogs

// type navItemType = {
//   name: string
//   href: string
//   icon?: HeroIcon
//   children?: navItemType[]
//   isCurrent?: boolean
// }

// const deployMethods: DeployMethodsType[] = [
//   {
//     name: DeployMethodsEnum.ALL,
//     title: 'All',
//     description: 'Deploy all operations.',
//   },
//   {
//     name: DeployMethodsEnum.SOURCES,
//     title: 'From sources',
//     description: 'List of operations used as targets on the dag generation.',
//   },
//   {
//     name: DeployMethodsEnum.TARGETS,
//     title: 'To targets',
//     description: 'List of operations used as sources on the dag generation.',
//   },
// ]

// const filterTypes: TfilterType[] = [
//   { name: 'regex', placeholder: `.+config` },
//   { name: 'glob', placeholder: `*_config` },
// ]

// const initialState: DeployStateType = {
//   operations: [],
//   filterExpression: '',
//   filterType: FilterTypeEnum.Regex,
//   deployMethod: DeployMethodsEnum.ALL,
//   restart: false,
// }

const PastDeployLogsPage = () => {
  // const { deploy } = useDeploy()
  // const [state, dispatch] = useReducer(deployReducer, initialState)

  // function handleDeploy(e: React.SyntheticEvent) {
  //   e.preventDefault()
  //   const deployReq: DeployRequest = { restart: state.restart }
  //   if (state.filterExpression.trim()) {
  //     deployReq.filter_type = state.filterType
  //     deployReq.filter_expression = state.filterExpression
  //   }
  //   if (state.deployMethod !== 'all') {
  //     deployReq[state.deployMethod] = state.operations
  //   }
  //   deploy(deployReq)
  // }

  const people = [
    {
      name: 'Lindsay Walton',
      title: 'Front-end Developer',
      email: 'lindsay.walton@example.com',
      role: 'Member',
    },
    // More people...
  ]

  // const servicesList = useServicesList()
  const pastDeploymentsList = usePastDeploymentsList()
  const pastDeploymentsRichList: deploymentType[] = usePastDeploymentsRichList()
  // console.log(JSON.stringify(pastDeploymentsList))

  // const router = useRouter()
  // const currentPage = router.query.serviceId

  // const menuItems: navItemType[] = [
  //   // { name: 'Dashboard', href: '#', icon: HomeIcon },
  //   {
  //     name: 'Services',
  //     href: '/services',
  //     icon: BeakerIcon,
  //     children: servicesList?.map((service) => ({
  //       name: service,
  //       href: `/services/${service}`,
  //       isCurrent: service === router.query.serviceId ? true : false,
  //     })),
  //   },
  //   {
  //     name: 'Deployments',
  //     href: '/deploy',
  //     icon: Cog6ToothIcon,
  //     children: [
  //       {
  //         name: 'Deploy',
  //         href: '/deploy',
  //       },
  //       { name: 'Logs',
  //         href: '/logs',
  //       },
  //     ],
  //   },
  //   // { name: 'Hosts', href: '#', icon: ServerIcon },
  //   // { name: 'Alerts', href: '#', icon: BellIcon },
  //   // { name: 'Cluster Admin', href: '#', icon: WrenchIcon },
  // ]

  return (
    <>
      {/* <ListPastDeployLogs pastDeploymentsRichList={pastDeploymentsRichList}/> */}
      <ListPastDeployLogs deployTab={pastDeploymentsRichList} />
    </>
  )
}

PastDeployLogsPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default PastDeployLogsPage
