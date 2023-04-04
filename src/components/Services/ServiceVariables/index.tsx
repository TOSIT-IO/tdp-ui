import { useForm } from 'react-hook-form'

import { diff } from 'src/utils'
import ValidationBar from './ValidateBar'
import Editor from './Editor'
import ComponentsNav from './ComponentsNav'
import type { FormValues } from './types'

const ServiceVariables = ({
  defaultValue: defaultValue,
  onSave: handleSave,
  onSubmit: submit,
}: {
  defaultValue: object
  onSave: (newVariables: object) => void
  onSubmit: (newVariables: object, message: string) => void
}) => {
  const { control, register, handleSubmit, getValues } = useForm<FormValues>()

  function saveVariables() {
    const dirtyVariables = diff(defaultValue, getValues('variables'))
    handleSave(dirtyVariables)
  }

  function submitVariables(formResult: FormValues) {
    const dirtyVariables = diff(defaultValue, formResult.variables)
    submit(dirtyVariables, formResult.message)
  }

  return (
    <>
      <ComponentsNav onChange={saveVariables} />
      <form onSubmit={handleSubmit(submitVariables)}>
        <Editor control={control} defaultValue={defaultValue} />
        <ValidationBar register={register} />
      </form>
    </>
  )
}

export default ServiceVariables
