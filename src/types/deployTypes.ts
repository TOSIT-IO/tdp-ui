import { FilterTypeEnum } from '@/client-sdk'

export enum DeployMethodsEnum {
  ALL = 'all',
  SOURCES = 'sources',
  TARGETS = 'targets',
  CUSTOM = 'custom',
}

export enum DeployActionEnum {
  ADD_OPERATION,
  EDIT_OPERATION_AT,
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
  deployMethod: DeployMethodsEnum
  restart: boolean
}

export interface TfilterType {
  name: FilterTypeEnum
  placeholder: string
}

export interface DeployMethodsType {
  name: DeployMethodsEnum
  title: string
  description: string
}
