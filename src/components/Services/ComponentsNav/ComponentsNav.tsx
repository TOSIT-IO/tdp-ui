import { useRouter } from 'next/router'
import { useSelectService } from 'src/features/variables'
import { getFirstElementIfArray } from 'src/utils'
import { ComponentsDropdown } from './ComponentsDropdown'
import { ComponentsTabs } from './ComponentsTabs'

export function ComponentsNav() {
  const {
    query: { serviceId: tempServiceId, componentId: tempComponentId },
    isReady,
  } = useRouter()
  const componentId = isReady && getFirstElementIfArray(tempComponentId)
  const serviceId = isReady && getFirstElementIfArray(tempServiceId)

  const [usedComponents, unusedComponents] = useSelectService(
    serviceId
  ).value.components.reduce(
    ([usedComponents, unusedComponents], component) => {
      const {
        value: { id, variables },
      } = component
      const isUsed = Object.values(variables).length > 0
      if (isUsed) {
        usedComponents.push({
          id,
          href: `/services/${serviceId}/components/${componentId}`,
        })
      } else {
        unusedComponents.push({
          id,
          href: `/services/${serviceId}/components/${componentId}`,
        })
      }
      return [usedComponents, unusedComponents]
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
