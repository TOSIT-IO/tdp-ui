import { DeployRequest } from '@/client-sdk'
import { toast } from 'react-toastify'
import { useTdpClient } from 'src/contexts'
import { DeployStateType } from 'src/types/deployTypes'

export function useDeploy() {
  const { deployApi } = useTdpClient()

  async function deploy(state: DeployStateType) {
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

  return deploy
}
