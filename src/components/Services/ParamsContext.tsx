import { createContext, useEffect } from 'react'
import { useTdpClient } from 'src/contexts'
import { clearUserInput } from 'src/features/userInput'
import { setServiceValue } from 'src/features/variables'
import { useAppDispatch } from 'src/store'

export const ParamsContext = createContext<{
  serviceId: string
  componentId?: string
}>(null)

export function ParamsContextProvider({ children, serviceId, componentId }) {
  const dispatch = useAppDispatch()
  const { getService } = useTdpClient()

  useEffect(() => {
    async function updateServiceValue() {
      const service = await getService(serviceId)
      dispatch(setServiceValue(service))
    }
    updateServiceValue()
    dispatch(clearUserInput())
  }, [serviceId, dispatch, getService])

  return (
    <ParamsContext.Provider value={{ serviceId, componentId }}>
      {children}
    </ParamsContext.Provider>
  )
}
