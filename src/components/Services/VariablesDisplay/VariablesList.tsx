import { VariableField } from './VariableField'
import { VariableFieldRaw } from './VariableFieldRaw'

type VariablesListType = {
  isRaw: boolean
  variables: [string, any][]
  parent?: string
}

export function VariablesList({ isRaw, variables, parent }: VariablesListType) {
  if (variables.length) {
    if (isRaw) {
      return (
        <div className="flex flex-col gap-2">
          {variables.map(([k, v]) => (
            <VariableFieldRaw key={k} prop={k} value={v} parent={parent} />
          ))}
        </div>
      )
    } else {
      return (
        <div className="grid grid-cols-10 divide-y grid-flow-row gap-1 p-0 bg-transparent">
          {variables.map(([k, v]) => (
            <VariableField key={k} prop={k} value={v} parent={parent} />
          ))}
        </div>
      )
    }
  }
  return <p className="text-slate-600">No value</p>
}
