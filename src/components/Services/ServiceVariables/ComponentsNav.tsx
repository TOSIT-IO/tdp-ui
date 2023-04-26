import Link from 'next/link'
import { useRouter } from 'next/router'

import {
  useGetServiceApiV1ServiceServiceIdGetQuery,
  Component,
} from 'src/store/features/api/tdpApi'
import { useAppSelector } from 'src/store'
import { toogleShowUnusedTabs } from 'src/store/features/userInput'
import { useAppDispatch } from 'src/store'
import { classNames } from 'src/utils'
import { Button } from 'src/components/commons'

type ComponentNavItem = {
  id: string
  href: string
}

type ComponentsNav = {
  usedComponents: ComponentNavItem[]
  unusedComponents: ComponentNavItem[]
  currentTabId: string
}

const ComponentTab = ({
  tab,
  isCurrentTab,
}: {
  tab: ComponentNavItem
  isCurrentTab: boolean
}) => {
  return (
    <Link
      key={tab.id}
      href={tab.href}
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
}: ComponentsNav) => {
  const {
    settings: { showUnusedTabs },
  } = useAppSelector((state) => state.userInput)
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
          <option key={tab.id} value={tab.href}>
            {tab.id}
          </option>
        ))}
        <option disabled>──────────</option>
        {unusedComponents.map((tab) => (
          <option key={tab.id} value={tab.href}>
            {tab.id}
          </option>
        ))}
      </select>
    </>
  )
}

const ServiceNav = () => {
  const {
    query: { serviceId, componentId },
  } = useRouter()
  const currentServiceId = serviceId.toString()
  const currentComponentId = componentId?.toString()

  const { data, isSuccess } = useGetServiceApiV1ServiceServiceIdGetQuery({
    serviceId: currentServiceId,
  })

  if (isSuccess && data) {
    const [usedComponents, unusedComponents] = splitComponentsTabs(
      data.components,
      currentServiceId
    )

    return (
      <div className="mb-5">
        <div className="sm:hidden">
          <ComponentsDropdown
            usedComponents={usedComponents}
            unusedComponents={unusedComponents}
            currentTabId={currentComponentId || currentServiceId}
          />
        </div>
        <div className="hidden sm:block">
          <ComponentsTabs
            usedComponents={usedComponents}
            unusedComponents={unusedComponents}
            currentTabId={currentComponentId || currentServiceId}
          />
        </div>
      </div>
    )
  }
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
function splitComponentsTabs(components: Component[], serviceId: string) {
  const defaultServiceTab = {
    id: serviceId,
    href: `/services/${serviceId}`,
  }
  return components.reduce(
    ([usedComponents, unusedComponents], { id, variables }) => {
      const isUsed = Object.values(variables).length > 0
      if (isUsed) {
        usedComponents.push({
          id: id,
          href: `/services/${serviceId}/components/${id}`,
        })
      } else {
        unusedComponents.push({
          id: id,
          href: `/services/${serviceId}/components/${id}`,
        })
      }
      return [usedComponents, unusedComponents]
    },
    [[defaultServiceTab], []]
  )
}
