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
    let res = null
    switch (state.selectedDeployMode) {
      case 'custom':
        if (!state.operations.length) {
          toast.error('Please select at least one operation')
          return
        }
        res = await deployApi.operationsApiV1DeployOperationsPost({
          operations: state.operations,
        })
        break
      case 'sources':
      case 'targets':
        if (!state.operations.length) {
          toast.error('Please select at least one operation')
          return
        }
        const deployReq: DeployRequest = { restart: state.restart }
        if (state.filterExpression.trim()) {
          deployReq.filter_type = state.filterType
          deployReq.filter_expression = state.filterExpression
        }
        deployReq[state.selectedDeployMode] = state.operations
        res = await deployApi.deployNodeApiV1DeployPost(deployReq)
        break
      default:
        res = await deployApi.deployNodeApiV1DeployPost()
        break
    }
    res?.data?.state && toast.info(`Deploy id: ${res.data.id}`)
  }

  return deploy
}
