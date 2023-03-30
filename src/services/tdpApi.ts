import { emptyApi as api } from './emptyApi'
export const addTagTypes = [
  'services',
  'components',
  'deploy',
  'operation',
  'plan',
  'schema',
] as const
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getServicesApiV1ServiceGet: build.query<
        GetServicesApiV1ServiceGetApiResponse,
        GetServicesApiV1ServiceGetApiArg
      >({
        query: () => ({ url: `/api/v1/service/` }),
        providesTags: ['services'],
      }),
      getServiceApiV1ServiceServiceIdGet: build.query<
        GetServiceApiV1ServiceServiceIdGetApiResponse,
        GetServiceApiV1ServiceServiceIdGetApiArg
      >({
        query: (queryArg) => ({ url: `/api/v1/service/${queryArg.serviceId}` }),
        providesTags: ['services'],
      }),
      putServiceApiV1ServiceServiceIdPut: build.mutation<
        PutServiceApiV1ServiceServiceIdPutApiResponse,
        PutServiceApiV1ServiceServiceIdPutApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/service/${queryArg.serviceId}`,
          method: 'PUT',
          body: queryArg.serviceUpdate,
        }),
        invalidatesTags: ['services'],
      }),
      patchServiceApiV1ServiceServiceIdPatch: build.mutation<
        PatchServiceApiV1ServiceServiceIdPatchApiResponse,
        PatchServiceApiV1ServiceServiceIdPatchApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/service/${queryArg.serviceId}`,
          method: 'PATCH',
          body: queryArg.serviceUpdate,
        }),
        invalidatesTags: ['services'],
      }),
      getComponentApiV1ServiceServiceIdComponentComponentIdGet: build.query<
        GetComponentApiV1ServiceServiceIdComponentComponentIdGetApiResponse,
        GetComponentApiV1ServiceServiceIdComponentComponentIdGetApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/service/${queryArg.serviceId}/component/${queryArg.componentId}`,
        }),
        providesTags: ['components'],
      }),
      putComponentApiV1ServiceServiceIdComponentComponentIdPut: build.mutation<
        PutComponentApiV1ServiceServiceIdComponentComponentIdPutApiResponse,
        PutComponentApiV1ServiceServiceIdComponentComponentIdPutApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/service/${queryArg.serviceId}/component/${queryArg.componentId}`,
          method: 'PUT',
          body: queryArg.componentUpdate,
        }),
        invalidatesTags: ['components'],
      }),
      patchComponentApiV1ServiceServiceIdComponentComponentIdPatch:
        build.mutation<
          PatchComponentApiV1ServiceServiceIdComponentComponentIdPatchApiResponse,
          PatchComponentApiV1ServiceServiceIdComponentComponentIdPatchApiArg
        >({
          query: (queryArg) => ({
            url: `/api/v1/service/${queryArg.serviceId}/component/${queryArg.componentId}`,
            method: 'PATCH',
            body: queryArg.componentUpdate,
          }),
          invalidatesTags: ['components'],
        }),
      dagApiV1DeployDagPost: build.mutation<
        DagApiV1DeployDagPostApiResponse,
        DagApiV1DeployDagPostApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/deploy/dag`,
          method: 'POST',
          body: queryArg.body,
        }),
        invalidatesTags: ['deploy'],
      }),
      operationsApiV1DeployOperationsPost: build.mutation<
        OperationsApiV1DeployOperationsPostApiResponse,
        OperationsApiV1DeployOperationsPostApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/deploy/operations`,
          method: 'POST',
          body: queryArg.operationsRequest,
        }),
        invalidatesTags: ['deploy'],
      }),
      resumeApiV1DeployResumePost: build.mutation<
        ResumeApiV1DeployResumePostApiResponse,
        ResumeApiV1DeployResumePostApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/deploy/resume`,
          method: 'POST',
          body: queryArg.body,
        }),
        invalidatesTags: ['deploy'],
      }),
      reconfigureApiV1DeployReconfigurePost: build.mutation<
        ReconfigureApiV1DeployReconfigurePostApiResponse,
        ReconfigureApiV1DeployReconfigurePostApiArg
      >({
        query: () => ({ url: `/api/v1/deploy/reconfigure`, method: 'POST' }),
        invalidatesTags: ['deploy'],
      }),
      deploymentStatusApiV1DeployStatusGet: build.query<
        DeploymentStatusApiV1DeployStatusGetApiResponse,
        DeploymentStatusApiV1DeployStatusGetApiArg
      >({
        query: () => ({ url: `/api/v1/deploy/status` }),
        providesTags: ['deploy'],
      }),
      getDeploymentsApiV1DeployGet: build.query<
        GetDeploymentsApiV1DeployGetApiResponse,
        GetDeploymentsApiV1DeployGetApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/deploy/`,
          params: { limit: queryArg.limit, offset: queryArg.offset },
        }),
        providesTags: ['deploy'],
      }),
      getDeploymentApiV1DeployDeploymentIdGet: build.query<
        GetDeploymentApiV1DeployDeploymentIdGetApiResponse,
        GetDeploymentApiV1DeployDeploymentIdGetApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/deploy/${queryArg.deploymentId}`,
        }),
        providesTags: ['deploy'],
      }),
      getDeploymentOperationApiV1DeployDeploymentIdOperationOperationGet:
        build.query<
          GetDeploymentOperationApiV1DeployDeploymentIdOperationOperationGetApiResponse,
          GetDeploymentOperationApiV1DeployDeploymentIdOperationOperationGetApiArg
        >({
          query: (queryArg) => ({
            url: `/api/v1/deploy/${queryArg.deploymentId}/operation/${queryArg.operation}`,
          }),
          providesTags: ['deploy'],
        }),
      getOperationsApiV1OperationGet: build.query<
        GetOperationsApiV1OperationGetApiResponse,
        GetOperationsApiV1OperationGetApiArg
      >({
        query: () => ({ url: `/api/v1/operation/` }),
        providesTags: ['operation'],
      }),
      getDagOperationsApiV1OperationDagGet: build.query<
        GetDagOperationsApiV1OperationDagGetApiResponse,
        GetDagOperationsApiV1OperationDagGetApiArg
      >({
        query: () => ({ url: `/api/v1/operation/dag` }),
        providesTags: ['operation'],
      }),
      getOtherOperationsApiV1OperationOtherGet: build.query<
        GetOtherOperationsApiV1OperationOtherGetApiResponse,
        GetOtherOperationsApiV1OperationOtherGetApiArg
      >({
        query: () => ({ url: `/api/v1/operation/other` }),
        providesTags: ['operation'],
      }),
      dagApiV1PlanDagPost: build.mutation<
        DagApiV1PlanDagPostApiResponse,
        DagApiV1PlanDagPostApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/plan/dag`,
          method: 'POST',
          body: queryArg.body,
        }),
        invalidatesTags: ['plan'],
      }),
      operationsApiV1PlanOperationsPost: build.mutation<
        OperationsApiV1PlanOperationsPostApiResponse,
        OperationsApiV1PlanOperationsPostApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/plan/operations`,
          method: 'POST',
          body: queryArg.operationsRequest,
        }),
        invalidatesTags: ['plan'],
      }),
      resumeApiV1PlanResumePost: build.mutation<
        ResumeApiV1PlanResumePostApiResponse,
        ResumeApiV1PlanResumePostApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/plan/resume`,
          method: 'POST',
          body: queryArg.body,
        }),
        invalidatesTags: ['plan'],
      }),
      reconfigureApiV1PlanReconfigurePost: build.mutation<
        ReconfigureApiV1PlanReconfigurePostApiResponse,
        ReconfigureApiV1PlanReconfigurePostApiArg
      >({
        query: () => ({ url: `/api/v1/plan/reconfigure`, method: 'POST' }),
        invalidatesTags: ['plan'],
      }),
      getSchemasApiV1SchemaGet: build.query<
        GetSchemasApiV1SchemaGetApiResponse,
        GetSchemasApiV1SchemaGetApiArg
      >({
        query: () => ({ url: `/api/v1/schema/` }),
        providesTags: ['schema'],
      }),
      getSchemaApiV1SchemaServiceIdGet: build.query<
        GetSchemaApiV1SchemaServiceIdGetApiResponse,
        GetSchemaApiV1SchemaServiceIdGetApiArg
      >({
        query: (queryArg) => ({ url: `/api/v1/schema/${queryArg.serviceId}` }),
        providesTags: ['schema'],
      }),
      rootGet: build.query<RootGetApiResponse, RootGetApiArg>({
        query: () => ({ url: `/` }),
      }),
    }),
    overrideExisting: false,
  })
