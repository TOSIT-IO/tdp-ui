import { useLayoutEffect, useRef } from 'react'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import { useDeployContext } from 'src/contexts'
import { DeployActionEnum } from 'src/types/deployTypes'
import { classNames } from 'src/utils'
import { useScrollContext } from './context'
import { Operation } from './Operation'

export function OperationReorder({
  className: additionalClassNames,
}: {
  className?: string
}) {
  const {
    dispatch,
    state: { operations },
  } = useDeployContext()
  const { divRef, scrollDown, setNeedScrollDown } = useScrollContext()

  useLayoutEffect(() => {
    scrollDown()
  }, [operations, scrollDown])

  function handleOnDragEnd(result: DropResult) {
    if (!result.destination) {
      return
    }
    setNeedScrollDown(false)
    dispatch({
      type: DeployActionEnum.SWITCH_TWO_OPERATIONS,
      payload: {
        sourceIndex: result.source.index,
        destinationIndex: result.destination.index,
      },
    })
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className={classNames(additionalClassNames, 'p-2 bg-gray-100')}>
        <Droppable droppableId="droppable">
          {(droppableProvided) => (
            <div
              {...droppableProvided.droppableProps}
              ref={droppableProvided.innerRef}
            >
              <div ref={divRef} className="max-h-96 overflow-auto space-y-1">
                {operations.map((operation, index) => (
                  <Operation
                    key={operation + index}
                    index={index}
                    operation={operation}
                  />
                ))}
                {droppableProvided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  )
}
