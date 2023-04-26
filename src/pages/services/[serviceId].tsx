import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { PageTitle } from 'src/components/Layout'
import ServiceVariables from 'src/components/Services/ServiceVariables'
import { useAppDispatch, useAppSelector } from 'src/store'
import { clearUserInput, setServiceId } from 'src/store/features/userInput'
import { useGetServiceApiV1ServiceServiceIdGetQuery } from 'src/store/features/api/tdpApi'

const ServicePage = () => {
  const dispatch = useAppDispatch()
  const {
    query: { serviceId },
  } = useRouter()
  const currentServiceId = serviceId.toString()
  const userInput = useAppSelector((state) => state.userInput)
  const { data } = useGetServiceApiV1ServiceServiceIdGetQuery({
    serviceId: currentServiceId,
  })

  // Initializing userInput store
  useEffect(() => {
    if (currentServiceId == userInput.id) return
    dispatch(clearUserInput())
    dispatch(setServiceId(currentServiceId))
  }, [currentServiceId])

  if (data)
    return (
      <>
        <PageTitle>Variables configuration</PageTitle>
        <ServiceVariables data={data} serviceId={currentServiceId} />
      </>
    )
}

export default ServicePage
