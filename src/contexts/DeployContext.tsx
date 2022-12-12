import { toast } from 'react-toastify'
import { useTdpClient } from 'src/contexts'
import { DeployRequest, FilterTypeEnum } from '@/client-sdk'
import { useReducer } from 'react'
import { deployReducer } from 'src/utils/deployReducer'
import { createContext, useContext } from 'react'
import { DeployActions } from 'src/utils/deployReducer'
import { DeployStateType } from '../types/deployTypes'

const initialState = {
  operations: [],
  filterExpression: '',
  filterType: FilterTypeEnum.Regex,
  selectedDeployMode: null,
  restart: false,
}

const DeployContext = createContext<{
  deploy: () => Promise<void>
  state: DeployStateType
  dispatch: React.Dispatch<DeployActions>
}>(null)

export function DeployContextProvider({ children }) {
  const { deployApi } = useTdpClient()
  const [state, dispatch] = useReducer(deployReducer, initialState)

  async function deploy() {
    if (!state.selectedDeployMode) {
      toast.error('Please select a deploy mode')
      return
    }
    const deployReq: DeployRequest = {}
    switch (state.selectedDeployMode) {
      case 'sources':
      case 'targets':
      case 'custom':
        if (!state.operations.length) {
          toast.error('Please select at least one operation')
          return
        }
      case 'custom':
        deployReq.targets = state.operations
        break
      case 'sources':
      case 'targets':
        deployReq.restart = state.restart
        if (state.filterExpression.trim()) {
          deployReq.filter_type = state.filterType
          deployReq.filter_expression = state.filterExpression
        }
        deployReq[state.selectedDeployMode] = state.operations
        break
      default:
        break
    }
    const res = await deployApi.deployNodeApiV1DeployPost(deployReq)
    res?.data?.state && toast.info(`Deploy id: ${res.data.id}`)
  }

  return (
    <DeployContext.Provider value={{ deploy, state, dispatch }}>
      {children}
    </DeployContext.Provider>
  )
}

export function useDeployContext() {
  const deployContext = useContext(DeployContext)
  if (!deployContext)
    throw new Error(
      'useDeployContext() hook must be inside a DeployContextProvider'
    )

  return deployContext
}
