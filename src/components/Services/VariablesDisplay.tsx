import { useRef, useState } from 'react'
import {
  useForm,
  FormProvider,
  useFormContext,
  useFormState,
  useFieldArray,
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
  const flattenedVariables = flattenObject(variables)
  const methods = useForm({
    defaultValues: flattenedVariables,
  })

  return (
    <FormProvider {...methods}>
      <ServiceVariables variables={variables} />
    </FormProvider>
  )
}

function flattenObject(obj: Object) {
  const res = {}
  Object.entries(obj).forEach((o) => {
    const [k, v] = o
    if (typeof v === 'object' && v !== null) {
      if (Array.isArray(v)) {
        res[k] = v.map((av) => flattenObject(av))
      } else {
        Object.entries(flattenObject(v)).forEach((fo) => {
          const [fk, fv] = fo
          res[k + '.' + fk] = fv
        })
      }
    } else {
      res[k] = v
    }
  })
  return res
}

function ServiceVariables({ variables }: { variables: Object }) {
  const { currentServiceId, currentComponentId } = useParamsContext()
  const dispatch = useAppDispatch()
  const { getValues, control } = useFormContext()
  const { dirtyFields } = useFormState({ control })
  const editorRef = useRef(null)
  const {
    settings: { showRawMode },
  } = useSelectUserInput()

  function handleRawEditorDidMount(editor, monaco) {
    editorRef.current = editor
  }

  function saveVariables() {
    let dirtyValues: Object
    if (showRawMode) {
      const editorValues = JSON.parse(editorRef.current.getValue()) as Object
      dirtyValues = Object.keys(editorValues).reduce((acc, key) => {
        if (variables.hasOwnProperty(key)) {
          if (variables[key] !== editorValues[key]) {
            acc[key] = editorValues[key]
          }
        } else {
          acc[key] = editorValues[key]
        }
        return acc
      }, {})
    } else {
      dirtyValues = getDirtyValues(dirtyFields, getValues)
    }
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
      <VariablesEditionZone
        variables={variables}
        saveVariables={saveVariables}
        handleRawEditorDidMount={handleRawEditorDidMount}
      />
    </>
  )
}

function VariablesEditionZone({
  variables,
  saveVariables,
  handleRawEditorDidMount,
}: {
  variables: Object
  saveVariables: () => void
  handleRawEditorDidMount: (editor: any, monaco: any) => void
}) {
  const isVariableEmpty = !Object.entries(variables).length

  if (isVariableEmpty) return <NoVariableMessage />

  return (
    <>
      <Toolbar saveVariables={saveVariables} />
      <VariablesForm
        variables={variables}
        saveVariables={saveVariables}
        handleRawEditorDidMount={handleRawEditorDidMount}
      />
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

function VariablesForm({
  variables,
  saveVariables,
  handleRawEditorDidMount,
}: {
  variables: Object
  saveVariables: () => void
  handleRawEditorDidMount: (editor: any, monaco: any) => void
}) {
  const {
    settings: { showRawMode },
  } = useSelectUserInput()
  const [message, setMessage] = useState('')

  return (
    <Form message={message} setMessage={setMessage}>
      {showRawMode ? (
        <RawMode
          variables={variables}
          handleRawEditorDidMount={handleRawEditorDidMount}
        />
      ) : (
        <ViewMode variables={variables} />
      )}
      <ValidateBar
        onValidate={saveVariables}
        message={message}
        setMessage={setMessage}
      />
    </Form>
  )
}

function Form({
  children,
  message,
  setMessage,
}: {
  children: React.ReactNode
  message: string
  setMessage: (message: string) => void
}) {
  const methods = useFormContext()
  const { sendVariables } = usePutServiceConfig()
  const dispatch = useAppDispatch()

  function handleSubmit(data: Object) {
    sendVariables(message)
    setMessage('')
    dispatch(clearUserInput())
  }

  return <form onSubmit={methods.handleSubmit(handleSubmit)}>{children}</form>
}

function RawMode({
  variables,
  handleRawEditorDidMount,
}: {
  variables: Object
  handleRawEditorDidMount: (editor: any, monaco: any) => void
}) {
  return (
    <Editor
      height="65vh"
      defaultLanguage="json"
      value={JSON.stringify(variables, null, 2)}
      options={{ minimap: { enabled: false }, wordWrap: 'on' }}
      onMount={handleRawEditorDidMount}
    />
  )
}

function ViewMode({ variables }: { variables: Object }) {
  const { primitiveVariables, objectVariables: dictionaries } =
    splitObjectVariables(variables)

  const Dictionaries = dictionaries.map((dict) => (
    <Dictionary key={dict[0]} dict={dict} />
  ))

  return (
    <div className="flex flex-col gap-3">
      <PrimitiveVariables variables={primitiveVariables} />
      {Dictionaries}
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
      if (
        typeof currentValue[1] === 'object' &&
        !Array.isArray(currentValue[1])
      ) {
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
    return <StringNumberField property={property} />
  }
  if (typeof value === 'boolean') {
    return <BooleanField property={property} />
  }
  if (typeof value === 'object') {
    if (value === null) return <p>null</p>
    if (Array.isArray(value)) {
      return <ArrayField property={property} />
    }
    console.log(property)
    return <StringNumberField property={property} />
  }
  return <p>{`Unknown type (${typeof value})`}</p>
}

function ArrayField({ property }: { property: string }) {
  const { register } = useFormContext()
  const { fields } = useFieldArray({
    name: property,
  })

  if (fields.length === 0) return <p>[]</p>

  return (
    <ol className="flex flex-col gap-2">
      {fields.map((field, index) => (
        <li key={index}>
          <input
            className="w-full bg-gray-100"
            {...register(`${property}.${index}.value`)}
            defaultValue={JSON.stringify(field)}
          />
        </li>
      ))}
    </ol>
  )
}

function BooleanField({ property }: { property: string }) {
  const { register } = useFormContext()

  return (
    <div className="flex flex-grow flex-col">
      <label className="inline-flex relative items-center cursor-pointer hover:opacity-70 hover:bg-slate-200 transition duration-75 ease-in-out">
        <input
          {...register(property)}
          type="checkbox"
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
      </label>
    </div>
  )
}

function StringNumberField({ property }: { property: string }) {
  const { register } = useFormContext()
  //TODO: handle errors
  let error

  // TODO: handle objects

  return (
    <input
      {...register(property)}
      name={property}
      className={classNames('w-full bg-gray-100', error && 'bg-red-200')}
    />
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
