import { classNames } from 'src/utils'
import { useOperations, useScrollContext } from './hooks'

type OperationInputProps = {
  className?: string
}

export const OperationInput = ({
  className: additionalClassNames,
}: OperationInputProps) => {
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
        'flex flex-col bg-gray-100 p-2'
      )}
    >
      <input
        type="text"
        className="border border-gray-300 pl-1 font-mono"
        placeholder="operation_name"
        onKeyDown={handleOnKeyDown}
      />
    </div>
  )
}
