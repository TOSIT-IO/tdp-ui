import { useContext } from 'react'
import { ParamsContext } from './ParamsContext'

export const useParamsContext = () => {
  const paramContext = useContext(ParamsContext)
  if (!paramContext) {
    throw new Error(
      'useParamsContext must be used within a ParamsContextProvider'
    )
  }
  return paramContext
}
