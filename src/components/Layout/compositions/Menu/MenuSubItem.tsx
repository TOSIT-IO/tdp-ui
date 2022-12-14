import Link from 'next/link'
import { useRouter } from 'next/router'
import { classNames } from 'src/utils'
import { NavItem } from './types'

export function MenuSubItem({ menuItem: item }: { menuItem: NavItem }) {
  const router = useRouter()
  const isItemSelected = item.name === router.query.serviceId ? true : false
  return (
    <Link
      href={item.href}
      className={classNames(
        isItemSelected ? 'text-white bg-gray-800' : 'text-gray-400',
        'pl-6 py-[0.2rem] hover:bg-gray-800'
      )}
    >
      {item.name}
    </Link>
  )
}
