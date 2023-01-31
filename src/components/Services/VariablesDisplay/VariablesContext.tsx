import { Service } from 'src/clients/tdpClient'
import { useContext, createContext } from 'react'
import { useServiceInfos } from 'src/hooks'

type VariablesContextType = {
  setNewVariables: React.Dispatch<React.SetStateAction<Service>>
  sendVariables: (message: string) => void
}

export const VariablesContext = createContext<VariablesContextType>(null)

export function VariablesContextProvider({
  serviceId,
  componentId,
  children,
}: {
  serviceId: string
  componentId?: string
  children: React.ReactNode
}) {
  const { setNewVariables, sendVariables } = useServiceInfos(
    serviceId,
    componentId
  )

  return (
    <VariablesContext.Provider
      value={{
        setNewVariables,
        sendVariables,
      }}
    >
      {children}
    </VariablesContext.Provider>
  )
}

export function useVariablesContext() {
  const context = useContext(VariablesContext)
  if (!context)
    throw new Error(
      'useVariablesContext() hook must be inside a VariablesContextProvider'
    )

  return context
}
