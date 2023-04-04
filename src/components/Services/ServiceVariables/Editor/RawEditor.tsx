import MonacoEditor from '@monaco-editor/react'

export const RawEditorMode = ({
  variables,
  onChange,
}: {
  variables: Object
  onChange: (value: Object) => void
}) => {
  function handleChange(value: string) {
    try {
      onChange(JSON.parse(value))
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="overflow-hidden rounded-md border border-gray-400">
      <MonacoEditor
        height="60vh"
        defaultLanguage="json"
        defaultValue={JSON.stringify(variables, null, 2)}
        onChange={handleChange}
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
