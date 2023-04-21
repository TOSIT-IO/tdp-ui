import { OperationsRequest } from 'src/store/features/api/tdpApi'
import { createContext, useReducer } from 'react'
import {
  appendElementToList,
  moveElementInList,
  removeElementFromList,
} from 'src/utils'

export enum OperationsActionEnum {
  ADD_OPERATION = 'ADD_OPERATION',
  SWITCH_OPERATIONS = 'SWITCH_OPERATIONS',
  REMOVE_OPERATION = 'REMOVE_OPERATION',
}

type OperationsState = OperationsRequest

type OperationsActionPayload = {
  [OperationsActionEnum.ADD_OPERATION]: { newOperation: string }
  [OperationsActionEnum.SWITCH_OPERATIONS]: {
    sourceIndex: number
    destinationIndex: number
  }
  [OperationsActionEnum.REMOVE_OPERATION]: { index: number }
}

type OperationsAction = {
  [Action in OperationsActionEnum]: {
    type: Action
    payload: OperationsActionPayload[Action]
  }
}[OperationsActionEnum]

type OperationsContextValue = {
  state: OperationsState
  dispatch: React.Dispatch<OperationsAction>
}

type OperationsContextProviderProps = {
  children: React.ReactNode
  initialState: OperationsState
}

export const OperationsContext = createContext<OperationsContextValue>(null)

export function OperationsContextProvider({
  children,
  initialState,
}: OperationsContextProviderProps) {
  const [state, dispatch] = useReducer(reducer, {
    operations: initialState.operations ?? [],
  })

  return (
    <OperationsContext.Provider value={{ state, dispatch }}>
      {children}
    </OperationsContext.Provider>
  )
}

function reducer(
  state: OperationsState,
  action: OperationsAction
): OperationsState {
  switch (action.type) {
    case OperationsActionEnum.ADD_OPERATION:
      const { newOperation } = action.payload
      return {
        ...state,
        operations: appendElementToList(state.operations, newOperation),
      }
    case OperationsActionEnum.SWITCH_OPERATIONS:
      const { sourceIndex, destinationIndex } = action.payload
      return {
        ...state,
        operations: moveElementInList(
          state.operations,
          sourceIndex,
          destinationIndex
        ),
      }
    case OperationsActionEnum.REMOVE_OPERATION:
      const { index } = action.payload
      return {
        ...state,
        operations: removeElementFromList(state.operations, index),
      }
    default:
      return state
  }
}
