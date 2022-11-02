import { useEffect, useState } from 'react'
import { useTdpClient } from 'src/contexts'

// TODO: make it an async component with a loading state
export function useServicesList() {
  const { servicesApi } = useTdpClient()
  const [servicesList, setServicesList] = useState([])

  useEffect(() => {
    async function fetchServicesList() {
      const res = await servicesApi.getServicesApiV1ServiceGet()
      console.log('Fetch services')
      setServicesList(res.data.map((service) => service.id))
    }
    fetchServicesList()
  }, [servicesApi])

  return servicesList
}