export { injectedRtkApi as tdpApi }
export type GetServicesApiV1ServiceGetApiResponse =
  /** status 200 Successful Response */ Service[]
export type GetServicesApiV1ServiceGetApiArg = void
export type GetServiceApiV1ServiceServiceIdGetApiResponse =
  /** status 200 Successful Response */ Service
export type GetServiceApiV1ServiceServiceIdGetApiArg = {
  serviceId: string
}
export type PutServiceApiV1ServiceServiceIdPutApiResponse =
  /** status 200 Successful Response */ ServiceUpdateResponse
export type PutServiceApiV1ServiceServiceIdPutApiArg = {
  serviceId: string
  serviceUpdate: ServiceUpdate
}
export type PatchServiceApiV1ServiceServiceIdPatchApiResponse =
  /** status 200 Successful Response */ ServiceUpdateResponse
export type PatchServiceApiV1ServiceServiceIdPatchApiArg = {
  serviceId: string
  serviceUpdate: ServiceUpdate
}
export type GetComponentApiV1ServiceServiceIdComponentComponentIdGetApiResponse =
  /** status 200 Successful Response */ Component
export type GetComponentApiV1ServiceServiceIdComponentComponentIdGetApiArg = {
  componentId: string
  serviceId: string
}
export type PutComponentApiV1ServiceServiceIdComponentComponentIdPutApiResponse =
  /** status 200 Successful Response */ ComponentUpdateResponse
