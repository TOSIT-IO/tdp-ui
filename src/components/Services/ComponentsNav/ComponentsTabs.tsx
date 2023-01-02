import Link from 'next/link'
import { classNames } from 'src/utils'
import { TTab } from './type'

type ComponentsTabsProps = {
  tabs: TTab[]
  currentTabId: string
}

export function ComponentsTabs({ tabs, currentTabId }: ComponentsTabsProps) {
  const isCurrentTab = (tab: string, index: number) => {
    if (currentTabId === tab) return true
    if (index === 0 && !currentTabId) return true
    return false
  }
  return (
    <nav className="flex flex-wrap gap-1" aria-label="Tabs">
      {tabs.map((tab, i) => (
        <ComponentTab
          key={tab.id}
          tab={tab}
          isCurrentTab={isCurrentTab(tab.id, i)}
        />
      ))}
    </nav>
  )
}

export function ComponentTab({
  tab,
  isCurrentTab,
}: {
  tab: TTab
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
