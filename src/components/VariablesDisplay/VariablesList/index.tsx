import { VariableField } from './VariableField'

type VariablesListType = {
  isRaw: boolean
  variables: [string, any][]
  parent?: string
}

export function VariablesList({ isRaw, variables, parent }: VariablesListType) {
  if (variables.length) {
    return (
      <>
        {variables.map(([k, v]) => (
          <VariableField
            key={k}
            isRaw={isRaw}
            prop={k}
            value={v}
            parent={parent}
          />
        ))}
      </>
    )
  }
  return <p className="text-slate-600">No value</p>
}
