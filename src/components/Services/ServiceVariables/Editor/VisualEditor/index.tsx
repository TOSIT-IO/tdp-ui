import { useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { useRouter } from 'next/router'

import { Disclosure } from 'src/components/Layout'
import { parseRecursively, splitVariables } from 'src/utils'
import Field from './Field'

const WipMessage = () => (
  <p className="mb-4 rounded-md bg-yellow-100 p-2 text-center text-sm text-yellow-700">
    <span className="italic">
      <strong>Caution</strong>: visual mode is a work in progress and may not
      work properly.
    </span>
    {' 👷'}
  </p>
)
const NoVariableMessage = () => {
  const {
    query: { serviceId, componentId },
  } = useRouter()

  return (
    <p className="text-slate-600">
      No variable defined for {componentId?.toString() ?? serviceId?.toString()}
    </p>
  )
}

const Variables = ({
  variables,
  dictId,
}: {
  variables: [string, unknown][]
  dictId?: string
}) => {
  return (
    <div className="flex flex-col gap-1">
      {variables.map(([k, v]) => (
        <Field key={k} property={k} dictId={dictId} value={v} />
      ))}
    </div>
  )
}

const Form = ({
  onChange,
  children,
}: {
  onChange: (newVariables: Object) => void
  children: React.ReactNode
}) => {
  const methods = useForm()
  const { watch } = methods

  useEffect(() => {
    const subscription = watch((value) => onChange(parseRecursively(value)))
    return () => subscription.unsubscribe()
  }, [watch, onChange])

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col gap-3">{children}</div>
    </FormProvider>
  )
}

const VisualEditor = ({
  variables,
  onChange: handleChange,
}: {
  variables: Object
  onChange: (newVariables: Object) => void
}) => {
  const isVariableEmpty = !Object.entries(variables).length
  if (isVariableEmpty) return <NoVariableMessage />

  const { primitiveVariables, objectVariables } = splitVariables(variables)
  return (
    <>
      <WipMessage />
      <Form onChange={handleChange}>
        <Variables variables={primitiveVariables} />
        {objectVariables.map(([dictId, dictVariables]) => (
          <Disclosure title={dictId} key={dictId}>
            <Variables
              dictId={dictId}
              variables={Object.entries(dictVariables ?? {})}
            />
          </Disclosure>
        ))}
      </Form>
    </>
  )
}

export default VisualEditor
