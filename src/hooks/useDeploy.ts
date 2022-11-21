import { toast } from 'react-toastify'
import { useTdpClient } from 'src/contexts'

export function useDeploy() {
  const { deployApi } = useTdpClient()

  async function deploy(targets: string[]) {
    const res = await deployApi.deployNodeApiV1DeployPost({ targets })
    res?.data?.message && toast.info(res.data.message)
  }

  return { deploy }
}
