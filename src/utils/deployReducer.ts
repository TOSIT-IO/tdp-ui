import { FilterTypeEnum } from '@/client-sdk'
import {
  DeployActionEnum,
  DeployMethodsEnum,
  DeployStateType,
} from 'src/components'

type DeployActionPayload = {
  [DeployActionEnum.ADD_OPERATION]: {
    newOperation: string
  }
  [DeployActionEnum.EDIT_OPERATION_AT]: {
    newOperation: string
    index: number
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
    newDeployMethod: DeployMethodsEnum
  }
  [DeployActionEnum.TOGGLE_RESTART]: undefined
}

export function deployReducer(state: DeployStateType, action: DeployActions) {
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
        deployMethod: action.payload.newDeployMethod,
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

export type DeployActions = {
  [Key in keyof DeployActionPayload]: DeployActionPayload[Key] extends undefined
    ? {
        type: Key
      }
    : {
        type: Key
        payload: DeployActionPayload[Key]
      }
}[DeployActionEnum]
