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

  const [usedComponents, unusedComponents] = components.reduce(
    (acc, component) => {
      const { id: componentId, isUsed } = component
      if (isUsed) {
        acc[0].push({
          id: componentId,
          href: `/services/${serviceId}/components/${componentId}`,
        })
      } else {
        acc[1].push({
          id: componentId,
          href: `/services/${serviceId}/components/${componentId}`,
        })
      }
      return acc
    },
    [[{ id: serviceId, href: `/services/${serviceId}` }], []]
  )

  return (
    <div className="mb-5">
      <div className="sm:hidden">
        <ComponentsDropdown
          usedComponents={usedComponents}
          unusedComponents={unusedComponents}
          currentTabId={componentId}
        />
      </div>
      <div className="hidden sm:block">
        <ComponentsTabs
          usedComponents={usedComponents}
          unusedComponents={unusedComponents}
          currentTabId={componentId}
        />
      </div>
    </div>
  )
}
