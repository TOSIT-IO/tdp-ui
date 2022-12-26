import { classNames } from 'src/utils'
import { useOperations, useScrollContext } from './hooks'

type OperationInputProps = {
  className?: string
}

export function OperationInput({
  className: additionalClassNames,
}: OperationInputProps) {
  const { addOperations } = useOperations()
  const { setEnableScrollDown } = useScrollContext()

  const handleOnKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    const inputValue = event.currentTarget.value.trim()
    if (!inputValue) return
    switch (event.key) {
      case 'Enter':
      case ' ':
      case ',':
      case 'Tab':
        event.preventDefault()
        setEnableScrollDown(true)
        addOperations(inputValue)
        event.currentTarget.value = ''
    }
  }

  return (
    <div
      className={classNames(
        additionalClassNames,
        'p-2 flex flex-col bg-gray-100'
      )}
    >
      <input
        type="text"
        className="pl-1 border border-gray-300 font-mono"
        placeholder="operation_name"
        onKeyDown={handleOnKeyDown}
      />
    </div>
  )
}
