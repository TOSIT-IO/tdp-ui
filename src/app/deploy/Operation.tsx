import { XMarkIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { useOperationsContext } from './OperationsContext'

export default function Operation({ index }: { index: number }): JSX.Element {
  const { operations, editOperation, removeOperation } = useOperationsContext()
  const [isEditable, setIsEditable] = useState(false)
  const [input, setInput] = useState('')

  function toggleEditMode() {
    setIsEditable((prev) => !prev)
    setInput(operations[index])
  }

  return (
    <Draggable draggableId={operations[index]} index={index}>
      {(draggableProvided) => (
        <div
          ref={draggableProvided.innerRef}
          {...draggableProvided.draggableProps}
          {...draggableProvided.dragHandleProps}
        >
          <div className="mb-1 flex justify-between items-center bg-slate-100 rounded-md overflow-hidden border-slate-400 border-[1px]">
            <div className="px-1 w-full flex" onDoubleClick={toggleEditMode}>
              <p className="pr-2">{`${index}:`}</p>
              {isEditable ? (
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    const trimmedInput = input.trim()
                    if (e.key === 'Enter' && trimmedInput.length) {
                      e.preventDefault()
                      editOperation(index, input)
                    }
                    if (e.key === 'Escape') {
                      e.preventDefault()
                      setIsEditable(false)
                    }
                  }}
                />
              ) : (
                <span>{operations[index]}</span>
              )}
            </div>
            <button
              type="button"
              onClick={() => removeOperation(index)}
              className="bg-red-500 self-stretch px-1"
            >
              <XMarkIcon className="h-5 w-5 text-white" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </Draggable>
  )
}
