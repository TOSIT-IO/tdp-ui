import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { compare } from 'mixme'

import ValidationBar from './ValidateBar'
import Editor from './Editor'
import ComponentsNav from './ComponentsNav'
import type { FormValues } from './types'
import { usePutVariables } from './hooks'
import {
  setComponent,
  setServiceVariables,
  deleteComponent,
  clearServiceVariables,
} from 'src/store/slices/userInput'
import { useAppDispatch, useAppSelector } from 'src/store'
import type { Component, Service } from 'src/store/api/tdpApi'

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
  const putVariables = usePutVariables()
  const { control, register, handleSubmit, setValue } = useForm<FormValues>()

  const saveVariablesToStore = (dirtyVariables: object) => {
    // TODO: apply schema to validate variables
    if (!dirtyVariables) return
    // Store in `userInput` only modified variables
    if (compare(dirtyVariables, data.variables))
      dispatch(
        componentId ? deleteComponent({ componentId }) : clearServiceVariables()
      )
    else
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
  }, [serviceId, data, componentId, userInput, setValue])

  return (
    <>
      <ComponentsNav />
      <form
        onSubmit={handleSubmit((formResult: FormValues) => {
          putVariables({ message: formResult.message })
        })}
      >
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