export type PutComponentApiV1ServiceServiceIdComponentComponentIdPutApiArg = {
  componentId: string
  serviceId: string
  componentUpdate: ComponentUpdate
}
export type PatchComponentApiV1ServiceServiceIdComponentComponentIdPatchApiResponse =
  /** status 200 Successful Response */ ComponentUpdateResponse
export type PatchComponentApiV1ServiceServiceIdComponentComponentIdPatchApiArg =
  {
    componentId: string
    serviceId: string
    componentUpdate: ComponentUpdate
  }
export type DagApiV1DeployDagPostApiResponse =
  /** status 202 Successful Response */ any
export type DagApiV1DeployDagPostApiArg = {
  body: DeployRequest
}
export type OperationsApiV1DeployOperationsPostApiResponse =
  /** status 202 Successful Response */ any
export type OperationsApiV1DeployOperationsPostApiArg = {
  operationsRequest: OperationsRequest
}
export type ResumeApiV1DeployResumePostApiResponse =
  /** status 202 Successful Response */ any
export type ResumeApiV1DeployResumePostApiArg = {
  body: ResumeRequest
}
export type ReconfigureApiV1DeployReconfigurePostApiResponse =
  /** status 202 Successful Response */ any
export type ReconfigureApiV1DeployReconfigurePostApiArg = void
export type DeploymentStatusApiV1DeployStatusGetApiResponse =
  /** status 200 Successful Response */ DeployStatus
export type DeploymentStatusApiV1DeployStatusGetApiArg = void
export type GetDeploymentsApiV1DeployGetApiResponse =
  /** status 200 Successful Response */ DeploymentLog[]
export type GetDeploymentsApiV1DeployGetApiArg = {
  limit?: number
  offset?: number
}
export type GetDeploymentApiV1DeployDeploymentIdGetApiResponse =
  /** status 200 Successful Response */ DeploymentLogWithOperations
export type GetDeploymentApiV1DeployDeploymentIdGetApiArg = {
  deploymentId: number
}
export type GetDeploymentOperationApiV1DeployDeploymentIdOperationOperationGetApiResponse =
  /** status 200 Successful Response */ OperationLog
export type GetDeploymentOperationApiV1DeployDeploymentIdOperationOperationGetApiArg =
  {
    deploymentId: number
    operation: string
  }
export type GetOperationsApiV1OperationGetApiResponse =
  /** status 200 Successful Response */ Operation[]
export type GetOperationsApiV1OperationGetApiArg = void
export type GetDagOperationsApiV1OperationDagGetApiResponse =
  /** status 200 Successful Response */ Operation[]
export type GetDagOperationsApiV1OperationDagGetApiArg = void
export type GetOtherOperationsApiV1OperationOtherGetApiResponse =
  /** status 200 Successful Response */ Operation[]
export type GetOtherOperationsApiV1OperationOtherGetApiArg = void
export type DagApiV1PlanDagPostApiResponse =
  /** status 200 Successful Response */ Operation[]
export type DagApiV1PlanDagPostApiArg = {
  body: DeployRequest
}
export type OperationsApiV1PlanOperationsPostApiResponse =
  /** status 200 Successful Response */ Operation[]
export type OperationsApiV1PlanOperationsPostApiArg = {
  operationsRequest: OperationsRequest
}
export type ResumeApiV1PlanResumePostApiResponse =
  /** status 200 Successful Response */ Operation[]
export type ResumeApiV1PlanResumePostApiArg = {
  body: ResumeRequest
}
export type ReconfigureApiV1PlanReconfigurePostApiResponse =
  /** status 200 Successful Response */ Operation[]
export type ReconfigureApiV1PlanReconfigurePostApiArg = void
export type GetSchemasApiV1SchemaGetApiResponse =
  /** status 200 Successful Response */ object
export type GetSchemasApiV1SchemaGetApiArg = void
export type GetSchemaApiV1SchemaServiceIdGetApiResponse =
  /** status 200 Successful Response */ object
