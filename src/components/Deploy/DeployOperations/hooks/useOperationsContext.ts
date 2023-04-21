import { OperationsRequest } from 'src/store/features/api/tdpApi'
import { useContext } from 'react'
import { OperationsActionEnum, OperationsContext } from '../context'

/**
 * Hook to access the OperationsContext.
 * @returns The operations context
 * @throws Error if used outside of a OperationsContextProvider
 * @see OperationsContext
 */
function useOperationsContext() {
  const operationsContext = useContext(OperationsContext)
  if (operationsContext === null) {
    throw new Error(
      'useOperationsContext must be used within a OperationsContext'
    )
  }
  return operationsContext
}

/**
 * Returns the list of selected operations and functions to update it.
 * @returns Operations getter and setter.
 */
export function useOperations() {
  const {
    state: { operations },
    dispatch,
  } = useOperationsContext()
  const addOperations = (newOperation: string) => {
    dispatch({
      type: OperationsActionEnum.ADD_OPERATION,
      payload: {
        newOperation,
      },
    })
  }
  const removeOperations = (operationIndexToRemove: number) => {
    dispatch({
      type: OperationsActionEnum.REMOVE_OPERATION,
      payload: {
        index: operationIndexToRemove,
      },
    })
  }
  const switchOperations = (destinationIndex: number, sourceIndex: number) => {
    dispatch({
      type: OperationsActionEnum.SWITCH_OPERATIONS,
      payload: {
        destinationIndex,
        sourceIndex,
      },
    })
  }
  return { operations, addOperations, removeOperations, switchOperations }
}

/**
 * Returns the deploy operations request object.
 * @returns Deploy operations request object.
 * @see OperationsRequest
 */
export function useDeployOperationsRequest(): OperationsRequest {
  const {
    state: { operations },
  } = useOperationsContext()
  return { operations }
}
