import { useFormContext } from 'react-hook-form'

import { Sidebar } from 'src/components/Layout'

type SimpleValue = string | number | boolean | Object | null
type Value = SimpleValue | SimpleValue[]

const SimpleInput = ({
  property,
  value,
}: {
  property: string
  value: string | number
}) => {
  const { register } = useFormContext()

  return (
    <input
      {...register(property)}
      name={property}
      defaultValue={value}
      className={'w-full bg-gray-100'}
    />
  )
}

const BooleanInput = ({
  property,
  value,
}: {
  property: string
  value: boolean
}) => {
  const { register } = useFormContext()

  return (
    <div className="flex flex-grow flex-col">
      <label className="relative inline-flex cursor-pointer items-center transition duration-75 ease-in-out hover:bg-slate-200 hover:opacity-70">
        <input
          {...register(property)}
          type="checkbox"
          className="peer sr-only"
          defaultChecked={value}
        />
        <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-indigo-600 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
      </label>
    </div>
  )
}

const ObjectInput = ({
  property,
  value,
}: {
  property: string
  value: object
}) => {
  const { register } = useFormContext()
  return (
    <textarea
      {...register(property)}
      defaultValue={JSON.stringify(value, null, 2)}
    />
  )
}

const Input = ({
  value,
  fullProperty,
}: {
  value: SimpleValue
  fullProperty: string
}) => {
  switch (typeof value) {
    case 'undefined':
      return <p>undefined</p>
    case 'string':
    case 'number':
      return (
        <SimpleInput property={fullProperty} value={JSON.stringify(value)} />
      )
    case 'boolean':
      return <BooleanInput property={fullProperty} value={value} />
    case 'object':
      if (value === null) return <p>null</p>
      // TODO: differentiate Array.isArray(value) case
      return <ObjectInput property={fullProperty} value={value} />
    default:
      return <p>{`Unknown type (${typeof value})`}</p>
  }
}

const Field = ({
  dictId,
  property,
  value,
}: {
  dictId?: string
  property: string
  value: Value
}) => {
  const fullProperty = [dictId, property].filter(Boolean).join('.')

  return (
    <Sidebar className="text-sm text-gray-600" space="0" sideWidth="17rem">
      <label htmlFor={fullProperty} className="w-20 overflow-auto font-bold">
        {property}:
      </label>
      <div className="w-full">
        <Input fullProperty={fullProperty} value={value} />
      </div>
    </Sidebar>
  )
}

export default Field
