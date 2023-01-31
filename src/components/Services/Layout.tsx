import { useRouter } from 'next/router'
import { PageTitle } from 'src/components/Layout/primitives/PageTitle'
import { ComponentsNav } from 'src/components/Services/ComponentsNav'
import { getFirstElementIfArray } from 'src/utils'
import { ParamsContextProvider } from './ParamsContext'

export function Layout({ children }) {
  const {
    query: { serviceId: tempServiceId, componentId: tempComponentId },
    isReady,
  } = useRouter()
  const currentServiceId = isReady && getFirstElementIfArray(tempServiceId)
  const currentComponentId = isReady && getFirstElementIfArray(tempComponentId)

  return (
    <ParamsContextProvider
      serviceId={currentServiceId}
      componentId={currentComponentId}
    >
      <PageTitle>Variables configuration</PageTitle>
      <ComponentsNav />
      {children}
    </ParamsContextProvider>
  )
}
