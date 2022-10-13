import { useContext } from 'react'
import { TdpClientContext } from 'src/contexts'

import type { TdpClientContextValueType } from 'src/types'

export const useTdpClient = (): TdpClientContextValueType => {
  const tdpClient = useContext(TdpClientContext)
  if (!tdpClient) throw new Error('useTdpClient must be inside a Provider')

  return tdpClient
}
