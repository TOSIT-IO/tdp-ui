import { useEffect, useState } from 'react'
import { TNavItem } from 'src/components/Layout/Menu'
import { useTdpClient } from 'src/contexts'

export function useServicesList(baseMenuItems: TNavItem[]) {
  const { getServices } = useTdpClient()
  const [menuList, setMenuList] = useState(baseMenuItems)

  useEffect(() => {
    async function fetchServicesList() {
      const res = await getServices()
      const servicesMenuSubList = res.data.map<TNavItem>((service) => ({
        name: service.id,
        href: `/services/${service.id}`,
      }))
      setMenuList((prevMenuList) => {
        const menuList = [...prevMenuList]
        const servicesItem = menuList.find((v) => v.name === 'Services')
        servicesItem.children = servicesMenuSubList
        return menuList
      })
    }
    fetchServicesList()
  }, [getServices])

  return menuList
}
