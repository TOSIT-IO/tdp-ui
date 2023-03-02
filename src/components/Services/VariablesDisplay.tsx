import { useState } from 'react'
import Editor from '@monaco-editor/react'
import { Bars3CenterLeftIcon, EyeIcon } from '@heroicons/react/24/solid'
import { Disclosure, Sidebar } from 'src/components/Layout'
import { Button, IconButon } from 'src/components/commons'
import { useAppDispatch } from 'src/store'
import { setProperty } from 'src/features/userInput'
import { classNames } from 'src/utils'
import { useParamsContext } from './ParamsContext'
import { usePutServiceConfig } from 'src/hooks'

export function VariablesDisplay({ variables }: { variables: Object }) {
  const [isRawMode, setIsRawMode] = useState(false)
  const isVariableEmpty = !Object.entries(variables).length

  if (isVariableEmpty) return <NoVariableMessage />

  return (
    <>
      <Toolbar isRawMode={isRawMode} setIsRawMode={setIsRawMode} />
      {isRawMode ? (
        <RawMode variables={variables} />
      ) : (
        <ViewMode variables={variables} />
      )}
      <ValidateBar />
    </>
  )
}

function NoVariableMessage() {
  const { currentServiceId, currentComponentId } = useParamsContext()
  return (
    <p className="text-slate-600">
      No variable defined for {currentComponentId ?? currentServiceId}
    </p>
  )
}

function Toolbar({
  isRawMode,
  setIsRawMode,
}: {
  isRawMode: boolean
  setIsRawMode: (isRaw: boolean) => void
}) {
  return (
    <div className="flex justify-end mb-4 ">
      <RawViewButton isRaw={isRawMode} setIsRaw={setIsRawMode} />
    </div>
  )
}

function RawViewButton({
  isRaw,
  setIsRaw,
}: {
  isRaw: boolean
  setIsRaw: React.Dispatch<React.SetStateAction<boolean>>
}) {
  return (
    <div className="rounded-md inline-flex border border-gray-400 overflow-hidden">
      <IconButon
        onClick={() => setIsRaw(true)}
        isActive={isRaw}
        icon={Bars3CenterLeftIcon}
        text="Raw"
      />
      <IconButon
        onClick={() => setIsRaw(false)}
        isActive={!isRaw}
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
    <form className="flex flex-col gap-3">
      <PrimitiveVariables variables={primitiveVariables} />
      {dictionaries.map((dict) => (
        <Dictionary key={dict[0]} dict={dict} />
      ))}
    </form>
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
    <Disclosure key={dictId} title={dictId}>
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
    return <BooleanField value={value} property={property} />
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
  const { currentServiceId, currentComponentId } = useParamsContext()
  const dispatch = useAppDispatch()

  function handleChecked(event: React.ChangeEvent<HTMLInputElement>) {
    const newValue = event.target.checked
    dispatch(
      setProperty({
        serviceId: currentServiceId,
        componentId: currentComponentId,
        property,
        value: newValue,
      })
    )
  }
  return (
    <div className="flex flex-grow flex-col">
      <label className="inline-flex relative items-center cursor-pointer hover:opacity-70 hover:bg-slate-200 transition duration-75 ease-in-out">
        <input
          type="checkbox"
          className="sr-only peer"
          onChange={handleChecked}
          defaultChecked={value}
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
  const { currentServiceId, currentComponentId } = useParamsContext()
  const dispatch = useAppDispatch()
  const [error, setError] = useState(false)

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setError(false)
    try {
      const newValue = JSON.parse(event.target.value)
      dispatch(
        setProperty({
          serviceId: currentServiceId,
          componentId: currentComponentId,
          property,
          value: newValue,
        })
      )
    } catch (err) {
      setError(true)
    }
  }

  return (
    <div className="flex">
      <input
        name={property}
        className={classNames(
          'flex-grow bg-gray-100',
          error && 'bg-red-200',
          typeof value === 'number' ? 'text-teal-600' : 'text-slate-600'
        )}
        defaultValue={JSON.stringify(value)}
        onChange={handleChange}
      />
    </div>
  )
}

function ValidateBar() {
  const { sendVariables } = usePutServiceConfig()
  const [validateMessage, setValidateMessage] = useState('')

  function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    sendVariables(validateMessage)
    setValidateMessage('')
  }

  return (
    <div className="sticky bottom-0 w-full py-4 bg-white flex items-center justify-end">
      <input
        value={validateMessage}
        onChange={(e) => setValidateMessage(e.target.value)}
        placeholder="Commit message"
      />
      <Button type="button" onClick={handleSubmit}>
        Validate
      </Button>
    </div>
  )
}