export type GetSchemaApiV1SchemaServiceIdGetApiArg = {
  serviceId: string
}
export type RootGetApiResponse = /** status 200 Successful Response */ any
export type RootGetApiArg = void
export type Variables = object
export type Component = {
  id: string
  service_id: string
  variables?: Variables
  version: string
}
export type Service = {
  id: string
  components: Component[]
  variables?: Variables
  version: string
}
export type ValidationError = {
  loc: (string | number)[]
  msg: string
  type: string
}
export type HttpValidationError = {
  detail?: ValidationError[]
}
export type ServiceUpdateResponse = {
  message: string
  version: string
}
export type ServiceUpdate = {
  message: string
  variables: Variables
}
export type ComponentUpdateResponse = {
  message: string
  version: string
}
export type ComponentUpdate = {
  message: string
  variables: Variables
}
export type FilterTypeEnum = 'regex' | 'glob'
export type DeployRequest = {
  targets?: string[]
  sources?: string[]
  filter_type?: FilterTypeEnum
  filter_expression?: string
  restart?: boolean
}
export type OperationsRequest = {
  operations: string[]
}
export type ResumeRequest = {
  id?: number
}
export type DeployStatus = {
  message: string
}
export type StateEnum = 'Success' | 'Failure' | 'Pending'
export type DeploymentLog = {
  id: number
  sources?: string[]
  targets?: string[]
  filter_expression?: string
  start_time: string
  end_time?: string
  restart?: boolean
  state: StateEnum
  operations: string[]
  user?: string
}
export type OperationLog = {
  operation: string
  start_time: string
  end_time: string
  state: StateEnum
  logs: Blob
}
export type DeploymentLogWithOperations = {
  id: number
  sources?: string[]
  targets?: string[]
  filter_expression?: string
  start_time: string
  end_time?: string
  restart?: boolean
  state: StateEnum
  operations: OperationLog[]
  user?: string
}
export type Operation = {
  name: string
  collection_name?: string
  depends_on?: string[]
  noop?: boolean
  service: string
  action: string
  component?: string
}
export const {
  useGetServicesApiV1ServiceGetQuery,
  useLazyGetServicesApiV1ServiceGetQuery,
  useGetServiceApiV1ServiceServiceIdGetQuery,
  useLazyGetServiceApiV1ServiceServiceIdGetQuery,
  usePutServiceApiV1ServiceServiceIdPutMutation,
  usePatchServiceApiV1ServiceServiceIdPatchMutation,
  useGetComponentApiV1ServiceServiceIdComponentComponentIdGetQuery,
  useLazyGetComponentApiV1ServiceServiceIdComponentComponentIdGetQuery,
  usePutComponentApiV1ServiceServiceIdComponentComponentIdPutMutation,
  usePatchComponentApiV1ServiceServiceIdComponentComponentIdPatchMutation,
  useDagApiV1DeployDagPostMutation,
  useOperationsApiV1DeployOperationsPostMutation,
  useResumeApiV1DeployResumePostMutation,
  useReconfigureApiV1DeployReconfigurePostMutation,
  useDeploymentStatusApiV1DeployStatusGetQuery,
  useLazyDeploymentStatusApiV1DeployStatusGetQuery,
  useGetDeploymentsApiV1DeployGetQuery,
  useLazyGetDeploymentsApiV1DeployGetQuery,
  useGetDeploymentApiV1DeployDeploymentIdGetQuery,
  useLazyGetDeploymentApiV1DeployDeploymentIdGetQuery,
  useGetDeploymentOperationApiV1DeployDeploymentIdOperationOperationGetQuery,
  useLazyGetDeploymentOperationApiV1DeployDeploymentIdOperationOperationGetQuery,
  useGetOperationsApiV1OperationGetQuery,
  useLazyGetOperationsApiV1OperationGetQuery,
  useGetDagOperationsApiV1OperationDagGetQuery,
  useLazyGetDagOperationsApiV1OperationDagGetQuery,
  useGetOtherOperationsApiV1OperationOtherGetQuery,
  useLazyGetOtherOperationsApiV1OperationOtherGetQuery,
  useDagApiV1PlanDagPostMutation,
  useOperationsApiV1PlanOperationsPostMutation,
  useResumeApiV1PlanResumePostMutation,
  useReconfigureApiV1PlanReconfigurePostMutation,
  useGetSchemasApiV1SchemaGetQuery,
  useLazyGetSchemasApiV1SchemaGetQuery,
  useGetSchemaApiV1SchemaServiceIdGetQuery,
  useLazyGetSchemaApiV1SchemaServiceIdGetQuery,
  useRootGetQuery,
  useLazyRootGetQuery,
} = injectedRtkApi
