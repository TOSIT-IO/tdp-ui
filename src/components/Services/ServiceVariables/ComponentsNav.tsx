import Link from 'next/link'
import { useRouter } from 'next/router'

import { ComponentAsValue, useSelectService } from 'src/features/variables'
import { useSelectUserInput } from 'src/features/userInput/hooks'
import { toogleShowUnusedTabs } from 'src/features/userInput'
import { useAppDispatch } from 'src/store'
import { classNames } from 'src/utils'
import { Button } from 'src/components/commons'
import { useParamsContext } from '../ParamsContext'

type ComponentNavItem = {
  id: string
  href: string
}

type ComponentsNav = {
  usedComponents: ComponentNavItem[]
  unusedComponents: ComponentNavItem[]
  currentTabId: string
  onChange: () => void
}

const ComponentTab = ({
  tab,
  isCurrentTab,
  onChange,
}: {
  tab: ComponentNavItem
  isCurrentTab: boolean
  onChange: () => void
}) => {
  return (
    <Link
      key={tab.id}
      href={tab.href}
      onClick={onChange}
      className={classNames(
        isCurrentTab
          ? 'bg-gray-700 text-white'
          : 'bg-gray-200 text-gray-500 hover:bg-gray-700 hover:text-white',
        'px-3 py-2 text-center text-sm font-medium'
      )}
      aria-current={isCurrentTab ? 'page' : undefined}
    >
      {tab.id}
    </Link>
  )
}

const ComponentsTabs = ({
  usedComponents,
  unusedComponents,
  currentTabId,
  onChange,
}: ComponentsNav) => {
  const {
    settings: { showUnusedTabs },
  } = useSelectUserInput()
  const dispatch = useAppDispatch()

  const isCurrentTab = (tab: string) => {
    if (currentTabId === tab) return true
    return false
  }

  function toggleShowUnused() {
    dispatch(toogleShowUnusedTabs())
  }

  return (
    <nav className="flex flex-wrap items-center gap-1" aria-label="Tabs">
      {usedComponents
        .concat(showUnusedTabs ? unusedComponents : [])
        .map((tab) => {
          return (
            <ComponentTab
              key={tab.id}
              tab={tab}
              isCurrentTab={isCurrentTab(tab.id)}
              onChange={onChange}
            />
          )
        })}
      <Button
        variant="text"
        className="ml-1 cursor-pointer text-xs text-gray-600"
        onClick={toggleShowUnused}
        aria-label={showUnusedTabs ? 'fold' : 'unfold'}
      >
        {`[${showUnusedTabs ? '-' : '+'}]`}
      </Button>
    </nav>
  )
}

const ComponentsDropdown = ({
  usedComponents,
  unusedComponents,
  currentTabId,
  onChange,
}: ComponentsNav) => {
  const { push, isReady } = useRouter()
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault()
    isReady && push(e.target.value)
  }
  return (
    <>
      <label htmlFor="tabs" className="sr-only">
        Select a tab
      </label>
      <select
        id="tabs"
        name="tabs"
        className="block w-full rounded-md border-gray-300"
        defaultValue={currentTabId}
        onChange={handleChange}
      >
        {usedComponents.map((tab) => (
          <option key={tab.id} value={tab.href} onClick={onChange}>
            {tab.id}
          </option>
        ))}
        <option disabled>──────────</option>
        {unusedComponents.map((tab) => (
          <option key={tab.id} value={tab.href} onClick={onChange}>
            {tab.id}
          </option>
        ))}
      </select>
    </>
  )
}

const ServiceNav = ({ onChange }: { onChange?: () => void }) => {
  const { currentServiceId, currentComponentId } = useParamsContext()
  const {
    value: { components },
  } = useSelectService(currentServiceId)

  const [usedComponents, unusedComponents] = splitComponentsTabs(
    components,
    currentServiceId
  )

  return (
    <div className="mb-5">
      <div className="sm:hidden">
        <ComponentsDropdown
          usedComponents={usedComponents}
          unusedComponents={unusedComponents}
          currentTabId={currentComponentId || currentServiceId}
          onChange={onChange}
        />
      </div>
      <div className="hidden sm:block">
        <ComponentsTabs
          usedComponents={usedComponents}
          unusedComponents={unusedComponents}
          currentTabId={currentComponentId || currentServiceId}
          onChange={onChange}
        />
      </div>
    </div>
  )
}

export default ServiceNav

/**
 * Split components into used and unused components. Unused components are
 * components that have no variables.
 *
 * @param components - components of a service
 * @param serviceId - service id
 *
 * @returns [usedComponents, unusedComponents]
 */
function splitComponentsTabs(
  components: ComponentAsValue[],
  serviceId: string
) {
  const defaultServiceTab = {
    id: serviceId,
    href: `/services/${serviceId}`,
  }
  return components.reduce(
    ([usedComponents, unusedComponents], component) => {
      const {
        value: { id: componentId, variables },
      } = component
      const isUsed = Object.values(variables).length > 0
      if (isUsed) {
        usedComponents.push({
          id: componentId,
          href: `/services/${serviceId}/components/${componentId}`,
        })
      } else {
        unusedComponents.push({
          id: componentId,
          href: `/services/${serviceId}/components/${componentId}`,
        })
      }
      return [usedComponents, unusedComponents]
    },
    [[defaultServiceTab], []]
  )
}
