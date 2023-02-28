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
    <nav className="flex flex-wrap items-center gap-1" aria-label="Tabs">
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
        className="ml-1 cursor-pointer text-xs text-gray-600"
        onClick={toggleShowUnused}
        aria-label={showUnused ? 'fold' : 'unfold'}
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
          : 'text-gray-500 hover:bg-gray-700 hover:text-white',
        'bg-gray-200 px-3 py-2 text-center text-sm font-medium'
      )}
      aria-current={isCurrentTab ? 'page' : undefined}
    >
      {tab.id}
    </Link>
  )
}
