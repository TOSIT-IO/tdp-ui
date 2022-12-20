import { Draggable } from 'react-beautiful-dnd'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { useDeployContext } from 'src/contexts'
import { DeployActionEnum } from 'src/types/deployTypes'
import { useScrollContext } from './context'

export function Operation({
  operation,
  index,
}: {
  operation: string
  index: number
}) {
  const { dispatch } = useDeployContext()
  const { setNeedScrollDown } = useScrollContext()

  function handleRemoveOperation() {
    setNeedScrollDown(false)
    dispatch({
      type: DeployActionEnum.REMOVE_OPERATION_AT,
      payload: { index },
    })
  }

  return (
    <Draggable draggableId={operation} index={index}>
      {(draggableProvided) => (
        <div
          ref={draggableProvided.innerRef}
          {...draggableProvided.draggableProps}
          {...draggableProvided.dragHandleProps}
        >
          <div className="p-1 flex justify-between border border-gray-300 text-sm font-mono bg-white">
            <span>{operation}</span>
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
