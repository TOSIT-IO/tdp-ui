import { useState } from 'react'
import { setProperty } from 'src/features/userInput'
import { useAppDispatch } from 'src/store'
import { classNames } from 'src/utils'
import { useParamsContext } from '../../useParamsContext'

export function ArrayList({
  property,
  value,
  dict,
}: {
  property: string
  value: any[]
  dict?: string
}) {
  console.log('dict', dict)
  return (
    <ol className="flex flex-grow flex-col gap-2">
      {value.map((v) => (
        <ValueArrayElement key={v} value={v} dict={dict} property={property} />
      ))}
    </ol>
  )
}

function ValueArrayElement({
  value,
  dict,
  property,
}: {
  value: any
  dict?: string
  property: string
}) {
  const { serviceId, componentId } = useParamsContext()
  const dispatch = useAppDispatch()
  const [error, setError] = useState(false)
  const fullProperty = [dict, property].filter(Boolean).join('.')

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setError(false)
    try {
      const parsedValue = JSON.parse(event.target.value)
      dispatch(
        setProperty({
          serviceId,
          componentId,
          property: fullProperty,
          value: parsedValue,
        })
      )
    } catch (err) {
      setError(true)
    }
  }

  return (
    <li key={fullProperty} className="flex grow">
      <input
        name={fullProperty}
        className={classNames(
          'grow',
          error && 'bg-red-200',
          typeof value === 'number' ? 'text-teal-600' : 'text-slate-700',
          'transition duration-75 ease-in-out hover:bg-slate-200 hover:opacity-100'
        )}
        defaultValue={JSON.stringify(value)}
        onChange={handleChange}
      />
    </li>
  )
}
