import { useEffect, useState } from 'react'
import { TNavItem } from 'src/components/Layout/compositions/Menu'
import { useTdpClient } from 'src/contexts'

export function useServicesList(baseMenuItems: TNavItem[]) {
  const { servicesApi } = useTdpClient()
  const [menuList, setMenuList] = useState(baseMenuItems)

  useEffect(() => {
    async function fetchServicesList() {
      const res = await servicesApi.getServicesApiV1ServiceGet()
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
  }, [servicesApi])

  return menuList
}
