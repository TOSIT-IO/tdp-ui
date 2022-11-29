import { ComponentUpdateResponse, ServiceUpdateResponse } from '@/client-sdk'
import { AxiosResponse } from 'axios'
import { Dispatch, SetStateAction, useState } from 'react'
import { VariablesType, Service, Component } from 'src/clients'
import { Button, Disclosure } from 'src/components'
import { VariablesContextProvider } from './VariablesContext'
import { VariablesList } from './VariablesList'

type VariablesDisplayType = {
  initialVariables: VariablesType
  setNewVariables: Dispatch<SetStateAction<Service | Component>>
  sendVariables: (
    message: string
  ) => Promise<
    AxiosResponse<ComponentUpdateResponse | ServiceUpdateResponse, any>
  >
}

export function VariablesDisplay({
  initialVariables,
  setNewVariables,
  sendVariables,
}: VariablesDisplayType) {
  const [validateMessage, setValidateMessage] = useState('')
  const [status, setStatus] = useState(null)

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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const res = await sendVariables(validateMessage)
    setStatus(res.statusText)
    setValidateMessage('')
    setTimeout(() => setStatus(null), 3000)
  }

  return (
    <VariablesContextProvider setNewVariables={setNewVariables}>
      <form onSubmit={handleSubmit}>
        <Button type="submit">Validate</Button>
        <input
          value={validateMessage}
          onChange={(e) => setValidateMessage(e.target.value)}
          placeholder="Message..."
        />
        <span className="text-green-800">{status}</span>
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
