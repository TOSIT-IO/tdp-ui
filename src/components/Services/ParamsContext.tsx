import { createContext } from 'react'

export const ParamsContext = createContext<{
  serviceId: string
  componentId?: string
}>(null)

export function ParamsContextProvider({ children, serviceId, componentId }) {
  return (
    <ParamsContext.Provider value={{ serviceId, componentId }}>
      {children}
    </ParamsContext.Provider>
  )
}
