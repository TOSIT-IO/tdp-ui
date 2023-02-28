import { useLayoutEffect } from 'react'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import { classNames } from 'src/utils'
import { useOperations, useScrollContext } from './hooks'
import { ListItem } from './ListItem'

type OperationsListProps = {
  className?: string
}

export function OperationsList({
  className: additionalClassNames,
}: OperationsListProps) {
  const { operations, switchOperations } = useOperations()
  const { divToScroll, scrollDown, setEnableScrollDown } = useScrollContext()

  useLayoutEffect(() => {
    scrollDown()
  }, [operations, scrollDown])

  function handleOnDragEnd(result: DropResult) {
    if (!result.destination) {
      return
    }
    setEnableScrollDown(false)
    const { source, destination } = result
    switchOperations(source.index, destination.index)
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className={classNames(additionalClassNames, 'bg-gray-100 p-2')}>
        <Droppable droppableId="droppable">
          {(droppableProvided) => (
            <div
              {...droppableProvided.droppableProps}
              ref={droppableProvided.innerRef}
            >
              <div
                ref={divToScroll}
                className="max-h-96 space-y-1 overflow-auto"
              >
                {operations.map((operation, index) => (
                  <ListItem
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
