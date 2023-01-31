import { useSelectService } from 'src/features/variables'
import { useParamsContext } from '../useParamsContext'
import { ComponentsDropdown } from './ComponentsDropdown'
import { ComponentsTabs } from './ComponentsTabs'

export function ComponentsNav() {
  const { serviceId: currentServiceId, componentId: currentComponentId } =
    useParamsContext()

  const [usedComponents, unusedComponents] = useSelectService(
    currentServiceId
  ).value.components.reduce(
    ([usedComponents, unusedComponents], component) => {
      const {
        value: { id: componentId, variables },
      } = component
      const isUsed = Object.values(variables).length > 0
      if (isUsed) {
        usedComponents.push({
          id: componentId,
          href: `/services/${currentServiceId}/components/${componentId}`,
        })
      } else {
        unusedComponents.push({
          id: componentId,
          href: `/services/${currentServiceId}/components/${componentId}`,
        })
      }
      return [usedComponents, unusedComponents]
    },
    [[{ id: currentServiceId, href: `/services/${currentServiceId}` }], []]
  )

  return (
    <div className="mb-5">
      <div className="sm:hidden">
        <ComponentsDropdown
          usedComponents={usedComponents}
          unusedComponents={unusedComponents}
          currentTabId={currentComponentId}
        />
      </div>
      <div className="hidden sm:block">
        <ComponentsTabs
          usedComponents={usedComponents}
          unusedComponents={unusedComponents}
          currentTabId={currentComponentId}
        />
      </div>
    </div>
  )
}
