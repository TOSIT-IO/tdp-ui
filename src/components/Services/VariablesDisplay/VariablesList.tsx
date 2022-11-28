import { VariableField } from './VariableField'
import { VariableFieldRaw } from './VariableFieldRaw'

type VariablesListType = {
  isRaw: boolean
  variables: [string, any][]
  parent?: string
}

export function VariablesList({ isRaw, variables, parent }: VariablesListType) {
  if (variables.length)
    return (
      <div className="grid grid-cols-10 grid-flow-row gap-1 p-1 bg-transparent">
        {variables.map(([k, v]) =>
          isRaw ? (
            <VariableFieldRaw key={k} prop={k} value={v} parent={parent} />
          ) : (
            <VariableField key={k} prop={k} value={v} parent={parent} />
          )
        )}
      </div>
    )

  return <p className="text-slate-600">No value</p>
}
