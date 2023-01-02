import { useRouter } from 'next/router'
import { useServiceInfos } from 'src/hooks'
import { getFirstElementIfArray } from 'src/utils'
import { ComponentsDropdown } from './ComponentsDropdown'
import { ComponentsTabs } from './ComponentsTabs'

export function ComponentsNav() {
  const {
    query: { serviceId: tempServiceId, componentId: tempComponentId },
    isReady,
  } = useRouter()
  const currentServiceId = getFirstElementIfArray(tempServiceId)
  const currentComponentId = getFirstElementIfArray(tempComponentId)
  const { componentList: components } = useServiceInfos(currentServiceId)

  if (!isReady) return <p>Loading</p>

  const tabs = [
    { id: currentServiceId, href: `/services/${currentServiceId}` },
  ].concat(
    components.map((component) => ({
      id: component,
      href: `/services/${currentServiceId}/components/${component}`,
    }))
  )
  return (
    <div className="mb-5">
      <div className="sm:hidden">
        <ComponentsDropdown
          tabs={tabs}
          currentTab={currentComponentId || currentServiceId}
        />
      </div>
      <div className="hidden sm:block">
        <ComponentsTabs
          tabs={tabs}
          currentTabId={currentComponentId || currentServiceId}
        />
      </div>
    </div>
  )
}
