import { useState } from 'react'
import { Control, Controller } from 'react-hook-form'

import RawEditor from './RawEditor'
import VisualEditor from './VisualEditor'
import Toolbar from './Toolbar'
import { FormValues } from '../types'

const Editor = ({
  control,
  onSave: handleSave,
  serviceId,
  componentId,
}: {
  control: Control<FormValues>
  onSave: (newVariables: object) => void
  serviceId: string
  componentId: string
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
      <Controller
        name="variables"
        control={control}
        render={({ field: { value, onChange } }) =>
          isRawEditorMode ? (
            <RawEditor
              key={serviceId + componentId}
              variables={value}
              onChange={onChange}
              onSave={handleSave}
            />
          ) : (
            <VisualEditor
              key={serviceId + componentId}
              variables={value}
              onChange={onChange}
            />
          )
        }
      />
    </>
  )
}

export default Editor
