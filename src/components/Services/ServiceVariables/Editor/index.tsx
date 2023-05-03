import { Control, Controller } from 'react-hook-form'

import RawEditor from './RawEditor'
import VisualEditor from './VisualEditor'
import Toolbar from './Toolbar'
import { FormValues } from '../types'
import { useAppSelector } from 'src/store'

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
  const {
    settings: { showRawMode },
  } = useAppSelector((state) => state.userInput)
  return (
    <>
      <Toolbar />
      <Controller
        name="variables"
        control={control}
        render={({ field: { value, onChange } }) =>
          showRawMode ? (
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
