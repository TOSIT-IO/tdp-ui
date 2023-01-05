import { useRouter } from 'next/router'
import { ComponentsNavProps } from './type'

export function ComponentsDropdown({
  usedComponents,
  unusedComponents,
  currentTabId,
}: ComponentsNavProps) {
  const { push, isReady } = useRouter()
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault()
    isReady && push(e.target.value)
  }
  return (
    <>
      <label htmlFor="tabs" className="sr-only">
        Select a tab
      </label>
      <select
        id="tabs"
        name="tabs"
        className="block w-full rounded-md border-gray-300"
        defaultValue={currentTabId}
        onChange={handleChange}
      >
        {usedComponents.map((tab) => (
          <option key={tab.id} value={tab.href}>
            {tab.id}
          </option>
        ))}
        <option disabled>──────────</option>
        {unusedComponents.map((tab) => (
          <option key={tab.id} value={tab.href}>
            {tab.id}
          </option>
        ))}
      </select>
    </>
  )
}
