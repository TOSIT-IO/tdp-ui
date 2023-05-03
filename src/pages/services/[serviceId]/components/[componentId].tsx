import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { PageTitle } from 'src/components/Layout'
import ServiceVariables from 'src/components/Services/ServiceVariables'
import { useGetComponentApiV1ServiceServiceIdComponentComponentIdGetQuery } from 'src/store/api/tdpApi'
import { useAppDispatch, useAppSelector } from 'src/store'
import { setServiceId } from 'src/store/userInput'

const Page = () => {
  const dispatch = useAppDispatch()
  const {
    query: { serviceId, componentId },
  } = useRouter()
  const currentServiceId = serviceId.toString()
  const currentComponentId = componentId.toString()
  const userInput = useAppSelector((state) => state.userInput)

  const { data } =
    useGetComponentApiV1ServiceServiceIdComponentComponentIdGetQuery({
      serviceId: currentServiceId,
      componentId: currentComponentId,
    })

  // Initializing userInput store
  useEffect(() => {
    if (currentServiceId == userInput.id) return
    dispatch(setServiceId(currentServiceId))
  }, [currentServiceId, dispatch, userInput])

  if (data)
    return (
      <>
        <PageTitle>Variables configuration</PageTitle>
        <ServiceVariables
          data={data}
          serviceId={currentServiceId}
          componentId={currentComponentId}
        />
      </>
    )
}

export default Page
