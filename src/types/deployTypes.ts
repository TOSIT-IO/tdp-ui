import { FilterTypeEnum } from 'src/clients/tdpClient'

export enum DeployMethodsEnum {
  ALL = 'all',
  SOURCES = 'sources',
  TARGETS = 'targets',
  CUSTOM = 'custom',
}

export enum DeployActionEnum {
  ADD_OPERATION,
  EDIT_OPERATION_AT,
  SWITCH_TWO_OPERATIONS,
  REMOVE_LAST_OPERATION,
  REMOVE_OPERATION_AT,
  SET_FILTER_EXPRESSION,
  SET_FILTER_TYPE,
  SET_DEPLOY_METHOD,
  TOGGLE_RESTART,
}

export interface DeployStateType {
  operations: string[]
  filterExpression: string
  filterType: FilterTypeEnum
  selectedDeployMode: DeployMethodsEnum
  restart: boolean
}
