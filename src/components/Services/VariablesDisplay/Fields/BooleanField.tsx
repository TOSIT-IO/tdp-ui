import { Toggle } from 'src/components/commons'
import { useAppDispatch } from 'src/store'
import { useParamsContext } from '../../useParamsContext'
import { setProperty } from 'src/features/userInput'

export function BooleanField({
  property,
  value,
  dict,
}: {
  property: string
  value: boolean
  dict?: string
}) {
  const { serviceId, componentId } = useParamsContext()
  const dispatch = useAppDispatch()

  const fullProperty = [dict, property].filter(Boolean).join('.')

  function handleChecked(event: React.ChangeEvent<HTMLInputElement>) {
    const newValue = event.target.checked
    dispatch(
      setProperty({
        serviceId,
        componentId,
        property: fullProperty,
        value: newValue,
      })
    )
  }
  return (
    <div className="flex flex-grow flex-col">
      <Toggle handleChecked={handleChecked} defaultValue={value} />
    </div>
  )
}
