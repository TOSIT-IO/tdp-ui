import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ComponentAsValue, useSelectService } from 'src/features/variables'
import { classNames } from 'src/utils'
import { Button } from 'src/components/commons'
import { useParamsContext } from './ParamsContext'

type ComponentNavItem = {
  id: string
  href: string
}

type ComponentsNav = {
  usedComponents: ComponentNavItem[]
  unusedComponents: ComponentNavItem[]
  currentTabId: string
}

export function ComponentsNav() {
  const { currentServiceId, currentComponentId } = useParamsContext()
  const {
    value: { components },
  } = useSelectService(currentServiceId)

  const [usedComponents, unusedComponents] = getComponentsTabs(
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

function ComponentsDropdown({
  usedComponents,
  unusedComponents,
  currentTabId,
}: ComponentsNav) {
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

function ComponentsTabs({
  usedComponents,
  unusedComponents,
  currentTabId,
}: ComponentsNav) {
  const [showUnused, setShowUnused] = useState(false)

  const isCurrentTab = (tab: string) => {
    if (currentTabId === tab) return true
    return false
  }

  function toggleShowUnused() {
    setShowUnused(!showUnused)
  }

  return (
    <nav className="flex flex-wrap gap-1 items-center" aria-label="Tabs">
      {usedComponents.concat(showUnused ? unusedComponents : []).map((tab) => {
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
        className="ml-1 text-xs text-gray-600 cursor-pointer"
        onClick={toggleShowUnused}
        aria-label={showUnused ? 'fold' : 'unfold'}
      >
        {`[${showUnused ? '-' : '+'}]`}
      </Button>
    </nav>
  )
}

function ComponentTab({
  tab,
  isCurrentTab,
}: {
  tab: ComponentNavItem
  isCurrentTab: boolean
}) {
  return (
    <Link
      key={tab.id}
      href={tab.href}
      className={classNames(
        isCurrentTab
          ? 'bg-gray-700 text-white'
          : 'text-gray-500 bg-gray-200 hover:text-white hover:bg-gray-700',
        'px-3 py-2 text-center font-medium text-sm'
      )}
      aria-current={isCurrentTab ? 'page' : undefined}
    >
      {tab.id}
    </Link>
  )
}

function getComponentsTabs(components: ComponentAsValue[], serviceId: string) {
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
