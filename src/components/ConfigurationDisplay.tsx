import { VariablesType } from 'src/clients'
import { Disclosure } from 'src/components/Disclosure'

type ConfigurationDisplayType = {
  values: VariablesType
}

export default function ConfigurationDisplay({
  values,
}: ConfigurationDisplayType) {
  type ReduceType = {
    singleValues: [string, string][]
    objectValues: [string, Object][]
  }

  const { singleValues, objectValues } = Object.entries(
    values
  ).reduce<ReduceType>(
    (accumulator, currentValue) => {
      if (typeof currentValue[1] === 'object') {
        accumulator.objectValues.push(currentValue)
      } else {
        accumulator.singleValues.push(currentValue)
      }
      return accumulator
    },
    { singleValues: [], objectValues: [] }
  )

  return (
    <>
      <div className="mb-3">
        <SingleVariablesList variables={singleValues} />
      </div>
      <div className="flex flex-col gap-2">
        {objectValues.map(([k, v]) => {
          return (
            <Disclosure key={k} title={k}>
              <SingleVariablesList variables={v ? Object.entries(v) : []} />
            </Disclosure>
          )
        })}
      </div>
    </>
  )
}

type SingleVariablesListType = {
  variables: [string, string | boolean | number][]
}

function SingleVariablesList({ variables }: SingleVariablesListType) {
  if (variables.length)
    return (
      <div className="flex flex-col gap-2">
        {variables.map(([k, v]) => (
          <div className="flex text-slate-600" key={k}>
            <label htmlFor={k} className="font-bold mr-2">
              {k}:
            </label>
            <input
              type="text"
              name={k}
              className="grow"
              defaultValue={JSON.stringify(v)}
            />
          </div>
        ))}
      </div>
    )

  return <p className="text-slate-600">No value</p>
}
