import React from 'react'
import { TdpClientType } from 'src/types'

export const TdpClientContext = React.createContext<undefined | TdpClientType>(
  undefined
)
