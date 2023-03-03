import { useState } from 'react'
import {
  useForm,
  FormProvider,
  useFormContext,
  useFormState,
} from 'react-hook-form'
import Editor from '@monaco-editor/react'
import { Bars3CenterLeftIcon, EyeIcon } from '@heroicons/react/24/solid'
import { Disclosure, Sidebar } from 'src/components/Layout'
import { Button, IconButon } from 'src/components/commons'
import { classNames } from 'src/utils'
import { useParamsContext } from './ParamsContext'
import { usePutServiceConfig } from 'src/hooks'
import { ComponentsNav } from './ComponentsNav'
import { useAppDispatch } from 'src/store'
import {
  clearUserInput,
  setComponent,
  setRawMode,
  setServiceVariables,
} from 'src/features/userInput'
import { useSelectUserInput } from 'src/features/userInput/hooks'

export function VariablesDisplay({ variables }: { variables: Object }) {
  const methods = useForm({ defaultValues: variables })

  return (
    <FormProvider {...methods}>
      <Form variables={variables} />
    </FormProvider>
  )
}

function Form({ variables }: { variables: Object }) {
  const { currentServiceId, currentComponentId } = useParamsContext()
  const dispatch = useAppDispatch()
  const { getValues, control } = useFormContext()
  const { dirtyFields } = useFormState({ control })

  function saveVariables() {
    const dirtyValues = getDirtyValues(dirtyFields, getValues)
    if (currentServiceId && currentComponentId) {
      dispatch(
        setComponent({
          componentId: currentComponentId,
          variables: dirtyValues,
        })
      )
    }
    if (currentServiceId && !currentComponentId) {
      dispatch(setServiceVariables(dirtyValues))
    }
  }

  return (
    <>
      <ComponentsNav onChange={saveVariables} />
      {/* key let React re-render the component when the currentServiceId or currentComponentId changes */}
      <Variables
        key={currentServiceId + currentComponentId}
        variables={variables}
        saveVariables={saveVariables}
      />
    </>
  )
}

function Variables({
  variables,
  saveVariables,
}: {
  variables: Object
  saveVariables: () => void
}) {
  const { sendVariables } = usePutServiceConfig()
  const dispatch = useAppDispatch()
  const {
    settings: { showRawMode },
  } = useSelectUserInput()
  const [message, setMessage] = useState('')
  const methods = useFormContext()

  function handleSubmit(data: Object) {
    sendVariables(message)
    setMessage('')
    dispatch(clearUserInput())
  }

  const isVariableEmpty = !Object.entries(variables).length
  if (isVariableEmpty) return <NoVariableMessage />

  return (
    <>
      <Toolbar saveVariables={saveVariables} />
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        {showRawMode ? (
          <RawMode variables={variables} />
        ) : (
          <ViewMode variables={variables} />
        )}
        <ValidateBar
          onValidate={saveVariables}
          message={message}
          setMessage={setMessage}
        />
      </form>
    </>
  )
}

function getDirtyValues(dirtyFields: Object, getValues: (key: string) => any) {
  const dirtyValues = {}
  Object.keys(dirtyFields).forEach((key) => {
    dirtyValues[key] = getValues(key)
  })
  return dirtyValues
}

function NoVariableMessage() {
  const { currentServiceId, currentComponentId } = useParamsContext()
  return (
    <p className="text-slate-600">
      No variable defined for {currentComponentId ?? currentServiceId}
    </p>
  )
}

function Toolbar({ saveVariables }: { saveVariables: () => void }) {
  return (
    <div className="flex justify-end mb-4 ">
      <RawViewButton saveVariables={saveVariables} />
    </div>
  )
}

function RawViewButton({ saveVariables }: { saveVariables: () => void }) {
  const dispatch = useAppDispatch()
  const {
    settings: { showRawMode },
  } = useSelectUserInput()

  function handleSetRawMode(rawMode: boolean) {
    saveVariables()
    dispatch(setRawMode(rawMode))
  }

  return (
    <div className="rounded-md inline-flex border border-gray-400 overflow-hidden">
      <IconButon
        onClick={() => handleSetRawMode(true)}
        isActive={showRawMode}
        icon={Bars3CenterLeftIcon}
        text="Raw"
      />
      <IconButon
        onClick={() => handleSetRawMode(false)}
        isActive={!showRawMode}
        className="-ml-px border-l-gray-400 border-l"
        icon={EyeIcon}
        text="View"
      />
    </div>
  )
}

function RawMode({ variables }: { variables: Object }) {
  return (
    <Editor
      height="65vh"
      defaultLanguage="json"
      value={JSON.stringify(variables, null, 2)}
      options={{ minimap: { enabled: false }, wordWrap: 'on' }}
    />
  )
}

