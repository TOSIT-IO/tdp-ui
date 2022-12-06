import { createContext, useContext } from 'react'
import { DeployActions } from 'src/utils/deployReducer'
import { DeployStateType } from '../types/deployTypes'

export const DeployContext = createContext<{
  state: DeployStateType
  dispatch: React.Dispatch<DeployActions>
}>(null)

export function useDeployContext() {
  const deployContext = useContext(DeployContext)
  if (!deployContext)
    throw new Error(
      'useDeployContext() hook must be inside a DeployContextProvider'
    )

  return deployContext
}
