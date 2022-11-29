import { FieldHeader } from '../FieldHeader'

interface FilterFieldProps {
  filter: string
  setFilter: React.Dispatch<React.SetStateAction<string>>
  filterType: string
  setFilterType: React.Dispatch<React.SetStateAction<string>>
  filterTypes: {
    [value: string]: {
      placeholder: string
    }
  }
}

export function FilterField({
  filter,
  setFilter,
  filterType,
  setFilterType,
  filterTypes,
}: FilterFieldProps) {
  return (
    <fieldset>
      <FieldHeader
        title="Filter"
        description="Expression which will match on the operation list generated from the dag. Only operations matching will be kept for the deployment."
        htmlFor="filter"
      />
      <div className="flex items-stretch">
        <div className="rounded-l-md border border-gray-300 shadow-sm -mr-1 overflow-hidden pr-1">
          <label htmlFor="filter-type" className="sr-only">
            Filter Type
          </label>
          <select
            name="filter-type"
            onChange={(e) => setFilterType(e.target.value)}
            className="h-full w-full bg-gray-50 px-4 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            {Object.keys(filterTypes).map((v) => (
              <option key={v} value={v} selected={filterType === v}>
                {v}
              </option>
            ))}
          </select>
        </div>
        <input
          type="text"
          name="filter"
          className="pl-2 w-full border rounded-r-md border-gray-300 p-1"
          placeholder={filterTypes[filterType].placeholder}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
    </fieldset>
  )
}
