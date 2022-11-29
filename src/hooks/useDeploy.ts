import { toast } from 'react-toastify'
import { useTdpClient } from 'src/contexts'

import type { DeployRequest } from '@/client-sdk'

export function useDeploy() {
  const { deployApi } = useTdpClient()

  async function deploy(deployParams: DeployRequest) {
    const res = await deployApi.deployNodeApiV1DeployPost(deployParams)
    res?.data?.state && toast.info(`Deploy status: ${res.data.state}`)
  }

  return { deploy }
}
