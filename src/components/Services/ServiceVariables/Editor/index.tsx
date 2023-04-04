import { useState } from 'react'
import { Control, Controller } from 'react-hook-form'

import RawEditor from './RawEditor'
import VisualEditor from './VisualEditor'
import Toolbar from './Toolbar'
import { FormValues } from '../types'

const EditorControlled = ({
  control,
  defaultValue,
  isRawEditorMode,
}: {
  control: Control<FormValues>
  defaultValue: Object
  isRawEditorMode: boolean
}) => {
  return (
    <Controller
      name="variables"
      control={control}
      defaultValue={defaultValue}
      render={({ field: { value, onChange } }) =>
        isRawEditorMode ? (
          <RawEditor variables={value} onChange={onChange} />
        ) : (
          <VisualEditor variables={value} onChange={onChange} />
        )
      }
    />
  )
}

const EditorWithToolbar = ({
  control,
  defaultValue,
}: {
  control: Control<FormValues>
  defaultValue: Object
}) => {
  const [isRawEditorMode, setIsRawEditorMode] = useState(true)

  const showRawMode = () => setIsRawEditorMode(true)
  const showVisualMode = () => setIsRawEditorMode(false)

  return (
    <>
      <Toolbar
        isRawMode={isRawEditorMode}
        showRawMode={showRawMode}
        showVisualMode={showVisualMode}
      />
      <EditorControlled
        control={control}
        defaultValue={defaultValue}
        isRawEditorMode={isRawEditorMode}
      />
    </>
  )
}

export default EditorWithToolbar
