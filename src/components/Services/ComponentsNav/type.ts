export type ComponentNav = {
  id: string
  href: string
}

export type ComponentsNavProps = {
  usedComponents: ComponentNav[]
  unusedComponents: ComponentNav[]
  currentTabId: string
}
