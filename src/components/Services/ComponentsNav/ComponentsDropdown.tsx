import { useRouter } from 'next/router'
import { TTab } from './type'

export function ComponentsDropdown({
  tabs,
  currentTab,
}: {
  tabs: TTab[]
  currentTab: string
}) {
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
        defaultValue={currentTab}
        onChange={handleChange}
      >
        {tabs.map((tab) => (
          <option key={tab.id} value={tab.href}>
            {tab.id}
          </option>
        ))}
      </select>
    </>
  )
}
