import { FilterTypeEnum } from '@/client-sdk'
import { createContext, useContext, useReducer } from 'react'
import { useDeploy } from 'src/hooks/useDeploy'
import { DeployActions, deployReducer } from 'src/utils/deployReducer'
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
  const [state, dispatch] = useReducer(deployReducer, initialState)
  const deploy = useDeploy()

  return (
    <DeployContext.Provider
      value={{ deploy: () => deploy(state), state, dispatch }}
    >
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
