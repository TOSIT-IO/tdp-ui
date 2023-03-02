import { createContext, useCallback, useContext, useEffect } from 'react'
import { useTdpClient } from 'src/contexts'
import { useAppDispatch } from 'src/store'
import { clearUserInput } from 'src/features/userInput'
import { setServiceValue } from 'src/features/variables'

type ParamContextProps = {
  currentServiceId: string
  currentComponentId?: string
}

const ParamsContext = createContext<ParamContextProps>(null)

export function ParamsContextProvider({
  children,
  currentServiceId,
  currentComponentId,
}: React.PropsWithChildren<ParamContextProps>) {
  const dispatch = useAppDispatch()
  const { getService } = useTdpClient()

  const updateServiceValue = useCallback(
    async (serviceId: string) => {
      const service = await getService(serviceId)
      dispatch(setServiceValue(service))
    },
    [getService, dispatch]
  )

  useEffect(() => {
    updateServiceValue(currentServiceId)
    dispatch(clearUserInput())
  }, [updateServiceValue, currentServiceId, dispatch])

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
