import { useContext, createContext } from 'react'

type VariablesContextType = {
  setNewVariables: Function
}

export const VariablesContext = createContext<VariablesContextType>(null)

export function VariablesContextProvider({ setNewVariables, children }) {
  return (
    <VariablesContext.Provider value={{ setNewVariables }}>
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
