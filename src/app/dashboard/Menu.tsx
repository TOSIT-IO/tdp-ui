'use client'

import Link from 'next/link'

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

  const navigation: navItemType[] = [
    { name: 'Dashboard', href: '#', icon: HomeIcon },
    {
      name: 'Services',
      href: '#',
      icon: BeakerIcon,
      children: servicesList?.map((service) => ({
        name: service,
        href: `dashboard/services/${service}`,
      })),
    },
    { name: 'Hosts', href: '#', icon: ServerIcon },
    { name: 'Alerts', href: '#', icon: BellIcon },
    { name: 'Cluster Admin', href: '#', icon: WrenchIcon },
  ]

  return (
    <nav
      className={classNames(
        'overflow-y-auto gap-1 px-2 flex flex-col',
        additionalStyles
      )}
    >
      {navigation.map((item) => (
        <MenuItem key={item.name} item={item} />
      ))}
    </nav>
  )
}

function MenuItem({ item }: { item: navItemType }) {
  return (
    <>
      <Link
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
      </Link>
      {item.children?.map((child) => (
        <Link
          key={child.name}
          href={child.href}
          className="pl-6 text-slate-400 hover:bg-slate-600 rounded-md"
        >
          {child.name}
        </Link>
      ))}
    </>
  )
}