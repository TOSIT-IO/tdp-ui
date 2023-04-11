import Link from 'next/link'
import { useRouter } from 'next/router'
import { BeakerIcon, Cog6ToothIcon } from '@heroicons/react/24/solid'
import { HeroIcon } from 'src/types'
import { classNames } from 'src/utils'
import { useGetServicesApiV1ServiceGetQuery } from '../../features/api/tdpApi'

export type TNavItem = {
  name: string
  href: string
  icon?: HeroIcon
  children?: TNavItem[]
}

export function Menu() {
  const { isError, isLoading, isSuccess, data, error } =
    useGetServicesApiV1ServiceGetQuery()

  if (isError) throw error

  if (isLoading) return <span>Loading...</span>

  if (isSuccess && data) {
    const menuItems = [
      {
        name: 'Services',
        href: '#',
        icon: BeakerIcon,
        children: data.map((v) => ({
          name: v.id,
          href: `/services/${v.id}`,
        })),
      },
      {
        name: 'Deployments',
        href: '/deploy',
        icon: Cog6ToothIcon,
      },
    ]

    return (
      <nav className="flex flex-col">
        {menuItems.map((v) => (
          <MenuItem key={v.name} menuItem={v} />
        ))}
      </nav>
    )
  }
}

function MenuItem({ menuItem: item }: { menuItem: TNavItem }) {
  return (
    <div>
      <Link
        href={item.href}
        className="flex items-center gap-2 px-2 py-2 text-white hover:bg-gray-800"
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

function MenuSubItem({ menuItem: item }: { menuItem: TNavItem }) {
  const router = useRouter()
  const isItemSelected = item.name === router.query.serviceId
  return (
    <Link
      href={item.href}
      className={classNames(
        isItemSelected ? 'bg-gray-800 text-white' : 'text-gray-400',
        'py-[0.2rem] pl-6 hover:bg-gray-800'
      )}
    >
      {item.name}
    </Link>
  )
}
