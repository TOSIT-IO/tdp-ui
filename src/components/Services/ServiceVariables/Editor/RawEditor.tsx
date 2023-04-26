import MonacoEditor from '@monaco-editor/react'
import { debounce } from 'src/utils'

export const RawEditorMode = ({
  variables,
  onChange,
  onSave: handleSave,
}: {
  variables: Object
  onChange: (value: Object) => void
  onSave: (newVariables: object) => void
}) => {
  const handleChange = (value: string) => {
    try {
      let json = JSON.parse(value)
      handleSave(json)
      onChange(json)
    } catch (e) {
      console.error(e)
    }
  }
  const debouncedHandleChange = debounce((value) => handleChange(value))

  return (
    <div className="overflow-hidden rounded-md border border-gray-400">
      <MonacoEditor
        height="60vh"
        defaultLanguage="json"
        defaultValue={JSON.stringify(variables, null, 2)}
        onChange={debouncedHandleChange}
        options={{
          autoClosingQuotes: 'always',
          autoIndent: 'full',
          automaticLayout: true,
          cursorStyle: 'line',
          cursorWidth: 2,
          dragAndDrop: true,
          minimap: { enabled: false },
          lineNumbers: 'off',
          glyphMargin: false,
          folding: false,
          // lineDecorationsWidth: 0,
          lineNumbersMinChars: 0,
        }}
      />
    </div>
  )
}

export default RawEditorMode
