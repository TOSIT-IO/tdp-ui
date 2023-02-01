import { useState } from 'react'
import { Disclosure } from 'src/components/Layout/primitives'
import { PrimitiveField, RawField } from './Fields'
import { RawViewButton } from './RawViewButton'

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

interface ReduceType {
  primitiveTypeVariables: [string, string][]
  objectTypeVariables: [string, Object][]
}

export function DisplayView({ variables }: { variables: Object }) {
  const { primitiveTypeVariables, objectTypeVariables } = Object.entries(
    variables
  ).reduce<ReduceType>(
    ({ primitiveTypeVariables, objectTypeVariables }, currentValue) => {
      if (typeof currentValue[1] === 'object') {
        objectTypeVariables.push(currentValue)
      } else {
        primitiveTypeVariables.push(currentValue)
      }
      return { objectTypeVariables, primitiveTypeVariables }
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
        {objectTypeVariables.map(([dictId, dictVariables]) => (
          <Disclosure key={dictId} title={dictId}>
            <VariablesList
              variables={dictVariables ? Object.entries(dictVariables) : []}
              dictId={dictId}
            />
          </Disclosure>
        ))}
      </div>
    </form>
  )
}

export function VariablesList({
  variables,
  dictId,
}: {
  variables: [string, string | number | boolean | any[]][]
  dictId?: string
}) {
  return (
    <div className="flex flex-col gap-1">
      {variables.map(([k, v]) => (
        <PrimitiveField key={k} property={k} value={v} dictId={dictId} />
      ))}
    </div>
  )
}
