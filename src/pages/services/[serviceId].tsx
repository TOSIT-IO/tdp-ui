import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { merge } from 'mixme'
import { PageTitle } from 'src/components/Layout'
import {
  ParamsContextProvider,
  VariablesDisplay,
} from 'src/components/Services'
import { useSelectService } from 'src/features/variables'
import { NextPageWithLayout } from 'src/types'
import { getFirstElementIfArray } from 'src/utils'
import { useSelectUserInput } from 'src/features/userInput/hooks'

const ServicePage: NextPageWithLayout = () => {
  const {
    isReady,
    query: { serviceId: tempServiceId },
  } = useRouter()
  const serviceId = isReady && getFirstElementIfArray(tempServiceId)

  const {
    value: { variables },
  } = useSelectService(serviceId)

  const { variables: userInput } = useSelectUserInput()

  if (!variables) return <p>Loading...</p>

  return (
    <>
      <PageTitle>Variables configuration</PageTitle>
      {/* key allows to re-render when changing page (as the ParamsContext is shared accross all services/components) */}
      <VariablesDisplay
        key={serviceId}
        variables={merge(variables, userInput)}
      />
    </>
  )
}

ServicePage.getLayout = function getLayout(page: ReactElement) {
  return <ParamsContextProvider>{page}</ParamsContextProvider>
}

export default ServicePage
