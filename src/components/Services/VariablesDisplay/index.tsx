import type { Dispatch, SetStateAction } from 'react'
import { useState } from 'react'
import type { VariablesType, Service, Component } from 'src/clients'
import { Button, Disclosure } from 'src/components'
import { RawViewButton } from './RawViewButton'
import { VariablesContextProvider } from './contexts/VariablesContext'
import { VariablesList } from './VariablesList'

type VariablesDisplayType = {
  initialVariables: VariablesType
  setNewVariables: Dispatch<SetStateAction<Service | Component>>
  sendVariables: (message: string) => void
}

interface ReduceType {
  simpleVariables: [string, string][]
  objectVariables: [string, Object][]
}

export function VariablesDisplay({
  initialVariables,
  setNewVariables,
  sendVariables,
}: VariablesDisplayType) {
  const [validateMessage, setValidateMessage] = useState('')
  const [isRaw, setIsRaw] = useState(false)

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
    sendVariables(validateMessage)
    setValidateMessage('')
  }

  return (
    <VariablesContextProvider setNewVariables={setNewVariables}>
      <form onSubmit={handleSubmit}>
        {/* Validate Message */}
        <div className="flex">
          <Button type="submit">Validate</Button>
          <input
            value={validateMessage}
            onChange={(e) => setValidateMessage(e.target.value)}
            placeholder="Message..."
          />
        </div>
        {/* Toggle view */}
        <RawViewButton isRaw={isRaw} setIsRaw={setIsRaw} />
        {/* Display Service Variables */}
        <div className="mb-3">
          <VariablesList variables={singleVariables} isRaw={isRaw} />
        </div>
        {/* Display Service Variables Dicts */}
        <div className="flex flex-col gap-2">
          {objectValues.map(([k, v]) => (
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
    </VariablesContextProvider>
  )
}
