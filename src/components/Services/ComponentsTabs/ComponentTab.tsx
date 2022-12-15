import Link from 'next/link'
import { classNames } from 'src/utils'
import { Tab } from './types'

export function ComponentTab({
  tab,
  isCurrentTab,
}: {
  tab: Tab
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
        'px-3 p-2 text-center border border-white font-medium text-sm bg-gray-200'
      )}
      aria-current={isCurrentTab ? 'page' : undefined}
    >
      {tab.id}
    </Link>
  )
}
