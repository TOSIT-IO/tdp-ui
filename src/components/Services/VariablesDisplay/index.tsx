import { ComponentUpdateResponse, ServiceUpdateResponse } from '@/client-sdk'
import { AxiosResponse } from 'axios'
import { Dispatch, SetStateAction, useState } from 'react'
import { VariablesType, Service, Component } from 'src/clients'
import { Button, Disclosure } from 'src/components'
import { VariablesContextProvider } from './VariablesContext'
import { VariablesList } from './VariablesList'
import { classNames } from 'src/utils'

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
  const [isRaw, setIsRaw] = useState(false)

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

  function RawViewButton() {
    return (
      <div>
        <span className="isolate inline-flex rounded-md shadow-sm">
          <label className="invisible">T T</label>
          <button
            type="button"
            onClick={() => {
              setIsRaw(true)
            }}
            className={classNames(
              isRaw ? 'bg-gray-200' : 'bg-gray-50',
              'relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-400/60 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
            )}
          >
            Raw
          </button>
          <button
            type="button"
            onClick={() => {
              setIsRaw(false)
            }}
            className={classNames(
              !isRaw ? 'bg-gray-200' : 'bg-gray-50',
              'relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-400/60 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
            )}
          >
            View
          </button>
        </span>
      </div>
    )
  }

  return (
    <VariablesContextProvider setNewVariables={setNewVariables}>
      <form onSubmit={handleSubmit}>
        <div className="flex">
          <Button type="submit">Validate</Button>
          <input
            value={validateMessage}
            onChange={(e) => setValidateMessage(e.target.value)}
            placeholder="Message..."
          />
          <span className="text-green-800">{status}</span>
          <RawViewButton />
        </div>
        <div className="mb-3">
          <VariablesList variables={singleVariables} isRaw={isRaw} />
        </div>
        <div className="flex flex-col gap-2">
          {objectValues.map(([k, v]) => (
            <Disclosure key={k} title={k}>
              <VariablesList
                variables={v ? Object.entries(v) : []}
                isRaw={isRaw}
                parent={k}
              />
            </Disclosure>
          ))}
        </div>
      </form>
    </VariablesContextProvider>
  )
}
