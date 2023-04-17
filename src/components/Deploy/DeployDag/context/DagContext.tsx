import { createContext, useReducer } from 'react'
import { FilterTypeEnum } from 'src/features/api/tdpApi'

export enum DeployModeEnum {
  SOURCES = 'sources',
  TARGETS = 'targets',
  ALL = 'all',
}

export enum DagActionEnum {
  SET_OPERATIONS = 'SET_OPERATIONS',
  SET_FILTER_EXPRESSION = 'SET_FILTER_EXPRESSION',
  SET_FILTER_TYPE = 'SET_FILTER_TYPE',
  SET_DEPLOY_MODE = 'SET_DEPLOY_MODE',
  TOGGLE_RESTART = 'TOGGLE_RESTART',
}

type DagState = {
  selectedDeployMode: DeployModeEnum
  operations?: string[]
  filterType: FilterTypeEnum
  filterExpression?: string
  restart?: boolean
}

type DagActionPayload = {
  [DagActionEnum.SET_OPERATIONS]: {
    newOperations: string[]
  }
  [DagActionEnum.SET_FILTER_EXPRESSION]: {
    newFilterExpression: string
  }
  [DagActionEnum.SET_FILTER_TYPE]: {
    newFilterType: FilterTypeEnum
  }
  [DagActionEnum.SET_DEPLOY_MODE]: {
    newSelectedDeployMode: DeployModeEnum
  }
  [DagActionEnum.TOGGLE_RESTART]: null
}

type DagAction = {
  [Action in DagActionEnum]: {
    type: Action
    // if the payload is null, we don't want to add the payload property
  } & (DagActionPayload[Action] extends null
    ? {}
    : { payload: DagActionPayload[Action] })
}[DagActionEnum]

type DagContextValue = {
  state: DagState
  dispatch: React.Dispatch<DagAction>
}

type DagContextProviderProps = {
  children: React.ReactNode
  initialState: DagState
}

export const DagContext = createContext<DagContextValue>(null)

export function DagContextProvider({
  children,
  initialState,
}: DagContextProviderProps) {
  const [state, dispatch] = useReducer(reducer, {
    selectedDeployMode: initialState.selectedDeployMode ?? DeployModeEnum.ALL,
    operations: initialState.operations ?? [],
    filterType: initialState.filterType ?? 'glob',
    filterExpression: initialState.filterExpression ?? '',
    restart: initialState.restart ?? false,
  })

  return (
    <DagContext.Provider value={{ state, dispatch }}>
      {children}
    </DagContext.Provider>
  )
}

function reducer(state: DagState, action: DagAction): DagState {
  switch (action.type) {
    case DagActionEnum.SET_OPERATIONS:
      const { newOperations } = action.payload
      return {
        ...state,
        operations: newOperations,
      }
    case DagActionEnum.SET_DEPLOY_MODE:
      const { newSelectedDeployMode } = action.payload
      return {
        ...state,
        selectedDeployMode: newSelectedDeployMode,
      }
    case DagActionEnum.SET_FILTER_EXPRESSION:
      const { newFilterExpression } = action.payload
      return {
        ...state,
        filterExpression: newFilterExpression,
      }
    case DagActionEnum.SET_FILTER_TYPE:
      const { newFilterType } = action.payload
      return {
        ...state,
        filterType: newFilterType,
      }
    case DagActionEnum.TOGGLE_RESTART:
      return {
        ...state,
        restart: !state.restart,
      }
    default:
      return state
  }
}
