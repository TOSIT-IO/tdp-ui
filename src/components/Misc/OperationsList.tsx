import { Droppable } from 'react-beautiful-dnd'
import Operation from './Operation'
import { useOperationsContext } from './OperationsContext'

export default function OperationsList() {
  const { operations } = useOperationsContext()
  return (
    <Droppable droppableId="droppable">
      {(droppableProvided) => (
        <div
          {...droppableProvided.droppableProps}
          ref={droppableProvided.innerRef}
        >
          {operations.map((v, i) => (
            <Operation key={v} index={i} />
          ))}
          {droppableProvided.placeholder}
        </div>
      )}
    </Droppable>
  )
}