function ViewMode({ variables }: { variables: Object }) {
  const { primitiveVariables, objectVariables: dictionaries } =
    splitObjectVariables(variables)
  return (
    <div className="flex flex-col gap-3">
      <PrimitiveVariables variables={primitiveVariables} />
      {dictionaries.map((dict) => (
        <Dictionary key={dict[0]} dict={dict} />
      ))}
    </div>
  )
}

type SplitObjectVariables = {
  primitiveVariables: [string, string][]
  objectVariables: [string, Object][]
}

function splitObjectVariables(variables: Object) {
  return Object.entries(variables).reduce<SplitObjectVariables>(
    ({ primitiveVariables, objectVariables }, currentValue) => {
      if (typeof currentValue[1] === 'object') {
        objectVariables.push(currentValue)
      } else {
        primitiveVariables.push(currentValue)
      }
      return { objectVariables, primitiveVariables }
    },
    { primitiveVariables: [], objectVariables: [] }
  )
}

function Dictionary({ dict }: { dict: [string, Object] }) {
  const [dictId, dictVariables] = dict
  return (
    <Disclosure title={dictId}>
      <PrimitiveVariables
        variables={Object.entries(dictVariables ?? {})}
        dictId={dictId}
      />
    </Disclosure>
  )
}

type SimpleValue = string | number | boolean | Object | null
type Value = SimpleValue | SimpleValue[]

function PrimitiveVariables({
  variables,
  dictId,
}: {
  variables: [string, Value][]
  dictId?: string
}) {
  return (
    <div className="flex flex-col gap-1">
      {variables.map(([k, v]) => (
        <PrimitiveVariable key={k} property={k} dictId={dictId} value={v} />
      ))}
    </div>
  )
}

function PrimitiveVariable({
  property,
  dictId,
  value,
}: {
  property: string
  dictId?: string
  value: Value
}) {
  const fullProperty = [dictId, property].filter(Boolean).join('.')
  return (
    <Sidebar className="text-gray-600 text-sm" space="0" sideWidth="17rem">
      <p className="w-20 font-bold overflow-auto">{property}:</p>
      <div className="w-full">
        {getField({ value, property: fullProperty })}
      </div>
    </Sidebar>
  )
}

function getField({
  value,
  property,
}: {
  value: SimpleValue
  property: string
}) {
  if (typeof value === 'undefined') return <p>undefined</p>
  if (typeof value === 'string' || typeof value === 'number') {
    return <StringNumberField value={value} property={property} />
  }
  if (typeof value === 'boolean') {
    return <BooleanField property={property} value={value} />
  }
  if (typeof value === 'object') {
    if (Array.isArray(value)) {
      return <ArrayField value={value} property={property} />
    }
    return (
      <StringNumberField value={JSON.stringify(value)} property={property} />
    )
  }
  return <p>{`Unknown type (${typeof value})`}</p>
}

function ArrayField({
  property,
  value,
}: {
  property: string
  value: SimpleValue[]
}) {
  return (
    <ol className="flex flex-grow flex-col gap-2">
      {value.map((v, i) => (
        <li key={i}>{getField({ value: v, property })}</li>
      ))}
    </ol>
  )
}

function BooleanField({
  property,
  value,
}: {
  property: string
  value: boolean
}) {
  const { register } = useFormContext()

  return (
    <div className="flex flex-grow flex-col">
      <label className="inline-flex relative items-center cursor-pointer hover:opacity-70 hover:bg-slate-200 transition duration-75 ease-in-out">
        <input
          {...register(property)}
          type="checkbox"
          defaultChecked={value}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
      </label>
    </div>
  )
}

function StringNumberField({
  property,
  value,
}: {
  property: string
  value: string | number
}) {
  const { register } = useFormContext()
  //TODO: handle errors
  let error

  return (
    <div className="flex">
      <input
        {...register(property)}
        defaultValue={value}
        name={property}
        className={classNames(
          'flex-grow bg-gray-100',
          error && 'bg-red-200',
          typeof value === 'number' ? 'text-teal-600' : 'text-slate-600'
        )}
      />
    </div>
  )
}

function ValidateBar({
  onValidate,
  message,
  setMessage,
}: {
  onValidate: () => void
  message: string
  setMessage: (message: string) => void
}) {
  return (
    <div className="sticky bottom-0 w-full py-4 bg-white flex items-center justify-end">
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Commit message"
      />
      <Button type="submit" onClick={onValidate}>
        Validate
      </Button>
    </div>
  )
}
