import { ReactElement, useReducer } from 'react'
import DashboardLayout from 'src/app/dashboard/layout'
import {
  Button,
  FilterField,
  DeployTypeField,
  RestartField,
  OperationsField,
} from 'src/components'
import { useDeploy } from 'src/hooks'
import { DeployRequest, FilterTypeEnum } from '@/client-sdk'
import {
  DeployMethodsEnum,
  DeployMethodsType,
  DeployStateType,
  TfilterType,
} from 'src/types/deployTypes'
import { deployReducer } from 'src/utils/deployReducer'
import { DeployContext } from 'src/contexts/deployContext'

const deployMethods: DeployMethodsType[] = [
  {
    name: DeployMethodsEnum.ALL,
    title: 'All',
    description: 'Deploy all operations.',
  },
  {
    name: DeployMethodsEnum.SOURCES,
    title: 'From sources',
    description: 'List of operations used as targets on the dag generation.',
  },
  {
    name: DeployMethodsEnum.TARGETS,
    title: 'To targets',
    description: 'List of operations used as sources on the dag generation.',
  },
]

const filterTypes: TfilterType[] = [
  { name: 'regex', placeholder: `.+config` },
  { name: 'glob', placeholder: `*_config` },
]

const initialState: DeployStateType = {
  operations: [],
  filterExpression: '',
  filterType: FilterTypeEnum.Regex,
  deployMethod: DeployMethodsEnum.ALL,
  restart: false,
}

const DeployPage = () => {
  const { deploy } = useDeploy()
  const [state, dispatch] = useReducer(deployReducer, initialState)

  function handleDeploy(e: React.SyntheticEvent) {
    e.preventDefault()
    const deployReq: DeployRequest = { restart: state.restart }
    if (state.filterExpression.trim()) {
      deployReq.filter_type = state.filterType
      deployReq.filter_expression = state.filterExpression
    }
    if (state.deployMethod !== 'all') {
      deployReq[state.deployMethod] = state.operations
    }
    deploy(deployReq)
  }

  return (
    <DeployContext.Provider value={{ state, dispatch }}>
      <form className="flex flex-col gap-7">
        <header className="border-b border-gray-200 pb-5">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
            Deploy
          </h1>
        </header>
        <DeployTypeField deployMethods={deployMethods} />
        <div className="-mt-4">
          <OperationsField />
        </div>
        <FilterField filterTypes={filterTypes} />
        <RestartField />
        <div className="self-center">
          <Button
            type="button"
            onClick={handleDeploy}
            className="font-bold text-xl"
          >
            Deploy
          </Button>
        </div>
      </form>
    </DeployContext.Provider>
  )
}

DeployPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default DeployPage
