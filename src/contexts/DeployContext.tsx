import { FilterTypeEnum } from '@/client-sdk'
import { createContext, useContext, useReducer } from 'react'
import {
  DeployActionEnum,
  DeployMethodsEnum,
  DeployStateType,
} from 'src/types/deployTypes'

const initialState = {
  operations: [],
  filterExpression: '',
  filterType: FilterTypeEnum.Regex,
  selectedDeployMode: null,
  restart: false,
}

const DeployContext = createContext<{
  state: DeployStateType
  dispatch: React.Dispatch<DeployActions>
}>(null)

export function DeployContextProvider({ children }) {
  const [state, dispatch] = useReducer(deployReducer, initialState)

  return (
    <DeployContext.Provider value={{ state, dispatch }}>
      {children}
    </DeployContext.Provider>
  )
}

export function useDeployContext() {
  const deployContext = useContext(DeployContext)
  if (!deployContext)
    throw new Error(
      'useDeployContext() hook must be inside a DeployContextProvider'
    )

  return deployContext
}

function deployReducer(state: DeployStateType, action: DeployActions) {
  const newOperations = [...state.operations]
  switch (action.type) {
    case DeployActionEnum.ADD_OPERATION:
      return {
        ...state,
        operations: [...state.operations, action.payload.newOperation.trim()],
      }
    case DeployActionEnum.EDIT_OPERATION_AT:
      newOperations.splice(
        action.payload.index,
        1,
        action.payload.newOperation.trim()
      )
      return {
        ...state,
        operations: newOperations,
      }
    case DeployActionEnum.SWITCH_TWO_OPERATIONS:
      const { sourceIndex, destinationIndex } = action.payload

      const [removed] = newOperations.splice(sourceIndex, 1)
      newOperations.splice(destinationIndex, 0, removed)

      return {
        ...state,
        operations: newOperations,
      }
    case DeployActionEnum.REMOVE_LAST_OPERATION:
      newOperations.pop()
      return {
        ...state,
        operations: newOperations,
      }
    case DeployActionEnum.REMOVE_OPERATION_AT:
      newOperations.splice(action.payload.index, 1)
      return {
        ...state,
        operations: newOperations,
      }
    case DeployActionEnum.SET_FILTER_EXPRESSION:
      return {
        ...state,
        filterExpression: action.payload.newFilterExpression,
      }
    case DeployActionEnum.SET_FILTER_TYPE:
      return {
        ...state,
        filterType: action.payload.newFilterType,
      }
    case DeployActionEnum.SET_DEPLOY_METHOD:
      return {
        ...state,
        selectedDeployMode: action.payload.newSelectedDeployMode,
      }
    case DeployActionEnum.TOGGLE_RESTART:
      return {
        ...state,
        restart: !state.restart,
      }
    default:
      throw new Error()
  }
}

type DeployActionPayload = {
  [DeployActionEnum.ADD_OPERATION]: {
    newOperation: string
  }
  [DeployActionEnum.EDIT_OPERATION_AT]: {
    newOperation: string
    index: number
  }
  [DeployActionEnum.SWITCH_TWO_OPERATIONS]: {
    sourceIndex: number
    destinationIndex: number
  }
  [DeployActionEnum.REMOVE_LAST_OPERATION]: undefined
  [DeployActionEnum.REMOVE_OPERATION_AT]: {
    index: number
  }
  [DeployActionEnum.SET_FILTER_EXPRESSION]: {
    newFilterExpression: string
  }
  [DeployActionEnum.SET_FILTER_TYPE]: {
    newFilterType: FilterTypeEnum
  }
  [DeployActionEnum.SET_DEPLOY_METHOD]: {
    newSelectedDeployMode: DeployMethodsEnum
  }
  [DeployActionEnum.TOGGLE_RESTART]: undefined
}

type DeployActions = {
  [Key in keyof DeployActionPayload]: DeployActionPayload[Key] extends undefined
    ? {
        type: Key
      }
    : {
        type: Key
        payload: DeployActionPayload[Key]
      }
}[DeployActionEnum]
