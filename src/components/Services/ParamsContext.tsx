import { createContext, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'

import { useAppDispatch } from 'src/store'
import { clearUserInput, setServiceId } from 'src/store/features/userInput'
import { getFirstElementIfArray } from 'src/utils'

type ParamContextProps = {
  currentServiceId: string
  currentComponentId?: string
}

const ParamsContext = createContext<ParamContextProps>(null)

export function ParamsContextProvider({ children }) {
  // Needs to be in the context to share it on both services and components pages
  const {
    isReady,
    query: { serviceId: tempServiceId, componentId: tempComponentId },
  } = useRouter()
  const currentServiceId = isReady && getFirstElementIfArray(tempServiceId)
  const currentComponentId = isReady && getFirstElementIfArray(tempComponentId)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(clearUserInput())
    dispatch(setServiceId(currentServiceId))
  }, [dispatch, currentServiceId])

  return (
    <ParamsContext.Provider value={{ currentServiceId, currentComponentId }}>
      {children}
    </ParamsContext.Provider>
  )
}

export function useParamsContext() {
  const paramContext = useContext(ParamsContext)
  if (!paramContext) {
    throw new Error(
      'useParamsContext must be used within a ParamsContextProvider'
    )
  }
  return paramContext
}
