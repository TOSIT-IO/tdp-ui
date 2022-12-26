import { XMarkIcon } from '@heroicons/react/24/solid'
import { Draggable } from 'react-beautiful-dnd'
import { useOperations, useScrollContext } from './hooks'

type OperationProps = {
  operation: string
  index: number
}

export function ListItem({ operation, index }: OperationProps) {
  const { removeOperations } = useOperations()
  const { setEnableScrollDown } = useScrollContext()

  function handleRemoveOperation() {
    setEnableScrollDown(false)
    removeOperations(index)
  }

  return (
    <Draggable draggableId={operation + index} index={index}>
      {(draggableProvided) => (
        <div
          ref={draggableProvided.innerRef}
          {...draggableProvided.draggableProps}
          {...draggableProvided.dragHandleProps}
        >
          <div className="p-1 flex justify-between border border-gray-300 text-sm font-mono bg-white">
            <span className="select-none">{operation}</span>
            <button
              type="button"
              className="px-1"
              onClick={handleRemoveOperation}
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </Draggable>
  )
}
