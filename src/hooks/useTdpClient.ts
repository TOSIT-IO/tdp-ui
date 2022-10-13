import { useContext } from 'react'
import { TdpClientContext } from 'src/contexts'

import type { TdpClientType } from 'src/types'

export const useTdpClient = (): TdpClientType => {
  const tdpClient = useContext(TdpClientContext)
  if (!tdpClient)
    throw new Error('useDefaultClient must be inside a Provider with a value')

  return tdpClient
}
