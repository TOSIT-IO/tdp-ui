import { useTdpClient } from 'src/hooks/useTdpClient'
import { classNames } from 'src/utils'

export default function Menu() {
  const servicesList = ['service1', 'service2']

  const navigation = [
    { name: 'Dashboard', href: '#' },
    {
      name: 'Services',
      href: '#',
      children: servicesList?.map((service) => ({
        name: service,
        href: '#',
      })),
    },
    { name: 'Hosts', href: '#' },
    { name: 'Alerts', href: '#' },
    { name: 'Cluster Admin', href: '#' },
  ]

  return (
    <nav className="mt-5 overflow-y-auto space-y-1 px-2 flex flex-col">
      {navigation.map((service) => (
        <MenuItem key={service.name} item={service} />
      ))}
    </nav>
  )
}

function MenuItem({ item }) {
  const { name, href, isCurrent, children } = item
  return (
    <>
      <a
        href={href}
        className={classNames(
          isCurrent
            ? 'bg-slate-800 text-white'
            : 'text-slate-100 hover:bg-slate-600',
          'px-2 py-2 text-base font-medium rounded-md'
        )}
      >
        {name}
      </a>
      {children?.map((child) => (
        <a
          key={child.name}
          href={child.href}
          className="pl-4 text-white hover:bg-slate-600 rounded-md"
        >
          {child.name}
        </a>
      ))}
    </>
  )
}
