import { VariableField } from './VariableField'

type VariablesListType = {
  variables: [string, any][]
  parent?: string
}

export function VariablesList({ variables, parent }: VariablesListType) {
  if (variables.length)
    return (
      <div className="flex flex-col gap-2">
        {variables.map(([k, v]) => (
          <VariableField key={k} prop={k} value={v} parent={parent} />
        ))}
      </div>
    )

  return <p className="text-slate-600">No value</p>
}
