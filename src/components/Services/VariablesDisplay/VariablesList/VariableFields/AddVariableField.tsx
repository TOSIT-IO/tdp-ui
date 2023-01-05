import { useState } from 'react'
import { Sidebar } from 'src/components/Layout'
import { ViewField } from './ViewField'

export function AddVariableField({ parent }: { parent?: string }) {
  const [displayField, toggleDisplayField] = useState(false)
  const [variableName, setVariableName] = useState('')
  const [variableValue, setVariableValue] = useState('')
  const [variableType, setVariableType] = useState('string')

  //TODO: Avoir un reducer qui change le type du field tout en gardant la valeur en mémoire

  // const handleAddVariable = () => {
  //   const value =
  //     variableType === 'number' ? Number(variableValue) : variableValue
  //   const variables = JSON.parse(localStorage.getItem('variables') || '{}')
  //   if (!variables[parent]) variables[parent] = {}
  //   variables[parent][
  //     variableName.replace(/[^a-zA-Z0-9_]/g, '').replace(/^[0-9]/, '_$&')
  //   ] = value
  //   localStorage.setItem('variables', JSON.stringify(variables))
  //   setVariableName('')
  //   setVariableValue('')
  //   toggleDisplayField(false)
  // }

  if (!displayField)
    return (
      <button
        className="text-gray-600 text-xs"
        onClick={() => toggleDisplayField(true)}
      >
        [add new variable]
      </button>
    )

  return (
    <div className="flex flex-col gap-1 text-gray-600 text-sm">
      <fieldset className="flex gap-1">
        <label className="font-bold">Type:</label>
        <select
          value={variableType}
          onChange={(e) => setVariableType(e.target.value)}
        >
          <option value="string">string</option>
          <option value="number">number</option>
          <option value="boolean">boolean</option>
          <option value="object">array</option>
        </select>
      </fieldset>
      <Sidebar className="text-gray-600 text-sm" space="0" sideWidth="17rem">
        <fieldset>
          <label className="font-bold">Name:</label>
          <input
            value={variableName}
            onChange={(e) => setVariableName(e.target.value)}
          />
        </fieldset>
        <fieldset className="flex">
          <label className="font-bold">Value:</label>
          <ViewField prop={variableName} value={''} parent={parent} />
        </fieldset>
      </Sidebar>
      <button onClick={() => console.log('clic')}>Add</button>
    </div>
  )
}
