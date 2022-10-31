import { useState } from 'react'
import { useTdpClient } from 'src/contexts'

export function useServicesList() {
  const { servicesApi } = useTdpClient()
  const [servicesList, setServicesList] = useState([])

  async function fetchServicesList() {
    const res = await servicesApi.getServicesApiV1ServiceGet()
    setServicesList(res.data.map((service) => service.id))
  }
  fetchServicesList()

  return servicesList
}
