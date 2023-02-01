import { useState } from 'react'
import { setProperty } from 'src/features/userInput'
import { useAppDispatch } from 'src/store'
import { classNames } from 'src/utils'
import { useParamsContext } from '../../useParamsContext'

export function StringNumberField({
  property,
  value,
  dict,
}: {
  property: string
  value: string | number
  dict?: string
}) {
  const { serviceId, componentId } = useParamsContext()
  const dispatch = useAppDispatch()
  const [error, setError] = useState(false)

  const fullProperty = [dict, property].filter(Boolean).join('.')

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
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
      console.group(err)
      setError(true)
    }
  }

  return (
    <div className="flex">
      <input
        name={fullProperty}
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
