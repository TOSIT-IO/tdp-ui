import { useState } from 'react'
import { setProperty } from 'src/features/userInput'
import { useAppDispatch } from 'src/store'
import { classNames } from 'src/utils'
import { useParamsContext } from '../../useParamsContext'

export function RawField({
  property,
  value,
  dict,
}: {
  property: string
  value: string | number | boolean | any[]
  dict?: string
}) {
  const { serviceId, componentId } = useParamsContext()
  const dispatch = useAppDispatch()
  const [error, setError] = useState(false)
  const fullProperty = [dict, property].filter(Boolean).join('.')

  function handleVariableChange(event: React.ChangeEvent<HTMLInputElement>) {
    setError(false)
    try {
      const newValue = JSON.parse(event.target.value)
      dispatch(
        setProperty({
          serviceId,
          componentId,
          property: fullProperty,
          value: newValue,
        })
      )
    } catch (err) {
      setError(true)
    }
  }

  return (
    <div className="text-gray-600 text-sm flex">
      <label htmlFor={fullProperty} className="font-bold mr-2">
        {property}:
      </label>
      <input
        name={fullProperty}
        className={classNames(
          'grow outline-none bg-gray-100',
          error && 'bg-red-200'
        )}
        defaultValue={JSON.stringify(value)}
        onChange={handleVariableChange}
      />
    </div>
  )
}
