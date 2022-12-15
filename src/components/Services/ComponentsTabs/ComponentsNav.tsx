import { ComponentsDropdown } from './ComponentsDropdown'
import { ComponentTab } from './ComponentTab'

export function ComponentsTabs({
  currentServiceId,
  currentComponentId,
  components,
}: {
  currentServiceId: string
  currentComponentId: string
  components: string[]
}) {
  const tabs = [
    { id: currentServiceId, href: `/services/${currentServiceId}` },
  ].concat(
    components.map((component) => ({
      id: component,
      href: `/services/${currentServiceId}/components/${component}`,
    }))
  )
  return (
    <div className="mb-10">
      <div className="sm:hidden">
        <ComponentsDropdown
          tabs={tabs}
          currentTab={currentComponentId || currentServiceId}
        />
      </div>
      <div className="hidden sm:block">
        <nav className="flex flex-wrap" aria-label="Tabs">
          {tabs.map((tab) => (
            <ComponentTab
              key={tab.id}
              tab={tab}
              isCurrentTab={tab.id === (currentComponentId || currentServiceId)}
            />
          ))}
        </nav>
      </div>
    </div>
  )
}
