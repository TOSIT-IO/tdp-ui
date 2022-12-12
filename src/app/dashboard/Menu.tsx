'use client'

import { BeakerIcon, Cog6ToothIcon } from '@heroicons/react/24/solid'
import { useServicesList } from 'src/hooks'
import { classNames } from 'src/utils'

import type { HeroIcon } from 'src/types'
import Link from 'next/link'
import { useRouter } from 'next/router'

type navItemType = {
  name: string
  href: string
  icon?: HeroIcon
  children?: navItemType[]
  isCurrent?: boolean
}

export default function Menu({ className: additionalStyles }) {
  const servicesList = useServicesList()
  const router = useRouter()

  const menuItems: navItemType[] = [
    {
      name: 'Services',
      href: '#',
      icon: BeakerIcon,
      children: servicesList?.map((service) => ({
        name: service,
        href: `/services/${service}`,
        isCurrent: service === router.query.serviceId ? true : false,
      })),
    },
    {
      name: 'Deployments',
      href: '/deploy',
      icon: Cog6ToothIcon,
      children: [
        {
          name: 'Deploy',
          href: '/deploy',
        },
      ],
    },
  ]

  return (
    <nav className={classNames('gap-1 px-2 flex flex-col', additionalStyles)}>
      {menuItems.map((menuItem) => (
        <MenuItem key={menuItem.name} menuItem={menuItem} />
      ))}
    </nav>
  )
}

function MenuItem({ menuItem: item }: { menuItem: navItemType }) {
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
          className={classNames(
            child.isCurrent
              ? 'bg-slate-800 text-white'
              : 'text-slate-400 hover:bg-slate-600',
            'pl-6 rounded-md'
          )}
        >
          {child.name}
        </Link>
      ))}
    </>
  )
}
