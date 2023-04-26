import { useForm } from 'react-hook-form'
import { useEffect } from 'react'

import ValidationBar from './ValidateBar'
import Editor from './Editor'
import ComponentsNav from './ComponentsNav'
import type { FormValues } from './types'
import { usePutServiceConfig } from 'src/hooks'
import { useAppSelector } from 'src/store'
import { setComponent, setServiceVariables } from 'src/store/features/userInput'
import { useAppDispatch } from 'src/store'
import type { Component, Service } from 'src/store/features/api/tdpApi'

const ServiceVariables = ({
  data,
  serviceId,
  componentId,
}: {
  data: Component | Service
  serviceId: string
  componentId?: string
}) => {
  const dispatch = useAppDispatch()
  const userInput = useAppSelector((state) => state.userInput)
  const putVariablesServiceWide = usePutServiceConfig()
  const { control, register, handleSubmit, setValue } = useForm<FormValues>()

  function submitVariables(formResult: FormValues) {
    putVariablesServiceWide({
      message: formResult.message,
      userInput: {
        serviceId: serviceId,
        variables: userInput.variables,
        components: userInput.components,
      },
    })
  }

  function saveVariablesToStore(dirtyVariables: object) {
    if (!dirtyVariables) return
    // console.log(dirtyVariables)
    dispatch(
      componentId
        ? setComponent({ componentId, variables: dirtyVariables })
        : setServiceVariables(dirtyVariables)
    )
  }

  // Update variables
  useEffect(() => {
    const defaultValue =
      (componentId
        ? userInput.components.find((c) => c.id === componentId)?.variables
        : userInput.variables) ?? data.variables
    setValue('variables', defaultValue)
  }, [serviceId, data, componentId, userInput])

  return (
    <>
      <ComponentsNav />
      <form onSubmit={handleSubmit(submitVariables)}>
        {data &&
          (componentId ? data.id == componentId : data.id == serviceId) && (
            <Editor
              serviceId={serviceId}
              componentId={componentId}
              control={control}
              onSave={saveVariablesToStore}
            />
          )}
        <ValidationBar register={register} />
      </form>
    </>
  )
}

export default ServiceVariables
