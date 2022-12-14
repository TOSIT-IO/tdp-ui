import { HeroIcon } from 'src/types'

export type NavItem = {
  name: string
  href: string
  icon?: HeroIcon
  children?: NavItem[]
}
