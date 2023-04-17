import { useCallback, useContext, useMemo } from 'react'
import { DeployRequest, FilterTypeEnum } from 'src/features/api/tdpApi'
import { DagActionEnum, DagContext, DeployModeEnum } from '../context'

/**
 * Hook to access the DagContext.
 * @returns The DAG context
 * @throws Error if used outside of a DagContextProvider
 * @see DagContext
 */
function useDagContext() {
  const dagContext = useContext(DagContext)

  if (!dagContext) {
    throw new Error('useDagContext must be used within a DagContextProvider')
  }

  return dagContext
}

/**
 * Returns the list of selected operations and a function to update it, regardless of
 * the deploy mode.
 * @returns Operations getter and setter.
 */
export function useOperations(): [string[], (newOperations: string[]) => void] {
  const {
    state: { operations },
    dispatch,
  } = useDagContext()

  const setOperations = useCallback(
    (operations: string[]) => {
      dispatch({
        type: DagActionEnum.SET_OPERATIONS,
        payload: {
          newOperations: operations,
        },
      })
    },
    [dispatch]
  )

  return [operations, setOperations]
}

/**
 * Returns the selected deployment mode and a function to update it.
 * @returns Deploy mode getter and setter.
 */
export function useSelectedDeployMode(): [
  DeployModeEnum,
  (newMode: DeployModeEnum) => void
] {
  const {
    state: { selectedDeployMode },
    dispatch,
  } = useDagContext()

  const setSelectedDeployMode = useCallback(
    (newMode: DeployModeEnum) => {
      dispatch({
        type: DagActionEnum.SET_DEPLOY_MODE,
        payload: {
          newSelectedDeployMode: newMode,
        },
      })
    },
    [dispatch]
  )

  return [selectedDeployMode, setSelectedDeployMode]
}

/**
 * Returns the restart flag and a function to update it.
 * @returns Restart flag getter and setter.
 */
export function useRestart(): [boolean, () => void] {
  const {
    state: { restart },
    dispatch,
  } = useDagContext()

  const toggleRestart = useCallback(() => {
    dispatch({
      type: DagActionEnum.TOGGLE_RESTART,
    })
  }, [dispatch])

  return [restart, toggleRestart]
}

/**
 * Returns the filter type and a function to update it.
 * @returns Filter type getter and setter.
 */
export function useFilterType(): [
  FilterTypeEnum,
  (newFilterType: FilterTypeEnum) => void
] {
  const {
    state: { filterType },
    dispatch,
  } = useDagContext()

  const setFilterType = useCallback(
    (newFilterType: FilterTypeEnum) => {
      dispatch({
        type: DagActionEnum.SET_FILTER_TYPE,
        payload: {
          newFilterType,
        },
      })
    },
    [dispatch]
  )

  return [filterType, setFilterType]
}

/**
 * Returns the filter expression and a function to update it.
 * @returns Filter expression getter and setter.
 */
export function useFilterExpression(): [
  string,
  (newFilterExpression: string) => void
] {
  const {
    state: { filterExpression },
    dispatch,
  } = useDagContext()

  const setFilterExpression = useCallback(
    (newFilterExpression: string) => {
      dispatch({
        type: DagActionEnum.SET_FILTER_EXPRESSION,
        payload: {
          newFilterExpression,
        },
      })
    },
    [dispatch]
  )

  return [filterExpression, setFilterExpression]
}

/**
 * Returns the deploy request object.
 * @returns Deploy request object.
 * @see DeployRequest
 */
export function useDeployDagRequest(): DeployRequest {
  const [restart] = useRestart()
  const [filterExpression] = useFilterExpression()
  const [filterType] = useFilterType()
  const [operations] = useOperations()
  const [deployMode] = useSelectedDeployMode()

  //TODO: condionnaly add  all props to the object at first
  const deployDagRequest = useMemo(() => {
    const baseRequest = {
      restart,
    } as DeployRequest
    if (deployMode !== DeployModeEnum.ALL) baseRequest[deployMode] = operations
    if (filterExpression) {
      baseRequest.filter_type = filterType
      baseRequest.filter_expression = filterExpression
    }
    return baseRequest
  }, [deployMode, filterExpression, filterType, operations, restart])

  return deployDagRequest
}
