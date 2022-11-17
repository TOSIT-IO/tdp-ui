import { VariablesType } from 'src/clients'
import { Button, Disclosure } from 'src/components'
import { VariablesContextProvider } from './VariablesContext'
import { VariablesList } from './VariablesList'

type VariablesDisplayType = {
  initialVariables: VariablesType
  setNewVariables: Function
  sendVariables: Function
}

export function VariablesDisplay({
  initialVariables,
  setNewVariables,
  sendVariables,
}: VariablesDisplayType) {
  type ReduceType = {
    simpleVariables: [string, string][]
    objectVariables: [string, Object][]
  }
  const { simpleVariables: singleVariables, objectVariables: objectValues } =
    Object.entries(initialVariables).reduce<ReduceType>(
      (accumulator, currentValue) => {
        if (typeof currentValue[1] === 'object') {
          accumulator.objectVariables.push(currentValue)
        } else {
          accumulator.simpleVariables.push(currentValue)
        }
        return accumulator
      },
      { simpleVariables: [], objectVariables: [] }
    )

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    sendVariables()
  }

  return (
    <VariablesContextProvider setNewVariables={setNewVariables}>
      <form onSubmit={handleSubmit}>
        <Button type="submit">Validate</Button>
        <div className="mb-3">
          <VariablesList variables={singleVariables} />
        </div>
        <div className="flex flex-col gap-2">
          {objectValues.map(([k, v]) => (
            <Disclosure key={k} title={k}>
              <VariablesList
                variables={v ? Object.entries(v) : []}
                parent={k}
              />
            </Disclosure>
          ))}
        </div>
      </form>
    </VariablesContextProvider>
  )
}
