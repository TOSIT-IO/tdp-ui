import Link from 'next/link'
import { useState } from 'react'
import { Button } from 'src/components/commons'
import { classNames } from 'src/utils'
import { ComponentNav, ComponentsNavProps } from './type'

export function ComponentsTabs({
  usedComponents,
  unusedComponents,
  currentTabId,
}: ComponentsNavProps) {
  const [showUnused, setShowUnused] = useState(false)

  const isCurrentTab = (tab: string, index: number) => {
    if (currentTabId === tab) return true
    if (index === 0 && !currentTabId) return true
    return false
  }

  function toggleShowUnused() {
    setShowUnused(!showUnused)
  }

  return (
    <nav className="flex flex-wrap gap-1 items-center" aria-label="Tabs">
      {usedComponents
        .concat(showUnused ? unusedComponents : [])
        .map((tab, i) => (
          <ComponentTab
            key={tab.id}
            tab={tab}
            isCurrentTab={isCurrentTab(tab.id, i)}
          />
        ))}
      <Button
        variant="text"
        className="ml-1 text-xs text-gray-600 cursor-pointer"
        onClick={toggleShowUnused}
      >
        {`[${showUnused ? '-' : '+'}]`}
      </Button>
    </nav>
  )
}

export function ComponentTab({
  tab,
  isCurrentTab,
}: {
  tab: ComponentNav
  isCurrentTab: boolean
}) {
  return (
    <Link
      key={tab.id}
      href={tab.href}
      className={classNames(
        isCurrentTab
          ? 'bg-gray-700 text-white'
          : 'text-gray-500 hover:text-white hover:bg-gray-700',
        'px-3 py-2 text-center font-medium text-sm bg-gray-200'
      )}
      aria-current={isCurrentTab ? 'page' : undefined}
    >
      {tab.id}
    </Link>
  )
}
