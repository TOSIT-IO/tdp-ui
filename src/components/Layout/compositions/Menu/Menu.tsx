import { BeakerIcon, Cog6ToothIcon } from '@heroicons/react/24/solid'
import { useServicesList } from 'src/hooks'
import { MenuItem } from './MenuItem'

const baseMenuItems = [
  {
    name: 'Services',
    href: '#',
    icon: BeakerIcon,
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

export function Menu() {
  const menuItems = useServicesList(baseMenuItems)

  return (
    <nav className="flex flex-col">
      {menuItems.map((v) => (
        <MenuItem key={v.name} menuItem={v} />
      ))}
    </nav>
  )
}
