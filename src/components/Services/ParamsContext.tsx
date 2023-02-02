import { createContext, useEffect } from 'react'
import { clearUserInput } from 'src/features/userInput'
import { useAppDispatch } from 'src/store'

export const ParamsContext = createContext<{
  serviceId: string
  componentId?: string
}>(null)

export function ParamsContextProvider({ children, serviceId, componentId }) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(clearUserInput())
  }, [serviceId, dispatch])

  return (
    <ParamsContext.Provider value={{ serviceId, componentId }}>
      {children}
    </ParamsContext.Provider>
  )
}
