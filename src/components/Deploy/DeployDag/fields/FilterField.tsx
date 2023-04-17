import { useState } from 'react'
import { FilterTypeEnum } from 'src/features/api/tdpApi'
import { classNames } from 'src/utils'
import { FieldHeader } from 'src/components/commons'
import { useFilterExpression, useFilterType } from '../hooks'

type FilterTypes = {
  [K in FilterTypeEnum]: {
    placeholder: string
  }
}

const filterTypes: FilterTypes = {
  ['regex']: {
    placeholder: `.+config`,
  },
  ['glob']: {
    placeholder: `*_config`,
  },
}

export function FilterField() {
  const [filterType, setFilterType] = useFilterType()
  const [filterExpression, setFilterExpression] = useFilterExpression()
  const [isFilterExpressionValid, setIsFilterExpressionValid] = useState(true)

  function handleOnSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setFilterType(e.target.value as FilterTypeEnum)
  }

  function handleOnInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    try {
      new RegExp(e.target.value)
      setIsFilterExpressionValid(true)
    } catch (e) {
      setIsFilterExpressionValid(false)
    }
    setFilterExpression(e.target.value)
  }

  return (
    <fieldset>
      <FieldHeader
        title="Filter"
        description="Expression which will match on the operation list generated from the dag. Only operations matching will be kept for the deployment."
        htmlFor="filter"
      />
      <div className="flex items-stretch">
        <div className="-mr-1 overflow-hidden rounded-l-md border border-gray-300 pr-1 shadow-sm">
          <label htmlFor="filter-type" className="sr-only">
            Filter Type
          </label>
          <select
            name="filter-type"
            onChange={handleOnSelectChange}
            className="h-full w-full bg-gray-50 px-4 text-sm font-medium text-gray-700 hover:bg-gray-100"
            defaultValue={filterType}
          >
            {Object.keys(filterTypes).map((k) => (
              <FilterTypeOption key={k} value={k} />
            ))}
          </select>
        </div>
        <input
          type="text"
          name="filter"
          className={classNames(
            'w-full rounded-r-md border p-1 pl-2 font-mono outline-none',
            isFilterExpressionValid ? 'border-gray-300' : 'border-red-500'
          )}
          placeholder={filterTypes[filterType].placeholder}
          value={filterExpression}
          onChange={handleOnInputChange}
        />
      </div>
    </fieldset>
  )
}

function FilterTypeOption({ value }: { value: string }) {
  return <option value={value}>{value}</option>
}
