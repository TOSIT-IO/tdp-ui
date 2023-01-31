import { useState } from 'react'
import { Disclosure, Sidebar } from 'src/components/Layout/primitives'
import { ViewField, RawField } from './Fields'
import { RawViewButton } from './RawViewButton'

interface ReduceType {
  primitiveTypeVariables: [string, string][]
  objectTypeVariables: [string, Object][]
}

export function VariablesDisplay({ variables }: { variables: Object }) {
  const [isRaw, setIsRaw] = useState(false)

  if (!Object.entries(variables).length)
    return <p className="text-slate-600">No value</p>

  return (
    <>
      <div className="flex justify-end mb-4 ">
        <RawViewButton isRaw={isRaw} setIsRaw={setIsRaw} />
      </div>
      {isRaw ? (
        <DisplayRaw variables={variables} />
      ) : (
        <DisplayView variables={variables} />
      )}
    </>
  )
}

export function DisplayRaw({ variables }: { variables: Object }) {
  return (
    <div className="flex flex-col gap-1">
      {Object.entries(variables).map(([k, v]) => (
        <RawField key={k} property={k} value={v} />
      ))}
    </div>
  )
}

export function DisplayView({ variables }: { variables: Object }) {
  const { primitiveTypeVariables, objectTypeVariables } = Object.entries(
    variables
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
        <VariablesList variables={primitiveTypeVariables} />
      </div>
      {/* Display Service Variables Dicts */}
      <div className="flex flex-col gap-2">
        {objectTypeVariables.map(([k, v]) => (
          <Disclosure key={k} title={k}>
            <VariablesList variables={v ? Object.entries(v) : []} dict={k} />
          </Disclosure>
        ))}
      </div>
    </form>
  )
}

export function VariablesList({
  variables,
  dict,
}: {
  variables: [string, string | number | boolean | any[]][]
  dict?: string
}) {
  return (
    <div className="flex flex-col gap-1">
      {variables.map(([k, v]) => (
        <Sidebar
          key={k}
          className="text-gray-600 text-sm"
          space="0"
          sideWidth="17rem"
        >
          <p className="w-20 font-bold overflow-auto">{k}:</p>
          <div className="w-full">
            <ViewField property={k} value={v} dict={dict} />
          </div>
        </Sidebar>
      ))}
    </div>
  )
}
