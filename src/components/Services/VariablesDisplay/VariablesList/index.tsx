import { ViewValue } from './VariableField'
import { Raw } from './VariableField/Raw'

type VariablesListType = {
  isRaw: boolean
  variables: [string, any][]
  parent?: string
}

export function VariablesList({ isRaw, variables, parent }: VariablesListType) {
  if (!variables.length) return <p className="text-slate-600">No value</p>

  return (
    <>
      {isRaw ? (
        variables.map(([k, v]) => (
          <div key={k} className="flex flex-col gap-2">
            <Raw prop={k} value={v} parent={parent} />
          </div>
        ))
      ) : (
        <table className="w-full">
          <tbody className="flex flex-col gap-1 text-base divide-y">
            {variables.map(([k, v]) => (
              <tr key={k} className="flex">
                <td className="w-[20%] font-bold text-gray-600 overflow-auto">
                  {k}:
                </td>
                <td className="flex-grow text-gray-600">
                  <ViewValue prop={k} value={v} parent={parent} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}
