import { Disclosure } from 'src/components/Layout/primitives'
import { useVariablesContext } from './VariablesContext'
import { VariablesList } from './VariablesList/VariablesList'

interface ReduceType {
  primitiveTypeVariables: [string, string][]
  objectTypeVariables: [string, Object][]
}

export function VariablesDisplay({ isRaw }: { isRaw: boolean }) {
  const { initialVariables } = useVariablesContext()

  if (!initialVariables) return <p>Loading</p>

  const { primitiveTypeVariables, objectTypeVariables } = Object.entries(
    initialVariables
  ).reduce<ReduceType>(
    (accumulator, currentValue) => {
      if (typeof currentValue[1] === 'object') {
        accumulator.objectTypeVariables.push(currentValue)
      } else {
        accumulator.primitiveTypeVariables.push(currentValue)
      }
      return accumulator
    },
    { primitiveTypeVariables: [], objectTypeVariables: [] }
  )

  return (
    <form>
      {/* Display Service Variables */}
      <div className="mb-3">
        <VariablesList variables={primitiveTypeVariables} isRaw={isRaw} />
      </div>
      {/* Display Service Variables Dicts */}
      <div className="flex flex-col gap-2">
        {objectTypeVariables.map(([k, v]) => (
          <Disclosure key={k} title={k}>
            <VariablesList
              variables={v ? Object.entries(v) : []}
              parent={k}
              isRaw={isRaw}
            />
          </Disclosure>
        ))}
      </div>
    </form>
  )
}
