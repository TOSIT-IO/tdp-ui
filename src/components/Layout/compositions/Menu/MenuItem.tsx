import Link from 'next/link'
import { MenuSubItem } from './MenuSubItem'
import { NavItem } from './types'

export function MenuItem({ menuItem: item }: { menuItem: NavItem }) {
  return (
    <div>
      <Link
        href={item.href}
        className="px-2 py-2 text-white flex items-center gap-2 hover:bg-gray-800"
      >
        {item.icon && <item.icon className="h-5 w-5" />}
        {item.name}
      </Link>
      <div className="flex flex-col">
        {item.children?.map((v) => (
          <MenuSubItem key={v.name} menuItem={v} />
        ))}
      </div>
    </div>
  )
}
