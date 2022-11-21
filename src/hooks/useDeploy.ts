import { useTdpClient } from 'src/contexts'

export function useDeploy() {
  const { deployApi } = useTdpClient()

  async function deploy(targets: string[]) {
    const res = await deployApi.deployNodeApiV1DeployPost({ targets })
  }

  return { deploy }
}
