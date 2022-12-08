import { toast } from 'react-toastify'
import { useTdpClient } from 'src/contexts'

import { DeployRequest, FilterTypeEnum } from '@/client-sdk'
import { useReducer } from 'react'
import { DeployMethodsEnum } from 'src/types/deployTypes'
import { deployReducer } from 'src/utils/deployReducer'

const initialState = {
  operations: [],
  filterExpression: '',
  filterType: FilterTypeEnum.Regex,
  deployMethod: DeployMethodsEnum.ALL,
  restart: false,
}

export function useDeploy() {
  const { deployApi } = useTdpClient()
  const [state, dispatch] = useReducer(deployReducer, initialState)

  async function deploy() {
    const deployReq: DeployRequest = { restart: state.restart }
    if (state.filterExpression.trim()) {
      deployReq.filter_type = state.filterType
      deployReq.filter_expression = state.filterExpression
    }
    if (state.deployMethod !== 'all') {
      deployReq[state.deployMethod] = state.operations
    }
    const res = await deployApi.deployNodeApiV1DeployPost(deployReq)
    res?.data?.state && toast.info(`Deploy status: ${res.data.state}`)
  }

  return { deploy, state, dispatch }
}
