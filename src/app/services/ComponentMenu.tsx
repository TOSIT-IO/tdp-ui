import Link from 'next/link'

export default function ComponentMenu({
  serviceId,
  components,
}: {
  serviceId: string
  components: string[]
}) {
  const menuItems = [{ id: 'service', link: `/services/${serviceId}` }].concat(
    components.map((component) => ({
      id: component,
      link: `/services/${serviceId}/components/${component}`,
    }))
  )
  return (
    <nav className="flex gap-3">
      {menuItems.map((item) => (
        <Link href={item.link} key={item.id}>
          {item.id}
        </Link>
      ))}
    </nav>
  )
}
