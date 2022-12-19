import { DeployRequest } from '@/client-sdk'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useTdpClient } from 'src/contexts'
import { DeployStateType } from 'src/types/deployTypes'

export function useDeploy(initialConfig: DeployStateType) {
  const { deployApi, planApi } = useTdpClient()
  const [previewDeploy, setPreviewDeploy] = useState([])

  useEffect(() => {
    async function fetchPreviewConfig() {
      let res = null
      switch (initialConfig.selectedDeployMode) {
        case 'sources':
        case 'targets':
          const deployReq = formatRequest(initialConfig)
          res = await planApi.getDagPlanApiV1PlanDagPost(deployReq)
          break
        case 'all':
          res = await planApi.getDagPlanApiV1PlanDagPost()
          break
        default:
          res = { data: [] }
          break
      }
      setPreviewDeploy(res?.data)
    }
    fetchPreviewConfig()
  }, [initialConfig, planApi])

  async function deploy(config: DeployStateType) {
    if (!config.selectedDeployMode) {
      toast.error('Please select a deploy mode')
      return
    }
    let res = null
    switch (config.selectedDeployMode) {
      case 'custom':
        if (!config.operations.length) {
          toast.error('Please select at least one operation')
          return
        }
        res = await deployApi.operationsApiV1DeployOperationsPost({
          operations: config.operations,
        })
        break
      case 'sources':
      case 'targets':
        if (!config.operations.length) {
          toast.error('Please select at least one operation')
          return
        }
        const deployReq = formatRequest(config)
        res = await deployApi.deployNodeApiV1DeployPost(deployReq)
        break
      default:
        res = await deployApi.deployNodeApiV1DeployPost()
        break
    }
    res?.data?.state && toast.info(`Deploy id: ${res.data.id}`)
  }

  return { deploy, previewDeploy }
}

function formatRequest(state: DeployStateType) {
  const deployReq: DeployRequest = { restart: state.restart }
  if (state.filterExpression.trim()) {
    deployReq.filter_type = state.filterType
    deployReq.filter_expression = state.filterExpression
  }
  deployReq[state.selectedDeployMode] = state.operations
  return deployReq
}
