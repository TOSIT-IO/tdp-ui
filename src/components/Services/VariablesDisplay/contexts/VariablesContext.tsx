import { Service } from '@/client-sdk'
import { useContext, createContext } from 'react'
import { useServiceInfos } from 'src/hooks'

type VariablesContextType = {
  initialVariables: Object
  setNewVariables: React.Dispatch<React.SetStateAction<Service>>
  sendVariables: (message: string) => void
}

export const VariablesContext = createContext<VariablesContextType>(null)

export function VariablesContextProvider({
  serviceId,
  children,
}: {
  serviceId: string
  children: React.ReactNode
}) {
  const { initialServiceConfig, setNewVariables, sendVariables } =
    useServiceInfos(serviceId)

  if (!initialServiceConfig) return <p>Loading</p>

  return (
    <VariablesContext.Provider
      value={{
        initialVariables: initialServiceConfig.variables,
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
