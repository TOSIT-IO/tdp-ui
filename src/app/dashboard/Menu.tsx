'use client'

import {
  HomeIcon,
  BeakerIcon,
  ServerIcon,
  BellIcon,
  WrenchIcon,
} from '@heroicons/react/24/solid'
import { useServicesList } from 'src/hooks'
import { classNames } from 'src/utils'

import type { HeroIcon } from 'src/types'

type navItemType = {
  name: string
  href: string
  icon?: HeroIcon
  children?: navItemType[]
  isCurrent?: boolean
}

export default function Menu({ className: additionalStyles }) {
  const servicesList = useServicesList()

  const menuItems: navItemType[] = [
    // { name: 'Dashboard', href: '#', icon: HomeIcon },
    {
      name: 'Services',
      href: '#',
      icon: BeakerIcon,
      children: servicesList?.map((service) => ({
        name: service,
        href: '#',
      })),
    },
    // { name: 'Hosts', href: '#', icon: ServerIcon },
    // { name: 'Alerts', href: '#', icon: BellIcon },
    // { name: 'Cluster Admin', href: '#', icon: WrenchIcon },
  ]

  return (
    <nav
      className={classNames(
        'overflow-y-auto gap-1 px-2 flex flex-col',
        additionalStyles
      )}
    >
      {menuItems.map((menuItem) => (
        <MenuItem key={menuItem.name} menuItem={menuItem} />
      ))}
    </nav>
  )
}

function MenuItem({ menuItem: item }: { menuItem: navItemType }) {
  return (
    <>
      <a
        href={item.href}
        className={classNames(
          item.isCurrent
            ? 'bg-slate-800 text-white'
            : 'text-slate-100 hover:bg-slate-600',
          'px-2 py-2 rounded-md'
        )}
      >
        <div className="flex items-center gap-2">
          {item.icon && <item.icon className="h-5 w-5" />}
          {item.name}
        </div>
      </a>
      {item.children?.map((child) => (
        <a
          key={child.name}
          href={child.href}
          className="pl-6 text-slate-400 hover:bg-slate-600 rounded-md"
        >
          {child.name}
        </a>
      ))}
    </>
  )
}
