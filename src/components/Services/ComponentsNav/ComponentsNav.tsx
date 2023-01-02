import { useRouter } from 'next/router'
import { getFirstElementIfArray } from 'src/utils'
import { ComponentsDropdown } from './ComponentsDropdown'
import { ComponentsTabs } from './ComponentsTabs'
import { useComponentsList } from './hooks'

export function ComponentsNav() {
  const {
    query: { serviceId: tempServiceId, componentId: tempComponentId },
    isReady,
  } = useRouter()
  const componentId = isReady && getFirstElementIfArray(tempComponentId)
  const serviceId = isReady && getFirstElementIfArray(tempServiceId)
  const { loading, components } = useComponentsList(serviceId)

  if (!isReady && loading) return <p>Loading</p>

  const tabs = [{ id: serviceId, href: `/services/${serviceId}` }].concat(
    components.map((component) => ({
      id: component,
      href: `/services/${serviceId}/components/${component}`,
    }))
  )
  return (
    <div className="mb-5">
      <div className="sm:hidden">
        <ComponentsDropdown tabs={tabs} currentTabId={componentId} />
      </div>
      <div className="hidden sm:block">
        <ComponentsTabs tabs={tabs} currentTabId={componentId} />
      </div>
    </div>
  )
}
