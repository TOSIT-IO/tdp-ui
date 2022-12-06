import { useDeployContext } from 'src/contexts/deployContext'
import { FieldHeader } from '../FieldHeader'
import { DeployActionEnum, TfilterType } from 'src/types/deployTypes'

export function FilterField({ filterTypes }: { filterTypes: TfilterType[] }) {
  const {
    state: { filterExpression, filterType },
    dispatch,
  } = useDeployContext()

  function handleOnSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    dispatch({
      type: DeployActionEnum.SET_FILTER_TYPE,
      payload: {
        newFilterType: filterTypes.find((v) => v.name === e.target.value).name,
      },
    })
  }

  function handleOnInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: DeployActionEnum.SET_FILTER_EXPRESSION,
      payload: { newFilterExpression: e.target.value },
    })
  }

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
            onChange={handleOnSelectChange}
            className="h-full w-full bg-gray-50 px-4 text-sm font-medium text-gray-700 hover:bg-gray-100"
            defaultValue={filterType}
          >
            {filterTypes.map((v) => (
              <FilterTypeOption key={v.name} filterType={v} />
            ))}
          </select>
        </div>
        <input
          type="text"
          name="filter"
          className="pl-2 w-full border rounded-r-md border-gray-300 p-1"
          placeholder={
            filterTypes.find((v) => v.name === filterType).placeholder
          }
          value={filterExpression}
          onChange={handleOnInputChange}
        />
      </div>
    </fieldset>
  )
}

function FilterTypeOption({ filterType }: { filterType: TfilterType }) {
  return <option value={filterType.name}>{filterType.name}</option>
}
