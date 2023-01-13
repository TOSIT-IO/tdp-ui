import {
  ComponentsApi,
  ComponentUpdate,
  DefaultApi,
  DeployApi,
  DeployRequest,
  OperationApi,
  OperationsRequest,
  PlanApi,
  ResumeRequest,
  SchemaApi,
  ServicesApi,
  ServiceUpdate,
} from '@/client-sdk'
import type { Configuration } from '@/client-sdk'
import type { AxiosInstance } from 'axios'

export type {
  ComponentUpdate,
  DeploymentLog,
  DeploymentLogWithOperations,
  DeployRequest,
  Operation,
  OperationLog,
  OperationsRequest,
  Service,
  ServiceUpdate,
} from '@/client-sdk'

export { FilterTypeEnum } from '@/client-sdk'

export function createTdpClientInstance(
  configuration?: Configuration,
  basePath?: string,
  axiosInstance?: AxiosInstance
) {
  const serviceApi = new ServicesApi(configuration, basePath, axiosInstance)
  const componentsApi = new ComponentsApi(
    configuration,
    basePath,
    axiosInstance
  )
  const deployApi = new DeployApi(configuration, basePath, axiosInstance)
  const operationApi = new OperationApi(configuration, basePath, axiosInstance)
  const planApi = new PlanApi(configuration, basePath, axiosInstance)
  const schemaApi = new SchemaApi(configuration, basePath, axiosInstance)
  const defaultApi = new DefaultApi(configuration, basePath, axiosInstance)

  //TODO: refactor in hooks
  return {
    getServices: () => serviceApi.getServicesApiV1ServiceGet(),
    getService: (serviceId: string) =>
      serviceApi.getServiceApiV1ServiceServiceIdGet(serviceId),
    putService: (serviceId: string, serviceUpdate: ServiceUpdate) =>
      serviceApi.putServiceApiV1ServiceServiceIdPut(serviceId, serviceUpdate),
    patchService: (serviceId: string, serviceUpdate: ServiceUpdate) =>
      serviceApi.patchServiceApiV1ServiceServiceIdPatch(
        serviceId,
        serviceUpdate
      ),
    getComponent: (componentId: string, serviceId: string) =>
      componentsApi.getComponentApiV1ServiceServiceIdComponentComponentIdGet(
        componentId,
        serviceId
      ),
    putComponent: (
      componentId: string,
      serviceId: string,
      componentUpdate: ComponentUpdate
    ) =>
      componentsApi.putComponentApiV1ServiceServiceIdComponentComponentIdPut(
        componentId,
        serviceId,
        componentUpdate
      ),
    patchComponent: (
      componentId: string,
      serviceId: string,
      componentUpdate: ComponentUpdate
    ) =>
      componentsApi.patchComponentApiV1ServiceServiceIdComponentComponentIdPatch(
        componentId,
        serviceId,
        componentUpdate
      ),
    getDeploymentStatus: () => deployApi.deploymentStatusApiV1DeployStatusGet(),
    getDeployments: (limit?: number, offset?: number) =>
      deployApi.getDeploymentsApiV1DeployGet(limit, offset),
    getDeployment: (deploymentId: number) =>
      deployApi.getDeploymentApiV1DeployDeploymentIdGet(deploymentId),
    getDeploymentOperation: (deploymentId: number, operation: string) =>
      deployApi.getDeploymentOperationApiV1DeployDeploymentIdOperationOperationGet(
        deploymentId,
        operation
      ),
    dagDeploy: (deployRequest?: DeployRequest) =>
      deployApi.dagApiV1DeployDagPost(deployRequest),
    operationsDeploy: (operationsRequest: OperationsRequest) =>
      deployApi.operationsApiV1DeployOperationsPost(operationsRequest),
    reconfigureDeploy: () => deployApi.reconfigureApiV1DeployReconfigurePost(),
    resumeDeploy: (resumeRequest?: ResumeRequest) =>
      deployApi.resumeApiV1DeployResumePost(resumeRequest),
    getOperations: () => operationApi.getOperationsApiV1OperationGet(),
    getDagOperations: () => operationApi.getDagOperationsApiV1OperationDagGet(),
    getOtherOperations: () =>
      operationApi.getOtherOperationsApiV1OperationOtherGet(),
    planDeployDag: (deployRequest?: DeployRequest) =>
      planApi.dagApiV1PlanDagPost(deployRequest),
    planDeployOperations: (operationsRequest: OperationsRequest) =>
      planApi.operationsApiV1PlanOperationsPost(operationsRequest),
    planDeployReconfigure: () => planApi.reconfigureApiV1PlanReconfigurePost(),
    planDeployResume: (resumeRequest?: ResumeRequest) =>
      planApi.resumeApiV1PlanResumePost(resumeRequest),
    getSchemas: () => schemaApi.getSchemasApiV1SchemaGet(),
    getSchema: (serviceId: string) =>
      schemaApi.getSchemaApiV1SchemaServiceIdGet(serviceId),
    getRoot: () => defaultApi.rootGet(),
  }
}
