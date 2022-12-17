import { Sidebar } from 'src/components/Layout/primitives/Sidebar'
import { ViewField } from './ViewFields'
import { RawField } from './ViewFields/RawField'

type VariablesListType = {
  isRaw: boolean
  variables: [string, any][]
  parent?: string
}

export function VariablesList({ isRaw, variables, parent }: VariablesListType) {
  if (!variables.length) return <p className="text-slate-600">No value</p>

  if (isRaw)
    return (
      <div className="flex flex-col gap-1">
        {variables.map(([k, v]) => (
          <RawField key={k} propName={k} value={v} parent={parent} />
        ))}
      </div>
    )

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
            <ViewField prop={k} value={v} parent={parent} />
          </div>
        </Sidebar>
      ))}
    </div>
  )
}
