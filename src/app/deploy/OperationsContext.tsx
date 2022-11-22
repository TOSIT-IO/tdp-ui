import { useContext, createContext, useState } from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import {
  removeElementFromList,
  switch2ElementsFromList,
  updateElementFromList,
} from 'src/utils'

type OperationsContext = {
  addOperation: (operation: string) => void
  removeOperation: (index: number) => void
  editOperation: (index: number, newValue: string) => void
  operations: string[]
}

export const OperationsContext = createContext<OperationsContext>(null)

export function OperationsContextProvider({ children }) {
  const [operations, setOperations] = useState<string[]>([])

  function handleOnDragEnd(result: DropResult) {
    if (!result.destination) {
      return
    }
    setOperations((prevOperations) =>
      switch2ElementsFromList(
        prevOperations,
        result.source.index,
        result.destination.index
      )
    )
  }

  function addOperation(newOperation: string) {
    if (newOperation.length && !operations.includes(newOperation)) {
      setOperations((prevNodes) => [...prevNodes, newOperation])
    }
  }

  function removeOperation(index: number) {
    setOperations((prevOperations) =>
      removeElementFromList(prevOperations, index)
    )
  }

  function editOperation(index: number, newValue: string) {
    if (!operations.includes(newValue))
      setOperations((prevOperations) =>
        updateElementFromList(prevOperations, index, newValue)
      )
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <OperationsContext.Provider
        value={{ addOperation, removeOperation, editOperation, operations }}
      >
        {children}
      </OperationsContext.Provider>
    </DragDropContext>
  )
}

export function useOperationsContext() {
  const context = useContext(OperationsContext)
  if (!context)
    throw new Error(
      'useOperationsContext() hook must be inside a OperationsContextProvider'
    )

  return context
}
