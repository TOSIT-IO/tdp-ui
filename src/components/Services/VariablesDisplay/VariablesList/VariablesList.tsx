import { Sidebar } from 'src/components/Layout/primitives/Sidebar'
import { AddVariableField, RawField, ViewField } from './VariableFields'

type VariablesListType = {
  isRaw: boolean
  variables: [string, any][]
  parent?: string
}

export function VariablesList({ isRaw, variables, parent }: VariablesListType) {
  if (!variables.length) return <AddVariableField parent={parent} />

  if (isRaw)
    return (
      <div className="flex flex-col gap-1">
        {variables.map(([k, v]) => (
          <RawField key={k} propName={k} value={v} parent={parent} />
        ))}
      </div>
    )

  return (
    <>
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
              <ViewField prop={k} value={v} parent={parent} />
            </div>
          </Sidebar>
        ))}
      </div>
      <div className="mt-1">
        <AddVariableField parent={parent} />
      </div>
    </>
  )
}
