import { useEffect } from 'react'
import { useAppDispatch } from 'src/store'
import { useSelectServices } from './hooks'
import { useTdpClient } from 'src/contexts'
import { setServicesError, setServicesValue } from './variablesSlice'

export function LoadVariables({ children }) {
  const { getServices } = useTdpClient()
  const dispatch = useAppDispatch()
  const { error, status } = useSelectServices()

  useEffect(() => {
    async function loadVariables() {
      try {
        const services = await getServices()
        dispatch(setServicesValue(services))
      } catch (error) {
        dispatch(setServicesError(error))
      }
    }
    loadVariables()
  }, [dispatch, getServices])

  if (status === 'succeeded') return children

  if (status === 'loading')
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl">Loading...</div>
      </div>
    )

  if (status === 'failed')
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl">Error: {error}</div>
      </div>
    )
}
